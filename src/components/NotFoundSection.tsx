import React from 'react';
import { Link } from 'react-router-dom';
import { Feather, BookOpen, Home, ArrowLeft } from 'lucide-react';
import { OneJarLogo } from './OneJarLogo';

export const NotFoundSection: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center animate-fadeIn">
      <div className="p-8 sm:p-12 rounded-2xl bg-white border border-slate-200 shadow-xl space-y-6">
        <div className="flex justify-center">
          <OneJarLogo size="md" showText={false} />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold">
          <Feather className="w-3.5 h-3.5" />
          <span>404 • Page Not Found</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900">
          This stanza has not yet been written.
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
          The path you requested could not be located in the One-Jar Poetry archives.
        </p>

        <div className="pt-4 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            to="/poetry"
            className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition-colors flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Explore Poetry Archive</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
