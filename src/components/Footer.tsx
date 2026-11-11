import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, ArrowUp } from 'lucide-react';
import { WANJA_PROFILE } from '../data/mockData';
import { addSubscriber } from '../lib/cmsStore';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    addSubscriber(email);
    setStatusMessage('Thank you for subscribing to Letters from Wanja.');
    setEmail('');
    setTimeout(() => setStatusMessage(null), 5000);
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      className="bg-[#FDEFBF] text-[#3A1208] py-12 px-6 sm:px-12 flex flex-col items-center text-center gap-6 border-t-2 border-[#D81B7A]/20 print:hidden"
      role="contentinfo"
    >
      {/* Brand Title matching sample .logo */}
      <Link 
        to="/" 
        className="font-serif text-[1.8rem] text-[#D81B7A] hover:opacity-90 transition-opacity"
      >
        Wanja Writes
      </Link>

      {/* Nav Links */}
      <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium" aria-label="Footer Navigation">
        <Link to="/" className="hover:text-[#D81B7A] transition-colors">Home</Link>
        <Link to="/poetry" className="hover:text-[#D81B7A] transition-colors">One-Jar</Link>
        <Link to="/writing" className="hover:text-[#D81B7A] transition-colors">Journal</Link>
        <Link to="/videos" className="hover:text-[#D81B7A] transition-colors">Film</Link>
        <Link to="/services" className="hover:text-[#D81B7A] transition-colors">Services</Link>
        <Link to="/about" className="hover:text-[#D81B7A] transition-colors">About</Link>
        <Link to="/contact" className="hover:text-[#D81B7A] transition-colors">Contact</Link>
      </nav>

      {/* Social Links */}
      <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 text-sm text-[#3A1208]">
        <span className="opacity-60 text-xs uppercase tracking-wider font-semibold">Follow</span>
        <a 
          href={WANJA_PROFILE.instagram} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-[#D81B7A] transition-colors font-medium"
        >
          Instagram
        </a>
        <a 
          href={WANJA_PROFILE.tiktok} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-[#D81B7A] transition-colors font-medium"
        >
          TikTok
        </a>
        <a 
          href={WANJA_PROFILE.facebook} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-[#D81B7A] transition-colors font-medium"
        >
          Facebook
        </a>
        <a 
          href={WANJA_PROFILE.linkedin} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-[#D81B7A] transition-colors font-medium"
        >
          LinkedIn
        </a>
        <a 
          href={WANJA_PROFILE.youtube} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-[#D81B7A] transition-colors font-medium"
        >
          YouTube
        </a>
      </div>

      {/* Newsletter Signup: "Letters from Wanja" */}
      <form onSubmit={handleSubscribe} className="max-w-md w-full my-2 flex flex-col items-center gap-2">
        <h3 className="font-serif text-2xl text-[#3A1208]">Letters from Wanja</h3>
        <p className="text-xs sm:text-sm text-[#3A1208]/80 max-w-sm mb-2">
          Occasional notes, new writing, and upcoming events.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 w-full justify-center items-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            aria-label="Email address"
            required
            className="w-full sm:w-72 px-4 py-2.5 rounded-full border-2 border-[#3A1208] bg-white text-[#24100A] text-sm focus:outline-none focus:ring-2 focus:ring-[#D81B7A]"
          />
          <button 
            type="submit" 
            className="btn-wanja text-sm py-2 px-6 w-full sm:w-auto cursor-pointer"
          >
            Subscribe
          </button>
        </div>
        {statusMessage && (
          <p className="text-xs text-[#D81B7A] font-semibold mt-1" role="status">
            {statusMessage}
          </p>
        )}
      </form>

      {/* Copyright & Back to Top */}
      <div className="flex items-center justify-center gap-6 text-xs text-[#3A1208]/80 pt-4 border-t border-[#3A1208]/15 w-full max-w-2xl flex-wrap">
        <span>© {new Date().getFullYear()} Wanja Writes (Faith Wanja)</span>
        <button
          onClick={scrollToTop}
          className="hover:text-[#D81B7A] transition-colors inline-flex items-center gap-1 cursor-pointer font-medium"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
        {/* Discreet Staff Access for authenticated CMS management */}
        <Link
          to="/admin"
          aria-label="Staff Access"
          title="Staff Access"
          className="opacity-30 hover:opacity-100 transition-opacity p-1"
        >
          <Lock className="w-3 h-3 text-[#3A1208]" />
        </Link>
      </div>
    </footer>
  );
};
