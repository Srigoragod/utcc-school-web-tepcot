<template>
  <div>
  <div class="container mx-auto py-10 relative">
    <div class="topic flex justify-between items-center">
      <h2 class="text-44 lg:text-66 font-semibold">หลักสูตร</h2>
    <div class="py-2  absolute  right-4  justify-end hidden md:flex">
      <!-- <ButtonShowMore @click="clickShowMore()">
        {{ textButton }}</ButtonShowMore
      > -->
    </div>
    </div>

    <div
      v-if="!isShowMore"
      id="container-card"
      class="relative items-center flex justify-center"
    >
      <div
        class=" bg-a-black-1F2937 opacity-90 flex justify-center items-center absolute right-0 w-8 shadow rounded-l-md h-40 z-[4]">
        <div class="">
          <ChevronRightIcon class="h-8 w-8 text-white cursor-pointer"  @click="clickShowMore()"></ChevronRightIcon>
        </div>
      </div>
      <div  class="slides overflow-scroll smooth-scroll w-full touch-pan-x snap-mandatory flex snap-x py-10 pl-4 gap-4">
        <div
        class="carousel-item pl-4 gap-4"
        v-for="(item, index) in itemList"
        :key="index"
      >
      <div class="w-96 cursor-pointer custom-w-card">
        <CourseMobile class="mb-4 "  
        :item="item" :lang="lang"></CourseMobile>
      </div>
      </div>
      </div>
    </div>

    <div v-else class="relative">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div   class="w-96 cursor-pointer" v-for="(item, index) in itemList" :key="index" >
        <CourseMobile class="mb-4"
        :item="item" :lang="lang"></CourseMobile>
        </div>
      </div>
      <div class="py-4 hidden md:flex justify-center">
          <ButtonShowMore @click="clickShowMore()">
            {{ textButton }}</ButtonShowMore
          >
        </div>
    </div>

  </div>
</div>
</template>

<script>
import { ref, defineComponent } from "vue";
import {  useTranslations } from "../../i18n/utils";
// components
import CourseMobile from "./components/CourseMobile.vue"
import Card from "../../components/card/Card.vue";
import ButtonShowMore from "../Button/ButtonShowMore.vue";
import SwiperGallery from "../SlideShow/SwiperGallery.vue";
import { ChevronRightIcon } from "@heroicons/vue/24/solid";

export default defineComponent({
  name: "CourseList",
  components: {
    CourseMobile,
    Card,
    ButtonShowMore,
    SwiperGallery,
    ChevronRightIcon
  },
  props: {
    lang: { type: String, default: "th" },
    title: { type: String, dafault: ''},
    slug: { type: String, dafault: 'all'},
    t:{ type: Object, default: {}}
  },
  setup(props) {
    const data1 = ref(null);
    const data2 = ref(null);
    const showModal = ref(false);
    const itemList = ref(null);
    const itemShow = ref(null);
    const textButton = ref(null);
    const isShowMore = ref(false);
    const degree = ref('bachelor');
    const lang = ref('th');
    const t = useTranslations(props.lang);

    const schooId = ref('ac');
    const uri = import.meta.env.PUBLIC_API_WP_CURRICULUM;

    const fetchData = async () => {
      textButton.value = t("button.showMore")
      await fetch(uri + "?acf_format=standard&_fields=id,slug,acf", { mode: "cors" }
      )
        .then((response) => response.json())
        .then((data) => (initialData(data)))
        .catch((error) =>
          console.error("Error fetching Facilities image data:", error)
        );
    };


    const initialData = (data) => {
      if (data) {
        const newArray = data.map(function (element) {
          if (props.slug != element.slug) {
            return lang.value == 'en' ? element.acf.en : element.acf.th
          }
        });
        const filteredArray = newArray.filter(element => element !== undefined);
        itemList.value = filteredArray.sort(randomSort);
        // console.log(itemList.value);
      }


    }
    const randomSort = () => {
      return Math.random() - 0.5;
    }
    // const compareBySlugDesc = (a, b) => {
    //   return b.slug.localeCompare(a.slug, 'en', { sensitivity: 'base', usage: 'sort' });
    // }
    const clickShow = (item) => {
      itemShow.value = item;
      showModal.value = true;
      document.body.style.overflow = "hidden";
    };
    const clikeClose = () => {
      document.body.style.overflow = '';
      showModal.value = false;
    };
    const clickShowMore = () => {
      isShowMore.value = !isShowMore.value;
      textButton.value = isShowMore.value ? t("button.showLess") :  t("button.showMore") ;
    };

    fetchData();
    return {
      itemList,
      showModal,
      clickShow,
      clikeClose,
      itemShow,
      textButton,
      clickShowMore,
      isShowMore,
      t
    };
  },
});
</script>

<style scoped>
.custom-w-card {
  width: 24rem;
}
.slides {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}
.slides::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
.bg-overlay {
  display: flex;
  justify-items: start;
  align-items: flex-end;
  padding: 1rem;
  color: #fff;
  font-weight: 300;
  text-shadow: 4px 4px 9px rgba(0, 0, 0, 0.55);
  opacity: 1;

  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 50%,
    rgba(11, 11, 11, 1) 100%
  );
  height: 100%;
  width: 100%;
}




ul {
  list-style-type: disc;
  list-style-position: inside;
}

ul.none {
  list-style-type: none;
  list-style-position: inside;
}

@media (max-width: 767px) {
  /* #container-card::before {
  content: '';
  position: absolute;
  background: linear-gradient(-90deg,#fff 0%,rgba(11,11,11,0) 5%);
  height: 100%;
  z-index: 1;
  height: 100%;
  width: 250px;
  top: 0;
  right: 0;
} */
  .topic{
    padding: 0 1rem;
  }
  .custom-w-card {
  width: 20rem;
}
  .bg-image {
  height: 300px;
  /* background-size: contain !important; */
 }
  .overlay {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  .div-condition {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem 1rem;

  }
  .div-content {
    overflow-y: auto;
    height: 380px;
    padding: 1rem 0;
  }
}
</style>
