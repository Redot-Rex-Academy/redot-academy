<script setup lang="ts">
import type { FunctionalComponent } from 'vue'
import { computed } from 'vue'
import { normalizeLink } from 'vitepress/dist/client/theme-default/support/utils.js'
import { EXTERNAL_URL_RE } from 'vitepress/dist/client/shared.js'

interface Props {
  tag?: string
  size?: 'medium' | 'big'
  theme?: 'brand' | 'alt' | 'sponsor'
  text: string
  href?: string
  target?: string
  rel?: string
  disabled?: boolean
  icon?: FunctionalComponent
  state?: 'loading' | 'success' | 'error' | 'default'
}
const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  theme: 'brand',
  state: 'default',
})

const isExternal = computed(
  () => props.href && EXTERNAL_URL_RE.test(props.href)
)

const component = computed(() => {
  return props.tag || (props.href ? 'a' : 'button')
})
</script>

<template>
  <component
    :is="component"
    class="VPButton mx-4"
    :class="[
      size,
      theme,
      disabled ? 'cursor-not-allowed' : '',
      props.icon ? '!grid !grid-cols-[24px_auto]' : '',
      `state-${props.state}`,
    ]"
    :href="href ? normalizeLink(href) : undefined"
    :target="props.target ?? (isExternal ? '_blank' : undefined)"
    :rel="props.rel ?? (isExternal ? 'noreferrer' : undefined)"
    :disabled="props.disabled && component === 'button'"
  >
    <component v-if="icon" :is="icon" class="place-self-center" />
    <span>{{ text }}</span>
  </component>
</template>

<style scoped>
.VPButton {
  display: inline-block;
  border: 1px solid transparent;
  text-align: center;
  font-weight: 600;
  white-space: nowrap;
  transition: color 0.25s, border-color 0.25s, background-color 0.25s, box-shadow 0.25s;
}

.VPButton:not(:disabled):active {
  transition: color 0.1s, border-color 0.1s, background-color 0.1s;
}

.VPButton.medium {
  border-radius: 20px;
  padding: 0 20px;
  line-height: 38px;
  font-size: 14px;
}

.VPButton.big {
  border-radius: 24px;
  padding: 0 24px;
  line-height: 46px;
  font-size: 16px;
}

.VPButton.brand {
  border-color: var(--vp-button-brand-border);
  color: var(--vp-button-brand-text);
  background-color: var(--vp-button-brand-bg);
}

.VPButton:disabled {
  opacity: 0.5;
}

.VPButton.brand:not(:disabled):hover {
  border-color: var(--vp-button-brand-hover-border);
  color: var(--vp-button-brand-hover-text);
  background-color: var(--vp-button-brand-hover-bg);
}

.VPButton.brand:not(:disabled):active {
  border-color: var(--vp-button-brand-active-border);
  color: var(--vp-button-brand-active-text);
  background-color: var(--vp-button-brand-active-bg);
}

.VPButton.alt {
  border-color: var(--vp-button-alt-border);
  color: var(--vp-button-alt-text);
  background-color: var(--vp-button-alt-bg);
}

.VPButton.alt:hover {
  border-color: var(--vp-button-alt-hover-border);
  color: var(--vp-button-alt-hover-text);
  background-color: var(--vp-button-alt-hover-bg);
}

.VPButton.alt:active {
  border-color: var(--vp-button-alt-active-border);
  color: var(--vp-button-alt-active-text);
  background-color: var(--vp-button-alt-active-bg);
}

.VPButton.sponsor {
  border-color: var(--vp-button-sponsor-border);
  color: var(--vp-button-sponsor-text);
  background-color: var(--vp-button-sponsor-bg);
}

.VPButton.sponsor:hover {
  border-color: var(--vp-button-sponsor-hover-border);
  color: var(--vp-button-sponsor-hover-text);
  background-color: var(--vp-button-sponsor-hover-bg);
}

.VPButton.sponsor:active {
  border-color: var(--vp-button-sponsor-active-border);
  color: var(--vp-button-sponsor-active-text);
  background-color: var(--vp-button-sponsor-active-bg);
}

/* State animations */
.VPButton.state-loading {
  animation: loading-glow 2s ease-in-out infinite;
}

.VPButton.state-success {
  animation: success-pulse 0.6s ease-out;
}

.VPButton.state-error {
  animation: error-pulse 0.6s ease-out;
}

/* Loading animation - back and forth glow */
@keyframes loading-glow {
  0%, 100% {
    box-shadow: 0 0 8px var(--color-blue-500);
  }
  50% {
    box-shadow: 0 0 16px var(--color-blue-400), 0 0 20px var(--color-blue-500);
  }
}

/* Success animation - green pulse */
@keyframes success-pulse {
  0% {
    box-shadow: 0 0 0 var(--color-emerald-500);
  }
  50% {
    box-shadow: 0 0 8px var(--color-emerald-400), 0 0 16px var(--color-emerald-500);
  }
  100% {
    box-shadow: 0 0 0 rgba(34, 197, 94, 0);
  }
}

/* Error animation - red pulse */
@keyframes error-pulse {
  0% {
    box-shadow: 0 0 0 var(--color-rose-500);
  }
  50% {
    box-shadow: 0 0 8px var(--color-rose-400), 0 0 16px var(--color-rose-500);
  }
  100% {
    box-shadow: 0 0 0 rgba(239, 68, 68, 0);
  }
}
</style>
