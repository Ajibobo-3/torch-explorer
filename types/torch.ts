export interface TorchAgent {
  id: string; // The SAID Protocol unique ID
  name: string;
  wallet_address: string;
  reputation_score: number; // 0-100 scale
  tier: 'Emerald' | 'Blue' | 'Yellow';
  status: 'active' | 'pending' | 'flagged';
  twitter_handle?: string;
  verified_at: string; // ISO Date string for contributor tracking
}