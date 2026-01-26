<template>
  <div class="container mx-auto py-10">
    <div class="topic flex justify-between items-center">
      <h2 class="text-44 lg:text-66 font-semibold">{{ t("facilities.title") }}</h2>
      <div class="py-2 hidden md:flex justify-end">
        <!-- <ButtonShowMore @click="clickShowMore()">
          {{ textButton }}</ButtonShowMore> -->
      </div>
    </div>

    <div v-if="!isShowMore"   class="relative items-center flex justify-center">
      <div
        class=" bg-a-black-1F2937 opacity-90 flex justify-center items-center absolute right-0 w-8 shadow rounded-l-md h-40 z-[4]">
        <div class="">
          <ChevronRightIcon @click="clickShowMore()" class="h-8 w-8 text-white"></ChevronRightIcon>
        </div>
      </div>
    <div class="slides overflow-scroll smooth-scroll w-full touch-pan-x snap-mandatory flex snap-x py-10 gap-4">
    <div
        class="carousel-item pl-4"
        v-for="(item, index) in itemList"
        :key="index"
      >
        <Card
          :badge="item.acf.badge"
          :cardTitle="item.acf.title"
          :description="item.acf.description"
          :image="item.acf.thumbnail"
          :customClass="'w-full'"
          :location="item.acf.location"
          @click="clickShow(item)"
        >
        </Card>
      </div>
  </div>

    </div>

    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(item, index) in itemList" :key="index">
        
            <Card :badge="item.acf.badge" :cardTitle="item.title.rendered" :description="item.acf.description"
            :image="item.acf.thumbnail" :customClass="'w-full'" :location="item.acf.location" @click="clickShow(item)">
          </Card>
   
        </div>
      </div>
      <div class="py-4 hidden md:flex justify-center">
        <ButtonShowMore @click="clickShowMore()">
          {{ textButton }}</ButtonShowMore>
      </div>
    </div>
    <!-- Modal -->
    <ModalMaster v-if="showModal" @close="clikeClose" :customClass="'content-center'" :isShow="showModal">
      <!-- Modal content -->
      <div class="parent relative w-full rounded-lg bg-white text-a-black-121212 fac-content">
        <SwiperGallery :items="itemShow.gallery" :customHeight="'rounded-t-lg'">
        </SwiperGallery>
        <div class="div-content text-left max-h-[10rem] overflow-y-auto">
          <div class="px-4 py-2 gap-4">
            <div class="col-span-2">
              <div class="badge badge-neutral text-[18px] absolute top-4 z-1">{{ itemShow.badge }}</div>
              <h2 class="text-30 lg:text-36 leading-none text-a-black-121212 text-1-line">
                {{ itemShow.title }}
              </h2>
            </div>
          </div>
          <div class="grid grid-cols-2 px-4 gap-4">
          </div>
          <div
            class="text-20 pb-4 text-left relative text-a-black-121212 border-b mx-4 border-a-black-121212 font-light"
            v-html="itemShow.description"></div>
          <div class="flex justify-between  text-a-black-121212 p-4">
            <div>
              <h4 class="text-20 md:text-24 w-full">
                {{ t("facilities.location") }} <br /><span class="font-light"> {{ itemShow.location }}</span>
              </h4>
            </div>
            <div>
              <ul class="none">
                <li class="text-20 md:text-24"> {{ t("facilities.openingHours") }}</li>
                <li class="text-20 md:text-24 font-light">
                  {{ itemShow.date_time.date }} | {{ itemShow.date_time.time }}
                </li>
              </ul>
            </div>
          </div>
          <div class="div-condition flex items-center justify-start p-4 gap-2 rounded-b-lg">
            <h4 class="text-20 md:text-24 text-a-black-121212"
              v-if="itemShow.condition && itemShow.condition.length > 1"> {{ t("facilities.termsOfServices") }}
            </h4>
            <div
              class="text-20 md:text-24 text-a-black-121212 hover:text-slate-900 bg-slate-300 hover:opacity-100 px-4 rounded-full opacity-50"
              v-for="(item, index) in itemShow.condition" :key="index">
              {{ item.name }}
            </div>
          </div>
          <div class="flex justify-end px-4  absolute bottom-4 right-4">
            <button @click="clikeClose" class="btn btn-sm text-20 text-a-primary bg-white right-4">Close</button>
          </div>
        </div>

      </div>
    </ModalMaster>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
