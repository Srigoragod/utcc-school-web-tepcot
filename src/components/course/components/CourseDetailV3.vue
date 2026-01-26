<template>
  <div class="pt-20 layout-page bg-white">
    <SkeletonAnimated v-if="isLoading" />
    <div v-else>
      <!-- desktop -->
      <div class="w-full h-[550px] bg-local bg-no-repeat rounded-none is-desktop" :style="{
        backgroundImage: `url(${itemList.imageHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }">
        <div class="bg-overlay-card-detail-v2">
          <div class="topic container mx-auto">
            <!-- breadcrumbs -->
            <!-- <div class="text-sm breadcrumbs glass rounded-full absolute top-24">
              <ul class="text-24 text-white">
                <li>
                  <a href="javascript:void(0)" class="text-white hover:text-slate-50"> {{ t("nav.course") }}</a>
                </li>
                <li class="text-white">{{ itemList.title }}</li>
              </ul>
            </div> -->

          </div>
          <!-- / topic -->
        </div>
      </div>

      <!-- mobile -->
      <div class="w-full h-[350px] bg-local bg-no-repeat rounded-none is-mobile" :style="{
        backgroundImage: `url(${itemList.imageMobile})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }">
        <div class="bg-overlay-card-detail-v2">
          <div class="topic container mx-auto">
            <!-- breadcrumbs -->
            <div class="text-sm breadcrumbs glass rounded-full absolute top-24">
              <ul class="text-24 text-white">
                <li>
                  <a href="javascript:void(0)" class="text-white hover:text-slate-50"> {{ t("nav.course") }}</a>
                </li>
                <li class="text-white">{{ itemList.title }}</li>
              </ul>
            </div>

          </div>
          <!-- / topic -->
        </div>
      </div>

      <div class="container mx-auto content-detail">
        <div>
          <div class="topic-design grid gab-8 mt-8">
            <div class="title">
              <h1 class="text-54 md:text-66 leading-none font-black text-2-line text-a-blue-030e62">
                {{ programName }}
              </h1>
            </div>
            <div class="w-full">
              <h4 class="text-36 font-light">{{ itemList.subtitle }}</h4>
            </div>
          </div>
        </div>
        <!-- / topic -->

        <div class="py-4 grid gap-4">
          <div class="text-24 font-light" v-if="itemList.description && !itemList.custom_desc"
            v-html="itemList.description"></div>
          <div class="text-24 font-light" v-if="itemList.custom_desc" v-html="itemList.custom_desc"></div>
        </div>
        <!-- Start stats -->
        <div class="stats shadow w-full custom-html">
          <div class="stat place-items-center">
            <div class="stat-title">
              <h2 class="text-30">{{ t("course.graduates") }}</h2>
            </div>
            <div class="stat-value">
              <h2 class="text-30  md:text-36  lg:text-44  text-1-line">
                {{ itemList.graduates  == 1 ? t("graduates.type1") : '-'  }}
              </h2>
            </div>
            <div class="stat-desc text-24 my-2 font-light">&nbsp;</div>
          </div>
          <div class="stat place-items-center" v-if="itemList.credits">
            <div class="stat-title">
              <h2 class="text-30">{{ t("course.credits") }}</h2>
            </div>
            <div class="stat-value">
              <h2 class="text-30  md:text-36  lg:text-44   text-1-line">
                {{ itemList.credits }}
              </h2>
            </div>
            <div class="stat-desc text-24 my-2 font-light">&nbsp;</div>
          </div>

          <div class="stat place-items-center">
            <div class="stat-title">
              <h2 class="text-30">{{ t("course.course") }}</h2>
            </div>
            <div class="stat-value">
              <h2 class="text-30  md:text-36  lg:text-44  text-1-line">
                {{ itemList.course }}
              </h2>
              <h2 v-if="itemList.remark" class="text-20">
                {{ itemList.remark }}
              </h2>
            </div>
            <div class="stat-desc text-24 my-2 font-light text-center">
              &nbsp;
            </div>
          </div>

          <div class="stat place-items-center" v-if="itemList.entry_thai">
            <div class="stat-title">
              <h2 class="text-30">{{ t("course.entry") }}</h2>
            </div>
            <div class="stat-value text-center">
              <h2 class="text-30  md:text-36  lg:text-44  font-bold text-1-line">
                {{ itemList.entry_thai }}
              </h2>
              <div class="stat-desc text-24 my-2 font-light text-center text-a-gray-696F6F">
                {{ `(${t("course.foreigners")} ${itemList.entry})` }}
              </div>
            </div>
          </div>

          <div class="stat place-items-center">
            <div class="stat-title">
              <h2 class="text-30">{{ t("course.tuitionFees") }}</h2>
            </div>
            <div class="stat-value">
              <h2 class="text-30  md:text-36  lg:text-44  font-bold text-1-line">
                {{ itemList.total_tuition_thai ? itemList.total_tuition_thai : itemList.total_tuition }}
              </h2>
            </div>
            <div class="stat-desc text-24 my-2 font-light text-center text-a-gray-696F6F" v-if="itemList.total_tuition_thai">
              {{ `(${t("course.foreigners")} ${itemList.total_tuition})` }}
            </div>
          </div>
        </div>
        <!-- End stats -->
        <div class="py-10 text-center" v-if="tuitionFees">
          <a :href="`${tuitionFees}`" target="_blank">
            <button class="btn btn-primary text-24 btn-outline btn-wide btn-circle ">
             {{ t("button.tuition") }}
            </button>
          </a>
        </div>


        <div v-html="itemList.custom_fees"></div>
      </div>
      <ImageJobOpp :items="jobOop" />
    </div>
    <ProgramDirector :slug="slug" :lang="lang"></ProgramDirector>
    <FacilitiesSection :slug="slug" :title="programName" :lang="lang" />
    <!-- <CourseList :slug="slug" :lang="lang" /> -->
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";

