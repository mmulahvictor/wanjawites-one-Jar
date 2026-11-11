import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AccessibilitySettings } from '../types';
import { getAccessibilitySettings, saveAccessibilitySettings, A11Y_UPDATE_EVENT } from '../lib/cmsStore';
import { getCurrentAdmin, AUTH_CHANGE_EVENT, AdminUser } from '../lib/authService';
import { ShieldCheck, Eye, Layers, AlignJustify, ZapOff } from 'lucide-react';

export const AccessibilityToolbar: React.FC = () => {
  const [settings, setSettings] = useState<AccessibilitySettings>(getAccessibilitySettings());
  const [adminUser, setAdminUser] = useState<AdminUser | null>(getCurrentAdmin());

  useEffect(() => {
    const handleUpdate = () => {
      const latest = getAccessibilitySettings();
      setSettings(latest);
      applyA11yToDom(latest);
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

  const updateSetting = <K extends keyof AccessibilitySettings>(key: K, val: AccessibilitySettings[K]) => {
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

    // Reduced motion class
    if (stg.reducedMotion) {
      document.body.classList.add('reduced-motion-mode');
    } else {
      document.body.classList.remove('reduced-motion-mode');
    }

    // Line spacing
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

  const cycleLineSpacing = () => {
    const order: AccessibilitySettings['lineSpacing'][] = ['normal', 'relaxed', 'loose'];
    const nextIdx = (order.indexOf(settings.lineSpacing) + 1) % order.length;
    updateSetting('lineSpacing', order[nextIdx]);
  };

  return (
    <>
      {/* WCAG Skip to Main Content Link */}
      <a
        href="#main-content-region"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 z-50 bg-[#D81B7A] text-white font-bold px-4 py-2.5 rounded-full shadow-2xl border-2 border-white focus:outline-none focus:ring-4 focus:ring-[#FFD9E6] text-sm print:hidden"
      >
        Skip to main content (Press Enter)
      </a>

      {/* Top Accessibility Bar */}
      <div className="bg-[#3A1208] text-[#FFF6EC] text-xs py-1.5 px-4 border-b border-[#FFD9E6]/20 flex flex-wrap items-center justify-between gap-2 shadow-inner print:hidden">
        
        {/* Left Badges */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-bold text-[#FFD9E6]">
            <ShieldCheck className="w-4 h-4 text-[#D81B7A]" />
            <span className="hidden sm:inline">WCAG 2.1 AA Compliant</span>
            <span className="sm:hidden">WCAG 2.1 AA</span>
          </span>

          {adminUser && (
            <>
              <span className="text-[#FFF6EC]/30">|</span>
              <Link
                to="/admin"
                className="text-[#FFD9E6] hover:text-white font-bold bg-[#D81B7A]/30 px-2 py-0.5 rounded-full border border-[#D81B7A]/50 flex items-center gap-1 text-[11px]"
              >
                <Layers className="w-3 h-3 text-[#FFD9E6]" />
                <span>Admin Studio ({adminUser.displayName})</span>
              </Link>
            </>
          )}
        </div>

        {/* Right Accessibility Controls */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          
          {/* Font Size Adjusters */}
          <div className="flex items-center bg-[#2B0C04] rounded-full px-2 py-0.5 border border-[#FFD9E6]/20">
            <span className="text-[10px] text-[#FFF6EC]/70 mr-1 font-semibold hidden xs:inline">Font:</span>
            <button
              onClick={() => updateSetting('fontSize', 'normal')}
              aria-pressed={settings.fontSize === 'normal'}
              className={`px-1.5 py-0.5 text-[11px] font-bold rounded-full cursor-pointer ${
                settings.fontSize === 'normal' ? 'bg-[#D81B7A] text-white' : 'text-[#FFF6EC]/70 hover:text-white'
              }`}
              title="Standard Font Size (100%)"
            >
              A
            </button>
            <button
              onClick={() => updateSetting('fontSize', 'large')}
              aria-pressed={settings.fontSize === 'large'}
              className={`px-1.5 py-0.5 text-[11px] font-bold rounded-full cursor-pointer ${
                settings.fontSize === 'large' ? 'bg-[#D81B7A] text-white' : 'text-[#FFF6EC]/70 hover:text-white'
              }`}
              title="Large Font Size (115%)"
            >
              A+
            </button>
            <button
              onClick={() => updateSetting('fontSize', 'xlarge')}
              aria-pressed={settings.fontSize === 'xlarge'}
              className={`px-1.5 py-0.5 text-[11px] font-bold rounded-full cursor-pointer ${
                settings.fontSize === 'xlarge' ? 'bg-[#D81B7A] text-white' : 'text-[#FFF6EC]/70 hover:text-white'
              }`}
              title="Extra Large Font Size (130%)"
            >
              A++
            </button>
          </div>

          {/* Line Spacing Cycler */}
          <button
            onClick={cycleLineSpacing}
            aria-label={`Line spacing: ${settings.lineSpacing}`}
            className={`px-2.5 py-1 rounded-full font-bold text-[11px] transition-colors flex items-center gap-1 border cursor-pointer ${
              settings.lineSpacing !== 'normal'
                ? 'bg-[#D81B7A] text-white border-[#D81B7A]'
                : 'bg-[#2B0C04] text-[#FFF6EC] border-[#FFD9E6]/20 hover:bg-[#3A1208]'
            }`}
            title="Cycle Line Spacing"
          >
            <AlignJustify className="w-3.5 h-3.5" />
            <span className="hidden md:inline">
              Spacing: {settings.lineSpacing === 'normal' ? '1.6x' : settings.lineSpacing === 'relaxed' ? '1.8x' : '2.1x'}
            </span>
          </button>

          {/* Reduced Motion Toggle */}
          <button
            onClick={() => updateSetting('reducedMotion', !settings.reducedMotion)}
            aria-pressed={settings.reducedMotion}
            className={`px-2.5 py-1 rounded-full font-bold text-[11px] transition-colors flex items-center gap-1 border cursor-pointer ${
              settings.reducedMotion
                ? 'bg-[#D81B7A] text-white border-[#D81B7A]'
                : 'bg-[#2B0C04] text-[#FFF6EC] border-[#FFD9E6]/20 hover:bg-[#3A1208]'
            }`}
            title="Toggle Reduced Motion"
          >
            <ZapOff className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{settings.reducedMotion ? 'Motion OFF' : 'Motion'}</span>
          </button>

          {/* High Contrast Toggle */}
          <button
            onClick={() => updateSetting('highContrast', !settings.highContrast)}
            aria-pressed={settings.highContrast}
            className={`px-2.5 py-1 rounded-full font-bold text-[11px] transition-colors flex items-center gap-1 border cursor-pointer ${
              settings.highContrast
                ? 'bg-[#D81B7A] text-white border-[#D81B7A]'
                : 'bg-[#2B0C04] text-[#FFF6EC] border-[#FFD9E6]/20 hover:bg-[#3A1208]'
            }`}
            title="Toggle High Contrast Mode"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{settings.highContrast ? 'Contrast ON' : 'Contrast'}</span>
          </button>

        </div>
      </div>
    </>
  );
};
