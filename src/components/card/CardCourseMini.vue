<template>
  <div class="card w-full drop-shadow-xl px-0 relative">
    <ArrowRightIcon class="absolute top-4 right-4 z-10 w-6 h-6  text-a-blue-021430" />
    <div
      class="rounded-t-2xl h-[305px]"
      :style="{
        backgroundImage: `url(${item.image})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
      }"
      loading="lazy"
    >
      <div class="overlay bg-overlay relative">
        <div>

          <h2 class="text-24 md:text-30 font-normal leading-none text-1-line">
            {{ item.title }}
          </h2>
          <h4 class="text-24 md:text-30 font-light w-full text-1-line">{{ item.subtitle }}</h4>
        </div>
      </div>
    </div>
    <div class="card-body bg-[#FAFAFF] rounded-b-2xl px-4">
      <div class="description-crad text-20 md:text-24 text-3-line font-light" v-html="item.description"></div>
      <div class="border-b h-1 border-a-black-1F2937"></div>
      <div class="grid grid-cols-2 gap-4">
        <div class="text-20 ">
          <div class="font-light  ">สำหรับผู้จบการศึกษา</div>
          <div class="text-1-line text-20 md:text-24">{{ handleGraduate(item.graduates) }}</div>
        </div>
        <div class="text-20">
          <div class="font-light ">หลักสูตร</div>
          <div class="text-20 md:text-24"> cccc </div>

        </div>
      </div>
      </div>
  </div>
</template>

<script>
import { ref } from "vue";
import TypeIcon from "../Button/TypeIcon.vue";
import { useTranslations } from "../../i18n/utils";
import { ArrowRightIcon } from '@heroicons/vue/24/solid'
export default {
  name: "Card",
  components: {
    TypeIcon,
    ArrowRightIcon
  },
  props: {
    item:{ type: Object, default: {}},
    lang: {type: String, default: 'th'},
  },
  setup(props) {
    const t = useTranslations(props.lang)
    const isShow = ref(false);
    const isTotalTuition = ref(false)

    const handleImage = (imgOriginal, imgCustom) =>{
        return imgCustom ? imgCustom : imgOriginal
    }

    const handleGraduate = ( value) => {
      if (typeof value === 'object') {
          return  value.value
      } else if (typeof value === 'string') {
           if( value === '1' ){
               return t("graduates.type1")
           }
      } else {
          return '-'
      }

    }
    const handleDisplay = ( value, type) => {
      if (typeof value === 'object') {
          isShow.value = true
          return type == 'value' ? value.value : value.total
      } else if (typeof value === 'string') {
           isShow.value = true
          return value
      } 

    }


  
    return{
      t,
      handleImage,
      handleGraduate,
      handleDisplay,
      isShow
    }
  }
};
</script>

<style scoped>

.bg-overlay {
  display: flex;
  justify-items: start;
  align-items: flex-end;
  padding: 1rem;
  color: #fff;
  font-weight: 300;
  text-shadow: 4px 4px 9px rgba(0, 0, 0, 0.55);
  opacity: 1;
  background: rgb(255, 255, 255);
  background: linear-gradient(0deg,#000 0%,rgba(11,11,11,0) 50%);
  height: 100%;
}


</style>
