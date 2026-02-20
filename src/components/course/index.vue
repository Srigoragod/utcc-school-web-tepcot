<template>
  <div class="container mx-auto py-10 md:py-40" id="course">
    <!-- header -->
    <div class="custom-grid items-center mb-0 md:mb-4">
      <div class="leading-none pl-4 md:pl-0 mb-4">
        <h2 class="text-44 md:text-66 font-semibold">หลักสูตรพิเศษ</h2>
        <!-- <h4 class="text-height text-30 text-a-gray-696F6F my-2 text-1-line">
          <span v-if=" degreeSelect == 'master' ||  degreeSelect == 'doctoral'"> x บัณฑิตวิทยาลัย</span>
        </h4> -->
      </div>
      <div class="flex justify-end">
        <!-- <DropdownCourse @degree="clickDegree"> </DropdownCourse> -->
      </div>
    </div>
    <!-- / header -->

    <!-- content -->
    <div v-if="isLoading" class="grid justify-items-center h-[305px] items-center rounded-2xl ">
      <span class="loading loading-ring loading-lg text-gray-600"></span>
    </div>

    <div v-else>
      <span class="is-desktop">
        <div v-if="degreeSelect == 'all' || degreeSelect == 'bachelor'">
          <div class="grid grid-cols-1 gap-4">
            <CourseHoverItem  :item="programs" :lang="lang"></CourseHoverItem>
          </div>
        </div>
      </span>

      <span class="is-mobile">
        <div v-if="isLoading" class="grid justify-items-center h-[305px] items-center rounded-2xl ">
          <span class="loading loading-ring loading-lg text-gray-600"></span>
        </div>
        <div v-else>
          <CourseMobile :item="programs" :lang="lang"></CourseMobile>
        </div>
      </span>

    </div>

    <!-- / content -->
  <div class="px-4 py-10 text-a-gray-696F6F font-light ">
    <div class="grid grid-cols-1 md:grid-cols-3  gap-8 py-10">
      <div class="item  gap-4 col-span-2 hidden">
        <h4 class="text-20 md:text-24 text-a-blue-030e62 font-normal"> รูปแบบการเรียนการสอน </h4>
        <ul class="custom-list text-slate-600 mb-4" style="padding-left: 1.5rem; margin-bottom: 2rem; list-style: disc;">
          <li v-for="(met, index) in programs?.teaching_methods" :key="index">
            {{ met.method }} : {{ met.desc }}
          </li>
        </ul>
      </div>
      <div class="item">
        <div class="gap-4">
          <h4 class="text-20 md:text-24 text-a-blue-030e62 font-normal"> ตารางเวลาและระยะเวลา </h4>
          <ul class="list-disc text-slate-600 mb-4" style="padding-left: 1.5rem; margin-bottom: 2rem; list-style: disc;">
            <li class="mt-1" v-for="(dur, index) in programs.duration" :key="index">
              <span class="ml-2 text-20 md:text-24 text-a-blue-1c1c84/80">
                {{ dur.name }} : {{ dur.desc }}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="item">
        <div class="gap-4">
          <h4 class="text-20 md:text-24 text-a-blue-030e62 font-normal"> {{ `กำหนดการ ${programs.schedule?.remark}`  }} </h4>
          <ul class="list-disc text-slate-600 mb-4 " style="padding-left: 1.5rem; margin-bottom: 2rem; list-style: disc;">
            <li class="mt-1" v-for="(sch, index) in programs.schedule?.items" :key="index">
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
          class="btn btn-outline btn-accent text-a-blue-1c1c84 text-20 md:text-24 font-light"
        >
          <ArrowDownTrayIcon class="h-6 w-6 mx-2"></ArrowDownTrayIcon>
          Download Brochure
        </button>
        </div>
        <div class="px-1">
        <a href="/tepcot-executive-education">  
        <button
          class="btn btn-accent text-20 md:text-24 font-light"

        >
          ดูรายละเอียดการสมัคร
          <ArrowRightIcon class="h-6 w-6 ml-2"></ArrowRightIcon>
        </button>
        </a>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
//components
// import DropdownCourse from "./components/DropdownCourse.vue";
import CourseHoverItem from "./components/CourseHoverItem.vue";
import CourseHoverMini from "./components/CourseHoverMini.vue";
import CourseMobile from "./components/CourseMobile.vue";
import TermsAndConditions from "./components/TermsAndConditions.vue";
import { ArrowRightIcon, ArrowDownTrayIcon } from '@heroicons/vue/24/solid'

export default defineComponent({
  name: "CourseIndex",
  components: {
    // DropdownCourse,
    CourseHoverItem,
    CourseHoverMini,
    CourseMobile,
    TermsAndConditions,
    ArrowRightIcon,
    ArrowDownTrayIcon
  },
  props: {
    lang: { type: String, default: "th" },
  },
  setup() {
    const degreeSelect = ref("all");
    const courseList = ref(null);
    const isLoading = ref(false);

    const uri = import.meta.env.PUBLIC_API_WP_CURRICULUM;
    const programs = ref([]);

    const fetchData = () => {
      fetch(uri)
        .then((response) => response.json())
        .then((data) => ( initialData(data)))
        .catch((error) => {
          console.error("Error fetching curriculum data:", error);
        });
    };

    const initialData = (data) => {
        let preparedData = {
          slug: data.slug,
          isDetail: true,
          isRecommended: true,
          imageHero: data.imageHero ,
          hero_mobile: data.hero_mobile || '',
          fullname: data.fullname || '',
          title: data.title || '',
          subtitle: data.subtitle || '',
          shortdescription: data.shortdescription || '',
          description: data.description || '',
          highlights: data.highlights || [],
          teaching_methods: data.teaching_methods || [],
          schedule: data.schedule || [],
          duration: data.duration || [],
        };

        programs.value =  preparedData

    }

    fetchData();
    const handleIsEvenNumber = (index) => {
      if (index) {
        return index % 2 == 1;
      }
    };
    const clickDegree = (el) => {
      isLoading.value = true;
      setTimeout(() => {
        degreeSelect.value = el;
        // setData();
        isLoading.value = false;
      }, 500);
    };
    return {
      handleIsEvenNumber,
      courseList,
      clickDegree,
      degreeSelect,
      isLoading,
      programs,
    };
  },
});
</script>
<style scoped>
@import "../../styles/global.css";

.custom-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}


@media only screen and (max-width: 767px) {
  .is-desktop {
    display: none;
  }

  .custom-grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .is-desktop {
    display: none;
  }

  .custom-grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  .is-mobile {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media only screen and (min-width: 1024px) {
  .is-mobile {
    display: none;
  }
}
</style>
