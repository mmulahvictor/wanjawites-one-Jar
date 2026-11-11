import React, { useState } from 'react';
import { Mail, Sparkles, CheckCircle } from 'lucide-react';
import { WANJA_PROFILE } from '../data/mockData';
import { saveInquiry } from '../lib/cmsStore';

interface ContactSectionProps {
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBooking }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Booking',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `WW-MSG-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceCode(ref);
    saveInquiry({
      referenceCode: ref,
      type: 'contact',
      fullName: formData.name.trim(),
      email: formData.email.trim(),
      inquiryType: formData.subject,
      subject: formData.subject,
      message: formData.message.trim(),
    });
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: 'Booking',
      message: ''
    });
    setSubmitted(false);
  };

  return (
    <div className="w-full">
      
      {/* 1. Header Banner matching sample .pgh with blush background & plum text */}
      <section className="bg-[#FFD9E6] text-[#3A1208] px-6 sm:px-12 md:px-20 py-16 sm:py-20">
        <div className="max-w-4xl space-y-4">
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal leading-[1.02] tracking-tight">
            Contact
          </h1>
          <p className="text-base sm:text-lg text-[#3A1208]/90 max-w-2xl font-sans">
            Bookings, collaborations, press, or just a hello.
          </p>
        </div>
      </section>

      {/* 2. Contact Grid Section matching sample .two */}
      <section className="px-6 sm:px-12 md:px-20 py-16 bg-[#FFF6EC] text-[#3A1208]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form matching sample #cf */}
          <div className="md:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-[#FFD9E6] shadow-xs">
            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FFD9E6] text-[#D81B7A] flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-3xl text-[#3A1208] font-normal">
                  Message Sent
                </h3>
                <p className="text-sm text-[#3A1208]/80 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Faith Wanja replies within five working days. Your message reference code is <strong className="text-[#D81B7A] font-mono">{referenceCode}</strong>.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={handleReset}
                    className="btn-wanja-alt text-xs py-2 px-5 cursor-pointer"
                  >
                    Send Another Note
                  </button>
                  <a
                    href={`mailto:wanjawrites05@gmail.com?subject=${encodeURIComponent(formData.subject)}`}
                    className="btn-wanja text-xs py-2 px-5 cursor-pointer"
                  >
                    Open in Email App
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#3A1208] mb-1">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#3A1208] bg-white text-[#24100A] text-sm focus:outline-none focus:ring-2 focus:ring-[#D81B7A]"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#3A1208] mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#3A1208] bg-white text-[#24100A] text-sm focus:outline-none focus:ring-2 focus:ring-[#D81B7A]"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[#3A1208] mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#3A1208] bg-white text-[#24100A] text-sm focus:outline-none focus:ring-2 focus:ring-[#D81B7A]"
                  >
                    <option value="Booking">Booking</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Press">Press</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#3A1208] mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your note here..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#3A1208] bg-white text-[#24100A] text-sm focus:outline-none focus:ring-2 focus:ring-[#D81B7A]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn-wanja cursor-pointer text-sm py-3 px-8 w-full sm:w-auto"
                  >
                    Send message
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Direct Info matching sample */}
          <div className="md:col-span-5 space-y-8 text-left">
            <div className="space-y-4">
              <h2 className="font-serif text-3xl sm:text-5xl text-[#3A1208] font-normal">
                Direct
              </h2>
              <p className="text-base sm:text-lg text-[#3A1208]/90 font-sans">
                Email: <a href={`mailto:${WANJA_PROFILE.email}`} className="text-[#D81B7A] font-semibold underline hover:text-[#3A1208]">{WANJA_PROFILE.email}</a>
              </p>
              <p className="text-sm text-[#3A1208]/75 font-sans">
                I reply within five working days.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-[#3A1208] text-[#FFF6EC] space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#D81B7A] bg-[#FFD9E6] px-2.5 py-0.5 rounded-full inline-block">
                Festivals & Screenings
              </span>
              <h3 className="font-serif text-2xl text-[#FFF6EC] font-normal">
                Full Production Booking
              </h3>
              <p className="text-xs sm:text-sm text-[#FFF6EC]/80 leading-relaxed font-sans">
                Need to specify a performance venue, date, technical rider, or consulting scope? Launch the structured booking inquiry form.
              </p>
              <button
                onClick={onOpenBooking}
                className="btn-wanja text-xs py-2 px-5 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                <span>Launch Booking Form</span>
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#FFD9E6] space-y-3 text-xs text-[#3A1208]/80">
              <h4 className="font-serif text-lg text-[#3A1208] font-normal">
                Location & Availability
              </h4>
              <p>Nairobi, Kenya · Available for in-person recitals across East Africa and global digital collaborations.</p>
              <p className="pt-2 border-t border-[#FFD9E6]">
                WhatsApp Channel: <a href={WANJA_PROFILE.whatsappChannel} target="_blank" rel="noopener noreferrer" className="text-[#D81B7A] font-semibold hover:underline">One-Jar Poetry on WhatsApp</a>
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
