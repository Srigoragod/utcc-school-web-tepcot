<template>
  <div class="w-full">
    <div class="rounded-2xl bg-white ring-1 ring-[#0B1F3A]/40 shadow-sm p-3 sm:p-4">
      <div class="flex flex-col gap-3 lg:flex-row lg:items-center">
        <!-- Search -->
        <div class="relative flex-1">
          <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#0B1F3A]/50">
            <!-- magnifier -->
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path
                d="M10 4a6 6 0 104.472 10.03l3.249 3.25 1.414-1.415-3.25-3.249A6 6 0 0010 4zm-4 6a4 4 0 118 0 4 4 0 01-8 0z"
              />
            </svg>
          </span>
          <input
            v-model="localQuery"
            type="search"
            class="w-full rounded-xl border border-[#0B1F3A]/15 bg-white pl-10 pr-10 py-2.5 text-20
                   outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
            placeholder="ค้นหาศิษย์เก่า (ชื่อ / บริษัท / ตำแหน่ง)…"
            aria-label="Search alumni by name"
            @input="emitChange()"
          />

          <button
            v-if="localQuery"
            type="button"
            class="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#0B1F3A]/60 hover:bg-[#0B1F3A]/5"
            aria-label="Clear search"
            @click="clearQuery()"
          >
            <svg viewBox="0 0 20 20" class="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        <!-- Generation -->
        <div class="w-full lg:w-64">
          <label class="sr-only" for="gen">เลือกดูตามรุ่น</label>
          <div class="relative">
            <select
              id="gen"
              v-model="localGen"
              class="w-full appearance-none rounded-xl border border-[#0B1F3A]/15 bg-white px-3 py-2.5 text-20
                     outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
              aria-label="Filter by generation"
              @change="emitChange()"
            >
              <option value="">ทุกรุ่น</option>
              <option v-for="g in generations" :key="g.key" :value="g.key">
                {{ g.name }}
              </option>
            </select>

            <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#0B1F3A]/45">
              <svg viewBox="0 0 20 20" class="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-between gap-3 lg:justify-end lg:w-56">
          <!-- <div class="text-20 text-[#0B1F3A]/65">
            พบ <span class="font-semibold text-[#0B1F3A]">{{ resultCount }}</span> รายการ
          </div> -->

          <button
            type="button"
            class="inline-flex items-center justify-center rounded-xl bg-[#1E3A8A] px-3 py-2.5 text-20 font-semibold text-white
                   hover:bg-[#0B1F3A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40"
            aria-label="Clear filters"
            @click="clearAll()"
          >
            ล้างตัวกรอง
          </button>
        </div>
      </div>

      <!-- optional chips (nice like BU) -->
      <div v-if="localGen || localQuery" class="mt-3 flex flex-wrap gap-2">
        <span
          v-if="localQuery"
          class="inline-flex items-center gap-2 rounded-full bg-[#2563EB]/10 px-3 py-1 text-xs font-semibold text-[#1E3A8A]"
        >
          ค้นหา: "{{ localQuery }}"
          <button class="rounded-full p-0.5 hover:bg-[#2563EB]/15" @click="clearQuery()" aria-label="Remove keyword">
            ✕
          </button>
        </span>

        <span
          v-if="localGen"
          class="inline-flex items-center gap-2 rounded-full bg-[#0B1F3A]/5 px-3 py-1 text-xs font-semibold text-[#0B1F3A]"
        >
          รุ่น: {{ localGen }}
          <button class="rounded-full p-0.5 hover:bg-[#0B1F3A]/10" @click="clearGen()" aria-label="Remove generation">
            ✕
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  query: { type: String, default: '' },
  generation: { type: String, default: '' },
  generations: { type: Array, default: () => [] },
  resultCount: { type: Number, default: 0 }
})

const emit = defineEmits(['update:query', 'update:generation', 'clear'])

const localQuery = ref(props.query)
const localGen = ref(props.generation)


watch(
  () => props.query,
  (v) => (localQuery.value = v)
)

watch(
  () => props.generation,
  (v) => (localGen.value = v)
)

function emitChange() {
  emit('update:query', localQuery.value)
  emit('update:generation', localGen.value)
}

function clearQuery() {
  localQuery.value = ''
  emitChange()
}

function clearGen() {
  localGen.value = ''
  emitChange()
}

function clearAll() {
  localQuery.value = ''
  localGen.value = ''
  emitChange()
  emit('clear')
}
</script>