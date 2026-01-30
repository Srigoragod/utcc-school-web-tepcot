<template>
  <div class="hero-layout pt-0 md:pt-12 relative">
    <!-- pauseOnMouseEnter: true -->

    <div class="container mx-auto">
      <div v-if="isLoading" class="swiper-skeleton bg-slate-200 skeleton h-fll w-full rounded-lg">

      </div>
      <swiper v-else :spaceBetween="30" :style="{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
      }" :autoplay="{
        delay: 3000,
        disableOnInteraction: false
      }" :pagination="{
          clickable: true,
        }" :lazy="true" :modules="modules" class="mySwiper drop-shadow shadow-2xl">
        <swiper-slide v-for="(item, index) in sliderList" :key="index">
          <div class="bg-image mx-auto is-desktop  rounded-lg  relative px-4"
            :style="{ backgroundImage: `url(${item.image_lg})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'cover' }"
            loading="lazy">
            <div  class="absolute z-4 bottom-0 inset-0 bg-gradient-to-t from-[#77acdc]/50 via-[#030e62]/40 to-transparent h-full mx-auto rounded-b-lg pointer-events-none"></div>
            <div class="hero-content absolute inset-0 flex items-center justify-center text-center px-6 z-10 mx-auto pt-20">
              <div class="w-full max-w-5xl mx-auto pt-10">
              <Eyebrow class="bg-black/50 text-white px-2 mx-auto" :text="item.eyebrow ? item.eyebrow : eyebrowText" />
              <h2 class="text-44 md:text-54 font-bold ">{{ item.title ? item.title : defaultTitle }} </h2>
              <p  class="text-24 md:text-30 mb-6 max-w-4xl mx-auto">{{ item.description ? item.description : defaultDescription }}</p>
              <div class="flex max-w-2xl mx-auto gap-4 flex-col sm:flex-row justify-center">
              <button class="inline-block px-6 py-3 btn btn-accent text-white rounded-full text-24 font-light" @click="clickSlide(item.button1.link)"> 
                 {{ item.button1.title ? item.button1.title : 'ดูรายละเอียดเพิ่มเติม' }}
              </button>
              <button  class="inline-block px-6 py-3 btn btn-neutral rounded-full text-white text-24 font-light" @click="clickSlide(item.button2.link)">
                  {{ item.button2.title ? item.button2.title : 'ติดต่อเจ้าหน้าที่' }}
              </button>
              </div>
              </div>
            </div>
          </div>
          <div class="bg-image px-4 is-mobile"
            :style="{ backgroundImage: `url(${item.image_sm ? item.image_sm : item.image_lg})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'cover' }"
            loading="lazy">
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

// components
// import Eyebrow from "../components/AboutUs/Eyebrow.vue";
import Eyebrow from "../AboutUs/Eyebrow.vue";

export default {
  components: {
    Swiper,
    SwiperSlide,
    Eyebrow
  },
  setup() {
    const uri_hero = import.meta.env.PUBLIC_API_WP_HERO
    const sliderList = ref(null);
    const isLoading = ref(true)

    // text default
    const eyebrowText = ref('Excutive Education');
    const defaultTitle =  ref('หลักสูตรผู้บริหารระดับสูงด้านการค้าและการพาณิชย์');
    const defaultDescription = ref('เกิดขึ้นจากความร่วมมือระหว่าง มหาวิทยาลัยหอการค้าไทย กระทรวงพาณิชย์ กระทรวงอุตสาหกรรม กระทรวงการคลัง กระทรวงมหาดไทย และหอการค้าไทย ซึ่งมีความต้องการเสนอหลักสูตรที่มีการเรียนรู้ร่วมกันระหว่างผู้บริหาร ระดับสูงของ หน่วยงานทั้งจาก ภาครัฐ เอกชน และนักวิชาการ');

    const fetchData = () => {
      fetch(`${uri_hero}`, { mode: 'cors' }, { credentials: "include" })
        .then((response) => response.json())
        .then((data) => (sliderList.value = data, initialData()))
        .catch((error) =>
          console.error("Error fetching hero image data:", error)
        );
    };
    const initialData = () => {
      setTimeout(() => {
        if(!sliderList.value || sliderList.value.length === 0){
          isLoading.value = true
        }else{
          isLoading.value = false
        }
      }, 500);
    }
    fetchData();
    const clickSlide = (link) => {
      if (link){
          window.open(link, '_blank', 'noopener,noreferrer');
      }
    };
    return {
      sliderList,
      modules: [Autoplay, Pagination],
      isLoading,
      clickSlide,
      defaultTitle,
      defaultDescription
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
  .hero-layout {
    padding-top: 1rem;
  }

  .swiper,
  .swiper-skeleton {
    width: 100%;
    height: 360px;
    border-radius: 1rem;
  }

  .bg-image {
    min-height: 300px;
  }

  .container-sp-staff {
    min-height: 300px;
  }

  .is-desktop {
    display: none;
  }
}


/* Tablet styles */
@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .swiper {
    width: 100%;
    /* min-height: 600px; */
    border-radius: 1rem;
  }

  .bg-image {
    min-height: 400px;
  }

  .swiper {
    height: 400px;
  }

  .swiper-skeleton {
    height: 400px;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .is-desktop {
    display: none;
  }
}

@media only screen and (min-width: 1024px) {
  .is-mobile {
    display: none;
  }
}
</style>
