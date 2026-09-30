/**
 * Global Leaderboard & Voting API
 * 
 * Industry-level integration for tracking community votes.
 * 
 * To activate the real backend:
 * 1. Create a free Supabase project (https://supabase.com)
 * 2. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file
 * 3. Create a table: `puja_votes` with columns `slug` (text, primary key), `score` (int, default 0), `upvotes` (int, default 0).
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Fallback Mock Database (Simulating a real backend until Supabase keys are added)
const mockGlobalDb: Record<string, { score: number, upvotes: number }> = {};

/**
 * Fetches the global leaderboard from the backend.
 */
export async function fetchGlobalLeaderboard() {
  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/puja_votes?select=*`, {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        const map: Record<string, { score: number, upvotes: number }> = {};
        for (const row of data) {
          map[row.slug] = { score: row.score, upvotes: row.upvotes };
        }
        return map;
      }
    } catch (e) {
      console.warn("Failed to fetch from Supabase, falling back to mock DB");
    }
  }

  // Mock implementation
  await new Promise(r => setTimeout(r, 500)); // Simulate network latency
  
  // If the mock DB is empty, initialize it with a seed
  if (Object.keys(mockGlobalDb).length === 0) {
    // Generate some fake global activity
    return {};
  }
  return { ...mockGlobalDb };
}

/**
 * Submits a vote/rating to the global backend.
 */
export async function submitGlobalVote(slug: string, ratingDiff: number, upvoteDiff: number) {
  if (ratingDiff === 0 && upvoteDiff === 0) return;

  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      
      const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/increment_vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        },
        body: JSON.stringify({ row_slug: slug, add_score: ratingDiff, add_upvotes: upvoteDiff })
      });
      if (res.ok) {
        console.log(`[Supabase] Synced vote for ${slug}`);
        return;
      } else {
        console.warn("Supabase RPC failed", await res.text());
      }
    } catch (e) {
      console.warn("Supabase vote failed");
    }
  }

  // Mock implementation
  await new Promise(r => setTimeout(r, 300));
  if (!mockGlobalDb[slug]) {
    mockGlobalDb[slug] = { score: 0, upvotes: 0 };
  }
  mockGlobalDb[slug].score += ratingDiff;
  mockGlobalDb[slug].upvotes += upvoteDiff;
  console.log(`[Mock Backend] Synced vote for ${slug}. Total Global Score Diff: ${mockGlobalDb[slug].score}`);
}
