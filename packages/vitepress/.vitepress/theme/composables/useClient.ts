import type { SupabaseClient } from '@supabase/supabase-js'

import { createClient } from '@supabase/supabase-js'

// Global Supabase client
let client: SupabaseClient | null = null

export default (options?: { url?: string, secret?: string }) => {
  // Default to public key
  let key = import.meta.env.VITE_SUPABASE_PUB_KEY

  // Check if a secret key was provided
  if (options && options.secret) {
    // override public key with given secret key
    key = options.secret
  }

  if (!client) {
    const url = options && options.url ? options.url : import.meta.env.VITE_SUPABASE_URL

    if (!url || !key) {
      throw new Error('Supabase URL and Key are required')
    }

    client = createClient(url, key)
  }

  return {
    client,
  }
}
