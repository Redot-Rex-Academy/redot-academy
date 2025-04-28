import type { Progress } from '../models/Progress'
import type { ProgressIdentifier } from '../models/ProgressIdentifiers'

import { ref } from 'vue'
import { defineStore } from 'pinia'

export default defineStore('progress', () => {
  const loading = ref(true)
  const progress = ref<Progress[]>([])
  const progressIdentifiers = ref<ProgressIdentifier[]>([])

  return {
    loading,
    progress,
    progressIdentifiers,
  }
})
