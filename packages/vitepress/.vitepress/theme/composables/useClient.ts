import { createClient } from '@supabase/supabase-js'

// Global Supabase client
const client = createClient(
  'https://fnsqodgydunmhpxwfcvh.supabase.co',
  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuc3FvZGd5ZHVubWhweHdmY3ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NDE3NTYsImV4cCI6MjA1ODUxNzc1Nn0.zHMM_UISNd6VlC_OEpbspekITN81F6_onoZpkotCmqY`
)

export default () => {
  return {
    client,
  }
}
