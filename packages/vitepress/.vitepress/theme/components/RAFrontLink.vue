<script setup lang="ts">
import { useData, useRouter } from 'vitepress'
import { useBackLinks } from '../composables/useBackLinks'

const { frontmatter } = useData()
const router = useRouter()
const { backLink } = useBackLinks()

router.onBeforeRouteChange = () => {
  if (!frontmatter.value.backlinked === true) {
    backLink.value = {}
  } else {
    backLink.value = {
      ...backLink.value,
      r: router.route.path,
      b: frontmatter.value.title,
    }
  }
}
</script>

<template>
  <a :href="backLink.r">
    {{ backLink.b }}
  </a>
</template>
