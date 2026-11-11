import React, { useEffect } from 'react';
import { X, Download, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';

interface EpkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EPK_FILE_PATH = '/assets/aistudio/EPK_One-Jar_Poetry_7867656c.pdf';
export const EPK_FILE_NAME = 'Faith-Wanja-One-Jar-Poetry-EPK.pdf';

export const EpkModal: React.FC<EpkModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="epk-modal-title"
    >
      <div 
        className="relative w-full max-w-5xl h-[92vh] bg-[#FFF6EC] text-[#3A1208] rounded-2xl shadow-2xl flex flex-col overflow-hidden border-2 border-[#D81B7A]/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar matching theme */}
        <div className="bg-[#3A1208] text-[#FFF6EC] px-5 py-4 flex items-center justify-between border-b-2 border-[#D81B7A]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-[#D81B7A] flex items-center justify-center text-white shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#D81B7A] text-white px-2 py-0.5 rounded-full">
                  Official PDF
                </span>
                <span className="text-xs text-[#FFD9E6]/75 hidden sm:inline">2.7 MB · 5 Pages</span>
              </div>
              <h2 id="epk-modal-title" className="font-serif text-lg sm:text-xl text-[#FFF6EC] truncate">
                Faith Wanja — One-Jar Poetry EPK
              </h2>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <a
              href={EPK_FILE_PATH}
              download={EPK_FILE_NAME}
              className="btn-wanja text-xs py-2 px-3.5 inline-flex items-center gap-1.5 cursor-pointer"
              title="Download PDF to your device"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
            </a>

            <a
              href={EPK_FILE_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wanja-alt bg-transparent text-[#FFF6EC] border border-[#FFD9E6]/30 hover:bg-[#D81B7A] text-xs py-2 px-3 inline-flex items-center gap-1.5 cursor-pointer"
              title="Open PDF in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Open in Tab</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#FFF6EC]/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer ml-1"
              aria-label="Close EPK Viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* EPK Meta Ribbon */}
        <div className="bg-[#FFD9E6]/40 px-5 py-2.5 border-b border-[#D81B7A]/20 flex flex-wrap items-center justify-between text-xs text-[#3A1208] gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-[#D81B7A]">Contents:</span>
            <span>Performance Bio</span>
            <span className="opacity-40">•</span>
            <span>Festival & Slam Features</span>
            <span className="opacity-40">•</span>
            <span>Stage Photo Records</span>
            <span className="opacity-40">•</span>
            <span>Sound & Stage Technical Rider</span>
            <span className="opacity-40">•</span>
            <span>Direct Booking</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-800 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verified Press Kit</span>
          </div>
        </div>

        {/* Embedded PDF Viewer */}
        <div className="flex-1 bg-stone-900 relative">
          <iframe
            src={`${EPK_FILE_PATH}#view=FitH`}
            title="Faith Wanja One-Jar Poetry Electronic Press Kit"
            className="w-full h-full border-0"
          />
          
          {/* Fallback overlay in case iframe fails on some restricted mobile browsers */}
          <noscript>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white bg-[#3A1208]">
              <p className="mb-4">Your browser does not support embedded PDF frames.</p>
              <a
                href={EPK_FILE_PATH}
                download={EPK_FILE_NAME}
                className="btn-wanja"
              >
                Download Faith Wanja EPK PDF
              </a>
            </div>
          </noscript>
        </div>

        {/* Footer bar */}
        <div className="bg-[#FFF6EC] px-5 py-3 border-t border-[#D81B7A]/20 flex flex-wrap items-center justify-between gap-3 text-xs text-[#3A1208]/80">
          <p>
            For festival curation, literary slams, keynote recitals, and media inquiries:{' '}
            <a href="mailto:wanjawrites@gmail.com" className="font-semibold text-[#D81B7A] hover:underline">
              wanjawrites@gmail.com
            </a>
          </p>
          <div className="flex items-center gap-3">
            <a
              href={EPK_FILE_PATH}
              download={EPK_FILE_NAME}
              className="text-[#D81B7A] font-semibold hover:underline inline-flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save PDF ({EPK_FILE_NAME})</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
