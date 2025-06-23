<script lang="ts" setup generic="T">
import { computed, ref } from 'vue'

import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/24/solid'

const props = withDefaults(defineProps<{
  items: Array<T>,
  columnDisplay?: (items: Array<T>) => Array<Record<string, string>>,
  valueDisplay?: (items: Array<T>) => Array<Record<string, string>>,
  itemsPerPage?: number,
}>(), {
  itemsPerPage: 10,
})

const page = ref(1)
const sortedBy = ref<string | null>(null)
const sortDirections = ref<Record<string, 'asc' | 'desc'>>({})
const pages = computed(() => {
  return Math.ceil(props.items.length / (props.itemsPerPage || 10))
})

const templateColumns = computed(() => {
  return `repeat(${Object.keys(props.items[0] || {}).length + 1}, minmax(0, 1fr))`
})

const sortedItems = computed(() => {
  if (!sortedBy.value) return props.items;
  return [...props.items].sort((a, b) => {
    const aValue = a[sortedBy.value!];
    const bValue = b[sortedBy.value!];
    if (sortDirections.value[sortedBy.value!] === 'asc') {
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue);
      }
      return aValue > bValue ? 1 : -1;
    } else {
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return bValue.localeCompare(aValue);
      }
      return bValue > aValue ? 1 : -1;
    }
  });
});

const columns = computed((): Array<Array<string>> => {
  if (props.columnDisplay) {
    return props.columnDisplay(props.items).map(item => {
      const columnKey = Object.keys(item)[0];
      return [columnKey, item[columnKey]];
    });
  }

  return Object.keys(props.items[0] || {}).map(key => [key, key]);
})

const values = computed((): Array<Record<string, string>> => {
  if (props.valueDisplay) return props.valueDisplay(sortedItems.value)

  return sortedItems.value.map(item => {
    const result: Record<string, string> = {}
    for (const key in item) {
      result[key] = String(item[key])
    }
    return result
  })
});
</script>


<template>
  <div
    class="grid gap-8 border-1 border-neutral-600 rounded-lg p-8 cols"
  >
    <div v-if="pages" class="grid subgrid col-span-full place-self-end">
      <div class="grid grid-flow-col bg-neutral-800 border-neutral-600 border-1 rounded-full overflow-hidden">
        <button
          class="!p-2 !pl-4 hover:!bg-neutral-700 rounded-l-full"
          :class="{ dissabled: page === 1 }"
          :disabled="page === 1"
          @click="page = 1"
        ><<</button>

        <button
          class="!p-1 !px-3 hover:!bg-neutral-700"
          :class="{ disabled: page === 1 }"
          :disabled="page === 1"
          @click="page--"
        ><</button>

        <button
          v-for="(v, i) in [...Array(pages)]"
          class="!p-1 !px-3 hover:!bg-neutral-700"
          :class="{ '!bg-neutral-700/80': page === i + 1 }"
          :disabled="page === i + 1"
          @click="page = i + 1"
        >{{ i + 1  }}</button>

        <button
          class="!p-1 !px-3 hover:!bg-neutral-700"
          :class="{ disabled: page === pages }"
          :disabled="page === pages"
          @click="page++"
        >></button>

        <button
          class="!p-2 !pr-4 hover:!bg-neutral-700 rounded-r-full"
          :class="{ disabled: page === pages }"
          :disabled="page === pages"
          @click="page = pages"
        >>></button>
      </div>
    </div>

    <div class="grid grid-cols-subgrid col-span-full capitalize cursor-pointer">
      <div
        v-for="(column, j) in columns"
        :key="j"
        class="font-bold relative"
        @click="() => {
          sortedBy = column[0]
          sortDirections[column[0]] = sortDirections[column[0]] === 'asc' ? 'desc' : 'asc';
        }"
      >
        <template v-if="sortedBy == column[0]">
          <div class="absolute -left-5 min-h-4 min-w-4 top-1/2 -translate-y-1/2">
            <span v-if="sortDirections[column[0]] === 'asc'"><ChevronUpIcon /></span>
            <span v-else><ChevronDownIcon /></span>
          </div>
        </template>
        {{ column[1] }}
      </div>
    </div>

    <div
      v-for="(item, i) in values.slice((page - 1) * itemsPerPage, page * itemsPerPage)"
      :key="i"
      class="grid grid-cols-subgrid col-span-full"
    >
      <div v-for="(val, y) in item" :key="`${i}-${y}`">
        {{  Object.values(val)[0]  }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.cols {
  grid-template-columns: v-bind(templateColumns);
}
</style>
