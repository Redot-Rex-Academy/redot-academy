import type { Bookmark } from '../models/Bookmark'

import { storeToRefs } from 'pinia'
import useBookmarkStore from '../stores/bookmarkStore'
import useAuth from './useAuth'

import useClient from './useClient'

export default () => {
  const { client } = useClient()
  const { user } = useAuth()

  const { bookmarks, loading } = storeToRefs(useBookmarkStore())

  const fetchBookmarks = async () => {
    const { data, error } = await client
      .from('bookmarks')
      .select('*')

    if (error) {
      console.error('Error fetching bookmarks:', error)
      return null
    }

    console.log('Fetched bookmarks:', data)
    bookmarks.value = data || []

    return data
  }

  const toggleBoomkark = async (bookmark: Bookmark) => {
    console.log('Toggling bookmark:', bookmark)
    bookmarks.value.some(b => b.id === bookmark.id)
      ? removeBookmark(bookmark)
      : addBookmark(bookmark)
  }

  const removeBookmark = async (bookmark: Bookmark) => {
    const { data, error } = await client
      .from('bookmarks')
      .delete()
      .eq('id', bookmark.id)

    if (error) {
      console.error('Error removing bookmark:', error)
      return false
    }

    bookmarks.value = bookmarks.value.filter(b => b.id !== bookmark.id)

    return true
  }

  const addBookmark = async (bookmark) => {
    console.log({ bookmark })
    if (!user.value) return false

    const { data, error } = await client
      .from('bookmarks')
      .insert({
        user_id: user.value?.id,
        title: bookmark.title,
        path: bookmark.path,
        updated_at: bookmark.updated_at,
      })
      .select()

    if (error) {
      console.error('Error adding bookmark:', error)
      return false
    }

    bookmarks.value.push(data[0])
    return true
  }

  return {
    bookmarks,
    loading,
    fetchBookmarks,
    toggleBoomkark,
    addBookmark,
    removeBookmark,
  }
}
