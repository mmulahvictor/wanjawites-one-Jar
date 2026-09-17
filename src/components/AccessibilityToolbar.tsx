import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AccessibilitySettings } from '../types';
import { getAccessibilitySettings, saveAccessibilitySettings, A11Y_UPDATE_EVENT } from '../lib/cmsStore';
import { getCurrentAdmin, AUTH_CHANGE_EVENT, AdminUser } from '../lib/authService';
import { ShieldCheck, Eye, Layers } from 'lucide-react';

export const AccessibilityToolbar: React.FC = () => {
  const [settings, setSettings] = useState<AccessibilitySettings>(getAccessibilitySettings());
  const [adminUser, setAdminUser] = useState<AdminUser | null>(getCurrentAdmin());

  useEffect(() => {
    const handleUpdate = () => {
      setSettings(getAccessibilitySettings());
    };
    const handleAuth = () => {
      setAdminUser(getCurrentAdmin());
    };
    window.addEventListener(A11Y_UPDATE_EVENT, handleUpdate);
    window.addEventListener(AUTH_CHANGE_EVENT, handleAuth);
    return () => {
      window.removeEventListener(A11Y_UPDATE_EVENT, handleUpdate);
      window.removeEventListener(AUTH_CHANGE_EVENT, handleAuth);
    };
  }, []);

  const updateSetting = (key: keyof AccessibilitySettings, val: any) => {
    const updated = { ...settings, [key]: val };
    setSettings(updated);
    saveAccessibilitySettings(updated);
    applyA11yToDom(updated);
  };

  const applyA11yToDom = (stg: AccessibilitySettings) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    // Font size scaling
    if (stg.fontSize === 'large') {
      root.style.fontSize = '18px';
    } else if (stg.fontSize === 'xlarge') {
      root.style.fontSize = '20px';
    } else {
      root.style.fontSize = '16px';
    }

    // High contrast class
    if (stg.highContrast) {
      document.body.classList.add('high-contrast-mode');
    } else {
      document.body.classList.remove('high-contrast-mode');
    }

    // Line spacing class
    if (stg.lineSpacing === 'relaxed') {
      document.body.style.lineHeight = '1.8';
    } else if (stg.lineSpacing === 'loose') {
      document.body.style.lineHeight = '2.1';
    } else {
      document.body.style.lineHeight = '1.6';
    }
  };

  useEffect(() => {
    applyA11yToDom(settings);
  }, []);

  return (
    <>
      {/* WCAG Skip to Main Content Link (Keyboard Accessibility) */}
      <a
        href="#main-content-region"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 z-50 bg-indigo-700 text-white font-bold px-4 py-2.5 rounded-lg shadow-2xl border-2 border-white focus:outline-none focus:ring-4 focus:ring-amber-300 text-sm"
      >
        Skip to main content (Press Enter)
      </a>

      {/* Top Accessibility Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 shadow-inner">
        
        {/* Left Badges */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-bold text-indigo-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">WCAG 2.1 AA Compliant Experience</span>
            <span className="sm:hidden">WCAG 2.1 AA</span>
          </span>

          {/* Admin link ONLY displayed if administrator session is verified */}
          {adminUser && (
            <>
              <span className="text-slate-600">|</span>
              <Link
                to="/admin"
                className="text-amber-300 hover:text-amber-200 font-bold bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800 flex items-center gap-1 text-[11px]"
              >
                <Layers className="w-3 h-3 text-amber-400" />
                <span>Admin Studio ({adminUser.displayName})</span>
              </Link>
            </>
          )}
        </div>

        {/* Right Accessibility Quick Controls */}
        <div className="flex items-center gap-2">
          
          {/* Font Size Adjusters */}
          <div className="flex items-center bg-slate-800 rounded px-1.5 py-0.5 border border-slate-700">
            <span className="text-[10px] text-slate-400 mr-1 font-semibold">Font:</span>
            <button
              onClick={() => updateSetting('fontSize', 'normal')}
              className={`px-1.5 py-0.5 text-[11px] font-bold rounded cursor-pointer ${
                settings.fontSize === 'normal' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
              }`}
              title="Standard Font Size (100%)"
            >
              A
            </button>
            <button
              onClick={() => updateSetting('fontSize', 'large')}
              className={`px-1.5 py-0.5 text-[11px] font-bold rounded cursor-pointer ${
                settings.fontSize === 'large' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
              }`}
              title="Large Font Size (115%)"
            >
              A+
            </button>
            <button
              onClick={() => updateSetting('fontSize', 'xlarge')}
              className={`px-1.5 py-0.5 text-[11px] font-bold rounded cursor-pointer ${
                settings.fontSize === 'xlarge' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
              }`}
              title="Extra Large Font Size (130%)"
            >
              A++
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            onClick={() => updateSetting('highContrast', !settings.highContrast)}
            className={`px-2.5 py-1 rounded font-bold text-[11px] transition-colors flex items-center gap-1 border cursor-pointer ${
              settings.highContrast
                ? 'bg-amber-400 text-slate-950 border-amber-300'
                : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
            }`}
            title="Toggle High Contrast Mode (WCAG AAA)"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{settings.highContrast ? 'Contrast ON' : 'Contrast'}</span>
          </button>

        </div>
      </div>
    </>
  );
};
