<template>
  <section class="w-full">
    <!-- Header / Filter (optional starter) -->
    <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-lg sm:text-xl font-semibold text-neutral-900">Alumni TEPCoT</h2>
        <p class="text-sm text-neutral-600">เลือกดูรายชื่อศิษย์เก่าแยกตามรุ่น (Cohort)</p>
      </div>

      <div class="flex items-center gap-2">
        <label class="sr-only" for="q">Search</label>
        <input
          id="q"
          v-model="q"
          type="search"
          placeholder="ค้นหา เช่น รุ่น 1 / ปี 2566"
          class="w-full sm:w-72 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none
                 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
        />
      </div>
    </div>

    <!-- Grid -->
    <ul
      ref="gridEl"
      class="grid gap-4 sm:gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      role="list"
    >
      <li
        v-for="(cohort, idx) in filteredCohorts"
        :key="cohort.id"
        class="relative"
        @mouseenter="openCard(cohort.id)"
        @mouseleave="closeCard(cohort.id)"
        @focusin="openCard(cohort.id)"
        @focusout="onFocusOut(cohort.id, $event)"
      >
        <!-- Base card -->
        <article
          class="relative overflow-hidden rounded-2xl bg-neutral-900 shadow-sm ring-1 ring-black/10"
          :class="[isActive(cohort.id) ? 'z-50' : 'z-0', 'will-change-transform']"
          :style="activeTransformStyle(cohort.id)"
        >
          <!-- cover -->
          <div class="relative aspect-[16/10]">
            <img
              :src="cohort.coverImage"
              :alt="`TEPCoT รุ่นที่ ${cohort.cohortNo} (${cohort.yearTH})`"
              class="h-full w-full object-cover"
              loading="lazy"
              draggable="false"
            />

            <!-- overlay gradient -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

            <!-- badge -->
            <div class="absolute left-3 top-3 inline-flex items-center gap-2">
              <span class="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                รุ่นที่ {{ cohort.cohortNo }}
              </span>
              <span class="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
                {{ cohort.yearTH }}
              </span>
            </div>

            <!-- title -->
            <h3 class="absolute bottom-3 left-3 right-3 text-sm sm:text-base font-semibold text-white drop-shadow">
              {{ cohort.title }}
            </h3>
          </div>

          <!-- Expanded overlay (Desktop/Tablet) -->
          <Transition name="fade">
            <div
              v-if="isActive(cohort.id) && !isMobile"
              class="pointer-events-none absolute top-0 z-50 w-[22rem] sm:w-[26rem] lg:w-[30rem]"
              :class="overlaySideClass(cohort.id)"
            >
              <div class="pointer-events-auto overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10">
                <div class="grid grid-cols-2">
                  <!-- Left: cover bigger -->
                  <div class="relative">
                    <div class="aspect-[16/11]">
                      <img
                        :src="cohort.coverImage"
                        :alt="cohort.title"
                        class="h-full w-full object-cover"
                        draggable="false"
                      />
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div class="absolute bottom-3 left-3">
                      <div class="text-xs font-semibold text-white/90">
                        Cohort {{ cohort.cohortNo }}
                      </div>
                      <div class="text-sm font-semibold text-white">
                        {{ cohort.yearTH }}
                      </div>
                    </div>
                  </div>

                  <!-- Right: details -->
                  <div class="p-4">
                    <div class="flex items-start justify-between gap-2">
                      <h4 class="text-neutral-900 font-semibold leading-snug line-clamp-2">
                        {{ cohort.title }}
                      </h4>
                      <span class="shrink-0 rounded-lg bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                        Alumni
                      </span>
                    </div>

                    <!-- meta row -->
                    <div class="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-600">
                      <span class="font-medium text-emerald-700">{{ cohort.totalAlumni }} ท่าน</span>
                      <span aria-hidden="true" class="text-neutral-300">•</span>
                      <span>{{ cohort.highlights }}</span>
                    </div>

                    <!-- tags -->
                    <ul class="mt-2 flex flex-wrap gap-1.5" aria-label="Highlights">
                      <li
                        v-for="t in cohort.tags"
                        :key="t"
                        class="rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-700"
                      >
                        {{ t }}
                      </li>
                    </ul>

                    <!-- description -->
                    <p class="mt-3 text-sm text-neutral-700 line-clamp-4">
                      {{ cohort.description }}
                    </p>

                    <!-- CTA -->
                    <div class="mt-4 flex items-center gap-2">
                      <a
                        :href="cohort.href"
                        class="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white
                               hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
                        :aria-label="`ดูรายชื่อศิษย์เก่า TEPCoT รุ่นที่ ${cohort.cohortNo}`"
                      >
                        ดูรายชื่อรุ่นนี้
                      </a>

                      <button
                        type="button"
                        class="inline-flex items-center justify-center rounded-xl bg-neutral-100 px-3 py-2 text-sm font-semibold text-neutral-900
                               hover:bg-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30"
                        :aria-label="`ดูรายละเอียดรุ่น TEPCoT รุ่นที่ ${cohort.cohortNo}`"
                        @click="onDetails(cohort)"
                      >
                        รายละเอียด
                      </button>
                    </div>

                    <div class="mt-3 text-xs text-neutral-500">
                      <span class="font-medium">ตัวอย่างอาชีพ:</span> {{ cohort.sampleRoles }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>

          <!-- Mobile drawer (open downward, full width, no horizontal overflow) -->
          <Transition name="slide">
            <div
              v-if="isActive(cohort.id) && isMobile"
              class="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10"
            >
              <div class="grid grid-cols-1 sm:grid-cols-2">
                <div class="relative">
                  <div class="aspect-[16/9]">
                    <img :src="cohort.coverImage" :alt="cohort.title" class="h-full w-full object-cover" />
                  </div>
                  <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div class="absolute bottom-3 left-3 text-white">
                    <div class="text-xs font-semibold">รุ่นที่ {{ cohort.cohortNo }}</div>
                    <div class="text-sm font-semibold">{{ cohort.yearTH }}</div>
                  </div>
                </div>

                <div class="p-3">
                  <h4 class="text-neutral-900 font-semibold leading-snug">
                    {{ cohort.title }}
                  </h4>

                  <div class="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-600">
                    <span class="font-medium text-emerald-700">{{ cohort.totalAlumni }} ท่าน</span>
                    <span aria-hidden="true" class="text-neutral-300">•</span>
                    <span>{{ cohort.highlights }}</span>
                  </div>

                  <ul class="mt-2 flex flex-wrap gap-1.5" aria-label="Highlights">
                    <li
                      v-for="t in cohort.tags"
                      :key="t"
                      class="rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-700"
                    >
                      {{ t }}
                    </li>
                  </ul>

                  <p class="mt-2 text-sm text-neutral-700">
                    {{ cohort.description }}
                  </p>

                  <div class="mt-3 flex items-center gap-2">
                    <a
                      :href="cohort.href"
                      class="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                      :aria-label="`ดูรายชื่อศิษย์เก่า TEPCoT รุ่นที่ ${cohort.cohortNo}`"
                    >
                      ดูรายชื่อรุ่นนี้
                    </a>

                    <button
                      type="button"
                      class="inline-flex items-center justify-center rounded-xl bg-neutral-100 px-3 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-200"
                      :aria-label="`ดูรายละเอียดรุ่น TEPCoT รุ่นที่ ${cohort.cohortNo}`"
                      @click="onDetails(cohort)"
                    >
                      รายละเอียด
                    </button>
                  </div>

                  <div class="mt-2 text-xs text-neutral-500">
                    <span class="font-medium">ตัวอย่างอาชีพ:</span> {{ cohort.sampleRoles }}
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </article>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, nextTick } from 'vue'

