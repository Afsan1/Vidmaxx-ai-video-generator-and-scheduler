const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function debug() {
  console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { data, error } = await supabase
    .from('generated_videos')
    .select('*')
    .limit(1);

  if (error) {
    console.error("DEBUG ERROR:", error);
  } else {
    console.log("COLUMNS:", Object.keys(data[0] || {}));
    console.log("SUCCESS");
  }
}

debug();
