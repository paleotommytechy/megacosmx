import React, { useState } from 'react';
import { Talent } from '../types';
import { Mail, Phone, ExternalLink, User } from 'lucide-react';
import { RequestModal } from './RequestModal';

interface TalentCardProps {
  talent: Talent;
}

export const TalentCard: React.FC<TalentCardProps> = ({ talent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleWhatsApp = () => {
    if (talent.whatsapp) {
      const url = `https://wa.me/${talent.whatsapp.replace(/\D/g, '')}`;
      window.open(url, '_blank');
    }
  };

  return (
    <>
      <div className="group bg-black/30 border border-cosmic-silver/10 rounded-xl overflow-hidden hover:border-cosmic-cyan/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,215,244,0.15)] flex flex-col h-full">
        {/* Header/Image Area */}
        <div className="relative h-48 bg-gradient-to-br from-cosmic-navy to-cosmic-blue/20 overflow-hidden">
          {talent.photo_url && !imgError ? (
            <img 
              src={talent.photo_url} 
              alt={talent.name}
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-cosmic-silver/30">
              <User size={64} />
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-cosmic-navy via-transparent to-transparent"></div>
          
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white tracking-tight">{talent.name}</h3>
            <p className="text-cosmic-cyan text-sm font-medium">{talent.role}</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 flex-1 flex flex-col">
          <p className="text-cosmic-silver text-sm leading-relaxed mb-6 line-clamp-3">
            {talent.bio}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {talent.skills.map((skill, index) => (
              <span 
                key={index} 
                className="px-2 py-1 text-xs font-medium text-cosmic-blue bg-cosmic-blue/10 border border-cosmic-blue/20 rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between gap-3">
            <div className="flex gap-2">
              {talent.email && (
                <a 
                  href={`mailto:${talent.email}`}
                  className="p-2 text-cosmic-silver hover:text-white hover:bg-white/10 rounded-full transition-colors"
                  title="Email"
                >
                  <Mail size={18} />
                </a>
              )}
              {talent.whatsapp && (
                <button 
                  onClick={handleWhatsApp}
                  className="p-2 text-cosmic-silver hover:text-green-400 hover:bg-white/10 rounded-full transition-colors"
                  title="WhatsApp"
                >
                  <Phone size={18} />
                </button>
              )}
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-cosmic-blue hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Hire Now <ExternalLink size={14} />
            </button>
          </div>
        </div>
      </div>

      <RequestModal 
        talent={talent} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};