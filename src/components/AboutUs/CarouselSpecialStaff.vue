<template>
  <div class="carousel-special-staff" >
    <div class="is-desktop relative">
      <!-- Card Grid -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 h-full">
        <div
          v-for="(lecturer, index) in itemsList"
          :key="index"
          @click="clickShow(lecturer)"
          class="group  text-center   hover:bg-a-blue-0b57d0/60 transition relative  h-full item-special"
        >
          <div class="group relative overflow-hidden rounded-full mx-auto h-60 w-60 backdrop-blur  mt-12 shadow-2xl shadow-blue-500/30 bg-gradient-to-t from-blue-100 to-blue-900  border-2 border-a-gold-F0C571">
            <!-- Image -->
             <!-- aspect-square object-cover object-[50%_20%] rounded-full h-60 w-60 mx-auto transition duration-300 group-hover:scale-[1.05] border-2 border-a-gold-F0C571 -->
            <img
              :src="lecturer?.thumbnail"
              :alt="lecturer?.title"
              class="aspect-square object-[50%_20%] rounded-full h-60 w-60  transition duration-300 group-hover:scale-[1.05]"
              loading="lazy"
            />
          </div>
          <!-- Overlay Name Speaker -->
          <div class="py-4 h-36 text-white" :class="[customClass]" >
              <div class="absolute -bottom-4 p-4 text-left w-full z-10">
                <h3 class="text-30 font-semibold line-clamp-1 text-center text-a-gold-F0C571">
                  {{ lecturer?.title }}
                </h3>
                 <h4 class=" text-24 text-center  font-light mt-auto">{{ lecturer?.career }}</h4>
                 <h5 class="text-a-blue-18ffff mt-1 line-clamp-1 text-center"> {{ lecturer?.major }}</h5>
              </div>
            </div>
        </div>
      </div>
    </div>
    <div class="is-mobile grid grid-cols-2 gap-2">
      <div
        v-for="(lecturer, index) in itemsList"
        :key="index"
        @click="clickShow(lecturer)"
        class="group bg-black backdrop-blur rounded-lg text-center  hover:bg-black/20 bg-blue-950/100 transition relative"
      >
        <div class="group relative overflow-hidden">
          <!-- Image -->
          <img
            :src="lecturer?.thumbnail"
            :alt="lecturer?.title"
            class="aspect-square w-full object-cover rounded-t-lg object-[50%_20%] transition duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />

          <!-- Name Speaker -->
          <div class="" >
            <div class="p-4 text-left h-full w-full bg-gradient-to-t from-black/90 via-black/10 to-transparent rounded-b-lg">
              <h3 class="font-semibold line-clamp-2 text-a-gold-F0C571">
                {{ lecturer?.title }}
              </h3>
              <h4 class="font-light text-20">{{ lecturer?.career }}</h4>
              <h5
                class="text-white/70 mt-2 font-medium line-clamp-2 text-20"
              >
                {{ lecturer?.major }}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ModalMaster
      v-if="showModal"
      :customClass="'content-center'"
      @close="clikeClose"
      :isShow="showModal"
    >
        <!-- Modal content -->
        <div class="parent relative w-full rounded-2xl bg-white">
            <ContentModalStaff :item="itemShow"></ContentModalStaff>
            <div class=" justify-end px-4 hidden md:flex">
                <button @click="clikeClose"
                    class="btn btn-sm text-20 absolute bg-transparent border-a-gray-696F6F hover:bg-slate-200 font-light bottom-4 right-4">Close</button>
            </div>
        </div>
    </ModalMaster>
  </div>
</template>

<script>
import { ref } from "vue";

// components
import ModalMaster from "../../components/Modal/Modal.vue";
import { useTranslations } from "../../i18n/utils";
import { ArrowsPointingOutIcon } from "@heroicons/vue/24/solid";
import ContentModalStaff from "../Staff/ContentModalStaff.vue";

export default {
  name: "CarouselSpecialStaff",
  components: {
    ModalMaster,
    ArrowsPointingOutIcon,
    ContentModalStaff
  },
  props: {
    lang: { type: String, default: "th" },
    showTopic: { type: Boolean, default: false },
    topic: { type: String, default: "" },
    customClass: { type: String, default: "" },
  },
  setup(props) {
    const showModal = ref(false);
    const itemShow = ref(null);
    const itemsList = ref(null);
    const uri = import.meta.env.PUBLIC_API_WP_SPECIALGUEST;
    const t = useTranslations(props.lang);


    const clickShow = (item) => {
      // console.log(JSON.stringify(item, null, 4));
      itemShow.value = {
        image: item?.thumbnail ?? "",
        gender:  "female",
        position: "อาจารย์",
        name: item?.th?.title ?? "",
        academic: item?.th?.career ? `${item.th.career}${item?.th?.major ? ` | อาจารย์พิเศษกลุ่มวิชา ${item.th.major}` : ''}`.trim() : '',
        education: [],
        specialist: [],
        description: item?.th?.description ?? "",
        contact: {
          phone: "",
          email: "",
        },
      };

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
          itemsList.value = data?.speker;
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
      customClass: props.customClass
    };
  },
};
</script>

<style scoped>
@import "../../styles/global.css";
.mobile-custom-bg {
  background: rgb(18, 222, 221);
  background: linear-gradient(
    90deg,
    rgba(18, 222, 221, 1) 0%,
    rgba(3, 9, 26, 1) 70%
  );
}
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

.item-special {
  height: 400px;
}

.item-special:hover .topic-card {
  opacity: 100;
  -o-transition: 0.5s;
  -ms-transition: 0.5s;
  -moz-transition: 0.5s;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}

.item-special:hover .title-card {
  opacity: 0;
  -o-transition: 0.5s;
  -ms-transition: 0.5s;
  -moz-transition: 0.5s;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}

@media only screen and (max-width: 767px) {
  .mobile-custom-bg {
    background: rgb(18, 222, 221);
    background: linear-gradient(
      90deg,
      rgba(18, 222, 221, 1) 0%,
      rgba(3, 9, 26, 1) 90%
    );
  }
  .div-img {
    max-height: 320px;
    min-height: 300px;
    position: relative;
    display: block;
    justify-self: center;
    background-position: bottom center;
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
    max-height: 24rem;
    overflow-y: scroll;
  }

  .img-staff-special {
    height: 10rem;
    width: 10rem;
  }
  .mobile-custom-bg:nth-child(even) {
    background: linear-gradient(
      270deg,
      rgba(18, 222, 221, 1) 0%,
      rgba(3, 9, 26, 1) 90%
    );
  }
  .mobile-custom-bg:nth-child(even) .div-content {
    flex-direction: row-reverse;
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
