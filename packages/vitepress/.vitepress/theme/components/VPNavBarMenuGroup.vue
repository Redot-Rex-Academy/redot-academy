<script lang="ts" setup>
import type { DefaultTheme } from 'vitepress/theme'
import { computed } from 'vue'
import { useData } from '@default-theme/composables/data'
import { isActive } from '@default-theme/../shared'
import VPFlyout from '@default-theme/components/VPFlyout.vue'

const props = defineProps<{
  item: DefaultTheme.NavItemWithChildren
}>()

const { page } = useData()

const isChildActive = (navItem: DefaultTheme.NavItem) => {
  if ('component' in navItem) return false

  if ('link' in navItem) {
    return isActive(
      page.value.relativePath,
      navItem.link,
      !!props.item.activeMatch
    )
  }

  return navItem.items.some(isChildActive)
}

const childrenActive = computed(() => isChildActive(props.item))
</script>

<template>
  <VPFlyout
    :class="{
      VPNavBarMenuGroup: true,
      active:
        isActive(page.relativePath, item.activeMatch, !!item.activeMatch) ||
        childrenActive
    }"
    :button="item.text"
    :items="item.items"
  />
</template>
