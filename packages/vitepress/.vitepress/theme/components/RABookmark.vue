<script lang="ts" setup generic="T">
import { computed } from 'vue'
import { useData, useRouter } from 'vitepress'
import { StarIcon } from '@heroicons/vue/24/solid'
import useBookmarks from '../composables/useBookmarks'
import RAButton from './RAButton.vue'

const { frontmatter } = useData()
const router = useRouter()

const { bookmarks, loading, toggleBoomkark } = useBookmarks()

const toggle = () => {
  if (loading.value) return
  toggleBoomkark({
    title: frontmatter.value.title,
    path: router.route.path,
  })
}
</script>

<template>
  <RAButton
    class="mb-4"
    text="Bookmark"
    theme="alt"
    :icon="StarIcon"
    @click="toggle"
  />
</template>
