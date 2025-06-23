---
Title: Bookmarks
layout: page
---

<script lang="ts" setup>
import { ref } from 'vue'

import useBookmarks from '@app/theme/composables/useBookmarks'

import RASortedTable from '@app/theme/components/RASortedTable.vue'

const { bookmarks } = useBookmarks()

const columnDisplay = (items: Bookmark[]) => [
  { title: 'Title' },
  { updated_at: 'Added' },
]

const valueDisplay = (items: Bookmarks[]): Array<Record<string, string>> => {
  const ret = []
  items.forEach(item => {
    let vals = []
    Object.keys(item).forEach(key => {
      if (!['title', 'updated_at'].includes(key)) return
      console.log('adding', key, 'for', item.title)
      vals.push({ [key]: item[key] })
    })
    ret.push(vals)
  })

  return ret
}
</script>

<div class="grid border-1 border-gray-500 rounded-md m-4">
  <div class="place-self-center min-w-[300px] lg:min-w-[740px] max-w-[960px] p-8">
    <RASortedTable
      :items="bookmarks"
      :items-per-page="20"
      :column-display="columnDisplay"
      :value-display="valueDisplay"
    />
  </div>
</div>
