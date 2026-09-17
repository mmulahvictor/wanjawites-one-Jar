/**
 * Cryptographic Role-Based Access Control (RBAC) & Authentication Engine
 * - WebCrypto PBKDF2 / SHA-256 salted password hashing
 * - Granular privilege matrix (edit, publish, delete, settings, user management, bookings)
 * - Brute-force rate-limiting and lockout protection
 * - Dynamic team member management and role configuration
 * - Security audit logging
 */

export type AdminRole = 'super_admin' | 'editor' | 'contributor' | 'booking_manager';

export interface AdminPrivileges {
  canEditContent: boolean;
  canPublishContent: boolean;
  canDeleteContent: boolean;
  canManageSiteSettings: boolean;
  canManageUsers: boolean;
  canManageBookings: boolean;
  canImportExportData: boolean;
  canResetData: boolean;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  displayName: string;
  role: AdminRole;
  roleLabel: string;
  privileges: AdminPrivileges;
  token: string;
  loginTimestamp: number;
}

export interface StoredAdminUser {
  id: string;
  username: string;
  email: string;
  displayName: string;
  role: AdminRole;
  roleLabel: string;
  privileges: AdminPrivileges;
  passwordHash: string;
  passwordSalt: string;
  createdAt: number;
  lastLoginAt?: number;
  isActive: boolean;
}

export interface SecurityAuditLog {
  id: string;
  timestamp: number;
  actorId: string;
  actorName: string;
  action: 
    | 'LOGIN_SUCCESS' 
    | 'LOGIN_FAILURE' 
    | 'LOGOUT' 
    | 'USER_CREATED' 
    | 'USER_UPDATED' 
    | 'USER_DELETED' 
    | 'PASSWORD_CHANGED' 
    | 'PERMISSIONS_MODIFIED';
  details: string;
}

export const AUTH_CHANGE_EVENT = 'wanja_auth_changed';
const USERS_STORAGE_KEY = 'wanja_rbac_users_v3';
const SESSION_KEY = 'wanja_admin_auth_session_v3';
const REMEMBER_KEY = 'wanja_admin_auth_remember_v3';
const BRUTE_FORCE_KEY = 'wanja_admin_bruteforce_v3';
const AUDIT_LOG_KEY = 'wanja_admin_audit_logs_v3';

const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

// Role Default Privilege Presets
export const ROLE_PRESETS: Record<AdminRole, { label: string; description: string; privileges: AdminPrivileges }> = {
  super_admin: {
    label: 'Super Administrator & Founder',
    description: 'Full unconstrained ownership: manage all content, settings, users, and cryptographic security.',
    privileges: {
      canEditContent: true,
      canPublishContent: true,
      canDeleteContent: true,
      canManageSiteSettings: true,
      canManageUsers: true,
      canManageBookings: true,
      canImportExportData: true,
      canResetData: true,
    },
  },
  editor: {
    label: 'Senior Content Editor',
    description: 'Publish, revise, and delete poems, writings, and videos. View bookings. Cannot manage other users or global settings.',
    privileges: {
      canEditContent: true,
      canPublishContent: true,
      canDeleteContent: true,
      canManageSiteSettings: false,
      canManageUsers: false,
      canManageBookings: true,
      canImportExportData: true,
      canResetData: false,
    },
  },
  contributor: {
    label: 'Drafting Contributor',
    description: 'Create and draft content. Cannot publish live, delete records, or modify site configuration.',
    privileges: {
      canEditContent: true,
      canPublishContent: false,
      canDeleteContent: false,
      canManageSiteSettings: false,
      canManageUsers: false,
      canManageBookings: false,
      canImportExportData: false,
      canResetData: false,
    },
  },
  booking_manager: {
    label: 'Bookings & EPK Coordinator',
    description: 'Manage speaking inquiries, booking requests, and services. Content editing disabled.',
    privileges: {
      canEditContent: false,
      canPublishContent: false,
      canDeleteContent: false,
      canManageSiteSettings: false,
      canManageUsers: false,
      canManageBookings: true,
      canImportExportData: false,
      canResetData: false,
    },
  },
};

