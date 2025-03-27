// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import { createPinia } from 'pinia'
import Layout from './Layout.vue'
import DefaultTheme from 'vitepress/theme'

import RALogin from './components/RALogin.vue'

import './style.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    app.use(createPinia())
    app.component('RALogin', RALogin)
  }
} satisfies Theme
