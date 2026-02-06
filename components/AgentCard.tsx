'use client';
import { Flame, ShieldCheck, ExternalLink } from 'lucide-react';

interface AgentCardProps {
  name: string;
  tier: string;
  hash: string;
  reputation?: number; // Added reputation for the pulse logic
}

export default function AgentCard({ name, tier, hash, reputation = 85 }: AgentCardProps) {
  // Logic: Higher reputation = faster pulse (healthier agent)
  const pulseSpeed = reputation > 90 ? 'animate-pulse' : 'opacity-50';

  return (
    <div className="glass-panel p-6 group hover:border-gold/50 transition-all duration-500">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full bg-gold/10 ${pulseSpeed}`}>
             <Flame size={18} className="text-gold" />
          </div>
          <div>
            <h3 className="text-sm font-black tracking-tighter uppercase">{name}</h3>
            <span className="text-[9px] text-gold uppercase font-bold tracking-[0.2em]">{tier} TIER</span>
          </div>
        </div>
        <ExternalLink size={14} className="text-white/20 group-hover:text-gold transition-colors cursor-pointer" />
      </div>

      {/* Trust Visualization: Reputation Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-[9px] uppercase tracking-widest mb-2 text-white/40">
          <span>Trust Score</span>
          <span className="text-gold">{reputation}%</span>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gold transition-all duration-1000 ease-out"
            style={{ width: `${reputation}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center py-3 border-t border-white/5">
        <code className="text-[10px] text-white/30 font-mono">{hash}</code>
        <div className="flex items-center gap-1">
          <ShieldCheck size={12} className="text-emerald" />
          <span className="text-[9px] text-emerald font-bold uppercase">Verified</span>
        </div>
      </div>
    </div>
  );
}