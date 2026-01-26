<template>
  <div class="our-alumni">
    <div class="contents alumni-group">
      <swiper :modules="[Virtual, Autoplay]" :autoplay="{
        delay: 1000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }" :speed="35000" :loop="true" :lazy="true"
        :breakpoints="{ 1280: { slidesPerView: 4, spaceBetween: 40 }, 1024: { slidesPerView: 3, spaceBetween: 40 }, 640: { slidesPerView: 2, spaceBetween: 60 }, 576: { slidesPerView: 1, spaceBetween: 30, } }"
        class="alumniSwiper">
        <swiper-slide  v-for="(item, index) in alumniList" :key="index" :virtualIndex="index" class="items-stretch cursor-pointer" @click="clickShow(item)">
          <div class="quote text-24 relative">
            <span class="line-clamp-4 mobile:line-clamp-3 lg:px-4 lg:pt-4">{{ item.acf.text }}</span>
            <div class="quote-after absolute right-14 top-28"></div>
          </div>
          <div class="flex ">
            <img :src="item.acf.image" alt="" class="rounded-full " />
         
            <div class="grid grid-column">
              <h4 class="text-24 text-2-line">{{ item.acf.name }}</h4>
              <p class="text-1-line font-light text-a-brown-5F360D">{{ item.acf.job }}</p>
              <p class="text-1-line font-light -mt-6">{{ item.acf.company }}</p>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    <!-- Modal -->
    <ModalMaster v-if="showModal" @close="clikeClose" :customClass="'content-center'"  :isShow="showModal" id="modal-master">
      <div class="parent relative w-full rounded-2xl bg-white">
        <div class="py-10 px-8 max-w-96 min-h-64  overflow-y-auto hide-scroll relative">
          <div class="profile">
            <img class="w-[100px] mx-auto drop-shadow-md rounded-full" :src="itemShow.acf.image" />
            <div class="text-center pt-2 ">
              <h4 class="text-34 text-1-line text-a-blue-030e62">{{ itemShow.acf.name }}</h4>
              <p class="text-24 text-2-line  text-a-brown-5F360D px-4">{{ `${itemShow.acf.job} - ${itemShow.acf.company} ` }}</p>
            </div>
          </div>
          <div class="relative quote-moda  bg-amber-50  font-light p-8 rounded-2xl">
          <div class="text-24 text-a-black-1F2937  min-h-32  overflow-y-auto hide-scroll relative content">
            {{ itemShow.acf.text }}
          </div>
          </div>

        </div>
      </div>
      <div class="flex justify-end p-4 bg-white rounded-2xl div-action">
        <button @click="clikeClose"
          class="btn btn-sm text-20 custom-btn  absolute text-a-black-1F2937 bg-white bottom-4 right-4">Close</button>
      </div>
    </ModalMaster>
    </div>
  </div>
</template>

<script>

import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Virtual, Autoplay } from 'swiper/modules';
import "swiper/css";
import "swiper/css/virtual";
import "swiper/css/autoplay";
import ModalMaster from "../Modal/Modal.vue";

export default {
  components: {
    Swiper,
    SwiperSlide,
    ModalMaster
  },
  setup() {
    const showModal = ref(false);
    const alumniList = ref(null);
    const itemShow = ref(null);
    const uri = import.meta.env.PUBLIC_API_WP_ALUMNI;

    const fetchData = () => {
      fetch(`${uri}?acf_format=standard&_fields=id,slug,title,acf`, { mode: "cors" })
        .then((response) => response.json())
        .then((data) => (alumniList.value = data))
        .catch((error) =>
          console.error("Error fetching Alumni data:", error)
        );
    };
    fetchData();
    

    const clickShow  = (item) => {
      itemShow.value = item
      showModal.value = true;
      // document.body.style.overflow = 'hidden';

    }

    const clikeClose = () => {
      showModal.value = false;
    };

    return {
      alumniList,
      Virtual,
      Autoplay,
      showModal,
      itemShow,
      clickShow,
      clikeClose
    };
  },
};
</script>

<style scoped>
@import "../../styles/global.css";

#modal-master .profile {
  display: flex;
  flex-direction: column;
}

.swiper.alumniSwiper {
  height: auto;
  margin: 0;
  min-height: 400px;
}

.alumniSwiper .swiper-wrapper {
  display: flex;
  justify-content: center;
  align-items: bottom;
  transition-timing-function: linear;
}

.alumniSwiper .swiper-slide .quote {
  padding: 40px 20px  16px 20px;
  border-radius: 15px;

  background-image: url(/icon/review-blog.svg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: top center;
  height: 100%;
  max-width: 360px;
}

.quote-after::before {
  content: '\201C';
  position: absolute;
  line-height: 1;
  font-size: 6rem;
  font-family: inherit;
  transform: rotate(180deg);
}

.quote::before {
  content: '\201C';
  position: absolute;
  top: 0rem;
  left: -1.25rem;
  line-height: 1;
  font-size: 6rem;
  font-family: inherit;
}

.quote-modal::before {
  content: '\201C';
  position: absolute;
  top: -0.25rem;
  left: 1rem;
  line-height: 1;
  font-size: 6rem;
  font-family: inherit;
}

.alumniSwiper .swiper-slide {
  display: block;
  height: auto;
  max-height: initial;
  object-fit: cover;
  margin-bottom: 15px;
}

.alumniSwiper .swiper-slide img {
  width: 100px;
  height: 100px;
  margin: 0 30px 0 0;
}

@media (max-width: 720px) {

  .swiper.alumniSwiper {
    width: 100%;
  }

  .alumniSwiper .swiper-slide {
    width: 100%;
    height: auto;
  }
}
@media only screen and (min-width: 1024px) {
  .quote::before {
    left: 1rem;
  }

}
</style>