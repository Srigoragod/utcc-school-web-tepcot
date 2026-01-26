<template>
  <!-- container -->
  <!-- <span @click="clickShow(item, item.isDetail)" class="custom-link cursor-pointer">
    <CardCourseMini
          :item="item"
          :lang="lang"
         ></CardCourseMini>
    </span> -->

  <a :href="`/${item.slug}`" class="custom-link">
    <CardCourseMini :item="item" :lang="lang"></CardCourseMini>
  </a>

</template>
<script>
import { ref, defineComponent } from "vue";

// components
import TypeIcon from "../../Button/TypeIcon.vue";
import CardCourseMini from "../../card/CardCourseMini.vue"


export default defineComponent({
  name: "CourseHoverItem",
  components: {
    TypeIcon,
    CardCourseMini
  },
  props: {
    isEvenNumber: { type: Boolean, default: false },
    item: { type: Object, required: false },
    lang: { type: String, default: 'th' }
  },
  setup(props) {
    const showModal = ref(false);
    const txtCurrency = ref("บาท");

    const clickShow = (item, disable) => {
      if (disable) {
        window.location.replace(`${item.slug}`)
      } else {
        window.open(`${item.url}`, '_blank')
      }
    }

    const clikeClose = () => {
      showModal.value = false;
    };

    const handleImage = (imgOriginal, imgCustom) => {
      return imgCustom ? imgCustom : imgOriginal
    }

    return {
      showModal,
      clikeClose,
      clickShow,
      handleImage
    };
  },
});
</script>

<style scoped>
@import "../../../styles/global.css";

a.custom-link {
  color: #0B0B0B;
}

ul {
  list-style-type: square;
  list-style-position: outside;
  list-style-image: none;
}

.course-container {
  cursor: pointer;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.overlay {
  border-radius: 1rem;
  height: 100%;
  width: 100%;
  padding: 84px 24px 21px 23px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  line-height: normal;
  font-weight: 700;
}

.show-on-hover>div:nth-child(1) {
  background-color: var(--accent-dark) !important;
  height: 305px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 30px 0 30px 30px;
  grid-column: span 1 / span 1;
  -o-transition: 0.5s;
  -ms-transition: 0.5s;
  -moz-transition: 0.5s;
  -webkit-transition: 0.5s;

  transition: 0.5s;
}

.show-on-hover:hover>div:nth-child(1) {
  background-color: var(--accent) !important;
  grid-column: span 2 / span 2;
}

.show-on-hover>div:nth-child(1)>.description_course {
  opacity: 0;
  display: none;
}

.show-on-hover:hover>div:nth-child(1)>.description_course {
  opacity: 1;
  display: block;
}

.show-on-hover:hover>div:nth-child(1)>.title_course {
  display: none;
}

.show-on-hover>div:nth-child(2) {
  grid-column: span 2 / span 2;
  -o-transition: 0.5s;
  -ms-transition: 0.5s;
  -moz-transition: 0.5s;
  -webkit-transition: 0.5s;

  transition: 0.5s;
}

.show-on-hover:hover>div:nth-child(2) {
  grid-column: span 1 / span 1;
}


.bg-overlay {
  color: #fff;
  -o-transition: 0.5s;
  -ms-transition: 0.5s;
  -moz-transition: 0.5s;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  font-weight: 300;
  text-shadow: 4px 4px 9px rgba(0, 0, 0, 0.55);
  opacity: 1;
  background: rgb(255, 255, 255);
  background: linear-gradient(180deg,
      rgba(255, 255, 255, 0) 9%,
      rgba(11, 11, 11, 1) 100%);
}

.custom-order-div-even-number {
  order: 2 !important;
}

/* CSS */
.modal {
  display: none;
  /* Hide modal by default */
  position: fixed;
  /* Position the modal */
  z-index: 1;
  /* Make sure it appears on top of other elements */
  left: 0;
  top: 0;
  width: 100%;
  /* Full width */
  height: 100%;
  /* Full height */
  overflow: auto;
  /* Enable scrolling if needed */
  background-color: rgba(0, 0, 0, 0.5);
  /* Black with transparency */
}

.modal-content {
  background-color: #fefefe;
  /* White background */
  margin: 15% auto;
  /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  /* 80% width */
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
