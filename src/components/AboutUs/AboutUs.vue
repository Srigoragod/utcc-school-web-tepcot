<template>
  <div id="aboutus" class="about-us relative py-10 bg-gradient-to-br from-[#001053] to-[#004b90] text-white">
    <div class="container mx-auto grid grid-cols-3 gap-4 py-10">
      <div class="col-span-3 desktop:col-span-1">
        <h2 class="text-44 md:text-66">{{ t('aboutUs.title') }}</h2>
      </div>
      <div class="col-span-3 desktop:col-span-2  px-0 md:px-4  content ">
        <div class="text-24 mb-8 font-light md:text-left" v-html="content"></div>
        <a href="aboutus">
          <button class="btn text-white btn-outline rounded-full text-20 md:text-24 font-light">
            {{ t('aboutUs.button') }}
          </button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useTranslations } from "../../i18n/utils"
export default {
  name: "AboutUsVue",
  props: {
  lang: { type: String, default: "th" }
  },
  setup(props) {
    const textButton = ref('');
    const title = ref('');
    const content = ref('');
    const dataList = ref('null');
    const uri_aboutus = import.meta.env.PUBLIC_API_WP_ABOUTUS
    const lang = ref(props.lang)
    // const { pathname } = Astro.url;
    const t = useTranslations(props.lang);

    const fetchData = async () => {

      await fetch(`${uri_aboutus}`, { mode: 'cors' }, { credentials: "include" })
        .then((response) => response.json())
        .then((data) => (initialData(data)))
        .catch((error) =>
          console.error("Error fetching About data:", error)
        );
    };

    const initialData = (data) => {
      dataList.value = lang.value == 'th' ? data.th : data.en
      title.value = dataList.value.title;
      content.value = dataList.value.tagline;
    }
    
    fetchData();
    return {
      t,
      title,
      content,
      textButton
    }
  },
}
</script>

<style scoped>
/* #aboutus::before {
  content: "";
  background-image: url('../../../public/image/aboutus-section-min.png');
  background-repeat: no-repeat;
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
} */
.about-us {
  background-color: #DCB464;
  position: relative;
}

@media only screen and (max-width: 767px) {
  .about-us > div.container  {
    padding: 2rem 1rem !important;
  }

}
</style>
