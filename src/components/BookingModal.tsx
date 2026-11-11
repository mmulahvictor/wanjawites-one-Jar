import React, { useState, useEffect } from 'react';
import { BookingFormData, Service } from '../types';
import { SERVICES as DEFAULT_SERVICES } from '../data/mockData';
import { getServices, saveInquiry } from '../lib/cmsStore';
import { X, CheckCircle, Sparkles } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  services?: Service[];
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  services,
}) => {
  const availableServices = (services || getServices() || DEFAULT_SERVICES).filter(
    (s) => (s.status || 'published') === 'published'
  );

  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    serviceType: preselectedServiceId || availableServices[0]?.id || 's2',
    eventDate: '',
    location: '',
    budgetRange: 'Negotiable / Flexible',
    projectDescription: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        serviceType: preselectedServiceId || prev.serviceType || availableServices[0]?.id || 's2',
      }));
    }
  }, [isOpen, preselectedServiceId]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomRef = `WW-BOOK-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(randomRef);

    const matchedService = availableServices.find((s) => s.id === formData.serviceType);

    saveInquiry({
      referenceCode: randomRef,
      type: 'booking',
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || undefined,
      organization: formData.organization.trim() || undefined,
      serviceType: matchedService ? matchedService.title : formData.serviceType,
      eventDate: formData.eventDate || undefined,
      location: formData.location.trim() || undefined,
      budgetRange: formData.budgetRange,
      message: formData.projectDescription.trim(),
    });

    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      organization: '',
      serviceType: preselectedServiceId || availableServices[0]?.id || 's2',
      eventDate: '',
      location: '',
      budgetRange: 'Negotiable / Flexible',
      projectDescription: ''
    });
    onClose();
  };

  return (
    <div 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn cursor-pointer"
    >
      <div 
        className="bg-[#FFF6EC] text-[#3A1208] w-full max-w-2xl rounded-2xl shadow-2xl border-2 border-[#D81B7A]/30 overflow-hidden my-8 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-[#3A1208] text-[#FFF6EC] flex items-center justify-between border-b border-[#FFD9E6]/15">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#D81B7A] bg-[#FFD9E6] px-2.5 py-0.5 rounded-full font-bold inline-block">
              <span>Booking Proposal</span>
            </div>
            <h2 id="booking-modal-title" className="font-serif text-2xl sm:text-3xl font-normal mt-2 text-[#FFF6EC]">
              Book Faith Wanja
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#FFF6EC]/70 hover:bg-[#D81B7A] hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FFD9E6] text-[#D81B7A] flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-3xl font-normal text-[#3A1208]">
                Inquiry Received
              </h3>
              <p className="text-sm text-[#3A1208]/85 max-w-md mx-auto leading-relaxed">
                Thank you for your proposal. Your reference code is <strong className="text-[#D81B7A] font-mono">{bookingRef}</strong>. Faith Wanja replies within five working days.
              </p>
              <div className="pt-4 flex justify-center">
                <button
                  onClick={handleReset}
                  className="btn-wanja cursor-pointer text-xs py-2 px-6"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3A1208] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#3A1208] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D81B7A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3A1208] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#3A1208] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D81B7A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3A1208] mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#3A1208] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D81B7A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3A1208] mb-1">
                    Organization / Festival
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#3A1208] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D81B7A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3A1208] mb-1">
                  Service / Engagement Type *
                </label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#3A1208] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D81B7A]"
                >
                  {availableServices.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3A1208] mb-1">
                    Proposed Event Date
                  </label>
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#3A1208] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D81B7A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3A1208] mb-1">
                    Location / Venue
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Nairobi, Kenya or Virtual"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#3A1208] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D81B7A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3A1208] mb-1">
                  Event / Project Description *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell Faith about your event, audience, themes, or vision..."
                  value={formData.projectDescription}
                  onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#3A1208] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D81B7A]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-wanja-alt text-xs py-2.5 px-5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-wanja text-xs py-2.5 px-6 cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>Submit Proposal</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
