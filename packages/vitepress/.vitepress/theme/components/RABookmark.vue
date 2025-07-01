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

const { bookmarks, state, toggleBoomkark } = useBookmarks()

const isBookmarked = computed(() =>
  bookmarks.value.some(bookmark => bookmark.path === router.route.path))

const toggle = async () => {
  if (state.value !== 'default') return
  const existingBookmark = bookmarks.value.find(
    bookmark => bookmark.path === router.route.path
  ) || {}
  state.value = 'loading'
  setTimeout(async () => {
    try {
      await toggleBoomkark({
        ...existingBookmark,
        title: frontmatter.value.title,
        path: router.route.path,
      })

      state.value = 'success'
    } catch (error) {
      state.value = 'error'
    } finally {
      setTimeout(() => {
        state.value = 'default'
      }, 1000)
    }
  }, 500)
}
</script>

<template>
  <RAButton
    v-if="authenticated"
    class="RABookmarkButton mb-4"
    theme="alt"
    :class="[
      `state-${isBookmarked ? 'active' : 'inactive'}`,
    ]"
    :text="isBookmarked ? 'Remove bookmark' : 'Bookmark'"
    :icon="StarIcon"
    :state="state"
    @click="toggle"
  />
</template>

<style scoped>
.RABookmarkButton :deep(svg) {
  transition: fill 0.25s;
}

.RABookmarkButton.state-active :deep(svg) {
  fill: var(--color-yellow-500);
}

.RABookmarkButton.state-inactive :deep(svg) {
  fill: auto;
}
</style>
