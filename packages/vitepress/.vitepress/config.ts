import { defineConfig, Header } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'
import vueDevTools from 'vite-plugin-vue-devtools'

import useBuildOnlyEnv from './theme/composables/useBuildOnlyEnv'

import useClient from './theme/composables/useClient'

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

  markdown: {
    headers: {
      level: [1, 2, 3],
    },
  },

  rewrites: {
    'auth/login.md': '/auth/login.md',
  },

  transformPageData: async (pageData) => {
    if (process.env.NODE_ENV !== 'production' || !pageData.frontmatter.tutorialType) {
      return
    }

    const extractProgressIdentifiers = (headers: Header[]): ProgressIdentifier[] => {
      const result: ProgressIdentifier[] = []
      
      headers.forEach((header) => {
        const { level, slug, children, title, link } = header

        const progressIdentifier: ProgressIdentifier = {
          title: pageData.title,
          identifier: `${pageData.filePath}/${slug}`,
          header: title,
          level,
          tutorialType: pageData.frontmatter.tutorialType,
        }

        result.push(progressIdentifier)
        
        if (children && children.length > 0) {  
          result.push(...extractProgressIdentifiers(children))
        }
      })
      
      return result
    }

    const { default: { SUPABASE_SECRET_KEY: secret, SUPABASE_URL: url } } = await useBuildOnlyEnv()
    const { client } = useClient({ secret, url })

    const identifiers = extractProgressIdentifiers(pageData.headers)

    const response = (await client.from('identifiers').select())

    if (response.error) {
      console.error('Error when querying identifiers', response.error)
      return
    }

    const existingIdentifiers = response.data as ProgressIdentifier[]

    const upserts = identifiers.filter((identifier) => existingIdentifiers.find((ei) => ei.identifier === identifier.identifier))
    const newIdentifiers = identifiers.filter((identifier) => !existingIdentifiers.find((ei) => ei.identifier === identifier.identifier))

    if (upserts.length > 0) {
      const { error } = await client.from('identifiers').upsert(upserts)
      if (error) {
        console.error('Error when upserting identifiers', error)
      }
    }

    if (newIdentifiers.length > 0) {
      const { error } = await client.from('identifiers').insert(newIdentifiers)
      if (error) {
        console.error('Error when inserting identifiers', error)
      }
    }
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

interface ProgressIdentifier {
  title: string,
  identifier: string,
  header: string,
  level: number,
  tutorialType: 'track' | 'tutorial' | 'factoid',
}
