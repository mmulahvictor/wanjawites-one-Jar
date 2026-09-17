import React, { useState } from 'react';
import { Service } from '../types';
import { SERVICES } from '../data/mockData';
import { Sparkles, Check, ArrowRight, Clock, Users, PenTool, Mic, BookOpen, Calculator } from 'lucide-react';

interface WorkWithWanjaSectionProps {
  onOpenBookingWithService: (serviceId: string) => void;
}

export const WorkWithWanjaSection: React.FC<WorkWithWanjaSectionProps> = ({ onOpenBookingWithService }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES[0].id);

  const selectedService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16">
      
      {/* Header Banner */}
      <div className="p-8 sm:p-12 rounded-2xl bg-slate-900 text-white space-y-4 border border-slate-800 shadow-sm">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-indigo-400">
          <Sparkles className="w-4 h-4" />
          <span>Professional Services & Collaborations</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
          Work With Wanja
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          Bringing bespoke branded poetry, electrifying spoken-word stage performances, masterclass poetry workshops, and interdisciplinary artistic collaborations to your platform.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICES.map((service) => {
          const isSelected = selectedServiceId === service.id;
          return (
            <div
              key={service.id}
              onClick={() => setSelectedServiceId(service.id)}
              className={`p-6 rounded-2xl cursor-pointer transition-all border flex flex-col justify-between space-y-6 ${
                isSelected
                  ? 'bg-slate-900 text-white border-indigo-500 shadow-md scale-102'
                  : 'bg-white text-slate-900 border-slate-200 hover:border-indigo-500 shadow-xs'
              }`}
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${
                  isSelected ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                }`}>
                  <Sparkles className="w-6 h-6" />
                </div>

                <h3 className="font-serif text-2xl font-bold leading-tight">
                  {service.title}
                </h3>

                <p className={`text-xs leading-relaxed ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                  {service.tagline}
                </p>
              </div>

              <div className="pt-4 border-t border-current/20 flex items-center justify-between text-xs font-semibold">
                <span className={isSelected ? 'text-indigo-400' : 'text-indigo-600'}>
                  {isSelected ? 'Currently Selected' : 'View Details'}
                </span>
                <span className={isSelected ? 'text-indigo-400' : 'text-indigo-600'}>→</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Service Detail Deep Dive Card */}
      <div className="p-8 sm:p-12 rounded-2xl bg-white border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600">
            <Sparkles className="w-4 h-4" />
            <span>Service Overview</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            {selectedService.title}
          </h2>

          <p className="text-base text-slate-600 leading-relaxed">
            {selectedService.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-indigo-600 uppercase block">Target Audience / Clients</span>
              <span className="text-slate-800 font-medium">{selectedService.targetAudience}</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-indigo-600 uppercase block">Typical Lead Time</span>
              <span className="text-slate-800 font-medium">{selectedService.typicalLeadTime}</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <h4 className="text-xs uppercase font-bold text-slate-900 tracking-wider">
              Expected Deliverables:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {selectedService.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-4 p-8 rounded-2xl bg-slate-900 text-white space-y-6 text-center border border-slate-800 shadow-sm">
          <h3 className="font-serif text-2xl font-bold">
            Ready to Commission or Book?
          </h3>
          <p className="text-xs text-slate-300">
            Submit a structured inquiry to receive a tailored project proposal and scheduling options within 48 hours.
          </p>
          <button
            onClick={() => onOpenBookingWithService(selectedService.id)}
            className="w-full py-3.5 rounded-lg bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-colors shadow-xs flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Book {selectedService.title}</span>
          </button>
        </div>
      </div>

    </div>
  );
};
