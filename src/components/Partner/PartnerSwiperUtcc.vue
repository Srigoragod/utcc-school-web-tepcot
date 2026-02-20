<template>
  <div class="our-partner flex w-full relative justify-center items-center overflow-hidden py-4">

    <div class="partner-group">
      <div class="partner-list">
        <div v-for="(item, index) in partnerList" :key="index" class="partner-list-item transition-all rounded-md md:rounded-lg">
          <img :src="item.image" :alt="item.title" loading="lazy" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import { ref } from "vue";

export default {
  name: "PartnerSwiperUtcc",
  props: {
    isShowHighlight: { type: Boolean, default: false },
  },
  setup(props) {
    const isHighlight = ref(props.isShowHighlight);
    const uri = import.meta.env.PUBLIC_API_WP_PARTNER;

    const partnerList = ref(null);
    const fetchData = () => {
      fetch(uri, { mode: 'cors' }, { credentials: "include" })
        .then((response) => response.json())
        .then((data) => (initialData(data)))
        .catch((error) =>
          console.error("Error fetching Partner image:", error)
        );
    };

    const initialData = (data) => {
     if(isHighlight.value){
        partnerList.value = data.filter(item => item?.isHighlight == true)
     }else{
      partnerList.value = data
    }
  }
    fetchData();

    return {
      partnerList,
    };
  },

};
</script>

<style scoped>
@import "../../styles/global.css";
@import "../../styles/base.scss";

.our-partner {
  position: relative;
}

.partner-section {
  overflow: hidden;
  position: relative;
}

/* .partner-group {
  animation: slideSide 60s linear infinite;
} */

.partner-list {
  display: flex;
  padding: 0px 0;
}

.partner-list .partner-list-item {
  display: block;
  height: 150px;
  width: auto;
  min-width: 100px;
  margin: 0 15px;
}

.partner-list-item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

@media (max-width: 1023px) {
  /* .partner-group {
    animation: none;
  } */


  .partner-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .partner-list .partner-list-item {
    display: inline-block;
    height: 100%;
    margin: 2.5px;
    width: 31%;
    min-width: auto;
  }

  .partner-list-item img {
    max-width: initial;
    width: 100%;
    height: auto;
    max-height: 85px;
  }

  .is-mobile {
    display: none !important;
  }
}

@media (max-width: 767px) {
  .partner-list .partner-list-item {
    width: 30%;
    min-width: initial;
  }

  .partner-list-item img {
    max-height: 80px;
  }
}
</style>