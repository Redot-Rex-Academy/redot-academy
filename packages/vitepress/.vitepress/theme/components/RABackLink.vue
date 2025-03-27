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
  <a :href="backLink.r || ''" v-if="backLink.r && backLink.b">
    <span v-text="'< back to:'" /><br />
    <span v-text="backLink.b" />
  </a>
</template>

<style scoped>
a {
  color: var(--color-red-400);
}
a:hover {
  color: var(--color-red-300);
}
span {
  padding: 0 0 2rem 1rem;
}
</style>