// -------------------------------------------------------------
// WebCrypto PBKDF2 / SHA-256 Implementation
// -------------------------------------------------------------

function generateSalt(): string {
  const bytes = new Uint8Array(16);
  if (typeof window !== 'undefined' && window.crypto) {
    window.crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < 16; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function hashPassword(password: string, salt: string): Promise<string> {
  if (typeof window === 'undefined' || !window.crypto || !window.crypto.subtle) {
    // Basic fallback for non-crypto environments
    let hash = 0;
    const str = `${salt}:${password}`;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(16);
  }

  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );

  const saltBytes = new Uint8Array(
    (salt.match(/.{1,2}/g) || []).map(byte => parseInt(byte, 16))
  );

  const derivedBits = await window.crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: saltBytes,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    256
  );

  return Array.from(new Uint8Array(derivedBits))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// -------------------------------------------------------------
// Audit Logging
// -------------------------------------------------------------

export function getAuditLogs(): SecurityAuditLog[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(AUDIT_LOG_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load audit logs:', e);
    return [];
  }
}

export function logSecurityEvent(
  action: SecurityAuditLog['action'],
  details: string,
  actor?: { id: string; name?: string; displayName?: string } | AdminUser
): void {
  if (typeof window === 'undefined') return;
  try {
    const current = actor || getCurrentAdmin() || { id: 'system', name: 'Security Guard' };
    const logs = getAuditLogs();
    const actorName = 'displayName' in current && current.displayName 
      ? current.displayName 
      : ('name' in current && current.name ? current.name : 'Unknown User');

    const newEntry: SecurityAuditLog = {
      id: 'log_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      timestamp: Date.now(),
      actorId: current.id,
      actorName,
      action,
      details,
    };
    const updatedLogs = [newEntry, ...logs].slice(0, 100); // Keep last 100 events
    localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify(updatedLogs));
  } catch (e) {
    console.error('Failed to record security audit event:', e);
  }
}

// -------------------------------------------------------------
// User Store Initialization & Seed
// -------------------------------------------------------------

async function initializeDefaultUsersIfNeeded(): Promise<StoredAdminUser[]> {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(USERS_STORAGE_KEY);
  if (raw) {
    try {
      const users: StoredAdminUser[] = JSON.parse(raw);
      if (Array.isArray(users) && users.length > 0) return users;
    } catch (e) {
      console.warn('Corrupted user registry, re-initializing safe defaults:', e);
    }
  }

  // Seed default super administrator and editor with salted hashes
  const salt1 = generateSalt();
  const hash1 = await hashPassword('Wanja@2026!Secure', salt1);

  const salt2 = generateSalt();
  const hash2 = await hashPassword('Editor@2026!OneJar', salt2);

  const initialUsers: StoredAdminUser[] = [
    {
      id: 'admin_faith_wanja',
      username: 'faith_wanja',
      email: 'admin@wanjawrites.africa',
      displayName: 'Faith Wanja',
      role: 'super_admin',
      roleLabel: ROLE_PRESETS.super_admin.label,
      privileges: { ...ROLE_PRESETS.super_admin.privileges },
      passwordSalt: salt1,
      passwordHash: hash1,
      createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
      isActive: true,
    },
    {
      id: 'admin_editorial_curator',
      username: 'onejar_curator',
      email: 'editor@onejarpoetry.com',
      displayName: 'Editorial Curator',
      role: 'editor',
      roleLabel: ROLE_PRESETS.editor.label,
      privileges: { ...ROLE_PRESETS.editor.privileges },
      passwordSalt: salt2,
      passwordHash: hash2,
      createdAt: Date.now() - 15 * 24 * 60 * 60 * 1000,
      isActive: true,
    },
  ];

  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initialUsers));
  logSecurityEvent('USER_CREATED', 'Initialized default cryptographic administrator accounts', {
    id: 'system',
    name: 'System Provisioner',
  });
  return initialUsers;
}

