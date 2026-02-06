'use client';
import { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';

export default function SubmissionModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [formData, setFormData] = useState({ name: '', address: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Logic for the Torch Protocol API Submission
      const response = await fetch('https://torch-market-api.vercel.app/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setFormData({ name: '', address: '' });
        }, 2000);
      }
    } catch (error) {
      console.error("Submission failed", error);
      setStatus('idle');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/90 backdrop-blur-md">
      <div className="glass-panel w-full max-w-lg p-8 relative border-gold/30 shadow-[0_0_50px_rgba(212,175,55,0.1)]">
        {status === 'success' ? (
          <div className="py-12 text-center animate-in zoom-in duration-300">
            <CheckCircle2 size={48} className="text-emerald mx-auto mb-4" />
            <h3 className="text-xl font-black uppercase tracking-tighter">Submission Received</h3>
            <p className="text-white/40 text-[10px] uppercase mt-2">Awaiting SAID Protocol Verification</p>
          </div>
        ) : (
          <>
            <button onClick={onClose} className="absolute top-4 right-4 text-white/20 hover:text-gold transition-colors">
              <X size={20} />
            </button>

            <h3 className="text-2xl font-black tracking-tighter mb-2">REGISTER AGENT</h3>
            <p className="text-white/40 text-[10px] uppercase tracking-widest mb-8 font-bold">Contributor Portal v1.0</p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="text-[10px] uppercase text-gold font-bold mb-2 block tracking-widest">Agent Identity</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. PIPPIN_AI" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm focus:border-gold/50 outline-none transition-all" 
                />
              </div>

              <div>
                <label className="text-[10px] uppercase text-gold font-bold mb-2 block tracking-widest">On-Chain Address</label>
                <input 
                  required
                  type="text" 
                  placeholder="Solana Wallet Hash" 
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm focus:border-gold/50 outline-none transition-all font-mono" 
                />
              </div>

              <button 
                disabled={status === 'submitting'}
                className="w-full luxury-wallet-button flex items-center justify-center gap-3 py-4 disabled:opacity-50"
              >
                {status === 'submitting' ? 'SYNCHRONIZING...' : (
                  <>
                    <Send size={16} />
                    <span>INITIATE REGISTRATION</span>
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}