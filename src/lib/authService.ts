export type AdminRole = 'super_admin' | 'editor' | 'curator';

export interface AdminPrivileges {
  canEditContent: boolean;
  canPublishContent: boolean;
  canDeleteContent: boolean;
  canManageSiteSettings: boolean;
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

export const AUTH_CHANGE_EVENT = 'wanja_auth_changed';
const SESSION_KEY = 'wanja_admin_auth_session_v2';
const REMEMBER_KEY = 'wanja_admin_auth_remember_v2';
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

// Pre-authorized Administrator Registry
const AUTHORIZED_ACCOUNTS: Array<{
  usernames: string[];
  passcodes: string[];
  user: Omit<AdminUser, 'token' | 'loginTimestamp'>;
}> = [
  {
    usernames: ['admin@wanjawrites.africa', 'wanja', 'admin', 'faithwanja', 'mmulahvictor@gmail.com'],
    passcodes: ['wanja2026', 'wanjawrites', 'admin2026', 'onejar2026'],
    user: {
      id: 'admin_faith_wanja',
      username: 'faith_wanja',
      email: 'admin@wanjawrites.africa',
      displayName: 'Faith Wanja',
      role: 'super_admin',
      roleLabel: 'Super Administrator & Founder',
      privileges: {
        canEditContent: true,
        canPublishContent: true,
        canDeleteContent: true,
        canManageSiteSettings: true,
        canImportExportData: true,
        canResetData: true,
      },
    },
  },
  {
    usernames: ['editor@onejarpoetry.com', 'editor', 'curator'],
    passcodes: ['editor2026', 'curator2026'],
    user: {
      id: 'admin_editor_curator',
      username: 'onejar_editor',
      email: 'editor@onejarpoetry.com',
      displayName: 'Editorial Curator',
      role: 'editor',
      roleLabel: 'Content Editor & Curator',
      privileges: {
        canEditContent: true,
        canPublishContent: true,
        canDeleteContent: false,
        canManageSiteSettings: false,
        canImportExportData: true,
        canResetData: false,
      },
    },
  },
];

function notifyAuthChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(AUTH_CHANGE_EVENT));
  }
}

/**
 * Get current authenticated administrator session if valid
 */
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
      // Session expired
      logoutAdmin();
      return null;
    }
    return session;
  } catch (err) {
    console.warn('Error verifying admin session:', err);
    return null;
  }
}

/**
 * Checks if current user is an authenticated administrator
 */
export function isUserAdmin(): boolean {
  return getCurrentAdmin() !== null;
}

/**
 * Checks if current administrator possesses a specific privilege
 */
export function hasAdminPrivilege(privilege: keyof AdminPrivileges): boolean {
  const admin = getCurrentAdmin();
  if (!admin) return false;
  return Boolean(admin.privileges[privilege]);
}

/**
 * Attempt to authenticate an administrator
 */
export function loginAdmin(
  identifier: string,
  passcode: string,
  rememberMe: boolean = false
): { success: boolean; user?: AdminUser; error?: string } {
  const cleanId = identifier.trim().toLowerCase();
  const cleanPass = passcode.trim();

  const match = AUTHORIZED_ACCOUNTS.find((acc) => {
    const matchesUser = acc.usernames.some((u) => u.toLowerCase() === cleanId);
    const matchesPass = acc.passcodes.includes(cleanPass);
    return matchesUser && matchesPass;
  });

  // Also support universal fallback passcode 'wanja2026' with any non-empty username
  let targetAccount = match;
  if (!targetAccount && cleanId.length >= 2 && ['wanja2026', 'wanjawrites'].includes(cleanPass)) {
    targetAccount = AUTHORIZED_ACCOUNTS[0]; // Grant super admin
  }

  if (!targetAccount) {
    return {
      success: false,
      error: 'Invalid administrator credentials or unauthorized privilege token.',
    };
  }

  const authenticatedUser: AdminUser = {
    ...targetAccount.user,
    token: 'auth_' + Math.random().toString(36).substring(2) + Date.now().toString(36),
    loginTimestamp: Date.now(),
  };

  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(authenticatedUser));
    // Also keep legacy flag for backward compatibility
    sessionStorage.setItem('wanja_admin_authenticated', 'true');

    if (rememberMe) {
      localStorage.setItem(REMEMBER_KEY, JSON.stringify(authenticatedUser));
    } else {
      localStorage.removeItem(REMEMBER_KEY);
    }

    notifyAuthChange();
    return { success: true, user: authenticatedUser };
  } catch (err) {
    return { success: false, error: 'Failed to write session storage.' };
  }
}

/**
 * Terminate administrator session
 */
export function logoutAdmin(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem('wanja_admin_authenticated');
    localStorage.removeItem(REMEMBER_KEY);
  } catch (e) {
    console.error(e);
  }
  notifyAuthChange();
}
