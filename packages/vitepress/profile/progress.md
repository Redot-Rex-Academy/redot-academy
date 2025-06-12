---
Title: Progress
layout: page
---

## Profile > Progress

<script lang="ts" setup>
import { computed, ref } from 'vue'

const tracks = ref([
  { title: 'Track A', progress: '16 / 31', updated: '2024-12-05T24:31:10.909Z' },
  { title: 'Track B', progress: '4 / 22', updated: '2024-12-05T24:33:10.909Z' },
  { title: 'Track C', progress: '6 / 45', updated: '2025-01-03T42:08:10.909Z' },
  { title: 'Track D', progress: '49 / 109', updated: '2024-08-02T02:43:10.909Z' },
  { title: 'Track E', progress: '32 / 33', updated: '2025-03-04T31:32:10.909Z' },
  { title: 'Track F', progress: '16 / 31', updated: '2024-09-06T59:13:10.909Z' },
  { title: 'Track G', progress: '16 / 31', updated: '2025-09-06T22:22:10.909Z' },
  { title: 'Track H', progress: '16 / 31', updated: '2024-10-05T14:34:10.909Z' },
  { title: 'Track I', progress: '16 / 31', updated: '2023-06-07T12:54:10.909Z' },
  { title: 'Track J', progress: '16 / 31', updated: '2023-06-07T12:54:10.909Z' },
  { title: 'Track K', progress: '16 / 31', updated: '2023-06-07T12:54:10.909Z' },
  { title: 'Track L', progress: '16 / 31', updated: '2023-06-07T12:54:10.909Z' },
  { title: 'Track M', progress: '16 / 31', updated: '2023-06-07T12:54:10.909Z' },
  { title: 'Track N', progress: '16 / 31', updated: '2023-06-07T12:54:10.909Z' },
  { title: 'Track O', progress: '16 / 31', updated: '2023-06-07T12:54:10.909Z' },
  { title: 'Track P', progress: '16 / 31', updated: '2023-06-07T12:54:10.909Z' },
  { title: 'Track Q', progress: '16 / 31', updated: '2023-06-07T12:54:10.909Z' },
  { title: 'Track R', progress: '16 / 31', updated: '2023-06-07T12:54:10.909Z' },
  { title: 'Track S', progress: '16 / 31', updated: '2023-06-07T12:54:10.909Z' },
  { title: 'Track T', progress: '16 / 31', updated: '2023-06-07T12:54:10.909Z' },
  { title: 'Track U', progress: '16 / 31', updated: '2023-06-07T12:54:10.909Z' },
  { title: 'Track V', progress: '16 / 31', updated: '2023-06-07T12:54:10.909Z' },
  { title: 'Track W', progress: '16 / 31', updated: '2023-06-07T12:54:10.909Z' },
  { title: 'Track X', progress: '16 / 31', updated: '2023-06-07T12:54:10.909Z' },
  { title: 'Track Y', progress: '31 / 31', updated: '2023-06-07T12:54:10.909Z' },
  { title: 'Track Z', progress: '0 / 31', updated: '2023-06-07T12:54:10.909Z' },
])

const aDirection = ref(1)
const bDirection = ref(1)
const cDirection = ref(1)

const page = ref(0)

const pages = computed(() => Math.ceil(tracks.value.length / 10))

const getValueFromProperty = (property: string, value: string) =>
  property === 'track' ? value
    : property === 'progress' ? Math.ceil(Number(value.split(' / ')[0]) / Number(value.split(' / ')[1]) * 100)
    : value

const sortTracks = (property: string, direction: number) => tracks.value.sort((a, b) => {
  const ret = getValueFromProperty(property, a[property]) > getValueFromProperty(property, b[property]) ? 1 : -1
  return ret * direction
})
  
</script>

<div class="grid">
  <div class="place-self-center min-w-[300px] w-full lg:min-w-[748px] max-w-[1200px] p-8">
    <div class="grid grid-cols-3 gap-8 border-1 border-neutral-600 rounded-lg p-8">
      <div v-if="pages > 1" class="col-span-full place-self-end">
        <div class="grid grid-flow-col bg-neutral-800 border-neutral-600 border-1 rounded-full overflow-hidden">
          <button
            class="!p-2 !pl-4 hover:!bg-neutral-700 rounded-l-full"
            :class="[
              pages < 2 ? 'hidden' : '',
            ]"
            @click="page = 0"
          ><<</button>
          <button
            class="p-2 aspect-square hover:!bg-neutral-700"
            :class="[
              pages < 2 ? 'hidden' : '',
            ]"
            @click="page = page > 0 ? page -= 1 : 0"
          ><</button>
          <button
            v-for="(v, i) in pages"
            class="p-2 aspect-square hover:!bg-neutral-700"
            :class="[
              page == i ? '!bg-neutral-700/80' : '',
            ]"
            @click="page = i"
          >{{ i + 1 }}</button>
          <button
            class="p-2 aspect-square hover:!bg-neutral-700"
            :class="[
              pages < 2 ? 'hidden' : '',
            ]"
            @click="page = page < pages ? page += 1 : 0"
          >></button>
          <button
            class="!p-2 !pr-4 hover:!bg-neutral-700 rounded-r-full"
            :class="[
              pages < 2 ? 'hidden' : '',
            ]"
            @click="page = pages  - 1"
          >>></button>
        </div>
      </div>
      <header class="grid grid-cols-subgrid border-b-1 border-neutral-600 col-span-full pb-2">
        <button class="uppercase" @click="sortTracks('title', (aDirection = aDirection * -1))">Track</button>
        <button class="uppercase" @click="sortTracks('progress', (bDirection = bDirection * -1))">Progress</button>
        <button class="uppercase" @click="sortTracks('updated', (cDirection = cDirection * -1))">Last progress</button>
      </header>
      <ul class="grid grid-cols-subgrid col-span-full gap-4">
        <li
          v-for="track in tracks.slice(page * 10, (page * 10) + 10)"
          :key="track"
          class="
            relative grid grid-cols-subgrid col-span-full p-4 bg-neutral-800
            border-1 border-neutral-600 rounded-lg overflow-hidden
          "
        >
          <span>{{ track.title }}</span>
          <span class="place-self-center">{{ getValueFromProperty('progress', track.progress) === 100 ? 'Completed' : track.progress }}</span>
          <span class="place-self-end">{{ track.updated }}</span>
          <div
            class="absolute h-full bg-red-500/10 left-0 bottom-0"
            :style="{
              'width': `${getValueFromProperty('progress', track.progress)}%`,
            }"
          />
        </li>
      </ul>
    </div>
  </div>
</div>
