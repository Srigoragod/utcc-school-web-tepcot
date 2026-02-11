<template>
<div id="bg-target" class="py-16 md:py-40 px-4 md:px-0 relative overflow-hidden">
<div  class="absolute z-10 bottom-0 inset-0 bg-gradient-to-b from-[#FFFFFF]/100 via-[#FFFFFF]/20 to-transparent h-1/2 mx-auto  pointer-events-none"></div>
    <!-- <div
      class="bg-overlay bg-no-repeat bg-cover bg-center blur-xl absolute top-0 left-0 w-full h-full z-0"
      :style="{ backgroundImage: `url('${imageSection}')` }"
    ></div> -->
<div class="md:max-w-7xl mx-auto px-4 md:px-8 tepcot-overlap relative py-10 md:py-20 bg-white/80   shadow-xl shadow-black/10 z-10">
  <div class="">
    <Eyebrow class="bg-blue-900 text-white px-2 mb-2" :text="'Top Executive Program in Commerce and Trade'" />
    <!-- <h2 class=" font-bold text-44 md:text-64">หลักสูตรผู้บริหารระดับสูง</h2> -->
    <h3 class="text-36 sm:text-44 font-semibold">
      {{ title }}
    </h3>
    <div class="mt-6 space-y-5 text-slate-700 text-20 md:text-24 font-light  indent-4" v-html="description"></div>
  </div>

  <div class=" grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 py-8">
    <div v-for="(card, index) in itemList" :key="index" class="rounded border border-blue-100 p-4 bg-gradient-to-t from-white/80 via-white/40 to-transparent ">
    <CardBlur
      class="text-blue-900 "
      :icon="card.icon"
      :title="card.title"
      :desc="card.description"
    >
      <ul class="text-base md:text-20 font-light text-slate-700  list-disc list-inside mt-2">
        <li v-for="(item, index) in card.item" :key="index">
          {{  item.text }}
        </li>
      </ul>
    </CardBlur>
    </div>
  </div>

  <div class="bg-white/80 p-4  rounded-r-xl ">
     <div class="grid grid-cols-2 items-center gap-6 ">
      <div>
      <h4 class=" text-20 sm:text-24 flex items-center gap-4">
      <div class="relative flex h-10 w-10 items-center justify-center">
        <span class="absolute h-10 w-10 rounded-full bg-blue-800" />
         <DocumentTextIcon  class="h-6 w-6 text-white absolute"></DocumentTextIcon>
      </div>
       คุณสมบัติของผู้เข้าร่วมหลักสูตร
     </h4>
     <!-- <div class="my-2 mx-4 border-t border-blue-200"></div> -->
      <ul class="text-base md:text-20  text-slate-700  list-disc list-inside my-4 ml-4 font-light">
          <li v-for="(item, index) in qualification" :key="index">
            {{  item.item }}
          </li>
        </ul>
      </div>
      <div>
        <img :src="imageSection" alt="qualification image" class="w-full h-full rounded-xl" loading="lazy" />
      </div>
     </div>
  </div>

 </div>
</div>
</template>
<script>
import { ref, defineComponent } from "vue";
import { DocumentTextIcon } from "@heroicons/vue/24/solid";
// components
import Eyebrow from "./Eyebrow.vue";
import CardBlur from "../card/CardBlur.vue";

export default defineComponent({
  name: "TargetAudience",
  components: {
    Eyebrow,
    CardBlur,
    DocumentTextIcon
  },
  setup() {
    const uri_target = import.meta.env.PUBLIC_API_WP_TARGETAUDIENCE;
    const targetData = ref(null);

    const title = ref('');
    const description = ref('');
    const linkYoutube = ref('');
    const button1 = ref({});
    const button2 = ref({});
    const itemList = ref([]);
    const qualification = ref([]);
    const imageSection = ref('');


    const fetchData = () => {
      fetch(uri_target)
        .then((response) => response.json())
        .then((data) => (targetData.value = data, initialData()))
        .catch((error) => {
          console.error("Error fetching overview data:", error);
        });
    };
    const initialData = () => {
      // Process targetData if needed
      title.value = targetData.value.title || '';
      description.value = targetData.value.description || '';
      linkYoutube.value = targetData.value.link_youtube || '';

      button1.value = targetData.value.button1 || {};
      button2.value = targetData.value.button2 || {}

      itemList.value = targetData.value.list || [];
      qualification.value = targetData.value.qualification || [];
      imageSection.value = targetData.value.image || '/image/digital-composite-image-businessman-touching-invisible-screen.jpg';
    }
    fetchData();

    return {
      targetData,
      title,
      description,
      linkYoutube,
      button1,
      button2,
      itemList,
      imageSection,
      qualification
    };
  },
});

</script>
<style scoped>
#bg-target {
  background-image: url('/image/digital-composite-image-businessman-touching-invisible-screen.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
}
</style>