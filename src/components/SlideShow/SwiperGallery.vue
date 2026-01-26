<template>
  <div class="swiper-gallery ">
    <!-- pauseOnMouseEnter: true -->
      <swiper
        :spaceBetween="10"
        :style="{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false
        }"
        :pagination="{
          clickable: true,
        }"
        :navigation="true"
        :thumbs="{ swiper: thumbsSwiper }"
        :lazy="true"
        :modules="modules"
        class="mySwiper drop-shadow"
        :class="[customHeight]"

      >
        <swiper-slide v-for="(item, index) in sliderList" :key="index" class="rounded-none">
          <div class="bg-image-etc mx-auto" :style="{ backgroundImage: `url(${item.image ? item.image : item })`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'cover' }" loading="lazy">
          </div>
        </swiper-slide>
      </swiper>
  </div>
</template>
<script>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation, FreeMode, Thumbs } from "swiper/modules";

export default {
  name:"SwiperGallery",
  props: {
        items: { type: Array, require: true },
        customHeight: {type: String, require: true}
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup(props) {
    const isLoading = ref(true);
    const thumbsSwiper = ref(null);
    const sliderList = ref(null);
    const initialData = () => {
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
      sliderList.value = props.items;
    };
    initialData();

    const setThumbsSwiper = (swiper) => {
        thumbsSwiper.value = swiper;
      };

    return {
      thumbsSwiper,
      setThumbsSwiper,
      sliderList,
      isLoading,
      modules: [Autoplay, Pagination, Navigation, FreeMode, Thumbs],
    };
  },
};
</script>
<style>
.swiper-slide{
  border-radius: 0 !important;
}

.mySwiperGallery {
  height: 20%;
  box-sizing: border-box;
  padding: 10px 0;
}

.mySwiperGallery .swiper-slide, .mySwiperGallery  div.skeleton {
  width: 25%;
  height: 100%;
  opacity: 0.4;
}

.mySwiperGallery .swiper-slide-thumb-active {
  opacity: 1;
}

.mySwiperGallery .swiper-slide img,.mySwiperGallery div.skeleton  {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper-free-mode > .swiper-wrapper {
    transition-timing-function: ease-out;
    margin: 0 auto;
    height: 80px;
}

</style>
<style scoped>

.mySwiper {
  height: 600px;
}

.swiper-pagination-bullet{
  background-color: #fff;
}

.bg-image-etc {
    height: 100%;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    object-fit: cover;
    text-align: center;
    color: #fff;

}

.swiper {
  width: 100%;
  /* height: 885px; */

}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: .25rem;
  background-repeat: no-repeat;
}

/* Mobile styles */
@media only screen and (max-width: 767px) {
  .mySwiper {
  height: 300px;
}
  .hero-layout{
    padding-top: 3rem;
  }
  .swiper {
  width: 100%;

  }
  .bg-image{
    min-height: 100%;
  }
}



/* Tablet styles */
@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .swiper {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }


}
</style>