type Cohort = {
  id: string
  cohortNo: number
  yearTH: string
  title: string
  coverImage: string
  totalAlumni: number
  highlights: string
  tags: string[]
  description: string
  sampleRoles: string
  href: string
}

const cohorts = ref<Cohort[]>([
  {
    id: 'tepcot-01',
    cohortNo: 1,
    yearTH: '2561',
    title: 'TEPCoT รุ่นที่ 1 — Executive Commerce & Trade Leadership',
    coverImage:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80',
    totalAlumni: 120,
    highlights: 'เครือข่ายผู้บริหารระดับสูง',
    tags: ['ภาครัฐ', 'รัฐวิสาหกิจ', 'เอกชน', 'สถาบันการศึกษา'],
    description:
      'รุ่นบุกเบิกที่รวมผู้บริหารระดับสูงจากหลากหลายภาคส่วน สร้างเครือข่ายความร่วมมือด้านการค้าและการพาณิชย์ พร้อมมุมมองเชิงยุทธศาสตร์ระดับประเทศ',
    sampleRoles: 'อดีตรัฐมนตรี, ปลัด/รองปลัด, CEO/MD, ผู้พิพากษา, อธิการบดี',
    href: '/alumni/cohort/1'
  },
  {
    id: 'tepcot-02',
    cohortNo: 2,
    yearTH: '2562',
    title: 'TEPCoT รุ่นที่ 2 — Strategy, Policy & Global Trade',
    coverImage:
      'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?auto=format&fit=crop&w=1600&q=80',
    totalAlumni: 135,
    highlights: 'ขับเคลื่อนนโยบาย-ธุรกิจสู่สากล',
    tags: ['Policy', 'Trade', 'Leadership'],
    description:
      'ต่อยอดจากรุ่นแรกด้วยการเชื่อมเครือข่ายเชิงนโยบายและภาคธุรกิจ มุ่งพัฒนาภาวะผู้นำและการตัดสินใจในบริบทการค้าโลกที่เปลี่ยนเร็ว',
    sampleRoles: 'ประธานกรรมการ, ผู้บริหารอุตสาหกรรม, รองอธิบดี, ผู้บริหารสื่อ',
    href: '/alumni/cohort/2'
  }
])

