'use client';
import { useEffect, useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import AgentCard from '@/components/AgentCard';
import SubmissionModal from '@/components/SubmissionModal';
import { TorchAgent } from '@/types/torch';

const MOCK_AGENTS: TorchAgent[] = [
  { id: '1', name: 'PIPPIN_AI', tier: 'Emerald', wallet_address: '0x7f3k9...8822', reputation_score: 98, status: 'active', verified_at: '2026-02-01' },
  { id: '2', name: 'SOL_SENTINEL', tier: 'Emerald', wallet_address: '0x4a9p2...1100', reputation_score: 92, status: 'active', verified_at: '2026-02-03' },
  { id: '3', name: 'GHOST_PROTOCOL', tier: 'Blue', wallet_address: '0x2b1x4...9944', reputation_score: 65, status: 'active', verified_at: '2026-02-05' },
];

export default function Home() {
  const [agents, setAgents] = useState<TorchAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchTorchData() {
      try {
        const response = await fetch('https://torch-market-api.vercel.app/api/agents');
        const data = await response.json();
        setAgents(data.length > 0 ? data : MOCK_AGENTS);
      } catch (error) {
        setAgents(MOCK_AGENTS);
      } finally {
        setLoading(false);
      }
    }
    fetchTorchData();
  }, []);

  const filteredAgents = agents.filter(agent => {
    const matchesTier = selectedTier === 'All' || agent.tier === selectedTier;
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          agent.wallet_address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-obsidian text-white p-8 md:p-12">
      <nav className="flex justify-between items-center mb-20 max-w-6xl mx-auto">
        <h1 className="text-gold font-black tracking-tighter text-xl italic underline decoration-gold/30">
          TORCH_CONTRIBUTOR_v1
        </h1>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-[10px] font-bold text-gold border border-gold/20 px-4 py-2 rounded-lg hover:bg-gold/10 transition-all uppercase tracking-widest hidden md:block"
          >
            + Register Agent
          </button>
          <WalletMultiButton className="luxury-wallet-button" />
        </div>
      </nav>

      <div className="max-w-6xl mx-auto mb-12 flex flex-col items-center gap-6">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 text-center">
          Protocol Explorer
        </h2>
        
        <div className="w-full max-w-md relative group">
          <div className="absolute -inset-0.5 bg-gold/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <input 
            type="text"
            placeholder="Search by name or hash..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="relative w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold/50 transition-all text-white placeholder:text-white/20 backdrop-blur-sm"
          />
        </div>

        <div className="flex flex-wrap justify-center bg-white/5 p-1 rounded-xl border border-white/10 backdrop-blur-sm">
          {['All', 'Emerald', 'Blue', 'Yellow'].map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={`px-4 md:px-6 py-2 rounded-lg text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                selectedTier === tier 
                ? 'bg-gold text-obsidian shadow-[0_0_20px_rgba(212,175,55,0.4)]' 
                : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full text-center py-20 text-gold animate-pulse font-mono tracking-widest uppercase text-xs">
            Authenticating Protocol...
          </div>
        ) : filteredAgents.length > 0 ? (
          filteredAgents.map((agent) => (
            <AgentCard 
              key={agent.id} 
              name={agent.name} 
              tier={agent.tier} 
              hash={agent.wallet_address}
              reputation={agent.reputation_score}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-24 border border-dashed border-white/10 rounded-3xl">
            <p className="text-white/20 uppercase text-[10px] tracking-[0.3em] font-bold">
              No entities found in this sector
            </p>
          </div>
        )}
      </div>

      <SubmissionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}