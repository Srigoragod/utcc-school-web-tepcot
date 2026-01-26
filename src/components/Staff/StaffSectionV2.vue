<template>
  <div v-if="isLoading" class="container-staff py-10 grid grid-rows-1 grid-cols-3 gap-4">
    <CardStaffSkeleton v-for="n in 24" :key="n" />
  </div>
  <div v-else class="container-staff py-4 grid grid-rows-1 grid-cols-3 gap-4 md:gap-8" id="parent">
    <CardStaffV2 :item="item" v-for="(item, index) in itemList" :key="index" @click="clickShow(item)" />
  </div>
  <!-- Modal -->
  <ModalMaster v-if="showModal" :customClass="'content-center'" @close="clikeClose" :isShow="showModal">
    <!-- Modal content -->
    <div class="parent relative w-full rounded-2xl bg-white">
      <ContentModalStaff :item="itemShow"></ContentModalStaff>
      <div class="flex justify-end px-4">
        <button @click="clikeClose"
          class="btn btn-sm text-20  absolute text-a-black-1F2937 bottom-4 right-4">Close</button>
      </div>
    </div>

  </ModalMaster>
  <!-- / Modal -->
</template>
<script>
import { ref, defineComponent } from "vue";
import CardStaffV2 from "./CardStaffV2.vue";
import CardStaffSkeleton from "./CardStaffSkeleton.vue";
import ModalMaster from "../Modal/Modal.vue";
import ContentModalStaff from "./ContentModalStaff.vue"

export default defineComponent({
  name: "StaffSectionV2",
  components: {
    CardStaffV2,
    CardStaffSkeleton,
    ModalMaster,
    ContentModalStaff
  },
  setup() {
    const isLoading = ref(true);
    const itemList = ref(null);
    const showModal = ref(false);
    const itemShow = ref(null);
    const uri = import.meta.env.PUBLIC_API_WP_STAFF;

    const fetchData = () => {
      fetch(uri + '?per_page=100&_embed&acf_format=standard&_fields=title,acf,slug,id', {
        mode: "cors",
      })
        .then((response) => response.json())
        .then((data) => ((itemList.value = data), initialData()))
        .catch((error) => console.error("Error fetching staff Data:", error));
    };

    const initialData = () => {
      setTimeout(() => {
        isLoading.value = false;
      }, 1000);
    };

    const clickShow = (item) => {
       if(item.acf.education && item.acf.education.length > 0){
         itemShow.value = item;
         showModal.value = true;
         document.body.style.overflow = "hidden";
       }
    };

    const clikeClose = () => {
      document.body.style.overflow = '';
      showModal.value = false;
    };

    fetchData();

    return {
      itemList,
      isLoading,
      showModal,
      itemShow,
      clickShow,
      clikeClose
    }
  },
});
</script>
<style scoped>
@media only screen and (max-width: 767px) {
  .container-staff {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    /* padding: 0.5rem; */
  }
}

@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .container-staff {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    /* padding: 1rem; */
  }
}

@media only screen and (min-width: 1366px) and (orientation: landscape) {
  .container-staff {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    /* padding: 1rem; */
  }
}

@media only screen and (min-width: 1024px) and (orientation: portrait) {
  .container-staff {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    /* padding: 1rem; */
  }
}
</style>
