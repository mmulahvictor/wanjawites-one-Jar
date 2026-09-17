import React, { useState, useEffect } from 'react';
import { 
  AdminUser, StoredAdminUser, AdminRole, AdminPrivileges, SecurityAuditLog,
  getStoredAdminUsers, addAdminUser, updateAdminUserPrivileges, deleteAdminUser, 
  resetUserPassword, getAuditLogs, ROLE_PRESETS, AUTH_CHANGE_EVENT
} from '../lib/authService';
import { 
  ShieldCheck, ShieldAlert, UserPlus, UserCheck, KeyRound, Lock, 
  Trash2, Edit3, Check, X, AlertCircle, Copy, CheckCircle2, 
  Clock, Eye, EyeOff, Shield, RefreshCw, UserX, Activity
} from 'lucide-react';

interface UserManagementViewProps {
  currentAdmin: AdminUser;
  onToast: (message: string) => void;
}

export const UserManagementView: React.FC<UserManagementViewProps> = ({
  currentAdmin,
  onToast,
}) => {
  const [users, setUsers] = useState<StoredAdminUser[]>(getStoredAdminUsers());
  const [auditLogs, setAuditLogs] = useState<SecurityAuditLog[]>(getAuditLogs());
  const [activeSubTab, setActiveSubTab] = useState<'users' | 'audit'>('users');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<StoredAdminUser | null>(null);
  const [resettingUser, setResettingUser] = useState<StoredAdminUser | null>(null);
  const [deletingUser, setDeletingUser] = useState<StoredAdminUser | null>(null);
  const [createdCredentialInfo, setCreatedCredentialInfo] = useState<{
    user: StoredAdminUser;
    tempPassword?: string;
  } | null>(null);

  // New User Form State
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newDisplayName, setNewDisplayName] = useState('');
  const [newRole, setNewRole] = useState<AdminRole>('editor');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [customPrivileges, setCustomPrivileges] = useState<AdminPrivileges>(
    ROLE_PRESETS.editor.privileges
  );
  const [isCustomizingPrivileges, setIsCustomizingPrivileges] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Reset Password State
  const [resetNewPass, setResetNewPass] = useState('');
  const [showResetPass, setShowResetPass] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);

  const refreshData = () => {
    setUsers(getStoredAdminUsers());
    setAuditLogs(getAuditLogs());
  };

  useEffect(() => {
    refreshData();
    const handleAuth = () => refreshData();
    window.addEventListener(AUTH_CHANGE_EVENT, handleAuth);
    return () => window.removeEventListener(AUTH_CHANGE_EVENT, handleAuth);
  }, []);

  // Update privilege presets when role changes in Add modal
  const handleRoleChangeInAdd = (role: AdminRole) => {
    setNewRole(role);
    setCustomPrivileges({ ...ROLE_PRESETS[role].privileges });
  };

  const handleOpenAddModal = () => {
    setNewUsername('');
    setNewEmail('');
    setNewDisplayName('');
    setNewRole('editor');
    setNewPassword('');
    setCustomPrivileges({ ...ROLE_PRESETS.editor.privileges });
    setIsCustomizingPrivileges(false);
    setFormError(null);
    setIsAddModalOpen(true);
  };

  const handleSubmitAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const result = await addAdminUser(
      {
        username: newUsername,
        email: newEmail,
        displayName: newDisplayName,
        role: newRole,
        customPrivileges: isCustomizingPrivileges ? customPrivileges : undefined,
        initialPassword: newPassword || undefined,
      },
      currentAdmin
    );

    if (!result.success || !result.user) {
      setFormError(result.error || 'Failed to create user.');
      return;
    }

    setIsAddModalOpen(false);
    setCreatedCredentialInfo({
      user: result.user,
      tempPassword: result.temporaryPassword,
    });
    refreshData();
    onToast(`Administrative user "${result.user.displayName}" created with role "${result.user.roleLabel}".`);
  };

  const handleSaveEditedUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    const result = updateAdminUserPrivileges(
      editingUser.id,
      {
        displayName: editingUser.displayName,
        role: editingUser.role,
        privileges: editingUser.privileges,
        isActive: editingUser.isActive,
      },
      currentAdmin
    );

    if (!result.success) {
      alert(result.error || 'Failed to update privileges.');
      return;
    }

    setEditingUser(null);
    refreshData();
    onToast(`Privileges updated for "${editingUser.displayName}".`);
  };

  const handleConfirmDelete = () => {
    if (!deletingUser) return;

    const result = deleteAdminUser(deletingUser.id, currentAdmin);
    if (!result.success) {
      alert(result.error || 'Failed to delete account.');
      return;
    }

    setDeletingUser(null);
    refreshData();
    onToast(`Account "${deletingUser.displayName}" has been permanently removed.`);
  };

  const handleSubmitResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resettingUser) return;
    setResetError(null);

    if (resetNewPass.length < 8) {
      setResetError('New password must be at least 8 characters long.');
      return;
    }

    const result = await resetUserPassword(resettingUser.id, resetNewPass, currentAdmin);
    if (!result.success) {
      setResetError(result.error || 'Failed to reset password.');
      return;
    }

    setResettingUser(null);
    setResetNewPass('');
    refreshData();
    onToast(`Password successfully reset for "${resettingUser.displayName}".`);
  };

  const privilegeDescriptors: Array<{
    key: keyof AdminPrivileges;
    label: string;
    description: string;
  }> = [
    { key: 'canEditContent', label: 'Edit Content', description: 'Create and edit poems, essays, and video catalog' },
    { key: 'canPublishContent', label: 'Publish Live', description: 'Toggle draft status to live public website' },
    { key: 'canDeleteContent', label: 'Delete Records', description: 'Permanently remove poems, articles, and media' },
    { key: 'canManageSiteSettings', label: 'Site Settings', description: 'Modify global site metadata and banners' },
    { key: 'canManageBookings', label: 'Manage Inquiries', description: 'Access and process client booking requests' },
    { key: 'canManageUsers', label: 'Manage Team & RBAC', description: 'Add, revoke, and modify admin privileges' },
    { key: 'canImportExportData', label: 'Backup & Export', description: 'Download JSON snapshots of CMS content' },
    { key: 'canResetData', label: 'Reset System', description: 'Revert content store to factory seed state' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner & Control Bar */}
      <div className="bg-[#1F1F1F] rounded-2xl p-6 sm:p-8 border border-[#333333] text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C83C2E]/20 border border-[#C83C2E]/40 text-[#E88D4D] text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Cryptographic RBAC & Team Management</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFFBF5]">
            Administrative Privileges & Users
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
            Configure access control for Faith Wanja (One-Jar Poetry). Add editors, curators, or booking managers with granular capabilities. All passwords use PBKDF2 WebCrypto salted hashing.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-[#2A2A2A] p-1 rounded-xl border border-[#3A3A3A]">
            <button
              onClick={() => setActiveSubTab('users')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeSubTab === 'users'
                  ? 'bg-[#C83C2E] text-white shadow-xs'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Team Members ({users.length})</span>
            </button>

            <button
              onClick={() => setActiveSubTab('audit')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeSubTab === 'audit'
                  ? 'bg-[#C83C2E] text-white shadow-xs'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Audit Trail ({auditLogs.length})</span>
            </button>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 rounded-xl bg-[#C83C2E] hover:bg-[#B03225] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Team Member</span>
          </button>
        </div>
      </div>

      {/* Sub-tab 1: Users Directory */}
      {activeSubTab === 'users' && (
        <div className="bg-[#FFFBF5] rounded-2xl border border-[#E8DFD0] overflow-hidden shadow-xs">
          <div className="p-5 sm:p-6 border-b border-[#E8DFD0] bg-[#FAF5ED] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">Registered Administrators</h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Each account possesses distinct capabilities. Passwords are saved with 100,000 PBKDF2 iterations and random 16-byte salt.
              </p>
            </div>
            <button
              onClick={refreshData}
              className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-[#C83C2E] font-semibold cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Status</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E8DFD0] bg-stone-50/70 text-stone-600 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4 sm:px-6">Administrator</th>
                  <th className="py-3 px-4">Role & Hierarchy</th>
                  <th className="py-3 px-4">Account Status</th>
                  <th className="py-3 px-4">Granted Capabilities</th>
                  <th className="py-3 px-4">Last Active</th>
                  <th className="py-3 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DFD0]/60">
                {users.map((u) => {
                  const isCurrent = u.id === currentAdmin.id;
                  const enabledPrivileges = Object.entries(u.privileges)
                    .filter(([_, val]) => val === true)
                    .map(([key]) => key);

                  return (
                    <tr key={u.id} className="hover:bg-[#FAF5ED]/50 transition-colors">
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs uppercase ${
                            u.role === 'super_admin'
                              ? 'bg-[#C83C2E]/15 text-[#C83C2E] border border-[#C83C2E]/30'
                              : u.role === 'editor'
                              ? 'bg-[#3A6EA5]/15 text-[#3A6EA5] border border-[#3A6EA5]/30'
                              : 'bg-stone-200 text-stone-700'
                          }`}>
                            {u.displayName.slice(0, 2)}
                          </div>
                          <div>
                            <div className="font-bold text-stone-900 flex items-center gap-1.5">
                              <span>{u.displayName}</span>
                              {isCurrent && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-semibold">
                                  You
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-stone-500 font-mono mt-0.5">
                              @{u.username} • {u.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          u.role === 'super_admin'
                            ? 'bg-[#C83C2E]/10 text-[#C83C2E] border border-[#C83C2E]/30'
                            : u.role === 'editor'
                            ? 'bg-[#3A6EA5]/10 text-[#3A6EA5] border border-[#3A6EA5]/30'
                            : u.role === 'booking_manager'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        }`}>
                          <Shield className="w-3 h-3" />
                          <span>{u.roleLabel}</span>
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        {u.isActive ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 text-[11px] font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-red-600 text-[11px] font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            Suspended
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {enabledPrivileges.map((p) => {
                            const desc = privilegeDescriptors.find((d) => d.key === p);
                            return (
                              <span
                                key={p}
                                className="text-[10px] px-1.5 py-0.5 rounded bg-stone-200/80 text-stone-700 font-medium whitespace-nowrap"
                                title={desc?.description}
                              >
                                {desc?.label || p}
                              </span>
                            );
                          })}
                        </div>
                      </td>

                      <td className="py-4 px-4 text-stone-500 text-[11px]">
                        {u.lastLoginAt ? (
                          <span>{new Date(u.lastLoginAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                        ) : (
                          <span className="text-stone-400 italic">Never</span>
                        )}
                      </td>

                      <td className="py-4 px-4 sm:px-6 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => setEditingUser({ ...u, privileges: { ...u.privileges } })}
                            className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                            title="Edit User & Permissions"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => {
                              setResettingUser(u);
                              setResetNewPass('');
                              setResetError(null);
                            }}
                            className="p-1.5 rounded-lg hover:bg-amber-100 text-stone-600 hover:text-amber-800 transition-colors cursor-pointer"
                            title="Reset User Password"
                          >
                            <KeyRound className="w-3.5 h-3.5" />
                          </button>

                          {!isCurrent && (
                            <button
                              onClick={() => setDeletingUser(u)}
                              className="p-1.5 rounded-lg hover:bg-red-100 text-stone-400 hover:text-red-700 transition-colors cursor-pointer"
                              title="Delete Account"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sub-tab 2: Security Audit Logs */}
      {activeSubTab === 'audit' && (
        <div className="bg-[#FFFBF5] rounded-2xl border border-[#E8DFD0] overflow-hidden shadow-xs">
          <div className="p-5 sm:p-6 border-b border-[#E8DFD0] bg-[#FAF5ED] flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">Security & Privilege Audit Trail</h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Chronological ledger of security events, privilege modifications, logins, and identity changes.
              </p>
            </div>
            <span className="text-xs text-stone-500 font-mono">
              {auditLogs.length} events logged
            </span>
          </div>

          <div className="divide-y divide-[#E8DFD0]/60 max-h-[500px] overflow-y-auto">
            {auditLogs.length === 0 ? (
              <div className="p-8 text-center text-stone-500 text-xs">No audit events recorded yet.</div>
            ) : (
              auditLogs.map((log) => (
                <div key={log.id} className="p-4 sm:px-6 hover:bg-[#FAF5ED]/50 transition-colors flex items-start gap-3">
                  <div className="mt-0.5">
                    {log.action === 'LOGIN_SUCCESS' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    {log.action === 'LOGIN_FAILURE' && <AlertCircle className="w-4 h-4 text-red-600" />}
                    {log.action === 'USER_CREATED' && <UserPlus className="w-4 h-4 text-[#3A6EA5]" />}
                    {log.action === 'USER_DELETED' && <Trash2 className="w-4 h-4 text-red-600" />}
                    {log.action === 'PERMISSIONS_MODIFIED' && <ShieldCheck className="w-4 h-4 text-[#E88D4D]" />}
                    {log.action === 'PASSWORD_CHANGED' && <KeyRound className="w-4 h-4 text-amber-600" />}
                    {log.action === 'LOGOUT' && <Clock className="w-4 h-4 text-stone-400" />}
                  </div>

                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-stone-900 font-mono text-[11px]">{log.action}</span>
                      <span className="text-stone-400 text-[10px]">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-stone-700 mt-0.5">{log.details}</p>
                    <p className="text-stone-400 text-[10px] mt-1">
                      Actor: <span className="font-semibold text-stone-600">{log.actorName}</span>
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ----------------- MODAL: ADD USER ----------------- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-[#FFFBF5] rounded-2xl border border-[#E8DFD0] shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-[#E8DFD0] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#C83C2E]/15 text-[#C83C2E] flex items-center justify-center">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">Add New Administrator</h3>
                  <p className="text-xs text-stone-500">Provision a new account with customized role and privileges</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmitAddUser} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Full Display Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Victor Mulah"
                    value={newDisplayName}
                    onChange={(e) => setNewDisplayName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E8DFD0] bg-[#FAF5ED] focus:bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Login Username</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. vmulah"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_.-]/g, ''))}
                    className="w-full px-3 py-2 rounded-xl border border-[#E8DFD0] bg-[#FAF5ED] focus:bg-white text-stone-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Work Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. victor@example.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8DFD0] bg-[#FAF5ED] focus:bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                />
              </div>

              {/* Role Selection */}
              <div>
                <label className="block font-bold text-stone-700 mb-2">Assigned Role Preset</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(Object.keys(ROLE_PRESETS) as AdminRole[]).map((r) => {
                    const preset = ROLE_PRESETS[r];
                    const isSelected = newRole === r;
                    return (
                      <button
                        key={r}
                        type="button"
                        onClick={() => handleRoleChangeInAdd(r)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#C83C2E] bg-[#C83C2E]/5 shadow-xs'
                            : 'border-[#E8DFD0] bg-[#FAF5ED] hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-bold text-xs ${isSelected ? 'text-[#C83C2E]' : 'text-stone-800'}`}>
                            {preset.label}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#C83C2E]" />}
                        </div>
                        <p className="text-[10px] text-stone-500 leading-tight">
                          {preset.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Granular Privileges Accordion */}
              <div className="border border-[#E8DFD0] rounded-xl p-3 bg-[#FAF5ED]">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-800">Customize Specific Privileges</span>
                  <label className="flex items-center gap-1.5 cursor-pointer text-stone-600 text-[11px]">
                    <input
                      type="checkbox"
                      checked={isCustomizingPrivileges}
                      onChange={(e) => setIsCustomizingPrivileges(e.target.checked)}
                      className="rounded text-[#C83C2E] focus:ring-[#C83C2E]"
                    />
                    <span>Override preset</span>
                  </label>
                </div>

                {isCustomizingPrivileges && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-3 border-t border-[#E8DFD0]">
                    {privilegeDescriptors.map(({ key, label, description }) => (
                      <label key={key} className="flex items-start gap-2 p-1.5 rounded hover:bg-white cursor-pointer">
                        <input
                          type="checkbox"
                          checked={customPrivileges[key]}
                          onChange={(e) =>
                            setCustomPrivileges({
                              ...customPrivileges,
                              [key]: e.target.checked,
                            })
                          }
                          className="mt-0.5 rounded text-[#C83C2E] focus:ring-[#C83C2E]"
                        />
                        <div>
                          <p className="font-semibold text-stone-900">{label}</p>
                          <p className="text-[10px] text-stone-500 leading-tight">{description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Initial Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-stone-700">Initial Password (Optional)</label>
                  <span className="text-[10px] text-stone-500">Leave empty to auto-generate a secure random password</span>
                </div>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="Auto-generated if left blank (min 8 chars)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 pr-10 rounded-xl border border-[#E8DFD0] bg-[#FAF5ED] focus:bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600 cursor-pointer"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E8DFD0]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#E8DFD0] hover:bg-stone-100 font-semibold text-stone-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#C83C2E] hover:bg-[#B03225] text-white font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Create Account</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ----------------- MODAL: CREATED CREDENTIALS VIEW ----------------- */}
      {createdCredentialInfo && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#FFFBF5] rounded-2xl border border-[#E8DFD0] shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-stone-900">Account Ready</h3>
              <p className="text-xs text-stone-500 mt-1">
                Share these initial credentials securely with the team member.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF5ED] border border-[#E8DFD0] space-y-2 font-mono text-xs">
              <div className="flex justify-between py-1 border-b border-[#E8DFD0]">
                <span className="text-stone-500">Username:</span>
                <span className="font-bold text-stone-900">{createdCredentialInfo.user.username}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E8DFD0]">
                <span className="text-stone-500">Email:</span>
                <span className="font-bold text-stone-900">{createdCredentialInfo.user.email}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E8DFD0]">
                <span className="text-stone-500">Role:</span>
                <span className="font-bold text-[#C83C2E]">{createdCredentialInfo.user.roleLabel}</span>
              </div>
              {createdCredentialInfo.tempPassword && (
                <div className="flex items-center justify-between py-1 bg-white p-2 rounded border border-emerald-200">
                  <span className="text-emerald-800 font-sans font-bold">Password:</span>
                  <div className="flex items-center gap-2">
                    <code className="text-[#C83C2E] font-bold text-sm select-all">
                      {createdCredentialInfo.tempPassword}
                    </code>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(createdCredentialInfo.tempPassword || '');
                        onToast('Temporary password copied to clipboard!');
                      }}
                      className="p-1 rounded hover:bg-stone-100 text-stone-500 cursor-pointer"
                      title="Copy password"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setCreatedCredentialInfo(null)}
              className="w-full py-2.5 rounded-xl bg-[#1A1A1A] hover:bg-stone-800 text-white font-bold text-xs cursor-pointer"
            >
              Done & Dismiss
            </button>
          </div>
        </div>
      )}

      {/* ----------------- MODAL: EDIT USER & PRIVILEGES ----------------- */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-[#FFFBF5] rounded-2xl border border-[#E8DFD0] shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-[#E8DFD0] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#3A6EA5]/15 text-[#3A6EA5] flex items-center justify-center">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">Edit User Privileges</h3>
                  <p className="text-xs text-stone-500">{editingUser.displayName} (@{editingUser.username})</p>
                </div>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedUser} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Display Name</label>
                <input
                  type="text"
                  required
                  value={editingUser.displayName}
                  onChange={(e) => setEditingUser({ ...editingUser, displayName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8DFD0] bg-[#FAF5ED] focus:bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Assigned Role</label>
                  <select
                    value={editingUser.role}
                    onChange={(e) => {
                      const newRole = e.target.value as AdminRole;
                      setEditingUser({
                        ...editingUser,
                        role: newRole,
                        roleLabel: ROLE_PRESETS[newRole].label,
                        privileges: { ...ROLE_PRESETS[newRole].privileges },
                      });
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-[#E8DFD0] bg-[#FAF5ED] focus:bg-white text-stone-900 focus:outline-none"
                  >
                    <option value="super_admin">Super Administrator</option>
                    <option value="editor">Senior Content Editor</option>
                    <option value="contributor">Drafting Contributor</option>
                    <option value="booking_manager">Bookings & EPK Coordinator</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Account State</label>
                  <select
                    value={editingUser.isActive ? 'active' : 'suspended'}
                    onChange={(e) => setEditingUser({ ...editingUser, isActive: e.target.value === 'active' })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E8DFD0] bg-[#FAF5ED] focus:bg-white text-stone-900 focus:outline-none"
                  >
                    <option value="active">Active (Access Allowed)</option>
                    <option value="suspended">Suspended (Access Revoked)</option>
                  </select>
                </div>
              </div>

              {/* Granular Capabilities Checklist */}
              <div>
                <label className="block font-bold text-stone-700 mb-2">Granular Capabilities</label>
                <div className="border border-[#E8DFD0] rounded-xl p-3 bg-[#FAF5ED] grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {privilegeDescriptors.map(({ key, label, description }) => (
                    <label key={key} className="flex items-start gap-2 p-1.5 rounded hover:bg-white cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingUser.privileges[key]}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            privileges: {
                              ...editingUser.privileges,
                              [key]: e.target.checked,
                            },
                          })
                        }
                        className="mt-0.5 rounded text-[#C83C2E] focus:ring-[#C83C2E]"
                      />
                      <div>
                        <p className="font-semibold text-stone-900">{label}</p>
                        <p className="text-[10px] text-stone-500 leading-tight">{description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E8DFD0]">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2.5 rounded-xl border border-[#E8DFD0] hover:bg-stone-100 font-semibold text-stone-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#C83C2E] hover:bg-[#B03225] text-white font-bold shadow-md cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ----------------- MODAL: RESET PASSWORD ----------------- */}
      {resettingUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#FFFBF5] rounded-2xl border border-[#E8DFD0] shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8DFD0] pb-3">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-amber-600" />
                <h3 className="font-serif font-bold text-base text-stone-900">Reset User Password</h3>
              </div>
              <button
                onClick={() => setResettingUser(null)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-600">
              Assign a new password for <span className="font-bold">{resettingUser.displayName}</span> (@{resettingUser.username}). This immediately invalidates their old credentials.
            </p>

            {resetError && (
              <div className="p-2.5 rounded-lg bg-red-50 text-red-700 text-xs border border-red-200">
                {resetError}
              </div>
            )}

            <form onSubmit={handleSubmitResetPassword} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">New Password</label>
                <div className="relative">
                  <input
                    type={showResetPass ? 'text' : 'password'}
                    required
                    placeholder="Enter new password (min 8 chars)..."
                    value={resetNewPass}
                    onChange={(e) => setResetNewPass(e.target.value)}
                    className="w-full px-3 py-2 pr-10 rounded-xl border border-[#E8DFD0] bg-[#FAF5ED] focus:bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowResetPass(!showResetPass)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600 cursor-pointer"
                  >
                    {showResetPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setResettingUser(null)}
                  className="px-3 py-2 rounded-xl border border-[#E8DFD0] hover:bg-stone-100 text-stone-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold cursor-pointer"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ----------------- MODAL: DELETE USER CONFIRMATION ----------------- */}
      {deletingUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#FFFBF5] rounded-2xl border border-[#E8DFD0] shadow-2xl max-w-sm w-full p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="font-serif font-bold text-lg text-stone-900">Revoke & Delete User?</h3>
              <p className="text-xs text-stone-600 mt-1">
                Are you sure you want to permanently delete <span className="font-bold">{deletingUser.displayName}</span> (@{deletingUser.username})? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setDeletingUser(null)}
                className="flex-1 py-2.5 rounded-xl border border-[#E8DFD0] hover:bg-stone-100 text-stone-700 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
