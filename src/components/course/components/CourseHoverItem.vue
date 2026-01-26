<template>
  <!-- container -->
  <div class="item-course relative">
    <ArrowRightIcon class="absolute z-10 right-4 top-4 text-a-black-0B0B0B w-6 h-6" />
    <div v-if="isLoading" class="show-on-hover-none course-container grid gap-4 ">
      <div class="skeleton rounded-2xl bg-gray-200" :class="{ 'custom-order-div-even-number': isEvenNumber }">

      </div>
      <div class="skeleton rounded-2xl bg-gray-200 h-[400px]">

      </div>
    </div>
    <div v-else class="show-on-hover course-container grid gap-4 " @click="clickShow(item, item.isDetail)">
      <div :class="{ 'custom-order-div-even-number': isEvenNumber }"
        class="rounded-2xl leading-none hover:shadow relative">
        <!-- <div class="badge badge-info  text-20 absolute top-8 left-8">{{ item.degree.label }}</div> -->
        <div v-if="item.isRecommend" class="badge badge-neutral text-20 font-light bg-a-black-1F2937 uppercase absolute top-4 right-4 ">{{ item.isRecommend }}</div>
        <span class="title_course">
          <h2 class="text-44 md:text-36 lg:text-44 leading-none text-2-line">
            {{ item.title }}
          </h2>
          <h4 class="text-24 md:text-30 font-light">{{ item.subtitle }}</h4>
        </span>

        <span  class="description_course relative">
          <h2 class="text-36  mt-[9px]">
            {{ item.title }}
          </h2>
          <p class="text-24 pt-4 font-light line-clamp-3"  v-html="item.description ">
          </p>
          <div class="not-show border-t border-white/30 mt-40px pt-8">
            <div class="grid grid-cols-4 gap-4"  v-if="item.isDetail" >
              <div>
              <h4 class="text-24 font-light opacity-70">{{ t("course.graduates") }}</h4>
              <h2 class="text-30">{{ item.graduates.value }}</h2>
            </div>
            <div>
              <h4 class="text-24 font-light opacity-70">{{ t("course.course") }}</h4>
              <h2 class="text-30">{{ item.course.value }}</h2>
            </div>
            <div v-if="item.entry.value">
              <h4 class="text-24 font-light opacity-70">{{ item.entry.label ? item.entry.label : t("course.entry") }}</h4>
              <h2 class="text-30" v-html="item.entry.value"></h2>
            </div>
            <div>
              <h4 class="text-24 font-light opacity-70">{{ item.total_tuition.label ? item.total_tuition.label : t("course.tuitionFees") }}</h4>
              <h2 class="text-30">
                {{ item.total_tuition.total }}
              </h2>
            </div>
            <div class="pt-6 absolute right-0" v-if="item.fund">
              <TypeIcon :fund="item.fund" :isShowAll="false" :isMobile="true" />
            </div>
            </div>
            <div v-else class="grid grid-cols-4 gap-4" >
              <div>
                <h4 class="text-24 font-light ">{{ t("course.graduates") }}</h4>
                <h2 class="text-30">{{ item.graduates.value }}</h2>
              </div>
              <div>
              <h4 class="text-24 font-light ">{{ t("course.course") }}</h4>
              <h2 class="text-30">{{ item.course.value }}</h2>
              </div>
              <div>
                <h4 class="text-24 font-light ">{{ item.total_tuition.label ? item.total_tuition.label : t("course.tuitionFees") }}</h4>
                <h2 class="text-30">
                  {{ item.total_tuition.total }}
                </h2>
              </div>
              <div v-if="item.entry.value">
                <h4 class="text-24 font-light ">{{ item.entry.label ? item.entry.label : t("course.entry") }}</h4>
                <h2 class="text-30" v-html="item.entry.value"></h2>
              </div>
              <!-- <a :href="item.url" target="_blank">
                <button class="btn btn-active btn-primary rounded-full font-normal uppercase text-24 load-button">
                  อ่านคลิก
                </button>
              </a> -->
            </div>
          </div>
        </span>
      </div>
      <div class="rounded-2xl h-[400px] hover:shadow" :style="{
      backgroundImage: `url(${handleImage(item.hero_layout[0].image, item.cover_ac)})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
    }" loading="lazy">
        <div class="overlay bg-overlay">
          <h2 class="text-44 md:text-36 lg:text-44 text-2-line">
            {{ item.title }}
          </h2>
          <h4 class="text-24 md:text-30 font-light">{{ item.subtitle }}</h4>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { ref, defineComponent } from "vue";
import { useTranslations } from "../../../i18n/utils";
// components
import TypeIcon from "../../Button/TypeIcon.vue";
import ModalVue from "../../Modal/Modal.vue";
import { ArrowRightIcon } from '@heroicons/vue/24/solid'

export default defineComponent({
  name: "CourseHoverItem",
  components: {
    TypeIcon,
    ModalVue,
    ArrowRightIcon
  },
  props: {
    isEvenNumber: { type: Boolean, default: false },
    item: { type: Object, required: false },
    lang: {type: String, default: 'th'}
  },
  setup(props) {
    const showModal = ref(false)
    const txtCurrency = ref("บาท")
    const lang = ref(props.lang)
    const isLoading = ref(true)
    const t = useTranslations(props.lang)

    const formatCurrencyThai = (val) => {
      lang.value = location.pathname.split("/")[1];
      txtCurrency.value = lang.value == "th" ? "บาท" : lang.value == 'en' ? "THB" : "บาท";

      let price = parseInt(val)
      if (typeof price === "number") {
        const formatter = new Intl.NumberFormat("th-TH", {
          style: "currency",
          currency: "THB",
          maximumFractionDigits: 0,
        });
        return formatter.format(val).replace(/฿/g, "");
      } else {
        return null;
      }
    };

    const clickShow = (item, disable) => {
      if(disable) {
        window.location.replace(`${item.slug}`)
      }else{
        window.open(`${item.url}`, '_blank')
      }
    }

    const handleImage = (imgOriginal, imgCustom) =>{
        return imgCustom ? imgCustom : imgOriginal
    }

    const initialData = () => {
      setTimeout(() => {
        isLoading.value = false
      }, 1500);
    }

    const clikeClose = () => {
      showModal.value = false;
    };
    initialData()
    return {
      formatCurrencyThai,
      showModal,
      clikeClose,
      clickShow,
      txtCurrency,
      isLoading,
      handleImage,
      t
    };
  },
});
</script>

<style scoped>
@import "../../../styles/global.css";

.isometric {
  background-image:  linear-gradient(30deg, #444CF7 12%, transparent 12.5%, transparent 87%, #444CF7 87.5%, #444CF7), linear-gradient(150deg, #444CF7 12%, transparent 12.5%, transparent 87%, #444CF7 87.5%, #444CF7), linear-gradient(30deg, #444CF7 12%, transparent 12.5%, transparent 87%, #444CF7 87.5%, #444CF7), linear-gradient(150deg, #444CF7 12%, transparent 12.5%, transparent 87%, #444CF7 87.5%, #444CF7), linear-gradient(60deg, #444CF777 25%, transparent 25.5%, transparent 75%, #444CF777 75%, #444CF777), linear-gradient(60deg, #444CF777 25%, transparent 25.5%, transparent 75%, #444CF777 75%, #444CF777);
  background-size: 36px 63px;
  background-position: 0 0, 0 0, 18px 32px, 18px 32px, 0 0, 18px 32px;
}

h2 {
  font-weight: normal !important;
}

ul {
  list-style-type: square;
  list-style-position: outside;
  list-style-image: none;
}

.course-container {
  cursor: pointer;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.overlay {
  border-radius: 1rem;
  height: 100%;
  width: 100%;
  padding: 84px 24px 21px 23px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  line-height: normal;
}

.show-on-hover>div:nth-child(1) {
  background-color: #2e3192;
  color: #fff;
  height: 400px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 30px;
  grid-column: span 1 / span 1;
  -o-transition: 0.5s;
  -ms-transition: 0.5s;
  -moz-transition: 0.5s;
  -webkit-transition: 0.5s;

  transition: 0.5s;
}

.show-on-hover-none>div:nth-child(1) {

  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 30px 0 30px 30px;
  grid-column: span 1 / span 1;
  -o-transition: 0.5s;
  -ms-transition: 0.5s;
  -moz-transition: 0.5s;
  -webkit-transition: 0.5s;

  transition: 0.5s;
}

.show-on-hover:hover>div:nth-child(1) {
  background: linear-gradient(180deg,#2e3192 0%, #000c3a 100%);
  grid-column: span 2 / span 2;
}

.show-on-hover>div:nth-child(1)>.description_course {
  opacity: 0;
  display: none;
}

.show-on-hover:hover>div:nth-child(1)>.description_course {
  opacity: 1;
  display: block;
}

.show-on-hover:hover>div:nth-child(1)>.title_course {
  display: none;
}

.show-on-hover>div:nth-child(2) {
  grid-column: span 2 / span 2;
  -o-transition: 0.5s;
  -ms-transition: 0.5s;
  -moz-transition: 0.5s;
  -webkit-transition: 0.5s;

  transition: 0.5s;
}

.show-on-hover-none>div:nth-child(2) {
  grid-column: span 2 / span 2;
  -o-transition: 0.5s;
  -ms-transition: 0.5s;
  -moz-transition: 0.5s;
  -webkit-transition: 0.5s;

  transition: 0.5s;
}

.show-on-hover:hover>div:nth-child(2) {
  grid-column: span 1 / span 1;
}

.bg-overlay {
  opacity: 0;
  -o-transition: 0.5s;
  -ms-transition: 0.5s;
  -moz-transition: 0.5s;
  -webkit-transition: 0.5s;
  transition: 0.5s;

}

.show-on-hover:hover>div:nth-child(2)>.bg-overlay {
  color: #fff;
  text-shadow: 4px 4px 9px #000;
  opacity: 1;
  background: rgb(255, 255, 255);
  background: linear-gradient(0deg,#000 0%,rgba(11,11,11,0) 100%);
}


.custom-order-div-even-number {
  order: 2 !important;
}

/* CSS */
.modal {
  display: none;
  /* Hide modal by default */
  position: fixed;
  /* Position the modal */
  z-index: 1;
  /* Make sure it appears on top of other elements */
  left: 0;
  top: 0;
  width: 100%;
  /* Full width */
  height: 100%;
  /* Full height */
  overflow: auto;
  /* Enable scrolling if needed */
  background-color: rgba(0, 0, 0, 0.5);
  /* Black with transparency */
}

.modal-content {
  background-color: #fefefe;
  /* White background */
  margin: 15% auto;
  /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  /* 80% width */
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