// Search
const q = ref('')
const filteredCohorts = computed(() => {
  const s = q.value.trim().toLowerCase()
  if (!s) return cohorts.value
  return cohorts.value.filter((c) => {
    return (
      String(c.cohortNo).includes(s) ||
      c.yearTH.toLowerCase().includes(s) ||
      c.title.toLowerCase().includes(s) ||
      c.tags.some((t) => t.toLowerCase().includes(s))
    )
  })
})

/**
 * Tweaks:
 * scale: 1.12–1.18
 * lift: 8px
 */
const SCALE = 1.14
const LIFT_PX = 8

const gridEl = ref<HTMLElement | null>(null)
const activeId = ref<string | null>(null)

const isMobile = ref(false)
const updateIsMobile = () => {
  // Tailwind md breakpoint
  isMobile.value = window.matchMedia('(max-width: 767px)').matches
}

onMounted(() => {
  updateIsMobile()
  window.addEventListener('resize', updateIsMobile, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateIsMobile)
})

// Edge state (left/right)
const stateById = reactive<Record<string, { side: 'left' | 'right' }>>({})

const isActive = (id: string) => activeId.value === id

function openCard(id: string) {
  activeId.value = id
  nextTick(() => {
    const el = findCardEl(id)
    if (!el) return
    const rect = el.getBoundingClientRect()
    const vw = window.innerWidth
    const nearRight = rect.left > vw * 0.6 || rect.right > vw * 0.9
    stateById[id] = { side: nearRight ? 'right' : 'left' }
  })
}

function closeCard(id: string) {
  if (activeId.value === id) activeId.value = null
}

function onFocusOut(id: string, e: FocusEvent) {
  const current = e.currentTarget as HTMLElement | null
  const related = e.relatedTarget as HTMLElement | null
  if (!current) return
  if (related && current.contains(related)) return
  closeCard(id)
}

function findCardEl(id: string) {
  const root = gridEl.value
  if (!root) return null
  const title = cohorts.value.find((c) => c.id === id)?.title
  if (!title) return null
  const li = Array.from(root.querySelectorAll('li')).find((node) => node.textContent?.includes(title))
  return (li?.querySelector('article') as HTMLElement) ?? null
}

const activeTransformStyle = (id: string) => {
  if (!isActive(id)) return {}
  const side = stateById[id]?.side ?? 'left'
  return {
    transformOrigin: side === 'right' ? 'right top' : 'left top',
    transform: `translateY(-${LIFT_PX}px) scale(${SCALE})`,
    transition: 'transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1)'
  } as Record<string, string>
}

const overlaySideClass = (id: string) => {
  const side = stateById[id]?.side ?? 'left'
  return side === 'right' ? 'right-0' : 'left-0'
}

function onDetails(cohort: Cohort) {
  // hook to modal/router
  console.log('Details cohort:', cohort.cohortNo)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 140ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 180ms ease, opacity 160ms ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(8px);
  opacity: 0;
}
</style>