export function getStoredAdminUsers(): StoredAdminUser[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse admin users:', e);
    return [];
  }
}

function saveStoredAdminUsers(users: StoredAdminUser[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

// -------------------------------------------------------------
// Brute-force Mitigation & Lockout Tracker
// -------------------------------------------------------------

interface BruteForceRecord {
  failedAttempts: number;
  lockedUntil: number | null;
  lastAttemptTimestamp: number;
}

export function getLockoutStatus(): {
  isLocked: boolean;
  remainingSeconds: number;
  failedAttempts: number;
} {
  if (typeof window === 'undefined') {
    return { isLocked: false, remainingSeconds: 0, failedAttempts: 0 };
  }
  try {
    const raw = localStorage.getItem(BRUTE_FORCE_KEY);
    if (!raw) return { isLocked: false, remainingSeconds: 0, failedAttempts: 0 };
    const record: BruteForceRecord = JSON.parse(raw);
    const now = Date.now();

    if (record.lockedUntil && record.lockedUntil > now) {
      const remainingSeconds = Math.ceil((record.lockedUntil - now) / 1000);
      return { isLocked: true, remainingSeconds, failedAttempts: record.failedAttempts };
    }

    // Lockout has expired; reset
    if (record.lockedUntil && record.lockedUntil <= now) {
      localStorage.removeItem(BRUTE_FORCE_KEY);
      return { isLocked: false, remainingSeconds: 0, failedAttempts: 0 };
    }

    return { isLocked: false, remainingSeconds: 0, failedAttempts: record.failedAttempts };
  } catch {
    return { isLocked: false, remainingSeconds: 0, failedAttempts: 0 };
  }
}

function registerFailedAttempt(): { isLocked: boolean; remainingSeconds: number; attempts: number } {
  if (typeof window === 'undefined') return { isLocked: false, remainingSeconds: 0, attempts: 1 };
  try {
    const raw = localStorage.getItem(BRUTE_FORCE_KEY);
    const record: BruteForceRecord = raw ? JSON.parse(raw) : { failedAttempts: 0, lockedUntil: null, lastAttemptTimestamp: Date.now() };
    record.failedAttempts += 1;
    record.lastAttemptTimestamp = Date.now();

    if (record.failedAttempts >= MAX_FAILED_ATTEMPTS) {
      record.lockedUntil = Date.now() + LOCKOUT_DURATION_MS;
      localStorage.setItem(BRUTE_FORCE_KEY, JSON.stringify(record));
      return {
        isLocked: true,
        remainingSeconds: Math.ceil(LOCKOUT_DURATION_MS / 1000),
        attempts: record.failedAttempts,
      };
    }

    localStorage.setItem(BRUTE_FORCE_KEY, JSON.stringify(record));
    return {
      isLocked: false,
      remainingSeconds: 0,
      attempts: record.failedAttempts,
    };
  } catch {
    return { isLocked: false, remainingSeconds: 0, attempts: 1 };
  }
}

function resetFailedAttempts() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(BRUTE_FORCE_KEY);
}

// -------------------------------------------------------------
// Session Management
// -------------------------------------------------------------

function notifyAuthChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(AUTH_CHANGE_EVENT));
  }
}

export function getCurrentAdmin(): AdminUser | null {
  if (typeof window === 'undefined') return null;
  try {
    let raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) {
      raw = localStorage.getItem(REMEMBER_KEY);
    }
    if (!raw) return null;

    const session: AdminUser = JSON.parse(raw);
    const now = Date.now();
    if (now - session.loginTimestamp > SESSION_DURATION_MS) {
      logoutAdmin();
      return null;
    }
    return session;
  } catch (err) {
    console.warn('Error reading admin session:', err);
    return null;
  }
}

export function isUserAdmin(): boolean {
  return getCurrentAdmin() !== null;
}

export function hasAdminPrivilege(privilege: keyof AdminPrivileges): boolean {
  const admin = getCurrentAdmin();
  if (!admin) return false;
  return Boolean(admin.privileges[privilege]);
}

