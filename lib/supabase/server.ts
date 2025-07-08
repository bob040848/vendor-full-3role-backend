// lib/supabase/server.ts
import { createClient } from '@supabase/supabase-js'

export const supabaseServer = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
export const supabaseService = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
        