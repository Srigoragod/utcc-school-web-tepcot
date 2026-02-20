<template>
  <div class="layout-page bg-white pt-20">
    <SkeletonAnimated v-if="isLoading" />
    <div v-else>
      <div class="w-full h-[750px] bg-local bg-no-repeat rounded-none is-desktop relative" :style="{
        backgroundImage: `url(${itemList.imageHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }">
        <div class="bg-overlay-card-detail-v2 relative">
          <div class="topic container mx-auto">
            <div class="text-sm breadcrumbs absolute top-8 pt-6 z-10">
                  <ul id="breadcrumbs-course" class="text-24 text-white">
                    <li><a href="/" class=" text-white">หน้าแรก</a></li>
                    <li class="text-white">หลักสูตร</li>
                  </ul>
            </div>
            <!-- topic -->
            <div id="hero" class="grid gab-8 pb-8">
              <div class="relative">
                <div class="flex gap-1 items-center pb-2">
                  <div class="flex badge badge-accent gap-1 items-center" v-for="(item, index) in itemList.category"
                    :key="index" :class="[`badge-type-${item.value}`]">
                    <svg v-if="item.value == 2 || item.value == '2'" xmlns="http://www.w3.org/2000/svg" fill="none"
                      viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                    </svg>

                    <div class="text-20 text-1-line">
                      {{ item.label }}
                    </div>
                  </div>
                </div>
                <h1 class="text-80 pr-4 md:pr-40 text-2-line font-bold leading-none text-shadow">
                  {{ `${itemList.title}` }}
                </h1>
              </div>
              <div class="w-full">
                <h2 class="text-44 uppercas text-2-line text-a-orange-FF9601  text-shadow">
                  <!-- {{ itemList.remark }} -->
                    {{ `${itemList.subtitle}` }}
                </h2>
                <h3 class="text-34  mt-2 text-a-gold-F0C571 line-clamp-2" v-html="itemList.shortdescription"></h3>
              </div>
            </div>
          </div>
          <!-- / topic -->
        </div>
      </div>
      <!-- mobile -->
      <div class="w-full h-[350px] bg-local bg-no-repeat rounded-none is-mobile relative" :style="{
        backgroundImage: `url(${itemList.hero_mobile})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }">
        <div class="bg-overlay-card-detail-v2">
          <div class="topic container mx-auto">
            <div class="text-sm breadcrumbs absolute top-4 z-10">
              <ul id="breadcrumbs-course" class="text-24 text-white">
                    <li><a href="/" class="">หน้าแรก</a></li>
                    <li class="text-white">หลักสูตร</li>
              </ul>
            </div>
            <!-- topic -->
            <div id="hero" class="grid gab-8 pb-8">
              <div class="relative">
                <div class="flex gap-1 items-center pb-2">
                  <div class="flex badge badge-accent gap-1 items-center" v-for="(item, index) in itemList.category"
                    :key="index" :class="[`badge-type-${item.value}`]">
                    <svg v-if="item.value == 2 || item.value == '2'" xmlns="http://www.w3.org/2000/svg" fill="none"
                      viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                    </svg>

                    <div class="text-18 text-1-line">
                      {{ item.label }}
                    </div>
                  </div>
                  <div class="flex badge badge-secondary gap-2 items-center text-shadow" v-if="itemList.isNew">
                      <div class="text-18 text-white">New</div>
                    </div>
                </div>
                <h1 class="text-54 text-3-line font-bold leading-none text-a-gold-F0C571 text-shadow">
                  <span class="text-1-line "> {{ `${itemList.title}` }}</span>
                </h1>
                <h2 class="text-30  text-a-orange-FF9601  text-shadow text-1-line">
                  {{ itemList.subtitle }}
                </h2>
                <h3 class="text-24 md:text-30  mt-2 text-a-gold-F0C571 line-clamp-2" v-html="itemList.shortdescription"></h3>
              </div>
            </div>
          </div>
          <!-- / topic -->
        </div>
      </div>

      <section class="container mx-auto py-10 md:py-20 px-4 md:px-0">
      <div class="max-w-6xl md:max-w-full mx-auto text-slate-800">
       <Eyebrow class="bg-blue-900 text-white px-2 mb-2" :text="'Executive Education'" />
        <h2 class="text-24 md:text-30 font-semibold">ภาพรวมหลักสูตร</h2>
        <p class="text-20 md:text-24 " v-html="itemList.description"></p>
      </div>

      <!-- Highlights Grid -->
      <div class="max-w-6xl md:max-w-full mx-auto pb-10 md:pb-20 text-slate-800">
         <Stat :items="itemList.highlights" />
      </div>

      <!-- Module Executive Grid -->
      <h2 class="text-24 md:text-30">หลักสูตรผู้บริหารด้านการค้าและการพาณิชย์ (Executive Program)</h2>
      <span v-for="(m, index) in itemList.modulesList" :key="index" class="block  border-b  border-slate-300 last:border-0">
       <div class="max-w-6xl md:max-w-full mx-auto text-slate-800">
        <!-- Content -->
        <div class="grid grid-cols-1 md:grid-cols-3 p-6 sm:p-10 bg-white gap-8">
          <div>
          <h3 class="mt-3 text-36 md:text-44 ">
            <span class="font-bold text-gradient-blue" v-html="m.name_mudule"></span>
            <!-- <img v-if="m.imageUrl" :src="m.imageUrl" alt="Image Module"  /> -->
          </h3>
         </div>
         <div class="md:col-span-2">
          <p class="mt-4 text-20 md:text-24  text-slate-800" v-html="m.paragraph"></p>

          <div class="mt-6">
            <p v-if="m.key_topics && m.key_topics.length > 0" class="text-20 md:text-24 text-blue-950">Key Topics</p>
            <ul class="mt-3 space-y-1 list-disc list-inside ">
              <li v-for="(key, index) in m.key_topics" :key="index">
                <span class="text-20 md:text-24 text-slate-700">{{ key.text }}</span>
              </li>
            </ul>
          </div>
          </div>
        </div>
       </div>
       </span>

      </section>

      <section class="container mx-auto pb-20">
        <div class="max-w-6xl md:max-w-full mx-auto text-slate-800">
          <Eyebrow class="bg-blue-900 text-white px-2 mb-2" :text="'Executive Education'" />
          <!-- <h2 class="text-24 md:text-30 font-semibold">กำหนดการเรียน (ตัวอย่าง)</h2> -->
        </div>
        <div class="p-6 md:p-10 text-a-gray-696F6F">
          <div class="grid grid-cols-1 md:grid-cols-3  gap-8 ">
            <div class="item  gap-4 col-span-2 hidden">
              <h4 class="text-24 md:text-30 text-a-blue-030e62 font-normal"> รูปแบบการเรียนการสอน </h4>
              <ul class="custom-list text-slate-600 mb-4" style="padding-left: 1.5rem; margin-bottom: 2rem; list-style: disc;">
                <li v-for="(met, index) in itemList.teaching_methods" :key="index">
                  {{ met.method }} : {{ met.desc }}
                </li>
              </ul>
            </div>
            <div class="item">
              <div class="gap-4">
                <h4 class="text-30 md:text-36 text-a-blue-030e62 font-normal"> ตารางเวลาและระยะเวลา </h4>
                <ul class="list-disc text-slate-600 mb-4" >
                  <li class="mt-1" v-for="(dur, index) in itemList.duration" :key="index">
                    <span class="ml-2 text-20 md:text-24 text-a-blue-1c1c84/80">
                      {{ dur.name }} : {{ dur.desc }}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="item">
              <div class="gap-4">
                <h4 class="text-30 md:text-36 text-a-blue-030e62 font-normal"> {{ `กำหนดการ ${itemList.schedule?.remark}`  }} </h4>
                <ul class="list-disc text-slate-600 mb-4 " >
                  <li class="mt-1" v-for="(sch, index) in itemList.schedule?.items" :key="index">
                    <span class="ml-2 text-20 md:text-24 text-a-blue-1c1c84/80">
                      {{ sch.name }} : {{ sch.desc }}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="">
              <h4 class="text-30 md:text-36 text-a-blue-030e62 font-normal"> สอบถามรายละเอียดเพิ่มเติม </h4>
              <!-- <p class="text-20 md:text-24 text-a-blue-1c1c84/80 mt-2">
              TEPCoT : Commerce Academy ศูนย์บริการวิชาการ มหาวิทยาลัยหอการค้าไทย
              </p> -->
              <p class="text-20 md:text-24 text-slate-600">
              Tel : 02-697-6861-3 Fax : 02-277-1803
              <br/>
              email : tepcot@utcc.ac.th
              <br/>
              LINE ID : @asc.utcc
              </p>
            </div>
          </div>
        </div>
      </section>

      <ImageJobOpp :items="jobOop" />
    </div>

  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
