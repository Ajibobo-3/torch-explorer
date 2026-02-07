'use client';
import { Flame, ShieldCheck, ExternalLink } from 'lucide-react';

interface AgentCardProps {
  name: string;
  tier: string;
  hash: string;
  reputation?: number;
}

export default function AgentCard({ name, tier, hash, reputation = 85 }: AgentCardProps) {
  // Logic: Only apply the pulse/glow if reputation is high (Emerald tier behavior)
  const isHighRep = reputation >= 90;

  return (
    <div className="glass-panel p-6 group hover:border-gold/50 transition-all duration-500 relative overflow-hidden">
      {/* Background Glow Effect */}
      {isHighRep && (
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-gold/10 blur-3xl rounded-full animate-pulse" />
      )}

      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="flex items-center gap-3">
          {/* The Pulsing Icon Container */}
          <div className={`p-2 rounded-full transition-all duration-500 ${
            isHighRep 
            ? 'bg-gold/20 shadow-[0_0_15px_rgba(212,175,55,0.4)] animate-pulse' 
            : 'bg-white/5'
          }`}>
             <Flame size={18} className={isHighRep ? "text-gold" : "text-white/20"} />
          </div>
          <div>
            <h3 className="text-sm font-black tracking-tighter uppercase">{name}</h3>
            <span className="text-[9px] text-gold uppercase font-bold tracking-[0.2em]">{tier} TIER</span>
          </div>
        </div>
        <ExternalLink size={14} className="text-white/20 group-hover:text-gold transition-colors cursor-pointer" />
      </div>

      <div className="mb-6 relative z-10">
        <div className="flex justify-between text-[9px] uppercase tracking-widest mb-2 text-white/40">
          <span>Trust Score</span>
          <span className="text-gold font-bold">{reputation}%</span>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gold transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(212,175,55,0.8)]"
            style={{ width: `${reputation}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center py-3 border-t border-white/5 relative z-10">
        <code className="text-[10px] text-white/30 font-mono">{hash}</code>
        <div className="flex items-center gap-1">
          <ShieldCheck size={12} className="text-emerald" />
          <span className="text-[9px] text-emerald font-bold uppercase">Verified</span>
        </div>
      </div>
    </div>
  );
}