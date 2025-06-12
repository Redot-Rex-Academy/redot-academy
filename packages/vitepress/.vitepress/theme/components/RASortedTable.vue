<script lang="ts" setup generic="T">
import { computed, ref, watch } from 'vue';

const props = defineProps<{
  items: Array<T>,
  itemsPerPage?: number,
}>()

const page = ref(1)
const sortedBy = ref<string | null>(null)
const pages = computed(() => {
  return Math.ceil(props.items.length / (props.itemsPerPage || 10))
})
const templateColumns = computed(() => {
  return `repeat(${Object.keys(props.items[0] || {}).length + 1}, minmax(0, 1fr))`
})
const columnNames = computed(() => {
  return Object.keys(props.items[0] || {})
})
const sortedItems = computed(() => {
  if (!sortedBy.value) return props.items;
  return [...props.items].sort((a, b) => {
    const aValue = a[sortedBy.value!];
    const bValue = b[sortedBy.value!];
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue);
    }
    return aValue > bValue ? 1 : -1;
  });
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
        v-for="(colName, j) in columnNames"
        :key="j"
        class="font-bold"
        @click="sortedBy = colName"
      >
        {{ colName }}
      </div>
    </div>

    <div
      v-for="(item, i) in sortedItems.slice((page - 1) * itemsPerPage, page * itemsPerPage)"
      :key="i"
      class="grid grid-cols-subgrid col-span-full"
    >
      <div v-for="(colName, j) of item">
        {{ colName }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.cols {
  grid-template-columns: v-bind(templateColumns);
}
</style>
