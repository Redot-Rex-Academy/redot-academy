import type { Bookmark } from '../models/Bookmark'

import { ref } from 'vue'
import { defineStore } from 'pinia'

export default defineStore('bookmark', () => {
  const loading = ref(false)
  const bookmarks = ref<Bookmark[]>([])

  return {
    loading,
    bookmarks,
  }
})