import { CurrencyDollarIcon,ClockIcon,AcademicCapIcon } from "@heroicons/vue/24/solid";
// components
import Eyebrow from "../../AboutUs/Eyebrow.vue";
import SkeletonAnimated from "../components/SkeletonAnimated.vue";;
import ImageJobOpp from "./ImageJobOpp.vue";

export default defineComponent({
  name: "CourseDetailV2",
  components: {
    SkeletonAnimated,
    Eyebrow,
    ImageJobOpp
  },
  props: {
    items: { type: Object, require: true },
    slug: { type: String, require: true },
    currency: { type: String, default: "th" },
    lang: { type: String, default: "th" },
  },
  setup(props, ctx) {
    const uri = import.meta.env.PUBLIC_API_WP_PROGRAM;
    const isMba = ref(false);
    const mbaList = ref(null)
    const lang = ref('th');
    const isLoading = ref(true);
    const itemList = ref(props.items);
    const jobOop = ref(null);
    const currentYear = '2569';

    const initialData = () => {
      let data = {
        imageHero: props.items.imageHero,
        hero_mobile: props.items.hero_mobile,
        title: props.items.title,
        subtitle: props.items.subtitle,
        description: props.items.description || '',
        shortdescription: props.items.shortdescription,
        highlights: props.items.highlights || [],
        modulesList: props.items.modulesList || [],
        teaching_methods: props.items.teaching_methods || [],
        duration: props.items.duration || [],
        schedule: props.items.schedule || []
      }
      itemList.value = data;

      let data2 = {
        image: props.items.job_opp_image,

      };
      jobOop.value = data2;
      
      setTimeout(() => {
        isLoading.value = false
      }, 1000);
    };

    const handleDateTime = (val, type) => {
      const myArray = val.split("|");
      return type === "date" ? myArray[0] : props.slug === 'mkt-comms-masters' ? '8:00-18:00 น.' : myArray[1];
    };

    const fetchData = async (page) => {
      await fetch(uri + `?per_page=35&acf_format=standard&_fields=id,slug,acf`, { mode: "cors" }
      )
        .then((response) => response.json())
        .then((data) => (initialDataMbaList(data)))
        .catch((error) =>
          console.error("Error fetching mba data:", error)
        );
    };

    const initialDataMbaList = (data) => {
      // console.log('initialDataMbaList',data);
      const newArray = data.map(function (element) {
        if (props.slug != element.slug) {
          return lang.value == 'en' ? element.acf.en : element.acf.th
        }
      });
      const filteredArray = newArray.filter(element => element !== undefined);
      const type = ['mba'];
      const dataList = filteredArray.filter((item) => {
        return type.some((value) => item.tags.value.includes(value))
      });
      mbaList.value = dataList.sort(randomSort);
      isMba.value = true;
    }
    const handleIsEvenNumber = (index) => {
      if (index) {
        return index % 2 == 1;
      }
    };
    const randomSort = () => {
      return Math.random() - 0.5;
    }

    initialData();

    return {
      isLoading,
      itemList,
      jobOop,
      handleDateTime,
      mbaList,
      isMba,
      lang,
      handleIsEvenNumber,
      currentYear
    };
  },
});
</script>
<style>
.table :where(thead tr, tbody tr:not(:last-child), tbody tr:first-child:last-child) {
  border-bottom-color: #fff;
}

