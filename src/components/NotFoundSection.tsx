import React from 'react';
import { Link } from 'react-router-dom';
import { Feather, BookOpen, Home, ArrowLeft } from 'lucide-react';
import { OneJarLogo } from './OneJarLogo';

export const NotFoundSection: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center animate-fadeIn">
      <div className="p-8 sm:p-12 rounded-2xl bg-[#FFFBF5] border border-[#E8DFD0] shadow-xl space-y-6">
        <div className="flex justify-center">
          <OneJarLogo size="md" showText={false} />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E88D4D]/10 border border-[#E88D4D]/30 text-[#C83C2E] text-xs font-bold">
          <Feather className="w-3.5 h-3.5" />
          <span>404 • Page Not Found</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1A1A1A]">
          This stanza has not yet been written.
        </h1>

        <p className="text-sm sm:text-base text-stone-600 max-w-md mx-auto leading-relaxed">
          The path you requested could not be located in the One-Jar Poetry archives.
        </p>

        <div className="pt-4 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="px-5 py-2.5 rounded-xl bg-[#C83C2E] text-white font-bold text-sm hover:bg-[#B03225] transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            to="/poetry"
            className="px-5 py-2.5 rounded-xl bg-[#FAF5ED] border border-[#E8DFD0] text-[#1A1A1A] font-bold text-sm hover:bg-[#F2ECE0] transition-colors flex items-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Explore Poetry Archive</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
