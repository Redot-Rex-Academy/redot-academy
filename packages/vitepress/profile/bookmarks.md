---
Title: Bookmarks
layout: page
---

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vitepress'

import useBookmarks from '@app/theme/composables/useBookmarks'

import RASortedTable from '@app/theme/components/RASortedTable.vue'

const { bookmarks } = useBookmarks()
const router = useRouter()

const columnDisplay = (items: Bookmark[]) => [
  { title: 'Title' },
  { updated_at: 'Added' },
]

const valueDisplay = (items: Bookmark[]): Array<Record<string, string>> => {
  const ret = []
  items.forEach(item => {
    let vals = []
    Object.keys(item).forEach(key => {
      vals.push({ [key]: item[key] })
    })
    ret.push(vals)
  })

  return ret
}

const filteredCols = (item: Bookmark) => item.filter(col => col.title || col.updated_at)

const go = (item: Bookmark) => {
  router.go(item.find((col) => !!col.path).path)
}
</script>

<div class="grid border-1 border-gray-500 rounded-md m-4">
  <div class="place-self-center min-w-[300px] lg:min-w-[740px] max-w-[960px] p-8">
    <RASortedTable
      :items="bookmarks"
      :items-per-page="20"
      :column-display="columnDisplay"
      :value-display="valueDisplay"
    >
      <template v-slot="{ row, n }">
        <div
          class="grid grid-cols-subgrid col-span-full cursor-pointer hover:bg-neutral-800"
          @click="go(row)"
        >
          <div v-for="(col, i) in filteredCols(row)" :key="`col-${n}-${i}`">
            {{ col.title || col.updated_at }}
          </div>
        </div>
      </template>
    </RASortedTable>
  </div>
</div>
