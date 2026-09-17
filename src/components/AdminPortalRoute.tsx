import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  getCurrentAdmin, loginAdmin, logoutAdmin, AUTH_CHANGE_EVENT, AdminUser 
} from '../lib/authService';
import { usePageSeo } from '../lib/usePageSeo';
import { CmsStudioSection } from './CmsStudioSection';
import { Poem, VideoItem } from '../types';
import { 
  Lock, ShieldCheck, KeyRound, AlertCircle, ArrowLeft, 
  LogOut, ExternalLink, ShieldAlert, CheckCircle2, UserCheck, Sparkles 
} from 'lucide-react';
import { OneJarLogo } from './OneJarLogo';

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
    title: 'Administrative Studio | Access Restricted',
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

  useEffect(() => {
    const handleAuthUpdate = () => {
      setAdmin(getCurrentAdmin());
    };
    window.addEventListener(AUTH_CHANGE_EVENT, handleAuthUpdate);
    return () => window.removeEventListener(AUTH_CHANGE_EVENT, handleAuthUpdate);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsSubmitting(true);

    const result = loginAdmin(identifier, passcode, rememberMe);
    if (result.success && result.user) {
      setAdmin(result.user);
      setIdentifier('');
      setPasscode('');
    } else {
      setLoginError(result.error || 'Invalid administrator credentials. Access denied.');
    }
    setIsSubmitting(false);
  };

  const handleQuickLogin = (userType: 'super_admin' | 'editor') => {
    if (userType === 'super_admin') {
      const result = loginAdmin('admin@wanjawrites.africa', 'wanja2026', true);
      if (result.success && result.user) setAdmin(result.user);
    } else {
      const result = loginAdmin('editor@onejarpoetry.com', 'editor2026', true);
      if (result.success && result.user) setAdmin(result.user);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setAdmin(null);
  };

  // 1. GUEST VIEW: Access Restricted & Login Gate
  if (!admin) {
    return (
      <div className="min-h-[85vh] bg-slate-900 py-12 px-4 sm:px-6 flex items-center justify-center animate-fadeIn">
        <div className="w-full max-w-lg bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="p-8 text-center border-b border-slate-800/80 bg-linear-to-b from-slate-900 to-slate-950">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shadow-inner">
                <Lock className="w-7 h-7" />
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-2">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Restricted System • No Guest Access</span>
            </div>

            <h1 className="text-2xl font-serif font-bold text-white tracking-wide">
              Administrative Portal
            </h1>
            <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed">
              This area requires verified administrator privileges for Faith Wanja (One-Jar Poetry) and authorized site editors.
            </p>
          </div>

          {/* Login Form */}
          <div className="p-6 sm:p-8 space-y-6">
            {loginError && (
              <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-800/80 text-red-200 text-xs flex items-start gap-2.5 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Privilege Verification Failed</p>
                  <p className="text-red-300 mt-0.5">{loginError}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Administrator Username or Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. admin@wanjawrites.africa or wanja"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Administrator Passcode / Secret PIN
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPasscode(!showPasscode)}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300"
                  >
                    {showPasscode ? 'Hide PIN' : 'Show PIN'}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPasscode ? 'text' : 'password'}
                    required
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter security passcode..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-900"
                  />
                  <span>Keep session active for 24h</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <KeyRound className="w-4 h-4 text-indigo-200" />
                <span>Verify Credentials & Enter Studio</span>
              </button>
            </form>

            {/* Authorized Roles & Quick Sign-In */}
            <div className="pt-4 border-t border-slate-800/80">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                <span>Authorized Administrator Profiles</span>
                <span className="text-[10px] text-indigo-400">Select to Pre-fill</span>
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('super_admin')}
                  className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 text-left transition-all group"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 group-hover:text-indigo-200">
                    <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Faith Wanja</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Super Admin • Full Privileges</div>
                  <div className="text-[9px] text-slate-500 font-mono mt-1">PIN: wanja2026</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('editor')}
                  className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 text-left transition-all group"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-200 group-hover:text-white">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Curator Editor</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Content Curator • Edit/Draft</div>
                  <div className="text-[9px] text-slate-500 font-mono mt-1">PIN: editor2026</div>
                </button>
              </div>
            </div>

            {/* Back to Public Site */}
            <div className="text-center pt-2">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
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
      <div className="bg-slate-900 text-white border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          
          {/* Admin Identity & Roles */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-400 flex items-center justify-center font-bold text-sm">
              FW
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">{admin.displayName}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  admin.role === 'super_admin' 
                    ? 'bg-indigo-950 text-indigo-300 border border-indigo-700/80' 
                    : 'bg-emerald-950 text-emerald-300 border border-emerald-700/80'
                }`}>
                  {admin.roleLabel}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                <span>{admin.email}</span>
                <span>•</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Privileged Session Active
                </span>
              </p>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <Link
              to="/"
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors border border-slate-700"
            >
              <span>View Public Site</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
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

      {/* Main CMS Management Studio */}
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
    </div>
  );
};
