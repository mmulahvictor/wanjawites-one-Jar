import React from 'react';
import { Link } from 'react-router-dom';
import { Home, BookOpen } from 'lucide-react';
import { OneJarLogo } from './OneJarLogo';

export const NotFoundSection: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center animate-fadeIn">
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#FFD9E6] shadow-xl space-y-6">
        <div className="flex justify-center">
          <OneJarLogo size="md" showText={false} />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD9E6] text-[#D81B7A] text-xs font-bold">
          <span>404 • Page Not Found</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#3A1208]">
          This stanza has not yet been written.
        </h1>

        <p className="text-sm sm:text-base text-[#3A1208]/80 max-w-md mx-auto leading-relaxed font-sans">
          The path you requested could not be located in the Wanja Writes or One-Jar Poetry archives.
        </p>

        <div className="pt-4 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="btn-wanja text-xs py-2.5 px-6 inline-flex items-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            to="/poetry"
            className="btn-wanja-alt text-xs py-2.5 px-6 inline-flex items-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Explore One-Jar Poetry</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
