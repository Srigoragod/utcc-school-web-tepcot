<template>
  <button @click="clickShow()">
    <slot></slot>
  </button>
  <ModalMaster v-if="showModal" :customClass="'content-center my-8'" @close="clikeClose" :isShow="showModal">
    <div class="parent relative items-center rounded-lg overflow-scroll smooth-scroll max-h-screen bg-white">
        <DownloadForm @handleDownload="downloadFile()" />
    </div>
  </ModalMaster>
</template>

<script>
import { ref, defineComponent } from "vue";
import ModalMaster from "../Modal/Modal.vue";
import DownloadForm from "../Form/DownloadForm.vue";


export default defineComponent({
  name: "ButtonDownload",
  components: {
    ModalMaster,
    DownloadForm
  },
  props: {
    fileDownload: { type: String, required: true },
    customClass: { type: String, default: '' }
  },
  setup(props, ctx) {
    const showModal = ref(false);
    const clickShow = () => {
      let isPermission = checkDownloadPermission()
      if(!isPermission){
        showModal.value = true;
        document.body.style.overflow = "hidden";
      }else {
        downloadFile(true)
      }
 
    }
    const setDownloadPermission = (granted) => {
    sessionStorage.setItem('downloadPermission', granted ? 'granted' : 'denied');
    }
    const checkDownloadPermission = () => {
        return sessionStorage.getItem('downloadPermission') === 'granted';
    }
    const downloadFile = (val) => {
        if(val){
          window.open(`${props.fileDownload}`, '_blank');
        }else{
          setDownloadPermission(true)
          clikeClose()
          window.open(`${props.fileDownload}`, '_blank');
        }

    }
    const clikeClose = () => {
      document.body.style.overflow = '';
      showModal.value = false;
    };
    return {
      showModal,
      clickShow,
      clikeClose,
      downloadFile
    };
  },
});
</script>

<style></style>
