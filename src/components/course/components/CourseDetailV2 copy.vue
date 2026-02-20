<template>
  <div class="layout-page bg-white">
    <SkeletonAnimated v-if="isLoading" />
    <div v-else>
  
      <div class="w-full h-[650px] bg-local bg-no-repeat rounded-none is-desktop relative" :style="{
        backgroundImage: `url(${itemList.imageHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }">
        <div class="bg-overlay-card-detail-v2">
          <div class="topic container mx-auto">

            <!-- breadcrumbs -->
            <div class="text-sm breadcrumbs absolute top-24">
              <ul class="text-24 text-white">
                <li><a class="">หลักสูตร</a></li>
                <li class="text-white">{{ itemList.title }}</li>
              </ul>
            </div>
            <!-- / breadcrumbs -->
            <!-- topic -->
            <div id="hero" class="grid gab-8 pb-8">
              <div>
                <h1 class="text-36 md:text-66 text-2-line font-bold leading-none text-shadow text-a-gold-F0C571">
                  {{ itemList.title }}
                </h1>
              </div>
              <div class="w-full">
                <h2 class="text-24 md:text-36 uppercas text-2-line text-white font-light text-shadow">
                  {{ itemList.subtitle }}
                </h2>
                <h3 class="text-24 md:text-30 font-light mt-2 text-a-gold-F0C571 line-clamp-2" v-html="itemList.shortdescription"></h3>
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
          <!-- topic -->
          <div id="hero" class="grid gab-8 pb-8">
            <div>
              <h2 class="text-36 md:text-66 text-2-line leading-none text-white text-shadow">
                {{ itemList.title }}
              </h2>
            </div>
            <div class="w-full">
              <h4 class="text-24 md:text-36 uppercas text-2-line text-white font-light text-shadow">
                {{ itemList.subtitle }}
              </h4>
            </div>
          </div>
          </div>
          <!-- / topic -->
        </div>
      </div>
      <!-- Program Overview -->
      <section class="container mx-auto py-10 md:py-20 px-4 md:px-0">
      <div class="max-w-6xl md:max-w-full mx-auto text-slate-800">
       <Eyebrow class="bg-blue-900 text-white px-2 mb-2" :text="'Executive Education'" />
        <h2 class="text-24 md:text-30 font-semibold">ภาพรวมหลักสูตร</h2>
        <p class="text-20 md:text-24 font-light" v-html="itemList.description"></p>
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
          <p class="mt-4 text-20 md:text-24 font-light text-slate-800" v-html="m.paragraph"></p>

          <div class="mt-6">
            <p v-if="m.key_topics && m.key_topics.length > 0" class="text-20 md:text-24 text-blue-950">Key Topics</p>
            <ul class="mt-3 space-y-1 list-disc list-inside font-light">
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

    <section class="container mx-auto  bg-slate-100/70 rounded-lg mb-10 md:mb-20 px-4 md:px-0">
      <div class="px-4 py-10 text-a-gray-696F6F">
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
              <h4 class="text-24 md:text-30 text-a-blue-030e62 font-normal"> ตารางเวลาและระยะเวลา </h4>
              <ul class="list-disc text-slate-600 mb-4" style="padding-left: 1.5rem; margin-bottom: 2rem; list-style: disc;">
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
              <h4 class="text-24 md:text-30 text-a-blue-030e62 font-normal"> {{ `กำหนดการ ${itemList.schedule?.remark}`  }} </h4>
              <ul class="list-disc text-slate-600 mb-4 " style="padding-left: 1.5rem; margin-bottom: 2rem; list-style: disc;">
                <li class="mt-1" v-for="(sch, index) in itemList.schedule?.items" :key="index">
                  <span class="ml-2 text-20 md:text-24 text-a-blue-1c1c84/80">
                    {{ sch.name }} : {{ sch.desc }}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div class="flex-row md:flex justify-end">
            <div class="px-1">
            <button
              class="btn btn-accent text-20 md:text-24 font-light"
            >
              <ArrowDownTrayIcon class="h-6 w-6 mx-2"></ArrowDownTrayIcon>
              Download Brochure
            </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  </div>
</template>

<script>
import { ref, defineComponent } from "vue";

// components
import SkeletonAnimated from "../components/SkeletonAnimated.vue";
import TermsAndConditions from "./TermsAndConditions.vue";
import TableDetailFee from "./TableDetailFee.vue";
import TypeIcon from "../../Button/TypeIcon.vue";
import ImageJobOpp from "./ImageJobOpp.vue";
import FacilitiesSection from "../../Facilities/FacilitiesSection.vue";
import SwiperPromo from "../../SlideShow/SwiperPromo.vue";
import CurriculumSection from "../CurriculumSection.vue";
import FullPageSnap from "../../motion/FullPageSnap.vue";
import Eyebrow from "../../AboutUs/Eyebrow.vue";
import Modules from "../Modules.vue";
import Stat from "../Stat.vue";
import { ArrowDownTrayIcon } from '@heroicons/vue/24/solid'



export default defineComponent({
  name: "CourseDetailV2",
  components: {
    SkeletonAnimated,
    TermsAndConditions,
    TableDetailFee,
    TypeIcon,
    ImageJobOpp,
    FacilitiesSection,
    SwiperPromo,
    CurriculumSection,
    FullPageSnap,
    Eyebrow,
    Modules,
    Stat,
    ArrowDownTrayIcon
  },
  props: {
    items: { type: Object, require: true },
    slug: { type: String, require: true },
    currency: { type: String, default: "th" },
    lang: { type: String, default: "th" },
  },
  setup(props, ctx) {
    const isLoading = ref(true);
    const itemList = ref(props.items);
    const jobOop = ref(null);
    const initialData = () => {
      let data = {
        slug: props.items.slug,
        imageHero: props.items.imageHero || '',
        hero_mobile: props.items.hero_mobile || '',
        title: props.items.title || '',
        subtitle: props.items.subtitle || '',
        description: props.items.description || '',
        shortdescription: props.items.shortdescription || '',
        course_name: props.items.course_name || '',
        degree_name: props.items.degree_name || '',
        credits: props.items.credits || '',
        fund: props.items.fund ? props.items.fund : false,
        graduates: props.items.graduates || '',
        course: props.items.course || '',
        entry: props.items.entry || '',
        total_tuition: props.items.total_tuition || '',
        year_tuition: props.items.year_tuition ? props.items.year_tuition : '',
        detailFee: props.items.detailFee || '',
        highlights: props.items.highlights || [],
        modulesList: props.items.modulesList || [],
        teaching_methods: props.items.teaching_methods || [],
        duration: props.items.duration || [],
        schedule: props.items.schedule || []
      };
      itemList.value = data;

      let data2 = {
        image: props.items.job_opp_image,
        pdf: props.items.pdf_curriculum,
        subjects: props.items.subjects,
        job_opp: props.items.job_opp,
      };
      jobOop.value = data2;
      setTimeout(() => {
        isLoading.value = false;
      }, 1000);
    };
    initialData();
    return {
      isLoading,
      itemList,
      jobOop,
    };
  },
});
</script>

<style>
iframe{
  height: 580px;
}
</style>
<style scoped>
/* #hero {
  background-color: navy;
  height: 100%;
} */
/* #hero::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-image: url("/public/image/CE-min-white.svg");
  background-position:  bottom 8px right 100px;
  background-size: 30%;
  background-repeat: no-repeat;
  opacity: 0.5;
  z-index: 0;
} */
#header {
  background-color: rgb(0 0 0 / 0.4);
}
.menu-item {
  background-color: #f2f2f2;
  border-radius: 50%;
}

ol,
ul,
menu {
  list-style: disc;
  margin: 0 1.75rem;
  padding: 0;
}

.breadcrumbs {
  padding: 0;
  overflow: hidden;
}

.bg-overlay-card-detail-v2 {
  display: flex;
  justify-items: start;
  align-items: flex-end;
  background: linear-gradient(180deg,
      #f2f2f2 50%,
      #FFFFFF 100%);
  height: 100%;
  width: 100%;
}

.text-shadow {
  text-shadow: 4px 4px 9px rgba(0, 0, 0, 0.66);
  opacity: 1;
}

.topic-design .title {
  width: 88%;
}

@media only screen and (max-width: 767px) {
  .menu-icon-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .main-content {
    display: flex;
    flex-direction: column;
  }

  .layout-page {
    /* padding-top: 3rem; */
  }

  .breadcrumbs {
    display: none;
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
    background-size: 55%;
    background-position:  bottom 20px right 40px;
    opacity: 0.5;
  }

}

@media only screen and (min-width: 768px) and (max-width: 1023px) {

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

  .breadcrumbs,
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
