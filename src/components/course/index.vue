<template>
  <div class="container mx-auto py-10 md:py-40 bg-white" id="course">
    <!-- header -->
    <div class="custom-grid items-center mb-0 md:mb-4">
      <div class="leading-none pl-4 md:pl-0">
        <h2 class="text-44 md:text-66 font-semibold">หลักสูตร</h2>
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
          <!-- <h4 class="text-24 md:text-36  mt-2 text-1-line">
            ปริญญาตรี
          </h4> -->
          <div class="grid grid-cols-1 gap-4">
            <div class="box-course-items py-2" v-for="(item, index) in allProgram.bachelor" :key="index">
              <CourseHoverItem :isEvenNumber="handleIsEvenNumber(index)" :item="item" :lang="lang"></CourseHoverItem>
            </div>
          </div>
        </div>

        <TermsAndConditions class="is-desktop" :isLoan="degreeSelect == 'all' || degreeSelect == 'bachelor'" />
      </span>

      <span class="is-mobile">
        <div v-if="isLoading" class="grid justify-items-center h-[305px] items-center rounded-2xl ">
          <span class="loading loading-ring loading-lg text-gray-600"></span>
        </div>
        <div class="grid grid-cols-1 gap-4 px-4" v-if="degreeSelect == 'all' || degreeSelect == 'bachelor'">
          <h4 class="text-30  mt-2 text-1-line ">ปริญญาตรี </h4>
          <CourseMobile class="mb-4" v-for="(item, index) in allProgram.bachelor" :key="index"
            :isEvenNumber="handleIsEvenNumber(index)" :item="item"></CourseMobile>
        </div>
      </span>

    </div>


    <!-- / content -->
    <TermsAndConditions class="is-mobile" :isLoan="degreeSelect == 'all' || degreeSelect == 'bachelor'" />
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

export default defineComponent({
  name: "CourseIndex",
  components: {
    // DropdownCourse,
    CourseHoverItem,
    CourseHoverMini,
    CourseMobile,
    TermsAndConditions,
  },
  props: {
    lang: { type: String, default: "th" },
  },
  setup() {
    const data1 = ref(null);
    const degreeSelect = ref("all");
    const lang = ref("th");
    const courseList = ref(null);
    const isLoading = ref(false);

    const uri = import.meta.env.PUBLIC_API_WP_PROGRAM;
    const allProgram = ref([]);

    const fetchCoureData = async () => {
      // console.log("fetchCoureData ...");

      await fetch(`${uri}?acf_format=standard&_fields=id,slug,acf`, {
        mode: "cors",
      })
        .then((response) => response.json())
        .then((data) => {
          data1.value = data;
          initialData();
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    const initialData = () => {
      const newArray = data1.value.map(function (element) {
        return element.acf.th;
      });

      const filteredArray = newArray.filter((element) => element !== undefined);
      courseList.value = filteredArray;


      allProgram.value = filteredArray.reduce((el, program) => {
        if (!el[program.degree.value]) {
          el[program.degree.value] = [];
        }
        el[program.degree.value].push(program);
        return el;
      }, {});

    };

    fetchCoureData();
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
      allProgram,
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

ul.custom-list {
  list-style-type: "-";
  list-style-position: outside;
}

.custom-list li {
  line-height: normal;
  font-weight: 300;
  font-size: 22px;
  padding: 0.25rem 1.5rem 0.25rem 0.5rem;
}

li {
  display: flex;
  font-size: 22px;
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