#custom-table-time {
  background: #fdddad;
  background: radial-gradient(circle, #fffaf3 5%, #fdddad 100%);
  border-radius: 1rem;
}
#custom-table-academic {
  color: #fff;
  background: #161616;
  background: radial-gradient(circle, #575757 5%, #161616 100%);
  border-radius: 1rem;
}
#custom-table-academic thead th,#custom-table-academic tbody td {
 text-align: center;
 vertical-align: top;
}
/* #custom-table-time th {
    text-align: center;
  } */
#custom-table-price {
  background: #ededed;
  background: radial-gradient(circle, #f8f8f8 5%, #ededed 100%);
  border-radius: 1rem;
}

#custom-table-price th {
  text-align: center;
}

#custom-table-price td {
  text-align: center;
  font-size: 1.75rem;
}

#header {
  background-color: navy;
}

#description-program ul {
  list-style: disc;
  padding: 0 0 0 1rem;
  margin: 0 0 1rem 1rem;
}

#description-program ol {
  list-style: decimal;
  padding: 1rem;
}

iframe {
  height: 580px;
}
</style>
<style scoped>
#breadcrumbs-course{
  padding: 0;
  margin: 1rem 0;
  overflow: hidden;
}
#hero::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-image: url("/public/image/logo-tepcot-outline.svg");
  background-position:  bottom 8px right 100px;
  background-size: 40%;
  background-repeat: no-repeat;
  opacity: 0.5;
  z-index: 0;
  margin-bottom: 1rem;
}

