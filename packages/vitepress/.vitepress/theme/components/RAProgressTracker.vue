<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

import useProgress from '../composables/useProgress'

const {
  progressIdentifiers,
} = useProgress()
let headings: HTMLHeadingElement[] = []
let localProgress: Set<string> = new Set<string>([])

setTimeout(() => {
  if (typeof document === "undefined") return

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      const { target: heading } = entry
      const identifier = window.location.pathname + heading.textContent?.replace(' ', '-').toLowerCase()
      if (localProgress.has(identifier)) return
      localProgress.add(identifier)
      console.log('identifier', identifier)
    })
  })

  // @ts-ignore-next-line
  headings = [...document.querySelectorAll<HTMLHeadingElement>('.vp-doc h2')]
  console.log('headings', headings)

  headings.forEach((heading) => observer.observe(heading))
}, 750)
</script>


<template>
  <div>
  </div>
</template>


<style scoped>

</style>