import { useTranslations } from "../../i18n/utils";
// components
import Card from "../../components/card/Card.vue";
import ButtonShowMore from "../Button/ButtonShowMore.vue";
import ModalMaster from "../Modal/Modal.vue";
import SwiperGallery from "../SlideShow/SwiperGallery.vue";
import { ChevronRightIcon } from "@heroicons/vue/24/solid";

export default defineComponent({
  name: "FacilitiesSection",
  components: {
    Card,
    ModalMaster,
    ButtonShowMore,
    SwiperGallery,
    ChevronRightIcon
  },
  props: {
    lang: { type: String, default: "th" },
    title: { type: String, dafault: '' },
    slug: { type: String, dafault: 'all' },
    t: { type: Object, default: {} }
  },
  setup(props) {
    const showModal = ref(false);
    const itemList = ref(null);
    const itemShow = ref(null);
    const textButton = ref(null);
    const isShowMore = ref(false);
    const t = useTranslations(props.lang);
    const uri = import.meta.env.PUBLIC_API_WP_FACILITY;
    const schooId = import.meta.env.PUBLIC_SCHOOL;

    const fetchData = async () => {
      textButton.value = t("button.showMore")
      await fetch(
        uri + `?acf_format=standard&_fields=id,title,slug,acf`, { mode: 'cors' }, { credentials: "include" }
      )
        .then((response) => response.json())
        .then((data) => (initialData(data)))
        .catch((error) =>
          console.error("Error fetching Facilities image data:", error)
        );
    };

    const initialData = (data) => {
      const sortedData = data.sort((a, b) => {
        if (a.school === props.slug && b.school !== props.slug) {
          return -1;
        } else if (a.school !== props.slug && b.school === props.slug) {
          return 1;
        } else {
          return 0;
        }
      });
      if (props.slug == 'all') {
        itemList.value = data
      } else {
        itemList.value = sortedData;
      }

    }
    fetchData();
    const clickShow = (item) => {
      // console.log('itemShow ...', JSON.stringify(item,null,4));
      itemShow.value = item.acf;
      showModal.value = true;
      document.body.style.overflow = "hidden";
    };
    const clikeClose = () => {
      document.body.style.overflow = '';
      showModal.value = false;
    };
    const clickShowMore = () => {
      isShowMore.value = !isShowMore.value;
      textButton.value = isShowMore.value ? t("button.showLess") : t("button.showMore");
    };

    return {
      itemList,
      showModal,
      clickShow,
      clikeClose,
      itemShow,
      textButton,
      clickShowMore,
      isShowMore,
      t,
      schooId
    };
  },
});
</script>

<style scoped>
.slides {
  -ms-overflow-style: none;
  /* Internet Explorer 10+ */
  scrollbar-width: none;
  /* Firefox */
}

.slides::-webkit-scrollbar {
  display: none;
  /* Safari and Chrome */
}

.bg-overlay {
  display: flex;
  justify-items: start;
  align-items: flex-end;
  padding: 1rem;
  color: #fff;
  font-weight: 300;
  text-shadow: 4px 4px 9px rgba(0, 0, 0, 0.55);
  opacity: 1;
  background: linear-gradient(180deg,
      rgba(255, 255, 255, 0) 9%,
      rgba(22, 42, 159, 0.8) 100%);
  height: 100%;
  width: 100%;
}

ul {
  list-style-type: disc;
  list-style-position: inside;
}

ul.none {
  list-style-type: none;
  list-style-position: inside;
}

@media (max-width: 767px) {
  .topic {
    padding: 0 1rem;
  }

  .card {
    max-height: 400px;
  }

  .carousel-item {
    width: 50%;
  }

  .bg-image {
    height: 300px;
    /* background-size: contain !important; */
  }

  .overlay {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  .div-condition {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem 1rem;

  }

  .div-content {
    overflow-y: scroll;
    padding: 1rem 0;
  }
}
</style>
