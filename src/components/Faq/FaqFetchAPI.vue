<template>
  <div id="faq" class="py-20  bg-slate-100 text-slate-950">
    <div class="px-4 sm:px-16">
      <div class="container mx-auto">
        <Eyebrow class="bg-blue-900 text-white px-2 mb-2" :text="'Executive Education'" />
        <div class="text-44 md:text-66 font-semibold">
           {{ title }}

        </div>
        <div class="grid grid-cols-3 gap-4">
          <div class="col-span-3 desktop:col-span-1 text-30 px-4 md:pl-0" v-html="description"></div>

          <div class="col-span-3 desktop:col-span-2 ">
            <!-- <div class="group-btn  flex justify-end">
              <ButtonShowMore @click="clickShowMore()">{{ textButton }}</ButtonShowMore>
            </div> -->
            <div v-if="isShowMore">
              <div @click="clickActive(index)" :tabindex="index" v-for="(item, index) in itemList" :key="index"
                :class="[isActive == index ? 'collapse-open' : '']"
                class="collapse collapse-plus  border-b rounded-none border-slate-400 bg-base-200 border-y-slate-400">
                <div class="collapse-title font-medium text-30 md:text-36">
                  {{ item.title }}
                </div>
                <div class="collapse-content text-24 text-a-gray-696F6F" v-html="item.detail">
                </div>
              </div>
            </div>
            <div v-else>
              <div @click="clickActive(index)" :tabindex="index" v-for="(item, index) in itemLimit" :key="index"
                :class="[isActive == index ? 'collapse-open' : '']"
                class="collapse collapse-plus  border-b rounded-none border-slate-400 bg-base-200 border-y-slate-400">
                <div class="collapse-title font-medium text-30 md:text-36">
                  {{ item.title }}
                </div>
                <div class="collapse-content text-24 font-light text-slate-800" v-html="item.detail">
                </div>
              </div>
            </div>

            <div class="group-btn  flex justify-center py-4 ">
              <ButtonShowMore @click="clickShowMore()">{{ textButton }}</ButtonShowMore>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
import { useTranslations } from "../../i18n/utils";
import ButtonShowMore from "../Button/ButtonShowMore.vue";
import Eyebrow from "../AboutUs/Eyebrow.vue";

export default defineComponent({
  name: "FaqCollapse",
  components: {
    ButtonShowMore,
    Eyebrow
  },
  props: {
    lang: { type: String, default: "th" },
    t: { type: Object, default: {} }
  },
  setup(props, ctx) {
    const limit = 5;
    const isShowMore = ref(false);
    const isActive = ref(0)
    const t = useTranslations(props.lang);
    const itemList = ref(null);
    const itemLimit = ref(null)
    const textButton = ref(null);
    const uri = import.meta.env.PUBLIC_API_WP_FAQS;

    const title = ref(t("home.faq.title"));
    const description = ref(t("home.faq.description"));

    const fetchData = async () => {
      textButton.value = t("button.showMore")
      await fetch(
        uri, { mode: 'cors' }
      )
        .then((response) => response.json())
        .then((data) => (initialData(data)))
        .catch((error) =>
          console.error("Error fetching Facilities image data:", error)
        );
    };
    const getLimitedItems = () => {
      return itemList.value.slice(0, limit);
    }
    const initialData = (data) => {
      title.value = data.title || '';
      description.value = data.description || '';
      itemList.value = data.list || [];
      itemLimit.value = getLimitedItems();
    }
    const clickActive = (index) => {
      isActive.value = index
    }

    const clickShowMore = () => {
      isShowMore.value = !isShowMore.value;
      textButton.value = isShowMore.value ? t("button.showLess") : t("button.showMore");
    };

    fetchData()

    return {
      title,
      description,
      itemList,
      itemLimit,
      t,
      clickActive,
      isActive,
      textButton,
      clickShowMore,
      isShowMore
    }
  }

})
</script>
<style>
#faq a:hover {
  text-decoration: underline;
}

#faq ol {
  list-style: decimal;
  margin: 1rem;
  padding: .5rem;
}

#faq ul {
  list-style: disc;
  margin: 1rem;
  padding: 0;
}
</style>
<style scoped>
.collapse {
  border-radius: unset;
}
</style>