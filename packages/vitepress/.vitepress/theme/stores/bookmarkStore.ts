import type { Bookmark } from '../models/Bookmark'

import { ref } from 'vue'
import { defineStore } from 'pinia'

export default defineStore('bookmark', () => {
  const state = ref<'error' | 'success' | 'loading' | 'default'>('default')
  const bookmarks = ref<Bookmark[]>([])

  return {
    state,
    bookmarks,
  }
})
