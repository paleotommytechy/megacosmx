import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { Talent } from '../types';

interface RequestModalProps {
  talent: Talent;
  isOpen: boolean;
  onClose: () => void;
}

export const RequestModal: React.FC<RequestModalProps> = ({ talent, isOpen, onClose }) => {
  const [clientName, setClientName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const env = (import.meta as any).env || {};
      
      if (!env.VITE_SUPABASE_URL) {
        // Mock success
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log("Mock submission:", { talent_id: talent.id, clientName, message });
      } else {
        const { error } = await supabase
          .from('requests')
          .insert({
            talent_id: talent.id,
            client_name: clientName,
            message: message,
            status: 'pending'
          });

        if (error) throw error;
      }

      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setSubmitStatus('idle');
        setClientName('');
        setMessage('');
      }, 2000);
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-cosmic-navy border border-cosmic-blue/30 rounded-xl w-full max-w-md relative shadow-2xl shadow-cosmic-blue/10">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-cosmic-silver hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-1">Hiring Request</h2>
          <p className="text-cosmic-silver text-sm mb-6">Contacting <span className="text-cosmic-cyan">{talent.name}</span></p>

          {submitStatus === 'success' ? (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-lg text-center animate-fade-in">
              <p className="font-semibold">Request Sent Successfully!</p>
              <p className="text-xs mt-1">The talent has been notified.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-cosmic-silver uppercase tracking-wider mb-2">
                  Your Name / Company
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-black/40 border border-cosmic-blue/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cosmic-blue focus:ring-1 focus:ring-cosmic-blue transition-all"
                  placeholder="e.g. Acme Corp"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-cosmic-silver uppercase tracking-wider mb-2">
                  Project Details
                </label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full bg-black/40 border border-cosmic-blue/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cosmic-blue focus:ring-1 focus:ring-cosmic-blue transition-all resize-none"
                  placeholder="Describe your needs..."
                />
              </div>

              {submitStatus === 'error' && (
                <p className="text-red-400 text-sm text-center">Failed to send request. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-cosmic-blue hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Processing...</span>
                ) : (
                  <>
                    Send Request <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};