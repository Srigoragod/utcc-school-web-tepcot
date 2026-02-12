<script setup lang="ts">
import { computed, ref, watch } from 'vue'

type Lang = 'th' | 'en'
type I18nText = string | { th?: string; en?: string } | null | undefined

type GalleryItem = {
  imageUrl?: string | null
  title?: I18nText
  subtitle?: I18nText
}

const props = defineProps<{
  items: GalleryItem[]
  lang?: Lang
  startIndex?: number
}>()

const lang = computed<Lang>(() => props.lang ?? 'th')
const active = ref(Math.max(0, Math.min(props.startIndex ?? 0, (props.items?.length ?? 1) - 1)))

watch(
  () => props.startIndex,
  (v) => {
    if (typeof v === 'number' && props.items?.length) {
      active.value = Math.max(0, Math.min(v, props.items.length - 1))
    }
  }
)

const pickText = (v: I18nText) => {
  if (!v) return ''
  if (typeof v === 'string') return v
  return v[lang.value] || v.th || v.en || ''
}

const safeUrl = (u?: string | null) => {
  if (!u) return ''
  try {
    const decoded = decodeURI(u)
    return encodeURI(decoded)
  } catch {
    try { return encodeURI(u) } catch { return u }
  }
}

const len = computed(() => props.items?.length ?? 0)

const current = computed(() => props.items?.[active.value])
const currentSrc = computed(() => safeUrl(current.value?.imageUrl))
const currentTitle = computed(() => pickText(current.value?.title))
const currentSubtitle = computed(() => pickText(current.value?.subtitle))

const go = (i: number) => {
  if (!len.value) return
  // ✅ loop
  active.value = ((i % len.value) + len.value) % len.value
}
const next = () => go(active.value + 1)
const prev = () => go(active.value - 1)
</script>

<template>
  <div v-if="len" class="w-full">
    <!-- Main -->
    <div class="relative rounded-2xl overflow-hidden h-[420px] md:h-[520px]">
      <div
        class="absolute inset-0"
        :style="currentSrc ? {
          backgroundImage: `url('${currentSrc}')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
        } : {}"
        role="img"
        :aria-label="currentTitle || 'gallery image'"
      />

      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/40" />
      <div class="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
        <h2 class="text-white text-28 md:text-36 font-semibold leading-tight line-clamp-2">
          {{ currentTitle }}
        </h2>
        <p v-if="currentSubtitle" class="mt-2 text-white/90 text-16 md:text-18 line-clamp-2">
          {{ currentSubtitle }}
        </p>
      </div>

      <!-- Controls -->
      <button
        type="button"
        class="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full w-10 h-10 grid place-items-center"
        @click="prev"
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full w-10 h-10 grid place-items-center"
        @click="next"
        aria-label="Next"
      >
        ›
      </button>
    </div>

    <!-- Thumbs -->
    <div class="mt-4 flex gap-3 overflow-x-auto pb-2">
      <button
        v-for="(it, idx) in items"
        :key="idx"
        type="button"
        class="shrink-0 rounded-xl overflow-hidden border transition"
        :class="idx === active ? 'border-blue-500' : 'border-transparent hover:border-white/40'"
        @click="go(idx)"
        :aria-label="`Go to ${idx + 1}`"
      >
        <div
          class="w-[92px] h-[64px] md:w-[110px] md:h-[78px]"
          :style="safeUrl(it.imageUrl) ? {
            backgroundImage: `url('${safeUrl(it.imageUrl)}')`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
          } : {}"
        />
      </button>
    </div>
  </div>

  <div v-else class="rounded-2xl border p-6 text-slate-500">
    No images
  </div>
</template>