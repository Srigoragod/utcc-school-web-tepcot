<script setup lang="ts">
import { computed, ref } from 'vue'

const kpiCards = ref([
  { title: 'ภาคราชการ – รัฐวิสาหกิจ', value: '35' },
  { title: 'ภาคเอกชน', value: '57' },
  { title: 'สถาบันการศึกษา', value: '5' },
  { title: 'อื่น ๆ', value: '3' }
])

type Slice = {
  title: string
  value: number
  percent: number
  start: number
  end: number
  color: string
}

const colors = [
  '#0f172a', // slate-900
  '#1d4ed8', // blue-700
  '#0ea5e9', // sky-500
  '#94a3b8'  // slate-400
]

const parsed = computed(() =>
  kpiCards.value.map((x) => ({
    title: x.title,
    value: Number(String(x.value).replace(/,/g, '')) || 0
  }))
)

const total = computed(() => parsed.value.reduce((s, x) => s + x.value, 0))

const slices = computed<Slice[]>(() => {
  const t = total.value || 1
  let acc = 0
  return parsed.value.map((x, i) => {
    const percent = (x.value / t) * 100
    const start = acc
    const end = acc + percent
    acc = end
    return {
      title: x.title,
      value: x.value,
      percent,
      start,
      end,
      color: colors[i % colors.length]
    }
  })
})

const conicStyle = computed(() => {

  const parts = slices.value.map(
    (s) => `${s.color} ${s.start.toFixed(4)}% ${s.end.toFixed(4)}%`
  )
  return {
    backgroundImage: `conic-gradient(from -90deg, ${parts.join(', ')})`
  }
})

const topSlice = computed(() => {
  const arr = slices.value
  if (!arr.length) return null
  return [...arr].sort((a, b) => b.value - a.value)[0]
})

const fmtPercent = (n: number) => `${Math.round(n)}%`
</script>

<template>
  <div class="w-full h-full rounded-2xl border border-blue-100 p-2 shadow shadow-blue-200/20">
    <div class="flex flex-col gap-8  md:items-center md:justify-between">
      <!-- Chart -->
      <div class="flex items-center gap-6">
        <div class="relative h-72 w-72 shrink-0">
          <!-- donut ring -->
          <div
            class="h-full w-full rounded-full"
            :style="conicStyle"
          />
          <!-- hole -->
          <div class="absolute inset-5 rounded-full bg-white shadow-inner" />

          <!-- center label -->
          <div class="absolute inset-0 grid place-items-center text-center">

            <div class="text-44 font-semibold text-slate-900 mt-8">
               <div class="font-medium text-slate-500 -mb-4">รวม</div>
              {{ total }}%
            </div>
            <div v-if="topSlice" class="text-md text-slate-500 -mt-12">
              มากสุด: <span class="font-medium text-slate-700">{{ fmtPercent(topSlice.percent) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Legend -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full ">

          <div
            v-for="(s, idx) in slices"
            :key="idx"
            class="flex items-center justify-between gap-3 rounded-xl bg-slate-100 px-4 py-3"
          >
            <div class="flex min-w-0 items-center gap-3">
              <span
                class="h-3 w-3 rounded-full"
                :style="{ backgroundColor: s.color }"
              />
              <div class="min-w-0">
                <div class="text-24 font-medium text-slate-800">{{ s.title }}</div>
                <div class="text-20  text-slate-500">จำนวน: {{ s.value }}</div>
              </div>
            </div>
            <div class="text-44 font-semibold text-slate-900">
              {{ fmtPercent(s.percent) }}
            </div>
          </div>
      </div>
    </div>
  </div>
</template>