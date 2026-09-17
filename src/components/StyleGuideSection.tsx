import React, { useState } from 'react';
import { 
  Palette, Type, CheckCircle, AlertTriangle, XCircle, 
  Sparkles, Eye, ShieldCheck, Sun, Moon, Volume2, 
  Layers, Smartphone, Monitor, Code, HelpCircle, CornerDownRight
} from 'lucide-react';

export const StyleGuideSection: React.FC = () => {
  // WCAG Color Contrast Checker State
  const [fgColor, setFgColor] = useState('#1A1A1A'); // Brand Black
  const [bgColor, setBgColor] = useState('#FFFBF5'); // Brand Warm White
  const [sampleText, setSampleText] = useState('Accessible Spoken Word Literature');
  const [fontSizePx, setFontSizePx] = useState(16);

  // Screen Reader Live Region Test
  const [liveAnnouncement, setLiveAnnouncement] = useState('');

  // Helper function to calculate relative luminance
  const getLuminance = (hex: string) => {
    let color = hex.replace('#', '');
    if (color.length === 3) {
      color = color.split('').map(c => c + c).join('');
    }
    const r = parseInt(color.substring(0, 2), 16) / 255;
    const g = parseInt(color.substring(2, 4), 16) / 255;
    const b = parseInt(color.substring(4, 6), 16) / 255;

    const a = [r, g, b].map(v => {
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });

    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const getContrastRatio = (c1: string, c2: string) => {
    try {
      const l1 = getLuminance(c1);
      const l2 = getLuminance(c2);
      const brighter = Math.max(l1, l2);
      const darker = Math.min(l1, l2);
      return (brighter + 0.05) / (darker + 0.05);
    } catch {
      return 1;
    }
  };

  const ratio = getContrastRatio(fgColor, bgColor);
  const ratioFormatted = ratio.toFixed(2);

  const passesAANormal = ratio >= 4.5;
  const passesAALarge = ratio >= 3.0;
  const passesAAANormal = ratio >= 7.0;
  const passesAAALarge = ratio >= 4.5;

  const triggerLiveAnnouncement = (text: string) => {
    setLiveAnnouncement(text);
    setTimeout(() => setLiveAnnouncement(''), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-24">
      
      {/* Screen Reader Live Region */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      >
        {liveAnnouncement}
      </div>

      {/* Hero Header */}
      <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#1A1A1A] via-[#2A2A2A] to-[#1A1A1A] text-[#FFFBF5] space-y-4 border border-[#333333] shadow-xl">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#E88D4D] bg-[#E88D4D]/10 px-3 py-1 rounded-full border border-[#E88D4D]/30">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>WCAG 2.1 AA / AAA Standard · Brand Palette & Design System</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#FFFBF5]">
          Accessible UI/UX Design System
        </h1>
        <p className="text-sm sm:text-base text-stone-300 max-w-3xl leading-relaxed">
          Comprehensive style guide and interactive Web Content Accessibility Guidelines (WCAG) studio. Built to ensure equal access, high color contrast, fluid responsive layouts, keyboard focus visibility, and screen reader compatibility across the brand palette: Red (#C83C2E), Blue (#3A6EA5), Orange (#E88D4D), Black (#1A1A1A), and Warm White (#FFFBF5).
        </p>

        {/* Quick Spec Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#333333] text-xs">
          <div className="bg-[#242424] p-3 rounded-xl border border-[#3A3A3A]">
            <span className="text-stone-400 block font-medium">Minimum Contrast</span>
            <span className="text-[#FFFBF5] font-bold text-base">4.5:1 (AA) / 7.0:1 (AAA)</span>
          </div>
          <div className="bg-[#242424] p-3 rounded-xl border border-[#3A3A3A]">
            <span className="text-stone-400 block font-medium">Touch Target Size</span>
            <span className="text-[#FFFBF5] font-bold text-base">≥ 44px × 44px</span>
          </div>
          <div className="bg-[#242424] p-3 rounded-xl border border-[#3A3A3A]">
            <span className="text-stone-400 block font-medium">Base Typography</span>
            <span className="text-[#FFFBF5] font-bold text-base">16px (1rem) / 1.6 lh</span>
          </div>
          <div className="bg-[#242424] p-3 rounded-xl border border-[#3A3A3A]">
            <span className="text-stone-400 block font-medium">Keyboard Navigation</span>
            <span className="text-[#FFFBF5] font-bold text-base">Visible Focus Rings</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: INTERACTIVE WCAG COLOR CONTRAST CHECKER */}
      <section className="bg-[#FFFBF5] rounded-2xl p-6 sm:p-8 border border-[#E8DFD0] shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-[#E8DFD0] pb-4">
          <div className="w-10 h-10 rounded-xl bg-[#C83C2E]/10 text-[#C83C2E] flex items-center justify-center font-bold">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
              Interactive WCAG Color Contrast Calculator
            </h2>
            <p className="text-xs text-stone-500">
              Test any foreground text and background color combination against Web Content Accessibility Guidelines.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Controls */}
          <div className="md:col-span-5 space-y-5 text-xs">
            <div>
              <label className="block font-bold text-[#1A1A1A] mb-1">
                Text Foreground Color (HEX)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border border-[#E8DFD0] p-1 bg-white"
                />
                <input
                  type="text"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-white border border-[#E8DFD0] font-mono text-[#1A1A1A] uppercase font-semibold focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#1A1A1A] mb-1">
                Container Background Color (HEX)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border border-[#E8DFD0] p-1 bg-white"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-white border border-[#E8DFD0] font-mono text-[#1A1A1A] uppercase font-semibold focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#1A1A1A] mb-1">
                Sample Text & Font Size ({fontSizePx}px)
              </label>
              <input
                type="text"
                value={sampleText}
                onChange={(e) => setSampleText(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#E8DFD0] text-[#1A1A1A] mb-2 focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
              />
              <input
                type="range"
                min="12"
                max="48"
                value={fontSizePx}
                onChange={(e) => setFontSizePx(parseInt(e.target.value))}
                className="w-full accent-[#C83C2E]"
              />
            </div>

            {/* Presets */}
            <div>
              <span className="block font-bold text-[#1A1A1A] mb-2">Preset Brand Swatches</span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => { setFgColor('#1A1A1A'); setBgColor('#FFFBF5'); }}
                  className="px-2.5 py-1 rounded bg-[#1A1A1A] text-[#FFFBF5] text-[11px] font-medium border border-[#333333] cursor-pointer"
                >
                  Black on Warm White
                </button>
                <button
                  onClick={() => { setFgColor('#C83C2E'); setBgColor('#FFFBF5'); }}
                  className="px-2.5 py-1 rounded bg-[#C83C2E] text-white text-[11px] font-medium cursor-pointer"
                >
                  Brand Red on Warm White
                </button>
                <button
                  onClick={() => { setFgColor('#FFFBF5'); setBgColor('#1A1A1A'); }}
                  className="px-2.5 py-1 rounded bg-[#FFFBF5] text-[#1A1A1A] text-[11px] font-medium border border-[#E8DFD0] cursor-pointer"
                >
                  Warm White on Black
                </button>
                <button
                  onClick={() => { setFgColor('#3A6EA5'); setBgColor('#FFFBF5'); }}
                  className="px-2.5 py-1 rounded bg-[#3A6EA5] text-white text-[11px] font-medium cursor-pointer"
                >
                  Brand Blue on Warm White
                </button>
                <button
                  onClick={() => { setFgColor('#E88D4D'); setBgColor('#1A1A1A'); }}
                  className="px-2.5 py-1 rounded bg-[#1A1A1A] text-[#E88D4D] text-[11px] font-medium border border-[#E88D4D]/40 cursor-pointer"
                >
                  Brand Orange on Black
                </button>
              </div>
            </div>
          </div>

          {/* Live Result Display */}
          <div className="md:col-span-7 space-y-6">
            
            {/* Live Render Box */}
            <div 
              style={{ backgroundColor: bgColor, color: fgColor }}
              className="p-8 rounded-2xl border border-[#E8DFD0] min-h-[160px] flex items-center justify-center transition-all shadow-inner"
            >
              <p style={{ fontSize: `${fontSizePx}px` }} className="font-serif font-bold text-center leading-tight">
                {sampleText || 'Sample Poetic Line'}
              </p>
            </div>

            {/* Scoreboard */}
            <div className="p-6 rounded-2xl bg-[#FAF5ED] border border-[#E8DFD0] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-700 uppercase">Calculated Contrast Ratio</span>
                <span className="font-mono text-2xl font-extrabold text-[#1A1A1A]">
                  {ratioFormatted} : 1
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className={`p-3 rounded-xl border flex items-center gap-2 ${
                  passesAANormal ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
                }`}>
                  {passesAANormal ? <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /> : <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                  <div>
                    <span className="font-bold block">WCAG AA Normal Text</span>
                    <span className="text-[10px] opacity-80">Req: 4.5:1</span>
                  </div>
                </div>

                <div className={`p-3 rounded-xl border flex items-center gap-2 ${
                  passesAALarge ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
                }`}>
                  {passesAALarge ? <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /> : <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                  <div>
                    <span className="font-bold block">WCAG AA Large Text</span>
                    <span className="text-[10px] opacity-80">Req: 3.0:1</span>
                  </div>
                </div>

                <div className={`p-3 rounded-xl border flex items-center gap-2 ${
                  passesAAANormal ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
                }`}>
                  {passesAAANormal ? <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /> : <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                  <div>
                    <span className="font-bold block">WCAG AAA Normal</span>
                    <span className="text-[10px] opacity-80">Req: 7.0:1</span>
                  </div>
                </div>

                <div className={`p-3 rounded-xl border flex items-center gap-2 ${
                  passesAAALarge ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
                }`}>
                  {passesAAALarge ? <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /> : <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                  <div>
                    <span className="font-bold block">WCAG AAA Large</span>
                    <span className="text-[10px] opacity-80">Req: 4.5:1</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 2: TYPOGRAPHY SYSTEM & FONT SCALE */}
      <section className="bg-[#FFFBF5] rounded-2xl p-6 sm:p-8 border border-[#E8DFD0] shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-[#E8DFD0] pb-4">
          <div className="w-10 h-10 rounded-xl bg-[#3A6EA5]/10 text-[#3A6EA5] flex items-center justify-center font-bold">
            <Type className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
              Typography Scale & Font Pairings
            </h2>
            <p className="text-xs text-stone-500">
              Distinctive typographic hierarchy designed for high readability, mathematical contrast ratios, and comfortable reading.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          
          {/* Display Heading H1 */}
          <div className="p-5 rounded-xl bg-[#FAF5ED] border border-[#E8DFD0] space-y-1">
            <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
              <span>H1 Display Heading · Playfair Display</span>
              <span>48px / 3rem · Line Height 1.15</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1A1A]">
              The Jar We Carry: Oral Archives & Witness
            </h1>
          </div>

          {/* Heading H2 */}
          <div className="p-5 rounded-xl bg-[#FAF5ED] border border-[#E8DFD0] space-y-1">
            <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
              <span>H2 Section Title · Playfair Display</span>
              <span>32px / 2rem · Line Height 1.25</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
              Anatomy of a Spoken Word Witness
            </h2>
          </div>

          {/* Heading H3 */}
          <div className="p-5 rounded-xl bg-[#FAF5ED] border border-[#E8DFD0] space-y-1">
            <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
              <span>H3 Sub-Heading · Playfair Display</span>
              <span>24px / 1.5rem · Line Height 1.3</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A]">
              Preserving Grief Through Terracotta & Salt
            </h3>
          </div>

          {/* Poem Body Font */}
          <div className="p-5 rounded-xl bg-[#E88D4D]/10 border border-[#E88D4D]/30 space-y-1">
            <div className="flex items-center justify-between text-xs text-[#C83C2E] font-mono font-bold">
              <span>Poem Stanza Reader · Cormorant Garamond / Serif</span>
              <span>20px / 1.25rem · Line Height 1.7</span>
            </div>
            <p className="font-serif text-lg sm:text-xl text-[#1A1A1A] italic leading-relaxed">
              "We pack our mothers’ silence in terracotta jars,<br />
              burying them deep in clay where the rain remembers.<br />
              We do not speak of what cracked inside the kiln,<br />
              only the weight of what survived the carrying."
            </p>
          </div>

          {/* Standard Body Font */}
          <div className="p-5 rounded-xl bg-[#FAF5ED] border border-[#E8DFD0] space-y-1">
            <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
              <span>Body Text · Plus Jakarta Sans</span>
              <span>16px / 1rem · Line Height 1.6</span>
            </div>
            <p className="text-base text-stone-700 leading-relaxed max-w-3xl">
              Spoken word performance operates at the intersection of memory and community witness. Every stanza carries an acoustic responsibility to honor the archive while maintaining high clarity for listeners across all physical and digital spaces.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 3: ACCESSIBLE COMPONENT LIBRARY & FOCUS STATES */}
      <section className="bg-[#FFFBF5] rounded-2xl p-6 sm:p-8 border border-[#E8DFD0] shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-[#E8DFD0] pb-4">
          <div className="w-10 h-10 rounded-xl bg-[#E88D4D]/15 text-[#E88D4D] flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
              Accessible UI Component Primitives & Controls
            </h2>
            <p className="text-xs text-stone-500">
              Interactive buttons, input fields, focus rings, and badges built to WCAG interaction guidelines.
            </p>
          </div>
        </div>

        {/* Buttons Grid */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
            1. Button Variants & High-Visibility Keyboard Focus Rings
          </h3>
          <div className="flex flex-wrap items-center gap-4">
            <button className="px-5 py-2.5 rounded-lg bg-[#C83C2E] text-white font-bold text-xs shadow-xs hover:bg-[#B03225] focus:outline-none focus:ring-2 focus:ring-[#C83C2E] focus:ring-offset-2 cursor-pointer">
              Primary Brand Red
            </button>
            <button className="px-5 py-2.5 rounded-lg bg-[#1A1A1A] text-white font-bold text-xs shadow-xs hover:bg-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:ring-offset-2 cursor-pointer">
              Dark Slate Button
            </button>
            <button className="px-5 py-2.5 rounded-lg bg-[#3A6EA5] text-white font-bold text-xs shadow-xs hover:bg-[#2F5885] focus:outline-none focus:ring-2 focus:ring-[#3A6EA5] focus:ring-offset-2 cursor-pointer">
              Secondary Blue
            </button>
            <button className="px-5 py-2.5 rounded-lg border border-[#E8DFD0] bg-white text-stone-700 font-bold text-xs hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-[#C83C2E] focus:ring-offset-2 cursor-pointer">
              Outline Neutral
            </button>
            <button className="px-5 py-2.5 rounded-lg bg-[#E88D4D] text-[#1A1A1A] font-bold text-xs shadow-xs hover:bg-[#D47E3F] focus:outline-none focus:ring-2 focus:ring-[#E88D4D] focus:ring-offset-2 cursor-pointer">
              Accent Orange
            </button>
          </div>
        </div>

        {/* Form Input Controls */}
        <div className="space-y-4 pt-4 border-t border-[#E8DFD0]">
          <h3 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
            2. Accessible Form Inputs (Explicit Labels, Error States & Helper Text)
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
            {/* Standard Accessible Input */}
            <div className="space-y-1.5">
              <label htmlFor="style-guide-input-email" className="block text-xs font-bold text-[#1A1A1A]">
                Email Address <span className="text-[#C83C2E]">*</span>
              </label>
              <input
                id="style-guide-input-email"
                type="email"
                aria-required="true"
                aria-describedby="email-help-text"
                placeholder="name@domain.com"
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E8DFD0] text-xs text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
              />
              <p id="email-help-text" className="text-[11px] text-stone-500">
                We will send booking confirmations to this email address.
              </p>
            </div>

            {/* Invalid State Input */}
            <div className="space-y-1.5">
              <label htmlFor="style-guide-input-error" className="block text-xs font-bold text-[#1A1A1A]">
                Poem Title (Error State Demo) <span className="text-[#C83C2E]">*</span>
              </label>
              <input
                id="style-guide-input-error"
                type="text"
                aria-invalid="true"
                aria-describedby="title-error-text"
                defaultValue="[Invalid Characters]"
                className="w-full px-3.5 py-2.5 rounded-lg bg-rose-50/50 border border-rose-400 text-xs text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-rose-600"
              />
              <p id="title-error-text" className="text-[11px] text-rose-600 font-bold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                Title must not contain special bracket characters.
              </p>
            </div>
          </div>
        </div>

        {/* Badges & Status Indicators */}
        <div className="space-y-4 pt-4 border-t border-[#E8DFD0]">
          <h3 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
            3. WCAG Status Indicators & Category Pills
          </h3>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Published Content</span>
            </span>

            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Draft Content</span>
            </span>

            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-[#E88D4D]/15 text-[#C83C2E] border border-[#E88D4D]/40">
              <Sparkles className="w-3.5 h-3.5 text-[#C83C2E]" />
              <span>One-Jar Category</span>
            </span>
          </div>
        </div>

        {/* Screen Reader Live Region Tester */}
        <div className="space-y-4 pt-4 border-t border-[#E8DFD0]">
          <h3 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-[#C83C2E]" />
            <span>4. Screen Reader Live Region Announcement Sandbox</span>
          </h3>
          <p className="text-xs text-stone-600">
            Clicking the button below triggers an <code className="bg-stone-100 px-1.5 py-0.5 rounded text-[#C83C2E] font-mono">aria-live="polite"</code> announcement that screen readers (VoiceOver, NVDA, JAWS) read aloud without disrupting focus.
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => triggerLiveAnnouncement('Poem successfully published to the One-Jar digital archive.')}
              className="px-4 py-2 rounded-lg bg-[#C83C2E] hover:bg-[#B03225] text-white font-bold text-xs shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Trigger Screen Reader Announcement</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 4: RESPONSIVE BREAKPOINT & ACCESSIBILITY CHECKLIST */}
      <section className="bg-[#1A1A1A] text-[#FFFBF5] rounded-2xl p-6 sm:p-8 border border-[#333333] shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-[#333333] pb-4">
          <div className="w-10 h-10 rounded-xl bg-[#2A2A2A] text-[#E88D4D] flex items-center justify-center font-bold">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#FFFBF5]">
              Responsive Breakpoints & Accessibility Checklist
            </h2>
            <p className="text-xs text-stone-400">
              Engineered for seamless fidelity on mobile (320px), tablet (768px), and ultra-wide desktops (1440px+).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          
          <div className="p-5 rounded-xl bg-[#242424] border border-[#3A3A3A] space-y-3">
            <h3 className="font-bold text-[#E88D4D] text-sm flex items-center gap-2">
              <Smartphone className="w-4 h-4" /> Mobile & Touch Targets (&lt; 640px)
            </h3>
            <ul className="space-y-2 text-stone-300 list-disc list-inside">
              <li>All interactive buttons & links enforce a minimum touch area of <strong>44px × 44px</strong>.</li>
              <li>Navigation menu converts to an accessible mobile drawer with clear focus traps.</li>
              <li>Poem stanza reader text adjusts font size dynamically without horizontal scrolling.</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-[#242424] border border-[#3A3A3A] space-y-3">
            <h3 className="font-bold text-[#E88D4D] text-sm flex items-center gap-2">
              <Monitor className="w-4 h-4" /> Desktop & Keyboard Nav (&ge; 1024px)
            </h3>
            <ul className="space-y-2 text-stone-300 list-disc list-inside">
              <li>Skip link at top of page allows keyboard users to skip directly to main content.</li>
              <li>High-contrast focus ring outlines (2px brand red #C83C2E with offset) on keyboard Tab.</li>
              <li>Screen reader ARIA landmarks: <code>role="main"</code>, <code>role="navigation"</code>, <code>role="banner"</code>.</li>
            </ul>
          </div>

        </div>
      </section>

    </div>
  );
};
