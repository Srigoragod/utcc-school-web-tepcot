<template>
  <div class="our-staff-directer">
    <div class="py-1" :class="[isOneCard ? 'has-one-card' : '']">
      <div class="px-4 md:px-0 container mx-auto mb-8 text-center">
        <h3 class="text-44 md:text-54 leading-none  text-2-line text-a-blue-1c1c84">
          <!-- Program Directors -->
         คณาจารย์และวิทยากรผู้เชี่ยวชาญ
        </h3>
        <h4 class="text-20 md:text-24 text-a-gray-6A6F72 font-light max-w-7xl mx-auto mt-4 mb-6">
         TEPCoT ภูมิใจนำเสนอคณาจารย์และวิทยากรระดับแนวหน้าที่มีประสบการณ์จริงในการบริหารองค์กรชั้นนำ ผสมผสานระหว่างนักวิชาการผู้ทรงคุณวุฒิและผู้บริหารระดับ C-Suite จากองค์กรชั้นนำทั้งในและต่างประเทศ ทำให้ผู้เข้าร่วมโปรแกรมได้รับความรู้ที่ลึกซึ้งทั้งทางทฤษฎีและประสบการณ์จริงที่สามารถนำไปประยุกต์ใช้ได้ทันที
        </h4>
        <div class="h-1 w-[88px] bg-a-orange-F1592B mx-auto mb-1"></div>
        <h4 v-if="slug !== 'master'" class="text-24 md:text-30">
          <!-- ผู้บริหารหลักสูตร / อาจารย์ประจำหลักสูตร: <br /> -->
          <span class="font-light text-2-line md:text-1-line text-24 text-a-gray-6A6F72">{{ namePrograme }}
          </span>
        </h4>
        <h4 v-else class="text-24 md:text-30">{{ namePrograme }}</h4>
      </div>
      <div v-if="!isShowMore" class="contents program-director-group">
        <swiper :modules="[Virtual, Autoplay]" :autoplay="{
          delay: 1000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }" :speed="2000" :loop="true" :lazy="true" :breakpoints="{
          1280: { slidesPerView: 4, spaceBetween: 0 },
          1024: { slidesPerView: 3, spaceBetween: 0 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          576: { slidesPerView: 1, spaceBetween: 20 },
        }" class="alumniSwiper">
          <swiper-slide v-for="(item, index) in staffList" :key="index" :virtualIndex="index"
            class="items-stretch cursor-pointer text-a-black-0F0D08" @click="clickShow(item)">
            <div class="card card-staff">
             {{ item }}
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <div id="staff-v-else" v-else class="px-4 md:px-0 container mx-auto  text-center">
        <div class=" grid grid-rows-1 grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="(item, index) in staffList" :key="index" :virtualIndex="index" class="card card-staff"
            @click="clickShow(item)">
            <div class="avatar flex justify-center items-center">
              <div
                class="lg:w-[250px] lg:h-[250px] rounded-full bg-cover-staff-swiper shadow-2xl border-4 border-white">
                <img v-if="item.acf.image" :src="item.acf.image" :alt="item.acf.name" />
                <img v-else-if="item.acf.gender === 'female'" src="/staff/Human-02.png" :alt="item.acf.name" />
                <img v-else src="/staff/Human-01.png" :alt="item.acf.name" />
              </div>
            </div>
            <div>
              <div class="name-staff flex flex-col items-center pt-2">
                <h3 class="text-24 text-a-gray-6A6F72 font-light">
                  {{ item.acf.position ? item.acf.position : "&nbsp;" }}
                </h3>
                <h2 class="text-30 block text-1-line text-center -mt-2">
                  {{ item.acf.name }}
                </h2>
                <div class="text-24 text-2-line text-a-gray-6A6F72 text-center font-light">
                  {{ item.acf.academic }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <ModalMaster v-if="showModal" @close="clikeClose" :customClass="'content-center'" :isShow="showModal"
      id="modal-master">
      <!-- Modal content -->
      <div class="parent relative w-full rounded-2xl bg-white">
        <ContentModalStaff :item="itemShow" :hasLink="false"></ContentModalStaff>
        <div class="flex justify-end px-4">
          <button @click="clikeClose"
            class="btn btn-sm btn-accent text-20 absolute text-white font-light bottom-4 right-4">
            Close
          </button>
        </div>
      </div>
    </ModalMaster>
    <div class=" flex  justify-center pb-8" v-if="staffList && staffList.length > 4">
      <ButtonShowMore @click="clickShowMore()">
        <div class="flex items-center gap-2">
          {{ textButton }}
        </div>
      </ButtonShowMore>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useTranslations } from "../../i18n/utils";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Virtual, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/virtual";
import "swiper/css/autoplay";
import ModalMaster from "../Modal/Modal.vue";
import CardStaffV2 from "../Staff/CardStaffV2.vue";
import ContentModalStaff from "../Staff/ContentModalStaff.vue";
import ButtonShowMore from "../Button/ButtonShowMore.vue";

export default {
  name: "StaffSwiper",
  props: {
    lang: { type: String, default: "th" },
    slug: { type: String, default: "" },
    namePrograme: { type: String, default: "" }
  },
  components: {
    Swiper,
    SwiperSlide,
    ModalMaster,
    CardStaffV2,
    ContentModalStaff,
    ButtonShowMore
  },
  setup(props) {
    const t = useTranslations('th');
    const textButton = ref(null);
    const isOneCard = ref(false);
    const showModal = ref(false);
    const staffList = ref(null);
    const itemShow = ref(null);
    const isShow = ref(false);
    const isShowMore = ref(false);
    const uri = import.meta.env.PUBLIC_API_WP_SPECIALGUEST;

    const fetchData = () => {
      fetch(
        `${uri}`,
        {
          mode: "cors",
        }
      )
        .then((response) => response.json())
        .then((data) => initData(data))
        .catch((error) => console.error("Error fetching Special Guest data:", error));
    };

    const initData = (data) => {
      textButton.value = t("button.showMore")
      staffList.value = [];
      let mainDegree = ["master", "doctoral"];
      if (props.slug) {
        let filteredData = [];
        if (mainDegree.includes(props.slug)) {
          filteredData = data.filter(
            (item) =>
              item.acf.category &&
              item.acf.category.some((category) => category.name.split('|')[1] === props.slug)
          )
        } else if (props.slug === 'mba') {
          filteredData = data.filter(
            (item) =>
              item.acf.category &&
              item.acf.category.some((category) => category.name.split('|')[0].match(/mba/i))
          )
        } else {
          filteredData = data.filter(
            (item) =>
              item.acf.category &&
              item.acf.category.some((category) => category.slug === props.slug)
          )
        }

        staffList.value = filteredData.sort((a, b) => a.type - b.type);
        isOneCard.value = staffList.value.length <= 1 ? true : false;
      }

    };

    const clickShow = (item) => {
      itemShow.value = item;
      showModal.value = true;
    };

    const clikeClose = () => {
      showModal.value = false;
    };
    const clickShowMore = () => {
      console.log('clickShowMore ...');

      isShowMore.value = !isShowMore.value;
      textButton.value = isShowMore.value ? t("button.showLess") : t("button.showMore");
    };
    fetchData();

    return {
      staffList,
      Virtual,
      Autoplay,
      showModal,
      itemShow,
      clickShow,
      clikeClose,
      isShowMore,
      isOneCard,
      textButton,
      clickShowMore
    };
  },
};
</script>
<style>
.has-one-card {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
}

.has-one-card .avatar img {
  height: 100% !important;
  width: 100% !important;
  -o-object-fit: cover;
  object-fit: cover;
}

.has-one-card .swiper-slide-active {
  width: -webkit-fill-available !important;
}

@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .has-one-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

@media (min-width: 1024px) {
  .has-one-card {
    max-width: 1024px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

@media (min-width: 1280px) {
  .has-one-card {
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

@media (max-width: 720px) {
  .has-one-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
<style scoped>
@import "../../styles/global.css";

.our-staff-directer {
  background: #ffffff;
  background: linear-gradient(180deg, #ffffff 0%, #f0f2f7 70%, #cbcbcb 100%);
}

.bg-cover-staff-swiper {
  background: #8c96a5;
  background: linear-gradient(180deg, #ffffff 0%, #afb4be 48%, #001431 100%);
}

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
  padding: 45px 20px 16px 20px;
  border-radius: 15px;

  background-image: url(/icon/review-blog.svg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: top center;
  height: 100%;
  max-width: 360px;
}

.quote-after::before {
  content: "\201C";
  position: absolute;
  line-height: 1;
  font-size: 6rem;
  font-family: inherit;
  transform: rotate(180deg);
}

.quote::before {
  content: "\201C";
  position: absolute;
  top: 1.25rem;
  left: -1.25rem;
  line-height: 1;
  font-size: 6rem;
  font-family: inherit;
}

.quote-modal::before {
  content: "\201C";
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
  width: 250px;
  height: 250px;
  margin: 0 30px 0 0;
}

@media (max-width: 720px) {
  .quote::before {
    top: 0.25rem !important;
    left: unset !important;
  }

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
