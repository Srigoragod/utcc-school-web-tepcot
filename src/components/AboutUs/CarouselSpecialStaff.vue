<template>
  <div
    class="item-special relative rounded-xl  hover:shadow-lg cursor-pointer animated animatedFadeInUp fadeInUp is-desktop"
    v-for="(item, index) in itemsList" :key="index" @click="clickShow(item)" :style="`background-image: url(${item.thumbnail}); background-repeat: no-repeat;
        background-size: cover;   background-position: top;`">
    <div class="w-96 cursor-pointer custom-w-card">
      <div class="badge  text-20 text-white border-a-blue-021430 bg-a-blue-021430 glass ml-4 mt-4">{{ item.th.major }}
      </div>
      <div class="text-white pl-4 font-light title-card">
        <h3 class="text-20 -mb-1  opacity-80">
          อาจารย์
        </h3>
        <h2 class="text-24 text-2-line uppercase ">
          {{ item.th.title }}
        </h2>
      </div>

      <div class="absolute z-1 w-full bottom-0 p-4 topic-card rounded-b-lg text-white glass ">
        <h3 class="text-20 md:text-24 -mb-4 font-light opacity-80">
          อาจารย์
        </h3>
        <h2 class="text-30 md:text-44 text-1-line uppercase ">
          {{ item.th.title }}
        </h2>
        <h3 class="text-20 md:text-24 font-light opacity-80">
          {{ item.th.career }}
        </h3>
      </div>
    </div>
  </div>
  <!-- <div class="is-mobile grid grid-cols-3 gap-4">
        <div class="avatar" v-for="(item, index) in itemsList" :key="index" @click="clickShow(item)">
          <div class="w-48 rounded shadow-lg shadow-blue-500/50">
            <img :src="item.thumbnail" alt="" />
          </div>
        </div>
      </div> -->
  <div class="carousel rounded-box pl-4 gap-2 is-mobile">
    <div
      class="carousel-item relative shadow-xl animated animatedFadeInUp fadeInUp"
      v-for="(item, index) in itemsList"
      :key="index"
      @click="clickShow(item)"
    >
     <span class="absolute z-1 top-4 left-4 topic text-white">
      <div class="badge  text-18 text-white border-a-blue-021430 bg-a-blue-021430 glass ml-4 mt-4">{{ item.th.major }}</div>
      </span>
      <img class="custom-img-h" :src="item.thumbnail" :alt="item.th.title" />
      <div class="absolute z-1 w-full bottom-0 p-4  rounded-b-lg text-white glass ">
        <h3 class="text-20 md:text-24 -mb-2 font-light opacity-80">
          อาจารย์
        </h3>
        <h2 class="text-30 md:text-44 text-1-line uppercase ">
          {{ item.th.title }}
        </h2>
        <h3 class="text-20 md:text-24 font-light opacity-80">
          {{ item.th.career }}
        </h3>
      </div>
    </div>
  </div>

  <ModalMaster v-if="showModal" :customClass="'content-center'" @close="clikeClose" :isShow="showModal">
    <div class="parent relative w-full rounded-lg text-a-black-1F2937 fac-content">
      <div class="modal-content grid grid-cols-2 relative">

        <div class="div-img bg-a-blue-021430 rounded-l-lg relative" :style="`background-image: url(${itemShow.image_staff}); background-repeat: no-repeat;
        background-size: contain; background-position: top;`">
          <!-- <div class="-rotate-90 text-white absolute buttom-0 z-10"> Business School</div> -->
          <img src="/public/icon/logo-utcc.svg" class="logo ml-4 mt-6 w-[25%]" alt="logo utcc" />
          <!-- <img :src="itemShow.image_staff" class="image_staff mx-auto  h-full" alt="" /> -->
          <img class="absolute -bottom-14 z-10 right-0 w-[66%]" src="/image/UBS.svg" alt="comarts" />
        </div>
        <div class="modal-desc skeleton bg-slate-100 py-20 justify-center relative">
          <div class="content px-4">
            <h2 class="text-36 md:text-44 text-1-line my-0 text-staff-name text-a-blue-021430 text-left">
              {{ itemShow.th.title }}
            </h2>
            <h3 class="text-24 md:text-30 -mt-2 text-left" v-html="itemShow.th.career"></h3>
            <div class="text-20 md:text-24 text-left font-light" v-html="itemShow.th.description"></div>
          </div>
          <button @click="clikeClose"
            class="btn btn-sm text-20 custom-btn absolute  text-a-black-1F2937 bottom-4 right-4">
            Close
          </button>
        </div>
      </div>
    </div>
  </ModalMaster>
</template>

<script>
import { ref } from "vue";

// components
import ModalMaster from "../../components/Modal/Modal.vue";
import { useTranslations } from "../../i18n/utils";

export default {
  name: "CarouselSpecialStaff",
  components: {
    ModalMaster,
  },
  props: {
    lang: { type: String, default: "th" },
    showTopic: { type: Boolean, default: false },
    topic: { type: String, default: "" },
  },
  setup(props) {
    const showModal = ref(false);
    const itemShow = ref(null);
    const itemsList = ref(null);
    const uri = import.meta.env.PUBLIC_API_WP_SPECIALGUEST;
    const t = useTranslations(props.lang);

    const clickShow = (item) => {
      // console.log(JSON.stringify(item, null, 4));
      itemShow.value = item;
      showModal.value = true;
      document.body.style.overflow = "hidden";
    };

    const clikeClose = () => {
      document.body.style.overflow = "";
      showModal.value = false;
    };

    const fetchData = async () => {
      await fetch(`${uri}`, { mode: "cors" })
        .then((response) => response.json())
        .then((data) => {
          itemsList.value = data;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    fetchData();
    return {
      itemsList,
      showModal,
      itemShow,
      clickShow,
      clikeClose,
      t,
    };
  },
};
</script>

<style scoped>
@import "../../styles/global.css";

.custom-img-h {
  height: 387px !important;
}

.div-img {
  min-height: 400px;
  width: 100%;
}

.topic-card {
  opacity: 0;
}

.title-card {
  opacity: 100;
}

.item-special:hover .topic-card {
  opacity: 100;
  -o-transition: 0.5s;
  -ms-transition: 0.5s;
  -moz-transition: 0.5s;
  -webkit-transition: 0.5s;
  transition: .5s;
}

.item-special:hover .title-card {
  opacity: 0;
  -o-transition: 0.5s;
  -ms-transition: 0.5s;
  -moz-transition: 0.5s;
  -webkit-transition: 0.5s;
  transition: .5s;
}

@media only screen and (max-width: 767px) {
  .div-img {
    max-height: 320px;
    position: relative;
    display: block;
    justify-self: center;
  }

  .image_staff {
    margin: auto;
  }

  .is-desktop {
    display: none;
  }

  figure {
    padding: 1rem 0;
  }

  .card {
    padding: 0;
  }

  .container-card {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    padding: 0 1rem;
  }

  .modal-content {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  .modal-desc {
    padding: 1rem;
  }

  .img-staff-special {
    height: 10rem;
    width: 10rem;
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
