import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Redot Academy",
  description: "Redot resources for making games and fun!",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'User Guide', link: '/pages/user-guide' },
      { text: 'Tracks', link: '/pages/tracks/_index' },
      { text: 'Tutorials', link: '/pages/tutorials/_index' },
    ],

    sidebar: {
      '/pages/': [
        {
          text: 'Tracks',
          items: [
            { text: '3rd Person 3D Action RPG', link: '/pages/tracks/3d-3rdp-action-rpg' },
          ],
        },
        {
          text: 'Tutorials',
          items: [
            { text: 'Create your first project', link: '/pages/tutorials/create-your-first-project' },
            { text: 'Create your initial 3D scene', link: '/pages/tutorials/set-up-initial-3d-scene' },
            { text: '3rd person 3D Character ', link: '/pages/tutorials/character_controller_3d_3rdp' },
          ],
        },
      ],
      '/profile': [
        {
          items: [
            { text: 'Dashboard', link: '/profile' },
            { text: 'Progress', link: '/profile/progress' },
            // { text: 'Bookmarks', link: '/profile/bookmarks' },
          ],
        },
      ],
    },

    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ]
  },

  rewrites: {
    'auth/login.md': '/auth/login.md',
  },

  vite: {
    plugins: [
      tailwindcss(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@default-theme': 'vitepress/dist/client/theme-default',
      }
    },
  },
})
