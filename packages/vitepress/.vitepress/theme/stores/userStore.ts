import type { User } from '@supabase/supabase-js'

import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export default defineStore('user', () => {
  const loading = ref(true)
  const user = ref<User | null>(null)
  const authenticating = ref(false)
  const authenticated = computed(() => user.value !== null)
  
  return {
    user,
    authenticated,
    loading,
    authenticating,
  }
})
