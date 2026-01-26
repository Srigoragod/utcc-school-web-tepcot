<template>
  <div class="card cursor-pointer bg-slate-50 shadow-xl relative" :class="[cardClass]">
    <ArrowsPointingOutIcon class="absolute z-10 right-4 top-4 text-white w-6 h-6" />
    <div class="badge badge-neutral text-[18px] absolute top-4 left-4 z-2">{{ badge }}</div>
      <div class="rounded-2xl h-[279px]" :style="{
            backgroundImage: `url(${image})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundColor: 'black'
          }">
      <div class="bg-overlay-card"> 
      </div>
    </div>
        <!-- <img :src="image" alt="" /> -->
    <div class="card-body py-2 pb-8 px-2">
    <div class="topic-card pb-2 md:pb-4 border-b border-a-black-1F2937">
      <!-- <div
        class="mb-0 md:mb-2 text-[18px] text-a-blue-030e62"
      >
      {{badge}}
      </div> -->
        <h2 class="card-title pt-1 text-24 md:text-36  font-normal hover:text-a-blue-030e62 text-1-line">
        {{ cardTitle }}
      </h2>
    </div>

      <div  >
        <div class="text-20 md:text-24 text-3-line font-light  overflow-y-auto hide-scroll " v-html="description"></div>
        <div>
          <h4 class="text-20 pt-4 w-full text-gray-600">
            สถานที่ตั้ง: <span class="font-light"> {{ location }}</span> 
          </h4>
        </div>
       </div>
      <div class="card-actions justify-end hidden">
        <!-- <a :href="readMore" class="link link-primary">I'm a simple link</a> -->
        <button class="btn btn-sm text-20 rounded-full">อ่านต่อคลิก</button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { ArrowsPointingOutIcon } from '@heroicons/vue/24/solid'
export default defineComponent({
  name: "Card",
  props: {
    cardTitle: { type: String, default: "" },
    description: { type: String, default: "" },
    readMore: { type: String, default: "#" },
    image: { type: String, default: "" },
    badge: { type: String, default: "" },
    customClass: {type: String, default :"w-[418px]"},
    location: { type: String, default: "" }
  },
  components: {
    ArrowsPointingOutIcon
  },
  setup(props) {
        const cardClass = computed(() => {
            if (props.customClass != null) {
                return props.customClass;
            }
            return 'w-[400px]';
        })

        return {
          cardClass,
        }
    }
});
</script>

<style scoped>
.card {
  max-width: 400px;
}
figure img{
  border-radius: 1rem !important;
}
.bg-overlay-card{
  display: flex;
  justify-items: start;
  align-items: flex-end;

  color: #fff;
  font-weight: 300;
  text-shadow: 4px 4px 9px rgba(0, 0, 0, 0.55);
  opacity: 1;

  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 50%,
    rgba(11, 11, 11, .7) 100%
  );
  height: 100%;
  width: 100%;
  border-radius: 1rem;
}
.bg-overlay-card:hover {
  background: unset;
}

</style>
