<script lang="ts" setup generic="T">
import { computed } from 'vue'
import { useData, useRouter } from 'vitepress'
import useAuth from '../composables/useAuth'
import { StarIcon } from '@heroicons/vue/24/solid'
import useBookmarks from '../composables/useBookmarks'
import RAButton from './RAButton.vue'

const { frontmatter } = useData()
const router = useRouter()
const { authenticated } = useAuth()

const { bookmarks, loading, toggleBoomkark } = useBookmarks()

const isBookmarked = computed(() =>
  bookmarks.value.some(bookmark => bookmark.path === router.route.path))

const toggle = () => {
  if (loading.value) return
  const existingBookmark = bookmarks.value.find(
    bookmark => bookmark.path === router.route.path
  ) || {}

  toggleBoomkark({
    ...existingBookmark,
    title: frontmatter.value.title,
    path: router.route.path,
  })
}
</script>

<template>
  <RAButton
    v-if="authenticated"
    class="mb-4"
    theme="alt"
    :text="isBookmarked ? 'Remove bookmark' : 'Bookmark'"
    :icon="StarIcon"
    @click="toggle"
  />
</template>