// -------------------------------------------------------------
// Authentication Flow
// -------------------------------------------------------------

export async function loginAdmin(
  identifier: string,
  passcode: string,
  rememberMe: boolean = false
): Promise<{ success: boolean; user?: AdminUser; error?: string; remainingAttempts?: number; lockedSeconds?: number }> {
  // Check lockout
  const lockout = getLockoutStatus();
  if (lockout.isLocked) {
    return {
      success: false,
      error: `Security lockout active due to excessive failed attempts. Please retry in ${Math.ceil(lockout.remainingSeconds / 60)} minutes.`,
      lockedSeconds: lockout.remainingSeconds,
    };
  }

  const cleanId = identifier.trim().toLowerCase();
  const cleanPass = passcode.trim();

  if (!cleanId || !cleanPass) {
    return { success: false, error: 'Both username/email and password are required.' };
  }

  // Ensure user registry is ready
  let users = getStoredAdminUsers();
  if (users.length === 0) {
    users = await initializeDefaultUsersIfNeeded();
  }

  // Locate candidate user by username or email
  const user = users.find(
    u => u.username.toLowerCase() === cleanId || u.email.toLowerCase() === cleanId
  );

  if (!user || !user.isActive) {
    const failInfo = registerFailedAttempt();
    logSecurityEvent('LOGIN_FAILURE', `Failed login attempt for unknown or inactive identifier "${cleanId}"`);
    return {
      success: false,
      error: 'Invalid administrator credentials. Access denied.',
      remainingAttempts: Math.max(0, MAX_FAILED_ATTEMPTS - failInfo.attempts),
      lockedSeconds: failInfo.remainingSeconds,
    };
  }

  // Hash input password with user's salt and compare
  const computedHash = await hashPassword(cleanPass, user.passwordSalt);
  if (computedHash !== user.passwordHash) {
    const failInfo = registerFailedAttempt();
    logSecurityEvent('LOGIN_FAILURE', `Invalid password entered for user "${user.username}"`, {
      id: user.id,
      name: user.displayName,
    });
    return {
      success: false,
      error: failInfo.isLocked
        ? `Too many failed attempts. Security lockout enabled for 15 minutes.`
        : `Invalid administrator passcode. ${MAX_FAILED_ATTEMPTS - failInfo.attempts} attempts remaining.`,
      remainingAttempts: Math.max(0, MAX_FAILED_ATTEMPTS - failInfo.attempts),
      lockedSeconds: failInfo.remainingSeconds,
    };
  }

  // Successful authentication
  resetFailedAttempts();

  // Update last login timestamp in stored registry
  user.lastLoginAt = Date.now();
  saveStoredAdminUsers(users);

  const authenticatedUser: AdminUser = {
    id: user.id,
    username: user.username,
    email: user.email,
    displayName: user.displayName,
    role: user.role,
    roleLabel: user.roleLabel,
    privileges: { ...user.privileges },
    token: 'auth_' + generateSalt() + '_' + Date.now().toString(36),
    loginTimestamp: Date.now(),
  };

  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(authenticatedUser));
    sessionStorage.setItem('wanja_admin_authenticated', 'true');

    if (rememberMe) {
      localStorage.setItem(REMEMBER_KEY, JSON.stringify(authenticatedUser));
    } else {
      localStorage.removeItem(REMEMBER_KEY);
    }

    logSecurityEvent('LOGIN_SUCCESS', `Administrator "${user.displayName}" signed into portal`, authenticatedUser);
    notifyAuthChange();
    return { success: true, user: authenticatedUser };
  } catch (err) {
    return { success: false, error: 'Session storage error. Check browser storage permissions.' };
  }
}

export function logoutAdmin(): void {
  if (typeof window === 'undefined') return;
  const current = getCurrentAdmin();
  if (current) {
    logSecurityEvent('LOGOUT', `Administrator "${current.displayName}" signed out`, current);
  }
  try {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem('wanja_admin_authenticated');
    localStorage.removeItem(REMEMBER_KEY);
  } catch (e) {
    console.error(e);
  }
  notifyAuthChange();
}

