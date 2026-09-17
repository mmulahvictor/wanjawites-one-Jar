import React, { useState } from 'react';
import { BookingFormData, Service } from '../types';
import { SERVICES } from '../data/mockData';
import { X, Send, CheckCircle, Sparkles, Calendar, MapPin, DollarSign, Building } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, preselectedServiceId }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    serviceType: preselectedServiceId || 's2',
    eventDate: '',
    location: '',
    budgetRange: 'Negotiable / Flexible',
    projectDescription: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomRef = `WW-BOOK-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(randomRef);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-indigo-400 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Professional Booking & Commission</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1 text-white">
              Work With Wanja
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-6 bg-slate-50">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-slate-900">
                Booking Request Received!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Wanja's team will review your project details and respond within 24–48 hours.
              </p>
              <div className="inline-block p-3 rounded-xl bg-indigo-50 border border-indigo-100 text-xs font-mono text-indigo-700 mt-2 font-semibold">
                Reference Code: {bookingRef}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-center">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-xs"
              >
                Return to Website
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 bg-slate-50">
            <p className="text-xs text-slate-500">
              To help reduce back-and-forth, please provide as much context as possible about your event, campaign, or collaboration.
            </p>

            {/* Service Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Required Service / Offering *
              </label>
              <select
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
                <option value="general">General Enquiry / Media Interview</option>
              </select>
            </div>

            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amani Mwangi"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@organization.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Phone & Organization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="+254 700 000000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                  Organization / Brand
                </label>
                <input
                  type="text"
                  placeholder="e.g. National Festival / Brand Agency"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Event Date & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Proposed Date</span>
                </label>
                <input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Event Location / Venue</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Nairobi / Virtual / Overseas"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Budget Range (Optional) */}
            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-indigo-600" />
                <span>Estimated Budget (Optional)</span>
              </label>
              <select
                value={formData.budgetRange}
                onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Negotiable / Flexible">Negotiable / Flexible</option>
                <option value="Under $1,000 / KES 100k">Under $1,000 / KES 100k (Community/Non-Profit)</option>
                <option value="$1,000 - $3,000 / KES 100k-300k">$1,000 - $3,000 (Standard Performance/Workshop)</option>
                <option value="$3,000 - $7,500 / KES 300k-750k">$3,000 - $7,500 (Branded Commission/Major Festival)</option>
                <option value="$7,500+ / KES 750k+">$7,500+ (Comprehensive Brand Campaign)</option>
              </select>
            </div>

            {/* Project Description */}
            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                Project Details / Request Description *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Describe the event theme, target audience size, expected deliverables, or specific poetic themes you wish to explore..."
                value={formData.projectDescription}
                onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors shadow-xs flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Booking Enquiry</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
