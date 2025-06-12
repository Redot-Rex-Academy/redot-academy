---
Title: Bookmarks
layout: page
---

<script lang="ts" setup>
import { ref } from 'vue'

import RASortedTable from '@app/theme/components/RASortedTable.vue'


const bookmarks = ref([
  { id: 1, title: 'bookmark 1', path: '', updated_at: '', },
  { id: 2, title: 'bookmark 2', path: '', updated_at: '', },
  { id: 3, title: 'bookmark 3', path: '', updated_at: '', },
  { id: 4, title: 'bookmark 4', path: '', updated_at: '', },
  { id: 5, title: 'bookmark 5', path: '', updated_at: '', },
  { id: 6, title: 'bookmark 6', path: '', updated_at: '', },
  { id: 7, title: 'bookmark 7', path: '', updated_at: '', },
  { id: 8, title: 'bookmark 8', path: '', updated_at: '', },
  { id: 9, title: 'bookmark 9', path: '', updated_at: '', },
  { id: 10, title: 'bookmark 10', path: '', updated_at: '', },
  { id: 11, title: 'bookmark 11', path: '', updated_at: '', },
  { id: 12, title: 'bookmark 12', path: '', updated_at: '', },
  { id: 13, title: 'bookmark 13', path: '', updated_at: '', },
  { id: 14, title: 'bookmark 14', path: '', updated_at: '', },
  { id: 15, title: 'bookmark 15', path: '', updated_at: '', },
  { id: 16, title: 'bookmark 16', path: '', updated_at: '', },
  { id: 17, title: 'bookmark 17', path: '', updated_at: '', },
  { id: 18, title: 'bookmark 18', path: '', updated_at: '', },
  { id: 19, title: 'bookmark 19', path: '', updated_at: '', },
  { id: 20, title: 'bookmark 20', path: '', updated_at: '', },
  { id: 21, title: 'bookmark 21', path: '', updated_at: '', },
  { id: 22, title: 'bookmark 22', path: '', updated_at: '', },
  { id: 23, title: 'bookmark 23', path: '', updated_at: '', },
  { id: 24, title: 'bookmark 24', path: '', updated_at: '', },
  { id: 25, title: 'bookmark 25', path: '', updated_at: '', },
  { id: 26, title: 'bookmark 26', path: '', updated_at: '', },
  { id: 27, title: 'bookmark 27', path: '', updated_at: '', },
  { id: 28, title: 'bookmark 28', path: '', updated_at: '', },
  { id: 29, title: 'bookmark 29', path: '', updated_at: '', },
  { id: 30, title: 'bookmark 30', path: '', updated_at: '', },
  { id: 31, title: 'bookmark 31', path: '', updated_at: '', },
  { id: 32, title: 'bookmark 32', path: '', updated_at: '', },
  { id: 33, title: 'bookmark 33', path: '', updated_at: '', },
  { id: 34, title: 'bookmark 34', path: '', updated_at: '', },
  { id: 35, title: 'bookmark 35', path: '', updated_at: '', },
  { id: 36, title: 'bookmark 36', path: '', updated_at: '', },
  { id: 37, title: 'bookmark 37', path: '', updated_at: '', },
  { id: 38, title: 'bookmark 38', path: '', updated_at: '', },
  { id: 39, title: 'bookmark 39', path: '', updated_at: '', },
  { id: 40, title: 'bookmark 40', path: '', updated_at: '', },
  { id: 41, title: 'bookmark 41', path: '', updated_at: '', },
])
</script>

<div class="grid border-1 border-gray-500 rounded-md m-4">
  <div class="place-self-center min-w-[300px] lg:min-w-[740px] max-w-[960px] p-8">
    <RASortedTable :items="bookmarks" :items-per-page="20" />
  </div>
</div>
