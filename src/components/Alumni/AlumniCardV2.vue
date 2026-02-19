<template>
  <!-- card wrapper: ให้สูงเท่ากันใน grid -->
  <div class="h-full">
    <article
      class="relative h-full overflow-hidden rounded-2xl bg-white
             ring-1 ring-blue-900/30 shadow-sm transition-all duration-200 ease-out hover:shadow-lg"
    >
      <!-- Cover -->
      <div class="relative h-20 sm:h-24 overflow-hidden">
        <div
          class="absolute inset-0 bg-center bg-cover bg-no-repeat blur-xl bg-black scale-110"
          :style="{ backgroundImage: `url('${p.image}')` }"
        >
          <div
            class="absolute inset-0 opacity-20"
            style="background-image: radial-gradient(circle at 18% 35%, rgba(255,255,255,.55) 0 2px, transparent 2px), radial-gradient(circle at 70% 60%, rgba(255,255,255,.45) 0 2px, transparent 2px);"
          />
        </div>
        <div class="absolute inset-0 bg-gradient-to-b from-black/0 to-black/10" />
      </div>

      <!-- Body: สำคัญมาก -> flex-col + h-full เพื่อดันปุ่มลงล่าง -->
      <div class="relative px-4 pb-4 flex h-[calc(100%-5rem)] sm:h-[calc(100%-6rem)] flex-col">
        <!-- Avatar row -->
        <div class="-mt-10 sm:-mt-12 flex items-start justify-between">
          <div class="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-white ring-2 ring-white overflow-hidden shadow-xl">
            <img
              :src="p.image"
              :alt="p.name"
              class="h-full w-full object-cover transition-transform duration-200 ease-out hover:scale-95"
            />
          </div>
        </div>

        <!-- Content -->
        <div class="mt-3">
          <h2 class="text-sm sm:text-base -mb-1 text-slate-500 line-clamp-1">
            {{ p.generation }}
          </h2>

          <h3 class="text-lg sm:text-xl md:text-2xl font-semibold text-a-blue-0033A1 line-clamp-2">
            {{ p.name }}
          </h3>

          <h4 class="mt-1 text-base  md:text-20  text-a-blue-021430/80 font-light line-clamp-2 min-h-[56px]">
            {{ p.company }}
          </h4>

          <!-- mutual -->
          <div class="mt-3 flex items-start gap-2 text-sm text-slate-800/65">
            <div
              v-if="p.mutualAvatars?.length"
              class="flex items-center"
              :class="[p.mutualAvatars.length > 1 ? '-space-x-4' : '-space-x-0']"
            >
              <div
                class="h-10 w-10 rounded-full ring-2 ring-white overflow-hidden bg-white"
                v-for="(m, i) in p.mutualAvatars.slice(0, 3)"
                :key="i"
              >
                <img :src="m.image" :alt="m.name" class="h-full w-full object-cover" />
              </div>
            </div>

            <span v-if="p.mutualAvatars?.length" class="text-base text-[#0B1F3A]/65 line-clamp-2">
              ร่วมรุ่นกับ
              <span class="font-medium" v-for="(t, i) in p.mutualAvatars.slice(0, 2)" :key="i">
                {{ t.name }}
              </span>
              <span v-if="p.mutualAvatars.length > 2">
                และอีก +{{ p.mutualAvatars.length - 2 }}
              </span>
            </span>
          </div>
        </div>

        <!-- CTA: ดันลงล่าง + ให้ปุ่มเท่ากันทุกการ์ด -->
        <div class="mt-auto pt-4">
          <a :href="`/alumni/${p.slug}`" class="text-sm text-slate-500 line-clamp-1">
          <button
            class="btn btn-sm btn-outline btn-primary w-full text-20"
            @click="emit('connect', p)"
          >
            View Profile
          </button>
          </a>
        </div>
      </div>
    </article>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  name: "AlumniCard",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  emits: ['connect'],
  setup(props, { emit }) {
    const p = ref(props.item)

    return {
      emit,
       p
    }
  }
}

</script>