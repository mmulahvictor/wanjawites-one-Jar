import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  getCurrentAdmin, loginAdmin, logoutAdmin, getLockoutStatus, 
  changeCurrentPassword, AUTH_CHANGE_EVENT, AdminUser 
} from '../lib/authService';
import { usePageSeo } from '../lib/usePageSeo';
import { CmsStudioSection } from './CmsStudioSection';
import { Poem, VideoItem } from '../types';
import { 
  Lock, ShieldCheck, KeyRound, AlertCircle, ArrowLeft, 
  LogOut, ExternalLink, ShieldAlert, CheckCircle2, Eye, EyeOff, 
  Clock, Key, X 
} from 'lucide-react';

interface AdminPortalRouteProps {
  onPreviewPoem?: (poem: Poem) => void;
  onPreviewVideo?: (video: VideoItem) => void;
}

export const AdminPortalRoute: React.FC<AdminPortalRouteProps> = ({
  onPreviewPoem,
  onPreviewVideo,
}) => {
  // Ensure search engines never index or crawl this admin view
  usePageSeo({
    title: 'Administrative Studio | Cryptographic Access Restricted',
    isRestrictedAdmin: true,
  });

  const navigate = useNavigate();
  const [admin, setAdmin] = useState<AdminUser | null>(getCurrentAdmin());
  
  // Login form state
  const [identifier, setIdentifier] = useState('');
  const [passcode, setPasscode] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPasscode, setShowPasscode] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lockoutState, setLockoutState] = useState(getLockoutStatus());

  // Self-service Password Change State
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [changePasswordError, setChangePasswordError] = useState<string | null>(null);
  const [changePasswordSuccess, setChangePasswordSuccess] = useState<string | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    const handleAuthUpdate = () => {
      setAdmin(getCurrentAdmin());
      setLockoutState(getLockoutStatus());
    };
    window.addEventListener(AUTH_CHANGE_EVENT, handleAuthUpdate);
    return () => window.removeEventListener(AUTH_CHANGE_EVENT, handleAuthUpdate);
  }, []);

  // Tick down lockout timer if active
  useEffect(() => {
    if (!lockoutState.isLocked) return;
    const interval = setInterval(() => {
      const status = getLockoutStatus();
      setLockoutState(status);
      if (!status.isLocked) {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutState.isLocked]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsSubmitting(true);

    const result = await loginAdmin(identifier, passcode, rememberMe);
    if (result.success && result.user) {
      setAdmin(result.user);
      setIdentifier('');
      setPasscode('');
    } else {
      setLoginError(result.error || 'Invalid administrator credentials. Access denied.');
      setLockoutState(getLockoutStatus());
    }
    setIsSubmitting(false);
  };

  const handleLogout = () => {
    logoutAdmin();
    setAdmin(null);
  };

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangePasswordError(null);
    setChangePasswordSuccess(null);

    if (newPassword !== confirmPassword) {
      setChangePasswordError('New passwords do not match.');
      return;
    }

    if (newPassword.length < 8) {
      setChangePasswordError('New password must be at least 8 characters.');
      return;
    }

    setIsChangingPassword(true);
    const result = await changeCurrentPassword(currentPassword, newPassword);
    setIsChangingPassword(false);

    if (result.success) {
      setChangePasswordSuccess('Password successfully updated! Your cryptographic credentials have been refreshed.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setIsChangePasswordOpen(false);
        setChangePasswordSuccess(null);
      }, 2000);
    } else {
      setChangePasswordError(result.error || 'Failed to update password.');
    }
  };

  // 1. GUEST VIEW: Access Restricted & Cryptographic Login Gate
  if (!admin) {
    return (
      <div className="min-h-[85vh] bg-[#1A1A1A] py-12 px-4 sm:px-6 flex items-center justify-center animate-fadeIn">
        <div className="w-full max-w-lg bg-[#222222] border border-[#333333] rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="p-8 text-center border-b border-[#333333] bg-gradient-to-b from-[#1E1E1E] to-[#222222]">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-2xl bg-[#C83C2E]/15 border border-[#C83C2E]/30 text-[#E88D4D] flex items-center justify-center shadow-inner">
                <Lock className="w-7 h-7" />
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E88D4D]/15 border border-[#E88D4D]/40 text-[#E88D4D] text-[11px] font-bold uppercase tracking-wider mb-2">
              <ShieldAlert className="w-3.5 h-3.5 text-[#E88D4D]" />
              <span>Restricted System • Cryptographic Auth</span>
            </div>

            <h1 className="text-2xl font-serif font-bold text-[#FFFBF5] tracking-wide">
              Administrative Portal
            </h1>
            <p className="text-xs text-stone-400 mt-2 max-w-sm mx-auto leading-relaxed">
              This area requires authenticated administrator credentials for Faith Wanja (One-Jar Poetry) and authorized team members.
            </p>
          </div>

          {/* Login Form */}
          <div className="p-6 sm:p-8 space-y-6">
            {lockoutState.isLocked && (
              <div className="p-4 rounded-xl bg-amber-950/80 border border-amber-800/80 text-amber-200 text-xs flex items-start gap-2.5 animate-fadeIn">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 animate-spin" />
                <div>
                  <p className="font-bold">Rate Limit Lockdown Active</p>
                  <p className="text-amber-300 mt-0.5">
                    Too many consecutive failed attempts. Authentication is temporarily locked for{' '}
                    <span className="font-mono font-bold text-white">
                      {Math.floor(lockoutState.remainingSeconds / 60)}m {lockoutState.remainingSeconds % 60}s
                    </span>.
                  </p>
                </div>
              </div>
            )}

            {loginError && !lockoutState.isLocked && (
              <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-800/80 text-red-200 text-xs flex items-start gap-2.5 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Authentication Failed</p>
                  <p className="text-red-300 mt-0.5">{loginError}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Administrator Username or Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    disabled={lockoutState.isLocked || isSubmitting}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. admin@wanjawrites.africa or username"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1A1A] border border-[#3A3A3A] text-white placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#C83C2E] focus:border-transparent transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-stone-300">
                    Administrator Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPasscode(!showPasscode)}
                    className="text-[11px] text-[#E88D4D] hover:text-[#FFAE70] cursor-pointer"
                  >
                    {showPasscode ? 'Hide Password' : 'Show Password'}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPasscode ? 'text' : 'password'}
                    required
                    disabled={lockoutState.isLocked || isSubmitting}
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter security password..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1A1A] border border-[#3A3A3A] text-white placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#C83C2E] focus:border-transparent transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-stone-400 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-stone-700 text-[#C83C2E] focus:ring-[#C83C2E] bg-[#1A1A1A]"
                  />
                  <span>Keep session active for 24h</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={lockoutState.isLocked || isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-[#C83C2E] hover:bg-[#B03225] disabled:bg-stone-700 disabled:cursor-not-allowed text-white font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Clock className="w-4 h-4 animate-spin" />
                    <span>Verifying Cryptographic Hash...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4 text-rose-200" />
                    <span>Verify Credentials & Enter Studio</span>
                  </>
                )}
              </button>
            </form>

            {/* Cryptographic Protection Footnote */}
            <div className="pt-4 border-t border-[#333333] text-center">
              <div className="inline-flex items-center gap-2 text-[11px] text-stone-400 bg-[#1A1A1A] px-3 py-1.5 rounded-lg border border-[#333333]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Protected by WebCrypto PBKDF2 with 100,000 iterations & rate limiting</span>
              </div>
            </div>

            {/* Back to Public Site */}
            <div className="text-center pt-1">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Public Website</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED ADMINISTRATOR VIEW: Privilege Banner + Full CMS Studio
  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Top Privilege & Session Banner */}
      <div className="bg-[#1A1A1A] text-[#FFFBF5] border-b border-[#2A2A2A] px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          
          {/* Admin Identity & Roles */}
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
              admin.role === 'super_admin'
                ? 'bg-[#C83C2E]/25 border border-[#C83C2E]/40 text-[#E88D4D]'
                : 'bg-[#3A6EA5]/25 border border-[#3A6EA5]/40 text-[#3A6EA5]'
            }`}>
              {admin.displayName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">{admin.displayName}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  admin.role === 'super_admin' 
                    ? 'bg-[#C83C2E]/20 text-[#E88D4D] border border-[#C83C2E]/40' 
                    : 'bg-[#3A6EA5]/20 text-[#3A6EA5] border border-[#3A6EA5]/40'
                }`}>
                  {admin.roleLabel}
                </span>
              </div>
              <p className="text-[11px] text-stone-400 flex items-center gap-2 mt-0.5">
                <span>{admin.email}</span>
                <span>•</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Authenticated Privileges Active
                </span>
              </p>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center gap-2.5 self-end md:self-auto">
            <button
              onClick={() => {
                setIsChangePasswordOpen(true);
                setChangePasswordError(null);
                setChangePasswordSuccess(null);
              }}
              className="px-3 py-1.5 rounded-lg bg-[#2A2A2A] hover:bg-[#333333] text-xs font-semibold text-stone-200 flex items-center gap-1.5 transition-colors border border-[#3A3A3A] cursor-pointer"
              title="Change your administrator password"
            >
              <Key className="w-3.5 h-3.5 text-[#E88D4D]" />
              <span>Change Password</span>
            </button>

            <Link
              to="/"
              className="px-3 py-1.5 rounded-lg bg-[#2A2A2A] hover:bg-[#333333] text-xs font-semibold text-stone-200 flex items-center gap-1.5 transition-colors border border-[#3A3A3A]"
            >
              <span>View Site</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-800 text-xs font-semibold text-red-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main CMS Management Studio with Granular RBAC */}
      <CmsStudioSection
        onNavigateTab={(tab) => {
          if (tab === 'home') navigate('/');
          else if (tab === 'poetry') navigate('/poetry');
          else if (tab === 'writing') navigate('/writing');
          else if (tab === 'about') navigate('/about');
          else if (tab === 'work-with-wanja') navigate('/services');
          else if (tab === 'videos') navigate('/videos');
          else if (tab === 'contact') navigate('/contact');
          else if (tab === 'style-guide') navigate('/style-guide');
        }}
        onPreviewPoem={onPreviewPoem}
        onPreviewVideo={onPreviewVideo}
      />

      {/* Change Password Modal */}
      {isChangePasswordOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#FFFBF5] rounded-2xl border border-[#E8DFD0] shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8DFD0] pb-3">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-[#C83C2E]" />
                <h3 className="font-serif font-bold text-lg text-stone-900">Change Your Password</h3>
              </div>
              <button
                onClick={() => setIsChangePasswordOpen(false)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {changePasswordSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{changePasswordSuccess}</span>
              </div>
            )}

            {changePasswordError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-fadeIn">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{changePasswordError}</span>
              </div>
            )}

            <form onSubmit={handleChangePasswordSubmit} className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-bold text-stone-700">Existing Password</label>
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="text-[10px] text-stone-500 cursor-pointer"
                  >
                    {showCurrentPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password..."
                  className="w-full px-3 py-2 rounded-xl border border-[#E8DFD0] bg-[#FAF5ED] focus:bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-bold text-stone-700">New Password</label>
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="text-[10px] text-stone-500 cursor-pointer"
                  >
                    {showNewPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min 8 chars)..."
                  className="w-full px-3 py-2 rounded-xl border border-[#E8DFD0] bg-[#FAF5ED] focus:bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password..."
                  className="w-full px-3 py-2 rounded-xl border border-[#E8DFD0] bg-[#FAF5ED] focus:bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#E8DFD0]">
                <button
                  type="button"
                  onClick={() => setIsChangePasswordOpen(false)}
                  className="px-3.5 py-2 rounded-xl border border-[#E8DFD0] hover:bg-stone-100 text-stone-600 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isChangingPassword}
                  className="px-4 py-2 rounded-xl bg-[#C83C2E] hover:bg-[#B03225] text-white font-bold cursor-pointer"
                >
                  {isChangingPassword ? 'Hashing...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
