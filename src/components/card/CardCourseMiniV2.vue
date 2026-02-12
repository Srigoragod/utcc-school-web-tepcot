<template>
  <div class="item-card relative">
    {{ item }}
    <!-- <TypeIcon class="absolute bottom-11 right-6 z-10 fede-in" :fund="item.fund" :isShowAll="false" :isMobile="true" /> -->
    <!-- <div class="card w-full drop-shadow-xl rounded-2xl" :style="{
      backgroundImage: `url(${item.image})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
    }" loading="lazy">
      <div class="overlay bg-overlay absolute bottom-0 w-full rounded-b-2xl  p-4">
        <div>
          <h2 class="text-30 lg:text-36 leading-none text-1-line">
            {{ item.title }}
          </h2>
          <h4 class="text-24 font-thin w-full text-1-line">
            {{ item.subtitle }}
          </h4>
        </div>
      </div>
    </div> -->
    <!-- <div class="card-body bg-a-blue-030e62 text-a-black-1F2937 h-full rounded-2xl px-4 relative">
      <span class="fede-in">
        <span class="title_course ">
          <h2 class="text-30 md:text-34 leading-none text-2-line">
            {{ item.title }}
          </h2>
          <h2 class="text-24 font-light">{{ item.subtitle }}</h2>
        </span>
        <div class="description-crad text-24  text-3-line font-light" v-html="item.description"></div>
        <div class="border-b h-1 border-a-black-1F2937 my-4"></div>
      </span>
    </div> -->
  </div>
</template>

<script>
import { ref } from "vue";
import { useTranslations } from "../../i18n/utils.ts";

export default {
  name: "Card",
  props: {
    item: { type: Object, default: {} },
    lang: { type: String, default: "th" },
  },
  setup(props) {
    const t = useTranslations(props.lang);
    const isShow = ref(false);
    const isTotalTuition = ref(false);

    const handleImage = (imgOriginal, imgCustom) => {
      return imgCustom ? imgCustom : imgOriginal;
    };

    const handleGraduate = (value) => {
      if (typeof value === "object") {
        return value.value;
      } else if (typeof value === "string") {
        if (value === "1") {
          return t("graduates.type1");
        }
      } else {
        return "-";
      }
    };
    const handleDisplay = (value, type) => {
      if (typeof value === "object") {
        isShow.value = true;
        return type == "value" ? value.value : value.total;
      } else if (typeof value === "string") {
        isShow.value = true;
        return value;
      }
    };

    return {
      t,
      handleImage,
      handleGraduate,
      handleDisplay,
      isShow,
    };
  },
};
</script>

<style scoped>
.item-card {
  display: block;
  overflow: hidden;
}

.card {
  min-height: 411px;
}

.card-body {
  position: absolute;
  top: 411px;
  -o-transition: 0.5s;
  -ms-transition: 0.5s;
  -moz-transition: 0.5s;
  -webkit-transition: 0.5s;
  transition: top 0.5s;
  z-index: -1;
}

.item-card:hover .card-body {
  top: 0;
  z-index: 1;
  padding-top: 4rem;
}

.fede-in {
  opacity: 0;
}

.item-card:hover .card-body .fede-in,
.item-card:hover .fede-in {
  opacity: 1;
  -o-transition: 0.5s;
  -ms-transition: 0.5s;
  -moz-transition: 0.5s;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}
.bg-overlay{
  display: flex;
  justify-items: start;
  align-items: flex-end;
  padding: 1rem;
  color: #fff;
  font-weight: 300;
  text-shadow: 4px 4px 9px rgba(0, 0, 0, 0.55);
  opacity: 1;
  background: rgb(255, 255, 255);
  background: linear-gradient(0deg,#0B0B0B 0%,rgba(11,11,11,0) 44%);
  height: 100%;
}

.badge {
  border-radius: 0.25rem;
  background: #f3f3f3;
  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right,
      #0b0b0b,
      #f3f3f3);
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right,
      #0b0b0b,
      #f3f3f3);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
