<template>

  <div id="partners" class="py-10 md:py-20" :class="customClass">
    <div class="">
      <div class="container mx-auto px-4 md:px-0">
        <div class="text-44 md:text-66 font-semibold mb-0">
          {{ titleName }}
        </div>
        <div class="sm:w-30 pt-0 md:pt-4">
          <div class="text-24 md:text-30 font-light">
            {{ desc }}
          </div>
        </div>
      </div>
      <div class="partner-section pt-4 md:pt-16">
        <PartnerSwiper client:visible />
      </div>
    </div>
  </div>

</template>


<script>
import { ref, defineComponent } from "vue";
import { useTranslations } from "../../i18n/utils";
import ButtonShowMore from "../Button/ButtonShowMore.vue";
import PartnerSwiper from "./PartnerSwiper.vue";
export default defineComponent({
  name: "FaqCollapse",
  components: {
    ButtonShowMore,
    PartnerSwiper
  },
  props: {
    customClass: { type: String, default: "" },
    lang: { type: String, default: "th" },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    t: { type: Object, default: {} }
  },
  setup(props, ctx) {
    const uri = import.meta.env.PUBLIC_API_WP_PARTNER;
    const t = useTranslations(props.lang);
    const itemList = ref(null);
    const titleName = t("home.partner.title");
    const desc = t("home.partner.description");

    const fetchData = async () => {
      await fetch(`${uri}`, { mode: 'cors' }
      )
        .then((response) => response.json())
        .then((data) => (initialData(data)))
        .catch((error) =>
          console.error("Error fetching partner image data:", error)
        );
    };

    const initialData = (data) => {
      itemList.value = data
    }


    fetchData()

    return {
      itemList,
      t,
      titleName,
      desc
    }
  }

})
</script>
<!-- <style scoped>
@import "../../styles/global.css";
@import "../../styles/base.scss";

.our-partner {
  position: relative;
}

.partner-section {
  overflow: hidden;
  position: relative;
}

.partner-group {
  animation: slideSide 60s linear infinite;
}

.partner-list {
  display: flex;
  padding: 15px 0;
}

.partner-list .partner-list-item {
  display: block;
  height: 120px;
  width: auto;
  min-width: 250px;
  margin: 0 15px;
}

.partner-list-item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

@media (max-width: 1023px) {
  .partner-group {
    animation: none;
  }

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
    max-height: 40px;
  }
}
</style> -->

<style scoped>
.our-partner {
  position: relative;
}

.partner-section {
  overflow: hidden;
  position: relative;
}
</style>