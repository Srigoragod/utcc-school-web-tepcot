<template>
<div class="container mx-auto md:px-0 tepcot-overlap relative pb-20">
  <div class="px-4 md:px-0">
    <div class="relative grid items-start gap-8 lg:grid-cols-12">
      <!-- Left: Yellow text panel -->
      <div class="lg:col-span-7 ">
        <div class="relative">
          <!-- content -->
           <!--  -->
          <div class="p-4 py-8 rounded-2xl bg-slate-50 shadow-sm hover:ring-1 hover:ring-blue-300/30">
            <Eyebrow class="bg-blue-900 text-white px-2 mb-2" :text="'Overview Executive Education'" />
            <!-- <h2 class=" font-bold text-44 md:text-60  text-blue-700">หลักสูตรผู้บริหารระดับสูง</h2> -->
            <h3 class="tracking-tight text-a-blue-030e62 text-36 sm:text-44">
              {{ title }}
            </h3>

            <div class="mt-6 space-y-5 leading-relaxed text-slate-700/90 text-20 md:text-24 font-light" v-html="description"></div>
          </div>
          <div>

          </div>
        </div>
      </div>

      <!-- Right: Video block -->
      <div class="lg:col-span-5 bg-image h-full rounded-2xl"  :style="{ backgroundImage: `url(${imageUrl})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center right', backgroundSize: 'cover' }"
            loading="lazy"  >
        <div class="relative">
          <!-- video card -->
          <div class="relative overflow-hidden rounded-2xl bg-slate-50 shadow-sm hover:ring-1 hover:ring-blue/5">
            <!-- Replace src with your video embed or <video> -->
            <!-- <div class="aspect-video w-full h-full">
              <iframe
                class="h-full w-full"
                :src="`${linkYoutube}&autoplay=1&mute=1`"
                title="TEPCOT Overview"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div> -->
          </div>
          <!-- caption / link -->
          <!-- flex -->
        </div>
      </div>
    </div>
  </div>
  <div class=" grid grid-cols-2 md:grid-cols-5 gap-2 py-8">

  <div v-for="(card, index) in itemList" :key="index">

    <CardBlur
      class="text-blue-900"
      :icon="card.icon"
      :title="card.title"
      :desc="card.detail"
    ></CardBlur>
  </div>

  </div>

  <div class="flex justify-start mt-10 gap-6 flex-col sm:flex-row items-center">

    <a :href="button2.link" class="inline-block"
    >
         <button class="btn btn-info text-20 md:text-24 rounded-full ">
          {{ button2.title }}
          <div class="">
            <ArrowDownTrayIcon  class="h-8 w-8"></ArrowDownTrayIcon>
          </div>
         </button>
    </a>
    <a :href="button1.link" class="inline-block">
      <button class="btn btn-outline btn-info text-20 md:text-24 rounded-full ">{{ button1.title }}</button>
    </a>
  </div>

</div>

</template>
<script>
import { ref, defineComponent } from "vue";
// components
import { ArrowDownTrayIcon } from "@heroicons/vue/24/solid";

import Eyebrow from "./Eyebrow.vue";
import CardBlur from "../card/CardBlur.vue";


export default defineComponent({
  name: "OverView",
  components: {
    Eyebrow,
    CardBlur,
    ArrowDownTrayIcon
  },
  setup() {
    const uri_overview = import.meta.env.PUBLIC_API_WP_OVERVIEW;
    const overviewData = ref(null);

    const title = ref('');
    const description = ref('');
    const linkYoutube = ref('');
    const button1 = ref({});
    const button2 = ref({});
    const itemList = ref([]);
    const imageUrl = ref('');


    const fetchData = () => {
      fetch(uri_overview)
        .then((response) => response.json())
        .then((data) => (overviewData.value = data, initialData()))
        .catch((error) => {
          console.error("Error fetching overview data:", error);
        });
    };
    const initialData = () => {
      // Process overviewData if needed
      title.value = overviewData.value.title || '';
      description.value = overviewData.value.description || '';
      linkYoutube.value = overviewData.value.link_youtube || '';

      button1.value = overviewData.value.button1 || {};
      button2.value = overviewData.value.button2 || {}

      itemList.value = overviewData.value.list || [];
      imageUrl.value = overviewData.value.image_url || '';

    }
    fetchData();

    return {
      overviewData,
      title,
      description,
      linkYoutube,
      button1,
      button2,
      itemList,
      imageUrl
    };
  },
});

</script>
