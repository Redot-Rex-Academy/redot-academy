import type { ProgressIdentifier } from '../models/ProgressIdentifiers'

import { storeToRefs } from 'pinia'

import progressStore from '../stores/progressStore'
import useClient from './useClient'

export default () => {
  const { client } = useClient()

  const progressStoreInstance = progressStore()
  const { loading, progress, progressIdentifiers } = storeToRefs(progressStoreInstance)

  const fetchProgress = async () => {
    const { data, error } = await client
      .from('progress')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)

    if (error) {
      console.error('Error fetching progress:', error)
      return null
    }

    console.log('Fetched progress:', data)

    return data[0]
  }

  const fetchProgressIdentifiers = async (): Promise<ProgressIdentifier[] | null> => {
    const { data, error } = await client
      .from('identifiers')
      .select()

    if (error) {
      console.error('Error fetching progress identifiers:', error)
      return null
    }

    console.log('Fetched progress identifiers:', data)

    return data
  }

  fetchProgress()
  fetchProgressIdentifiers()

  return {
    loading,
    progress,
    progressIdentifiers,

    fetchProgress,
    fetchProgressIdentifiers,
  }
}