// components
import SkeletonAnimated from "../components/SkeletonAnimated.vue";
import ImageJobOpp from "./ImageJobOpp.vue";
import FacilitiesSection from "../../Facilities/FacilitiesSection.vue";
// import CourseList from "../CourseList.vue";

import { useTranslations } from "../../../i18n/utils";


export default defineComponent({
  name: "CourseDetailV2",
  components: {
    SkeletonAnimated,
    ImageJobOpp,
    FacilitiesSection
    // CourseList
  },
  props: {
    items: { type: Object, require: true },
    slug: { type: String, require: true },
    currency: { type: String, default: "en" },
    lang: { type: String, default: "en" },
    uri: { type: String, default: "" },
  },
  setup(props, ctx) {
    const tuitionFees = ref("");
    const programName = ref("");
    const data1 = ref(null);
    const isLoading = ref(true);
    const itemList = ref(null);
    const jobOop = ref(null);
    const t = useTranslations(props.lang);
    const uri = import.meta.env.PUBLIC_API_WP_PROGRAM_ISM;
    const fetchCoureData = async () => {
      await fetch(
        `${uri}?acf_format=standard&_fields=id,slug,acf&slug=${props.slug}`,
        { mode: "cors" }
      )
        .then((response) => response.json())
        .then((data) => {
          data1.value = props.lang == "en" ? data[0].acf.en : data[0].acf.th;
          tuitionFees.value = data[0].acf.tuition_fees;
          initialData();
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    const initialData = () => {
      programName.value = data1.value.title;

      let data = {
        imageMobile: data1.value.hero_mobile,
        imageHero:  data1.value.cover_ac ? data1.value.cover_ac : data1.value.hero_layout[0].image,
        title: data1.value.title,
        subtitle: data1.value.subtitle,
        description: data1.value.description,
        course_name: "",
        degree_name: "",
        credits: data1.value.credits,
        fund: "",
        graduates: data1.value.graduates,
        course: data1.value.course.value,
        entry: data1.value.entry,
        entry_thai: data1.value.entry_thai,
        total_tuition: data1.value.total_tuition,
        total_tuition_thai: data1.value.total_tuition_thai,
        year_tuition: "",
        detailFee: "",
        custom_desc: data1.value.custom_desc,
        custom_fees: data1.value.custom_fees,
      };
      itemList.value = data;

      let data2 = {
        image: data1.value.job_opp_image,
        pdf: data1.value.pdf_curriculum,
        pdf2: data1.value.pdf_curriculum_2,
        subjects: data1.value.subjects,
        job_opp: data1.value.job_opp,
      };

      jobOop.value = data2;

      // console.log("jobOpp ...", jobOop.value);
      setTimeout(() => {
        isLoading.value = false;
      }, 1000);
    };
    fetchCoureData();
    return {
      programName,
      t,
      isLoading,
      itemList,
      jobOop,
      tuitionFees,
    };
  },
});
</script>

<style>
.stat {
  border-color: #e9f0ff;
}

.stat-value {
  color: #030e62;
}

.stat-title {
  color: #0B0B0B;
}
</style>

<style scoped>
ol,
ul,
menu {
  list-style: disc !important;
  margin: 0 1.75rem;
  padding: 0;
}

ul {
  list-style-type: disc;
  list-style-position: inside;
  margin-left: 1rem;
}

.breadcrumbs {
  display: none;
  padding: 1rem 1.5rem;
  overflow: hidden;
}

.bg-overlay-card-detail-v2 {
  display: flex;
  justify-items: start;
  align-items: flex-end;

  height: 100%;
  width: 100%;
}

.text-shadow {
  color: #fff;
  font-weight: 300;
  text-shadow: 4px 4px 9px rgba(0, 0, 0, 0.55);
  opacity: 1;
}

.topic-design .title {
  width: 100%;
}

@media only screen and (max-width: 767px) {
  .stats {
    grid-auto-flow: row;
  }

  .layout-page {
    padding-top: 3rem;
  }

  .breadcrumbs {
    display: none;
  }

  .breadcrumbs,
  .topic,
  .content-detail {
    padding: 0 1rem;
  }

  .topic h2 {
    font-size: 44px;
    line-height: normal;
  }

  .topic h4 {
    font-size: 1.5rem;
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

  .table-pricing h2 {
    font-size: 48px;
  }

  .total-tuition {
    display: flex;
    gap: 2rem;
  }

  .topic-design .title {
    width: 100%;
  }

  .topic-design h2 {
    font-size: 46px;
    line-height: normal;
  }

  .topic-design h4 {
    font-size: 2.25rem;
  }

  .is-desktop {
    display: none;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .stats {
    grid-auto-flow: row;
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
