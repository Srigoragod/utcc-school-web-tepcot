<template>
  <!-- container -->
  <div class="item-course relative">
    <ArrowRightIcon class="absolute z-10 right-4 top-4 text-a-glod-F0C571 w-6 h-6" />
    <div v-if="isLoading" class="show-on-hover-none course-container grid gap-4 ">
      <div class="skeleton rounded-2xl bg-gray-200" :class="{ 'custom-order-div-even-number': isEvenNumber }">

      </div>
      <div class="skeleton rounded-2xl bg-gray-200 h-[400px]">

      </div>
    </div>
    <div v-else class="show-on-hover course-container grid gap-4">
      <div :class="{ 'custom-order-div-even-number': isEvenNumber }"
        class="rounded-2xl leading-none shadow relative group-hover:shadow-2xl ">
        <!-- <div class="badge badge-info  text-20 absolute top-8 left-8">{{ item.degree.label }}</div> -->
        <div  class="badge badge-info text-20 font-light  capitalize absolute top-4 left-4 "> Executive Education</div>
        <span class="title_course text-white ">
          <h2 class="text-44 md:text-54 lg:text-66 leading-none line-clamp-1 font-bold">
            {{ item.title }}
          </h2>
          <h4 class="text-24 md:text-30 font-light opacity-85" v-html="item.subtitle"></h4>
        </span>

        <span  class="description_course relative">
          <h2 class="text-30 md:text-36 mt-4 text-a-glod-F0C571">
            {{ item.fullname }}
          </h2>
          <p class="text-20 md:text-24 font-light line-clamp-4 pt-2"  v-html="item.description ">
          </p>
          <div class="not-show border-t border-white/30 mt-40px pt-8 grid grid-cols-4 gap-4">
            <div  v-for="(hl, index) in item.highlights" :key="index">
              <div class="col-span-1 text-44 md:text-66 font-semibold text-a-glod-F0C571">
                {{  hl?.value }}
              </div>
              <div class="col-span-3">
                <p class="text-20 md:text-24 font-light" v-html="hl?.description"></p>
              </div>
            </div>
          </div>
        </span>
      </div>
      <div
        class="rounded-2xl h-[400px] shadow hover:shadow-xl group-hover:shadow-blue-300/40 bg-center bg-cover isometric relative"
        :style="item?.imageUrl ? {
          backgroundImage: `url('${item.imageUrl}')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
        } : {}"
      >
        <div class="overlay bg-overlay ">
          <h2 class="text-44 md:text-54 lg:text-66 text-2-line text-a-glod-F0C571">
            {{ item?.title ?? '' }}
          </h2>
          <h4 class="text-24 md:text-30 font-light text-a-glod-F0C571">
            {{ item?.subtitle ?? '' }}
          </h4>
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
    const lang = ref(props.lang)
    const isLoading = ref(true)
    const t = useTranslations(props.lang)



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
      showModal,
      clikeClose,
      clickShow,
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
  background-image:  linear-gradient(30deg, #0E0B80 12%, transparent 12.5%, transparent 87%, #0E0B80 87.5%, #0E0B80), linear-gradient(150deg, #0E0B80 12%, transparent 12.5%, transparent 87%, #0E0B80 87.5%, #0E0B80), linear-gradient(30deg, #0E0B80 12%, transparent 12.5%, transparent 87%, #0E0B80 87.5%, #0E0B80), linear-gradient(150deg, #0E0B80 12%, transparent 12.5%, transparent 87%, #0E0B80 87.5%, #0E0B80), linear-gradient(60deg, #131057 25%, transparent 25.5%, transparent 75%, #131057 75%, #131057), linear-gradient(60deg, #131057 25%, transparent 25.5%, transparent 75%, #131057 75%, #131057);
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
  background-color: #0E0B80;
  color: #FAFAFF;
  height: 400px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 24px;
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
  padding: 8px 24px;
  grid-column: span 1 / span 1;
  -o-transition: 0.5s;
  -ms-transition: 0.5s;
  -moz-transition: 0.5s;
  -webkit-transition: 0.5s;

  transition: 0.5s;
}

.show-on-hover:hover>div:nth-child(1) {
  background: linear-gradient(180deg,#0E0B80 0%, #131057 100%);
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
