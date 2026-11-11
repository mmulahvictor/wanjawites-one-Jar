import React, { useState } from 'react';
import { Service } from '../types';
import { SERVICES as DEFAULT_SERVICES } from '../data/mockData';
import { getServices } from '../lib/cmsStore';
import { Sparkles, Check, ArrowRight } from 'lucide-react';

interface WorkWithWanjaSectionProps {
  services?: Service[];
  onOpenBookingWithService: (serviceId: string) => void;
}

export const WorkWithWanjaSection: React.FC<WorkWithWanjaSectionProps> = ({
  services,
  onOpenBookingWithService,
}) => {
  const serviceList = (services || getServices() || DEFAULT_SERVICES).filter(
    (s) => (s.status || 'published') === 'published'
  );

  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    serviceList[0]?.id || DEFAULT_SERVICES[0].id
  );

  const selectedService =
    serviceList.find((s) => s.id === selectedServiceId) ||
    serviceList[0] ||
    DEFAULT_SERVICES[0];

  return (
    <div className="w-full">
      
      {/* 1. Header Banner */}
      <section className="bg-[#D81B7A] text-white px-6 sm:px-12 md:px-20 py-16 sm:py-20">
        <div className="max-w-4xl space-y-4">
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal leading-[1.02] tracking-tight">
            Services & Consulting
          </h1>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl font-sans">
            Spoken word performances, strategic communications, culture reviews, and creative writing masterclasses.
          </p>
        </div>
      </section>

      {/* 2. Main Services Body */}
      <section className="px-6 sm:px-12 md:px-20 py-16 bg-[#FFF6EC] text-[#3A1208]">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceList.map((service) => {
              const isSelected = selectedService.id === service.id;

              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all border flex flex-col justify-between space-y-4 ${
                    isSelected
                      ? 'bg-[#3A1208] text-[#FFF6EC] border-[#D81B7A] shadow-md scale-[1.02]'
                      : 'bg-white text-[#3A1208] border-[#FFD9E6] hover:border-[#D81B7A] shadow-xs'
                  }`}
                >
                  <div className="space-y-3">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      isSelected ? 'bg-[#D81B7A] text-white' : 'bg-[#FFD9E6] text-[#D81B7A]'
                    }`}>
                      {service.typicalLeadTime}
                    </span>

                    <h3 className="font-serif text-2xl font-normal leading-snug">
                      {service.title}
                    </h3>

                    <p className={`text-xs leading-relaxed line-clamp-3 ${
                      isSelected ? 'text-[#FFF6EC]/80' : 'text-[#3A1208]/75'
                    }`}>
                      {service.tagline}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-current/20 flex items-center justify-between text-xs font-semibold">
                    <span className={isSelected ? 'text-[#D81B7A]' : 'text-[#3A1208]'}>
                      {isSelected ? 'Selected' : 'Select'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deep Dive Card */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#FFD9E6] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div>
                <span className="text-xs uppercase font-bold text-[#D81B7A] bg-[#FFD9E6] px-3 py-1 rounded-full inline-block mb-3">
                  Service Scope
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl text-[#3A1208] font-normal leading-tight">
                  {selectedService.title}
                </h2>
              </div>

              <p className="text-base sm:text-lg text-[#3A1208]/85 leading-relaxed font-sans">
                {selectedService.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                <div className="p-4 rounded-xl bg-[#FFF6EC] border border-[#FFD9E6] space-y-1">
                  <span className="font-bold text-[#D81B7A] uppercase block">Target Audience / Clients</span>
                  <span className="text-[#3A1208] font-medium text-sm">{selectedService.targetAudience}</span>
                </div>

                <div className="p-4 rounded-xl bg-[#FFF6EC] border border-[#FFD9E6] space-y-1">
                  <span className="font-bold text-[#D81B7A] uppercase block">Typical Delivery Timeline</span>
                  <span className="text-[#3A1208] font-medium text-sm">{selectedService.typicalLeadTime}</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs uppercase font-bold text-[#3A1208] tracking-wider">
                  Deliverables & Outputs:
                </h4>
                <ul className="space-y-2 text-sm text-[#3A1208]/85">
                  {selectedService.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#FFD9E6] text-[#D81B7A] flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-[#3A1208] text-[#FFF6EC] space-y-6 flex flex-col justify-between text-left">
              <div className="space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D81B7A] bg-[#FFD9E6] px-2.5 py-0.5 rounded-full inline-block">
                  Commission Wanja
                </span>
                <h3 className="font-serif text-2xl text-[#FFF6EC] font-normal">
                  Ready to collaborate?
                </h3>
                <p className="text-xs text-[#FFF6EC]/80 leading-relaxed font-sans">
                  Submit a structured proposal with your event date, organization, and scope.
                </p>
              </div>

              <button
                onClick={() => onOpenBookingWithService(selectedService.id)}
                className="btn-wanja text-xs py-3 px-6 cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Book This Service</span>
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