#header {
  background-color: navy;
}

.menu-item {
  border-radius: 50%;
}

ol,
ul,
menu {
  list-style: disc;
  margin: 0 1.75rem;
  padding: 0;
}

.bg-overlay-card-detail-v2 {
  display: flex;
  justify-items: start;
  align-items: flex-end;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 50%, #0a0a0b 100%);
  height: 100%;
  width: 100%;
}

.text-shadow {
  color: #fff;
  text-shadow: 4px 4px 9px rgba(0, 0, 0, 0.66);
  opacity: 1;
}

.topic-design .title {
  width: 88%;
}

@media only screen and (max-width: 767px) {
  #custom-table-price td {
    text-align: center;
    font-size: 1.25rem;
  }

  .menu-icon-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.5rem;
  }

  .main-content {
    display: flex;
    flex-direction: column;
  }

  .topic,
  .content-detail {
    padding: 0 1rem;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .info div:nth-child(2) {
    padding: 0 !important;
  }

  .table-pricing {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  .total-tuition {
    display: flex;
    gap: 2rem;
  }

  .topic-design .title {
    width: 100%;
  }

  .is-desktop {
    display: none;
  }

  #hero::before {
    background-size: 35%;
    background-position:  bottom 20px right 20px;
    opacity: 0.5;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1023px) {

  .topic,
  .content-detail {
    padding: 0 1rem;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .info div:nth-child(2) {
    padding: 0 !important;
  }

  .table-pricing {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .table-pricing div.el:nth-child(1) {
    grid-column: span 2 / span 2;
  }

  .total-tuition {
    display: flex;
    gap: 2rem;
  }

  .topic-design .title {
    width: 100%;
  }

  .is-desktop {
    display: none;
  }
}

@media only screen and (min-width: 1366px) and (orientation: landscape) {
  .topic {
    padding: 0 1rem;
  }

  /* .info {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .info div:nth-child(2) {
    padding: 0 !important;
  } */

  .table-pricing {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .table-pricing div.el:nth-child(1) {
    grid-column: span 2 / span 2;
  }

  .total-tuition {
    display: flex;
    gap: 2rem;
  }
}

@media only screen and (min-width: 1024px) and (orientation: portrait) {

  .topic,
  .content-detail {
    padding: 0 1rem;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .info div:nth-child(2) {
    padding: 0 !important;
  }

  .table-pricing {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .table-pricing div.el:nth-child(1) {
    grid-column: span 2 / span 2;
  }

  .total-tuition {
    display: flex;
    gap: 2rem;
  }
}

@media only screen and (min-width: 1024px) {
  .is-mobile {
    display: none;
  }
}
</style>
