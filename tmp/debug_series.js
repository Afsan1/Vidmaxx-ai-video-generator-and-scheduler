const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function debug() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { data, error } = await supabase
    .from('video_series')
    .select('*')
    .limit(1);

  if (error) {
    console.error("DEBUG ERROR:", error);
  } else {
    console.log("VIDEO_SERIES COLUMNS:", Object.keys(data[0] || {}));
  }
}

debug();
