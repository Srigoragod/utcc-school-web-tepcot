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
            <!-- <div class="text-sm breadcrumbs absolute top-24">
              <ul class="text-24 text-white">
                <li><a class="">หลักสูตร</a></li>
                <li class="text-white">{{ itemList.title }}</li>
              </ul>
            </div> -->
            <!-- / breadcrumbs -->
            <!-- topic -->
            <div id="hero" class="grid gab-8 pb-8">
              <div>
                <h1 class="text-36 md:text-66 text-2-line leading-none text-white text-shadow">
                  {{ itemList.title }}
                </h1>
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

      <!-- <CurriculumSection :title="itemList.title" :subtitle="itemList.subtitle" :paragraphs="[itemList.description]" :highlights="itemList.highlights" :facts="itemList.facts" /> -->
      <FullPageSnap />
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
    FullPageSnap
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
        imageHero: props.items.hero_layout[0].image,
        hero_mobile: props.items.hero_mobile,
        title: props.items.title,
        subtitle: props.items.subtitle,
        description: props.items.description,
        course_name: props.items.course_name,
        degree_name: props.items.degree_name,
        credits: props.items.credits,
        fund: props.items.fund ? props.items.fund : false,
        graduates: props.items.graduates,
        course: props.items.course,
        entry: props.items.entry,
        total_tuition: props.items.total_tuition,
        year_tuition: props.items.year_tuition ? props.items.year_tuition : '',
        detailFee: props.items.detailFee,
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
#hero::before {
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
}
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
  background-color: var(--accent-dark);

  padding: 1rem 1.5rem;
  overflow: hidden;
}

.bg-overlay-card-detail-v2 {
  display: flex;
  justify-items: start;
  align-items: flex-end;
  background: linear-gradient(180deg,
      rgba(255, 255, 255, 0) 50%,
      #000000 100%);
  height: 100%;
  width: 100%;
}

.text-shadow {
  color: #fff;
  font-weight: 300;
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

  .topic-design .title {
    width: 100%;
  }

  .is-desktop {
    display: none;
  }
}

@media only screen and (min-width: 1366px) and (orientation: landscape) {

  .breadcrumbs,
  .topic,
  .content-detail {
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
