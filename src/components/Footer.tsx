import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Instagram, Linkedin, Mail, Phone, ExternalLink, ArrowUpRight, Lock } from 'lucide-react';
import { OneJarLogo } from './OneJarLogo';
import { WANJA_PROFILE } from '../data/mockData';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-[#1A1A1A] text-[#FFFBF5]/80 pt-16 pb-12 border-t border-[#2A2A2A]" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2A2A2A]">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="p-2.5 rounded-xl bg-[#242424] border border-[#333333] inline-block">
              <OneJarLogo size="md" showText={true} />
            </div>
            <p className="text-sm text-stone-400 leading-relaxed max-w-md font-sans">
              "{WANJA_PROFILE.tagline}" An official archive of spoken word, 
              excavation poetics, strategic communications, and cultural documentations.
            </p>
            <div className="space-y-1.5 text-xs text-stone-400 pt-1">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E88D4D]" />
                <a href={`mailto:${WANJA_PROFILE.email}`} className="hover:text-white transition-colors">{WANJA_PROFILE.email}</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#3A6EA5]" />
                <a href={`tel:${WANJA_PROFILE.phone}`} className="hover:text-white transition-colors">{WANJA_PROFILE.phone}</a>
                <span>•</span>
                <a href={WANJA_PROFILE.website} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>wanjawrites.africa</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>
            <div className="pt-2">
              <button
                id="footer-book-cta"
                onClick={onOpenBooking}
                className="px-4 py-2.5 rounded-lg bg-[#C83C2E] text-white text-sm font-semibold hover:bg-[#B03225] transition-colors inline-flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Request Booking / Consultation</span>
                <ArrowUpRight className="w-4 h-4 text-amber-200" />
              </button>
            </div>
          </div>

          {/* Quick Sitemap - Clean Public Sitemap (Admin link hidden from guests) */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#E88D4D] mb-4">
              Explore Works
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <Link 
                  id="footer-link-poetry"
                  to="/poetry" 
                  className="hover:text-[#FFFBF5] transition-colors block"
                >
                  Poetry & Performances
                </Link>
              </li>
              <li>
                <Link 
                  id="footer-link-writing"
                  to="/writing" 
                  className="hover:text-[#FFFBF5] transition-colors block"
                >
                  Culture Writing & Essays
                </Link>
              </li>
              <li>
                <Link 
                  id="footer-link-services"
                  to="/services" 
                  className="hover:text-[#FFFBF5] transition-colors block"
                >
                  Communications & Services
                </Link>
              </li>
              <li>
                <Link 
                  id="footer-link-about"
                  to="/about" 
                  className="hover:text-[#FFFBF5] transition-colors block"
                >
                  About Faith Wanja
                </Link>
              </li>
              <li>
                <Link 
                  id="footer-link-videos"
                  to="/videos" 
                  className="hover:text-[#FFFBF5] transition-colors block"
                >
                  YouTube Videos Archive
                </Link>
              </li>
              <li>
                <Link 
                  id="footer-link-contact"
                  to="/contact" 
                  className="hover:text-[#FFFBF5] transition-colors block"
                >
                  Contact & Inquiries
                </Link>
              </li>
              <li>
                <Link 
                  id="footer-link-style-guide"
                  to="/style-guide" 
                  className="hover:text-[#E88D4D] transition-colors text-xs text-stone-500 block pt-1"
                >
                  Design Style Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Ecosystem Roles */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#E88D4D] mb-4">
              Official Social Media (@one_jar_poetry)
            </h4>
            <p className="text-xs text-stone-400 mb-3">
              Follow One-Jar Poetry across platforms for spoken word clips, reviews, and event dates.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <a 
                href={WANJA_PROFILE.youtube} 
                target="_blank" 
                rel="noreferrer"
                className="p-3 rounded-xl bg-[#242424] border border-[#333333] hover:border-[#C83C2E] transition-colors flex items-center gap-3 group"
              >
                <Youtube className="w-5 h-5 text-[#C83C2E] fill-current group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-semibold text-white">YouTube</div>
                  <div className="text-stone-400">@one_jar_poetry</div>
                </div>
              </a>

              <a 
                href={WANJA_PROFILE.instagram} 
                target="_blank" 
                rel="noreferrer"
                className="p-3 rounded-xl bg-[#242424] border border-[#333333] hover:border-[#E88D4D] transition-colors flex items-center gap-3 group"
              >
                <Instagram className="w-5 h-5 text-[#E88D4D] group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-semibold text-white">Instagram</div>
                  <div className="text-stone-400">One-Jar Poetry</div>
                </div>
              </a>

              <a 
                href={WANJA_PROFILE.tiktok} 
                target="_blank" 
                rel="noreferrer"
                className="p-3 rounded-xl bg-[#242424] border border-[#333333] hover:border-[#3A6EA5] transition-colors flex items-center gap-3 group"
              >
                <div className="w-5 h-5 font-bold text-[#3A6EA5] flex items-center justify-center">TT</div>
                <div>
                  <div className="font-semibold text-white">TikTok</div>
                  <div className="text-stone-400">One-Jar Poetry</div>
                </div>
              </a>

              <a 
                href={WANJA_PROFILE.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className="p-3 rounded-xl bg-[#242424] border border-[#333333] hover:border-[#3A6EA5] transition-colors flex items-center gap-3 group"
              >
                <Linkedin className="w-5 h-5 text-[#3A6EA5] group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-semibold text-white">LinkedIn</div>
                  <div className="text-stone-400">Faith Wanja</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar with discreet staff access */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} WanjaWrites × One-Jar Poetry (Faith Wanja). All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span>Official Portfolio & Cultural Archive</span>
            {/* Discreet staff doorway for authorized administrators */}
            <Link
              to="/admin"
              aria-label="Staff Access"
              title="Staff Access"
              className="text-stone-600 hover:text-stone-400 transition-colors p-1 rounded inline-flex items-center"
            >
              <Lock className="w-3 h-3 opacity-40 hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
