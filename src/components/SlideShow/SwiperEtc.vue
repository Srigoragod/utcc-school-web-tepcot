<template>
  <div class="hero-layout-etc ">
    <!-- pauseOnMouseEnter: true -->
      <swiper
        :spaceBetween="30"
        :style="{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
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
          <div class="bg-image-etc mx-auto rounded-t-box md:rounded-none" :style="{ backgroundImage: `url(${item.image})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'cover' }" loading="lazy">
            <div v-if="item.alt" class=" text-white absolute z-10 bottom-8 left-8">
              <div class="flex justify-start items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                <span class="text-20 font-light"> {{ item.alt }}</span>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
  </div>
</template>
<script>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

import 'swiper/css/navigation';
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation, FreeMode, Thumbs } from "swiper/modules";

export default {
  name:"SwiperEtc",
  props: {
        items: { type: Array, require: true },
        customHeight: {type: String, require: true}
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup(props) {
    const sliderList = ref(null);
    const thumbsSwiper = ref(null);
    const initialData = () => {
      sliderList.value = props.items
    };
    initialData();

    const setThumbsSwiper = (swiper) => {
        thumbsSwiper.value = swiper;
    };

    return {
      thumbsSwiper,
      setThumbsSwiper,
      sliderList,
      modules: [Autoplay, Pagination, Navigation, FreeMode, Thumbs],
    };
  },
};
</script>
<style>
.swiper-slide{
  border-radius: 0 !important;
}
</style>
<style scoped>

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
  height: 885px;

}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
  background-repeat: no-repeat;
}

/* Mobile styles */
@media only screen and (max-width: 767px) {
  .hero-layout{
    padding-top: 5rem;
  }
  .swiper {
    width: 100%;
    height: 459px;

  }
}



/* Tablet styles */
@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .swiper {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    height: 459px;
  }


}
</style>
