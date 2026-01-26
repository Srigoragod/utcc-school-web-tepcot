<template>
  <div>
    <div v-if="isSliderListEmpty" class="text-[16px] text-slate-400 font-light text-right my-2 mx-auto container">
      โปรโมชั่นแนะนํา</div>
    <div v-if="isSliderListEmpty" class="mx-auto" :class="[customClass ? customClass : 'mb-8']">
      <div class="container mx-auto">
        <div class="hidden">
          <h3 class="text-44 md:text-66 font-semibold mb-0 ">โปรโมชั่นเด่น</h3>
        </div>
      </div>
      <div v-if="isWidget" class="widget-layout-promotion relative">
        <!-- pauseOnMouseEnter: true -->
        <swiper :spaceBetween="0" :style="{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }" :scrollbar="{
          hide: true,
        }" :autoplay="{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }" :pagination="{
            clickable: true,
          }" :navigation="false" :lazy="true" :modules="modules" class="mySwiper drop-shadow">
          <swiper-slide v-for="(item, index) in sliderList" :key="index" class="rounded-none flex flex-col py-12">
            <div class="bg-image-etc mx-auto  cursor-pointer " @click="handleLinkClick(item.link)">
              <img :src="item.image_mobile" :alt="item.image_mobile.alt"
                class="rounded-none block md:hidden w-full h-full object-cover" loading="lazy">
            </div>
            <div class="content-desc text-20 text-slate-600 text-left my-4 ">
              {{ item.description }}
              <!-- <div class="text-18 font-light ">
              *เงื่อนไขเป็นไปตามที่มหาวิทยาลัยกำหนด
              </div> -->
            </div>

            <!-- <div class="flex justify-center items-center gap-4 absolute bottom-0 ">
                <button class="btn btn-sm  btn-primary rounded-full text-20 md:text-24  text-white font-light">
                สมัครเลย
                </button>
                </div> -->
          </swiper-slide>
        </swiper>

      </div>
      <div v-else class="container-layout-promotion-promotion">
        <!-- pauseOnMouseEnter: true -->
        <swiper :spaceBetween="30" :style="{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }" :scrollbar="{
          hide: true,
        }" :autoplay="{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }" :pagination="{
            clickable: true,
          }" :navigation="true" :lazy="true" :modules="modules" class="mySwiper drop-shadow">
          <swiper-slide v-for="(item, index) in sliderList" :key="index" class="rounded-none">
            <div class="bg-image-etc mx-auto rounded-none hidden md:block cursor-pointer"
              :style="{ backgroundImage: `url(${item.image_desktop})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }"
              loading="lazy" @click="handleLinkClick(item.link)">
              <!-- <div  class=" text-white absolute z-10 bottom-8 left-8">
              <div class="flex justify-start items-center gap-2">
                <span class="text-20 font-light ">
                *เงื่อนไขเป็นไปตามที่มหาวิทยาลัยกำหนด
                </span>
              </div>
            </div> -->
            </div>
            <div class="bg-image-etc mx-auto rounded-none block md:hidden "
              :style="{ backgroundImage: `url(${item.image_mobile})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'contain', }"
              loading="lazy" @click="handleLinkClick(item.link)">
              &nbsp;
            </div>
          </swiper-slide>
        </swiper>
      </div>

    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

import 'swiper/css/navigation';
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation, Scrollbar } from "swiper/modules";
export default {
  name: "SwiperPromo",
  props: {
    customHeight: { type: String, require: true },
    isWidget: { type: Boolean, default: false, default: false },
    customClass: { type: String, default: '' }
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const currentDate = new Date();
    const sliderList = ref(null);
    const uri = import.meta.env.PUBLIC_API_WP_PROMOTION;
    const isSliderListEmpty = ref(false);
    const fetchData = async () => {
      await fetch(
        uri, { mode: 'cors' }, { credentials: "include" }
      )
        .then((response) => response.json())
        .then((data) => (initialData(data)))
        .catch((error) =>
          console.error("Error fetching promotion data:", error)
        );
    };
    const initialData = (data) => {
      const todayDate = dateformat3(currentDate)
      const todayDate2 = createDateFromDDMMYYYY(todayDate);

      sliderList.value = data.map((item) => {
        const startDate = createDateFromDDMMYYYY(item.start_date)
        const endDate = createDateFromDDMMYYYY(item.end_date);
        if (todayDate2 >= startDate && todayDate2 <= endDate) {
          isSliderListEmpty.value = true
          return {
            description: item.description,
            start_date: item.start_date,
            end_date: item.end_date,
            school_id: item.school_id,
            image_mobile: item.image_mobile.url,
            alt_mobile: item.image_mobile.alt,
            image_desktop: item.image_desktop.url,
            alt_desktop: item.image_desktop.alt,
            image_widget: item.image_mobile.sizes.medium,
            link: item.link,
            isSliderListEmpty: isSliderListEmpty.value,
          };
        }

      }).filter((item) => {
        if (item !== undefined) {
          return item;
        }
      });
      // console.log("sliderList", sliderList.value);
    };
    const dateformat3 = (date) => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(date).toLocaleDateString('en-GB', options);
    };
    const createDateFromDDMMYYYY = (dateString) => {
      const [day, month, year] = dateString.split('/');
      return new Date(year, month - 1, day);
    };
    const handleLinkClick = (link) => {
      if (link) {
        window.open(link, '_blank');
      }
    };
    fetchData();
    return {
      handleLinkClick,
      sliderList,
      modules: [Autoplay, Pagination, Navigation, Scrollbar],
      isSliderListEmpty
    };
  },
};
</script>
<style>
.swiper-slide {
  border-radius: 0 !important;
}
</style>
<style scoped>
.swiper-pagination-bullet {

  background-color: #fff;
}

.bg-image-etc {
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  color: #fff;

}

.swiper {
  width: 100%;
  height: 400px;
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
  .container-layout-promotion {
    padding-top: 5rem;
  }

  .swiper {
    width: 100%;
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
