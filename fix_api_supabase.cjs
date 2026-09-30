const fs = require('fs');
let code = fs.readFileSync('src/lib/api.ts', 'utf8');

const target = /\/\/ In a real app, this would be an RPC call[\s\S]*?return;/;
const replacement = `
      const res = await fetch(\`\${SUPABASE_URL}/rest/v1/rpc/increment_vote\`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': \`Bearer \${SUPABASE_KEY}\`
        },
        body: JSON.stringify({ row_slug: slug, add_score: ratingDiff, add_upvotes: upvoteDiff })
      });
      if (res.ok) {
        console.log(\`[Supabase] Synced vote for \${slug}\`);
        return;
      } else {
        console.warn("Supabase RPC failed", await res.text());
      }`;

code = code.replace(target, replacement);
fs.writeFileSync('src/lib/api.ts', code, 'utf8');
console.log("Upgraded Supabase integration in api.ts");