// -------------------------------------------------------------
// User Management & RBAC Operations (Super Admin Only)
// -------------------------------------------------------------

export interface CreateAdminUserParams {
  username: string;
  email: string;
  displayName: string;
  role: AdminRole;
  customPrivileges?: Partial<AdminPrivileges>;
  initialPassword?: string;
}

export async function addAdminUser(
  params: CreateAdminUserParams,
  actingAdmin: AdminUser
): Promise<{ success: boolean; error?: string; user?: StoredAdminUser; temporaryPassword?: string }> {
  if (!actingAdmin.privileges.canManageUsers) {
    return { success: false, error: 'Insufficient privilege: You cannot create administrative accounts.' };
  }

  const users = getStoredAdminUsers();
  const cleanUser = params.username.trim().toLowerCase();
  const cleanEmail = params.email.trim().toLowerCase();

  if (!cleanUser || !cleanEmail || !params.displayName.trim()) {
    return { success: false, error: 'Username, email, and display name are all required.' };
  }

  if (users.some(u => u.username.toLowerCase() === cleanUser)) {
    return { success: false, error: `Username "${cleanUser}" is already taken.` };
  }

  if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
    return { success: false, error: `Email "${cleanEmail}" is already registered.` };
  }

  const tempPassword = params.initialPassword || generateTemporaryPassword();
  if (tempPassword.length < 8) {
    return { success: false, error: 'Password must be at least 8 characters long.' };
  }

  const salt = generateSalt();
  const hash = await hashPassword(tempPassword, salt);
  const rolePreset = ROLE_PRESETS[params.role];

  const newUser: StoredAdminUser = {
    id: 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    username: cleanUser,
    email: cleanEmail,
    displayName: params.displayName.trim(),
    role: params.role,
    roleLabel: rolePreset.label,
    privileges: {
      ...rolePreset.privileges,
      ...(params.customPrivileges || {}),
    },
    passwordSalt: salt,
    passwordHash: hash,
    createdAt: Date.now(),
    isActive: true,
  };

  users.push(newUser);
  saveStoredAdminUsers(users);

  logSecurityEvent(
    'USER_CREATED',
    `Created new account "${newUser.username}" with role "${newUser.roleLabel}"`,
    actingAdmin
  );
  notifyAuthChange();

  return { success: true, user: newUser, temporaryPassword: tempPassword };
}

export function updateAdminUserPrivileges(
  userId: string,
  updates: {
    role?: AdminRole;
    privileges?: Partial<AdminPrivileges>;
    isActive?: boolean;
    displayName?: string;
  },
  actingAdmin: AdminUser
): { success: boolean; error?: string } {
  if (!actingAdmin.privileges.canManageUsers) {
    return { success: false, error: 'Insufficient privilege: You cannot edit user permissions.' };
  }

  const users = getStoredAdminUsers();
  const targetIndex = users.findIndex(u => u.id === userId);
  if (targetIndex === -1) {
    return { success: false, error: 'User not found in registry.' };
  }

  const target = users[targetIndex];

  // Safeguard: Do not allow deactivating or stripping super admin from the last remaining super admin
  if (target.role === 'super_admin' && (updates.isActive === false || updates.role !== 'super_admin')) {
    const superAdmins = users.filter(u => u.role === 'super_admin' && u.isActive);
    if (superAdmins.length <= 1 && superAdmins[0].id === target.id) {
      return { success: false, error: 'Cannot deactivate or demote the system\'s sole active Super Administrator.' };
    }
  }

  if (updates.role && updates.role !== target.role) {
    target.role = updates.role;
    target.roleLabel = ROLE_PRESETS[updates.role].label;
    target.privileges = {
      ...ROLE_PRESETS[updates.role].privileges,
      ...(updates.privileges || {}),
    };
  } else if (updates.privileges) {
    target.privileges = {
      ...target.privileges,
      ...updates.privileges,
    };
  }

  if (typeof updates.isActive === 'boolean') {
    target.isActive = updates.isActive;
  }

  if (updates.displayName) {
    target.displayName = updates.displayName.trim();
  }

  users[targetIndex] = target;
  saveStoredAdminUsers(users);

  logSecurityEvent(
    'PERMISSIONS_MODIFIED',
    `Updated privileges and role for user "${target.username}"`,
    actingAdmin
  );
  notifyAuthChange();

  return { success: true };
}

