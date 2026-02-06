// Helper to verify a wallet address against the Torch Protocol / SAID layer
export async function checkSaidIdentity(walletAddress: string) {
  try {
    // Note: We're hitting the Torch API to check SAID reputation
    const response = await fetch(`https://torch-market-api.vercel.app/api/verify/${walletAddress}`);
    
    if (!response.ok) {
      return { verified: false, score: 0, tier: 'None' };
    }
    
    const data = await response.json();
    
    return {
      verified: data.status === 'verified',
      score: data.reputation_score || 0,
      tier: data.tier || 'None'
    };
  } catch (error) {
    console.error("Protocol Identity Check Error:", error);
    return { verified: false, score: 0, tier: 'None' };
  }
}