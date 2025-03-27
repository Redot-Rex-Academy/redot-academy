<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import {
  ArrowRightEndOnRectangleIcon,
} from '@heroicons/vue/16/solid'

import useAuth from '../composables/useAuth'
import userStore from '../stores/userStore'
import RAButton from './RAButton.vue'
import VPFlyout from 'vitepress/dist/client/theme-default/components/VPFlyout.vue'

const { authenticate, logout: _logout } = useAuth()
const { user, authenticated, authenticating } = storeToRefs(userStore())
authenticating.value = true

authenticate()

const _authenticating = ref(true)
const open = ref(false)

setTimeout(() => {
  _authenticating.value = false
}, 2000)

const text = computed(() => {
  return authenticating.value || _authenticating.value ? 'Loading...' : authenticated.value ? 'Profile' : 'Sign in'
})
const disabled = computed(() => authenticating.value === true || _authenticating.value === true)
const icon = computed(() => authenticating.value || _authenticating.value ? 'vpi-icon-loading' : 'vpi-icon-user')

const logout = async () => {
  await _logout()
  window.location.href = '/'
}
</script>


<template>
  <div class="pl-8">
    <VPFlyout label="profile" :icon="icon">
      <ul class="grid grid-cols-2 gap-2 !p-2 place-items-center">
        <li class="grid grid-cols-subgrid col-span-full"><a href="/profile" class="grid grid-cols-[min-content_auto] col-span-full items-center" v-if="authenticated && !authenticating"><span class="vpi-icon-user option-icon mr-2" /><span>Profile</span></a></li>
        <li class="grid grid-cols-subgrid col-span-full"><a  @click="logout" class="grid grid-cols-[min-content_auto] col-span-full cursor-pointer items-center" v-if="authenticated && !authenticating"><span class="vpi-icon-leave option-icon mr-2" /><span>Logout</span></a></li>
        <li class="grid grid-cols-subgrid col-span-full"><a href="/login" class="grid grid-cols-[min-content_auto] col-span-full cursor-pointer items-center" v-if="!authenticated && !authenticating"><span class="vpi-icon-enter option-icon mr-2"/><span>Login</span></a></li>
      </ul>
    </VPFlyout>
  </div>
</template>


<style scoped>

</style>