export function deleteAdminUser(
  userId: string,
  actingAdmin: AdminUser
): { success: boolean; error?: string } {
  if (!actingAdmin.privileges.canManageUsers) {
    return { success: false, error: 'Insufficient privilege: You cannot delete administrative accounts.' };
  }

  if (actingAdmin.id === userId) {
    return { success: false, error: 'Security constraint: You cannot delete your currently authenticated account.' };
  }

  const users = getStoredAdminUsers();
  const target = users.find(u => u.id === userId);
  if (!target) {
    return { success: false, error: 'User does not exist.' };
  }

  if (target.role === 'super_admin') {
    const superAdmins = users.filter(u => u.role === 'super_admin' && u.isActive);
    if (superAdmins.length <= 1) {
      return { success: false, error: 'Cannot delete the only remaining Super Administrator account.' };
    }
  }

  const filtered = users.filter(u => u.id !== userId);
  saveStoredAdminUsers(filtered);

  logSecurityEvent(
    'USER_DELETED',
    `Deleted administrative account "${target.username}" (${target.email})`,
    actingAdmin
  );
  notifyAuthChange();

  return { success: true };
}

export async function resetUserPassword(
  userId: string,
  newPassword: string,
  actingAdmin: AdminUser
): Promise<{ success: boolean; error?: string }> {
  if (!actingAdmin.privileges.canManageUsers) {
    return { success: false, error: 'Insufficient privilege: You cannot reset other users\' passwords.' };
  }

  if (newPassword.length < 8) {
    return { success: false, error: 'New password must be at least 8 characters long.' };
  }

  const users = getStoredAdminUsers();
  const targetIndex = users.findIndex(u => u.id === userId);
  if (targetIndex === -1) {
    return { success: false, error: 'User does not exist.' };
  }

  const newSalt = generateSalt();
  const newHash = await hashPassword(newPassword, newSalt);

  users[targetIndex].passwordSalt = newSalt;
  users[targetIndex].passwordHash = newHash;
  saveStoredAdminUsers(users);

  logSecurityEvent(
    'PASSWORD_CHANGED',
    `Administrator reset password for user "${users[targetIndex].username}"`,
    actingAdmin
  );

  return { success: true };
}

export async function changeCurrentPassword(
  oldPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  const current = getCurrentAdmin();
  if (!current) return { success: false, error: 'Not authenticated.' };

  if (newPassword.length < 8) {
    return { success: false, error: 'Password must be at least 8 characters with letters, numbers, or symbols.' };
  }

  const users = getStoredAdminUsers();
  const user = users.find(u => u.id === current.id);
  if (!user) return { success: false, error: 'User profile not found in persistent registry.' };

  const currentHash = await hashPassword(oldPassword, user.passwordSalt);
  if (currentHash !== user.passwordHash) {
    return { success: false, error: 'The existing password you entered is incorrect.' };
  }

  const newSalt = generateSalt();
  const newHash = await hashPassword(newPassword, newSalt);

  user.passwordSalt = newSalt;
  user.passwordHash = newHash;
  saveStoredAdminUsers(users);

  logSecurityEvent('PASSWORD_CHANGED', `User "${current.displayName}" changed their password`, current);
  return { success: true };
}

function generateTemporaryPassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%&*';
  let pwd = '';
  for (let i = 0; i < 12; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pwd;
}

// Auto-seed on initial load
if (typeof window !== 'undefined') {
  initializeDefaultUsersIfNeeded().catch(console.error);
}
