<template>
    <div class="h-full">
        <article class="relative overflow-hidden rounded-2xl h-full  bg-white ring-1 ring-blue-900/30 shadow-sm  transition-all duration-200 ease-out  hover:-translate-y-1 hover:shadow-lg">
          <!-- Cover -->
          <div class="hero-detail h-auto md:h-24 flex justify-center items-center relative overflow-hidden"> 
          <div class="relative h-full w-full bg-overlay bg-no-repeat bg-cover bg-center blur-xl" :style="{ backgroundImage: `url('${p.image}')` }">
            <div
              class="absolute inset-0 opacity-20"
              style="background-image: radial-gradient(circle at 18% 35%, rgba(255,255,255,.55) 0 2px, transparent 2px), radial-gradient(circle at 70% 60%, rgba(255,255,255,.45) 0 2px, transparent 2px);"
            />
          </div>
          </div>


          <div class="relative px-4">
            <div class="-mt-12 flex items-start justify-between">
              <div class="h-24 w-24 rounded-full bg-white ring-2  ring-a-gold-F0C571 overflow-hidden shadow-sm">
                <img :src="p.image" :alt="p.name" class="h-full w-full object-cover" />
              </div>
            </div>


            <div class="mt-2 pb-4">
              <div class="min-h-[56px]">
                <h2 class="text-18 -mb-2  text-slate-500  line-clamp-1">
                  {{ p.generation }}
                </h2>
                <h3 class="text-24 md:text-30 font-semibold text-slate-800  leading-snug line-clamp-2">
                  {{ p.name }}
                </h3>
                <h4 class="mt-0.5 text-20 text-blue-800/80 line-clamp-2 ">
                  {{ p.company }}
                </h4>
              </div>

              <!-- mutual -->
              <div class="mt-3 flex items-center gap-2 text-xs text-slate-800/65">

                <div class="avatar-group " :class="[p.mutualAvatars.length > 1 ? '-space-x-4' : '-space-x-0']">
                    <div class="avatar border-2" v-for="(m, i) in p.mutualAvatars.slice(0, 3)"  :key="i">
                      <div class="w-12" >
                        <img :src="m.image" :alt="m.name" />
                      </div>
                    </div>
                </div>
                <span v-if="p.mutualAvatars.length > 0" class="text-18 text-[#0B1F3A]/65">
                   ร่วมรุ่นกับ <span class="font-medium "  v-for="(t, i) in p.mutualAvatars.slice(0, 2)" :key="i"> {{ t.name }} </span><span v-if="p.mutualAvatars.length > 3"> และอีก +{{ p.mutualAvatars.length - 2 }}</span>
                </span>
              </div>

              <!-- CTA -->
              <button
                type="button"
                class="mt-3 inline-flex w-full items-center justify-center gap-2
                       rounded-xl border border-[#1E3A8A] bg-white px-3 py-2
                       text-20 font-semibold text-[#1E3A8A]
                       transition-colors duration-150
                       hover:bg-[#1E3A8A] hover:text-white
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40 "
                :aria-label="`Connect with ${p.name}`"
                @click="emit('connect', p)"
              >
               View Profile
              </button>
            </div>
          </div>

          <!-- Hover accent -->
          <div
            class="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent
                   group-hover:ring-[#2563EB]/25 transition"
          />
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