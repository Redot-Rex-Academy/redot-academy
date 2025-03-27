<script setup lang="ts">
import { ref, unref } from 'vue'

import useAuth from '../composables/useAuth'

const { login } = useAuth()

const email = ref('')
const password = ref('')
const error = ref('')

const submit = async () => {
  const { data, error: _error } = await login({ email: unref(email), password: unref(password) })

  if (_error) {
    error.value = _error && _error.message || ''
    setTimeout(() => {
      error.value = ''
    }, 5000)
  } else {
    window.location.href = '/'
  }
}
</script>


<template>
  <div class="grid place-items-center w-full h-[100dvh]">
    <form class="grid gap-8 w-full sm:w-96 p-8 rounded-xl bg-neutral-800" @submit.prevent="submit">
      <h1 class="!text-4xl justify-self-center">Login</h1>
      <p class="text-red-400 text-center">{{ error }}</p>
      <input type="email" placeholder="Email" class="!px-4 !py-2 rounded-full !bg-neutral-700" v-model="email" />
      <input type="password" placeholder="Password" class="!px-4 !py-2 rounded-full !bg-neutral-700" v-model="password" />
      <button class="!p-4 !text-xl rounded-full !bg-red-500 hover:!bg-red-400 text-neutral-100 transition-all duration-200">Login</button>
    </form>
  </div>
</template>


<style scoped>

</style>
