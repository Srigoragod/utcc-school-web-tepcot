<template>
  <div class="">
    <!-- pauseOnMouseEnter: true -->

    <swiper :style="{
      '--swiper-navigation-color': '#fff',
      '--swiper-pagination-color': '#fff',
    }" :autoplay="{
        delay: 6000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }" :pagination="{
        clickable: true,
      }" :lazy="true" :modules="modules" class="mySwiper drop-shadow">
      <swiper-slide v-for="(item, index) in itemList" :key="index">
        <div class="hero min-h-screen">
          <div class="hero-content text-neutral-content text-center">
            <div class="">
              <img :src="item.logo" class="mx-auto max-w-40 mb-4 " alt="logo" />
              <h6 class="title text-30 md:text-44 font-light custom_desc" v-html="item.text">
              </h6>
              <a :href="item.button.url" target="_blank">
                <button class="btn btn-primary text-24 rounded-full font-normal  text-a-blue-0033A1">
                  {{ item.button.title }}
                </button>
              </a>
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

import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    lang: { type: String, default: 'th' },
    itemList: { type: Array, default: [], require: true }
  },
  setup(props) {
    const sliderList = ref(props.items);
    const isLoading = ref(true)

    return {
      sliderList,
      modules: [Autoplay, Pagination],
      isLoading
    };
  },
};
</script>
<style scoped>
.swiper-pagination-bullet {
  background-color: #fff;
}

.swiper-pagination-bullet-active {
  background-color: var(--accent);
}

.bg-image {
  min-height: 600px;
  width: 100%;
  border-radius: 30px;
  background-repeat: no-repeat;
  background-size: cover;
  object-fit: cover;
  text-align: center;
  color: #fff;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 5rem 0;
}

.swiper {
  width: 100%;
  height: 600px;

}

.swiper-skeleton {
  width: 100%;
  height: 600px;
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
  .swiper {
    width: 100%;
    height: 390px;
    border-radius: 1rem;
  }

  .bg-image {
    min-height: 390px;
  }
}


/* Tablet styles */
@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .swiper {
    width: 100%;
    min-height: 600px;
    border-radius: 1rem;
  }
}
</style>
