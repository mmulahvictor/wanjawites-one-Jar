import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Sparkles, Youtube, Instagram, Linkedin } from 'lucide-react';
import { WANJA_PROFILE } from '../data/mockData';

interface ContactSectionProps {
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBooking }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    inquiryType: 'General Enquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16">
      
      {/* Header Banner */}
      <div className="p-8 sm:p-12 rounded-2xl bg-[#1A1A1A] text-white space-y-4 border border-[#2A2A2A] shadow-sm">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#E88D4D]">
          <Mail className="w-4 h-4 text-[#E88D4D]" />
          <span>Get in Touch</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#FFFBF5]">
          Contact & Professional Enquiries
        </h1>
        <p className="text-sm sm:text-base text-stone-300 max-w-2xl leading-relaxed">
          For media interviews, literary permissions, general questions, or serious professional booking requests.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Direct Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 rounded-2xl bg-[#1A1A1A] text-white space-y-6 border border-[#2A2A2A] shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-[#FFFBF5]">
              Professional Bookings
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Planning a performance, branded poem commission, or workshop? For detailed booking proposals with date, location, and budget specs, use our dedicated booking flow.
            </p>
            <button
              onClick={onOpenBooking}
              className="w-full py-3 rounded-lg bg-[#C83C2E] text-white text-xs font-bold hover:bg-[#B03225] transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Launch Booking Request Form</span>
            </button>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-[#E8DFD0] shadow-xs space-y-4 text-xs text-[#1A1A1A]/70">
            <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
              Direct Contact Details
            </h3>

            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#C83C2E] shrink-0" />
              <div>
                <a href={`mailto:${WANJA_PROFILE.email}`} className="font-bold text-[#1A1A1A] hover:text-[#C83C2E] transition-colors">{WANJA_PROFILE.email}</a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#3A6EA5] shrink-0" />
              <div>
                <a href={`tel:${WANJA_PROFILE.phone}`} className="font-bold text-[#1A1A1A] hover:text-[#3A6EA5] transition-colors">{WANJA_PROFILE.phone}</a>
                <span className="text-[#1A1A1A]/50 text-[11px] block">Call / WhatsApp Channel</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#E88D4D] shrink-0" />
              <span>Nairobi, Kenya · Available for Global & Remote Engagements</span>
            </div>

            <div className="pt-3 border-t border-[#E8DFD0] space-y-2">
              <p className="font-bold text-[#1A1A1A]">Official Platforms:</p>
              <div className="flex flex-wrap gap-2 text-[11px]">
                <a href={WANJA_PROFILE.youtube} target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 rounded bg-[#C83C2E]/10 text-[#C83C2E] font-semibold border border-[#C83C2E]/20 hover:bg-[#C83C2E]/20 transition-colors">
                  YouTube (@one_jar_poetry)
                </a>
                <a href={WANJA_PROFILE.instagram} target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 rounded bg-[#E88D4D]/15 text-[#C83C2E] font-semibold border border-[#E88D4D]/30 hover:bg-[#E88D4D]/25 transition-colors">
                  Instagram
                </a>
                <a href={WANJA_PROFILE.tiktok} target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 rounded bg-[#FAF5ED] text-[#1A1A1A] font-semibold border border-[#E8DFD0] hover:bg-stone-200 transition-colors">
                  TikTok
                </a>
                <a href={WANJA_PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 rounded bg-[#3A6EA5]/15 text-[#3A6EA5] font-semibold border border-[#3A6EA5]/30 hover:bg-[#3A6EA5]/25 transition-colors">
                  LinkedIn (Faith Wanja)
                </a>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E8DFD0] text-[11px] text-[#1A1A1A]/50">
              * Response time: Usually within 24 business hours.
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 p-8 rounded-2xl bg-white border border-[#E8DFD0] shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                Message Sent Successfully
              </h3>
              <p className="text-sm text-[#1A1A1A]/70 max-w-md mx-auto">
                Thank you for reaching out to WanjaWrites & One-Jar Poetry. We have received your enquiry and will respond shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-lg bg-[#C83C2E] text-white text-xs font-semibold hover:bg-[#B03225] transition-colors shadow-xs cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-2">
                Send a General Message
              </h3>

              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">
                  Inquiry Type
                </label>
                <select
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF5ED] border border-[#E8DFD0] text-xs text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                >
                  <option value="General Enquiry">General Enquiry</option>
                  <option value="Media / Interview Request">Media / Interview Request</option>
                  <option value="Literary / Republication Permission">Literary / Republication Permission</option>
                  <option value="School / Student Query">School / Student Query</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full name..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF5ED] border border-[#E8DFD0] text-xs text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF5ED] border border-[#E8DFD0] text-xs text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Subject of message..."
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF5ED] border border-[#E8DFD0] text-xs text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">
                  Your Message *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF5ED] border border-[#E8DFD0] text-xs text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-[#C83C2E] text-white text-xs font-semibold hover:bg-[#B03225] transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
