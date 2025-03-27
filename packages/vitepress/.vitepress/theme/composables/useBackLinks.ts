import { ref } from 'vue'

const backLink = ref<{
  r?: string
  b?: string
}>({})

export const useBackLinks = () => {
  return {
    backLink,
  }
}
