<template>
  <div class="p-4 text-a-gray-696F6F font-light">
    <div class="container-content gap-8">
      <div class="item  gap-4">
        <h4 class="text-18 md:text-20">* {{ termTitle }}</h4>
        <ul class="custom-list">
          <li v-for="(term, index) in termList" :key="index">
            - &nbsp;&nbsp; {{ term.text }}
          </li>
        </ul>
      </div>
      <div class="item">
        <div class="gap-4" v-if="isLoan">
          <h4 class="text-18 md:text-20">** {{ t('term.remark.title') }} </h4>
          <ul>
            <li class="mt-1" v-for="(remark, index) in remarkList" :key="index">
              <img :src="remark.image" class="max-w-8 max-h-8" alt="type1" /><span class="ml-2">
                {{ remark.label }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
import { useTranslations } from "../../../i18n/utils";
export default defineComponent({
  name: "TermsAndCoditions",
  props: {
    lang: { type: String, default: 'th', require: true },
    isLoan: { type: Boolean, default: false, require: true }
  },
  setup(props) {
    const termTitle = ref('');
    const termList = ref(null);
    const remarkList = ref(null);
    const item = ref(null);
    const uri = import.meta.env.PUBLIC_API_WP_TERMS

    const t = useTranslations(props.lang);
    const fetchData = () => {
      fetch(uri, {
        mode: "cors",
      })
        .then((response) => response.json())
        .then((data) => ((
          item.value = props.lang == 'en' ? data.en : data.th
        ), initialData(item.value)))
        .catch((error) => console.error("Error fetching Terms Data:", error));
    }
    const initialData = (data) => {
      termTitle.value = data.label;
      termList.value = data.value;
      remarkList.value = data.remark;

    }
    fetchData();
    return {
      item,
      termTitle,
      termList,
      remarkList,
      t
    }
  }

})
</script>

<style scoped>
@import "../../../styles/global.css";

.text-height {
  color: var(--gray-gradient);
}

ul.custom-list {
  list-style-type: "-";
  list-style-position: outside;
}

.custom-list li {
  line-height: normal;
  font-size: 18px;
  padding: 0.25rem 1.5rem 0.25rem 0.5rem;
}

li {
  display: flex;
  font-size: 18px;
}

.container-content {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  font-size: 24px;
}

.ttem {
  padding: 0 1rem;
}

@media only screen and (max-width: 767px) {
  h4 {
    font-size: 24px;
  }

  li {
    font-size: 20px;
  }

  .custom-list li {
    font-size: 20px;
  }

  .item,
  .item .flex {
    gap: 0;
  }

  .container-content {
    display: flex;
    font-size: 20px;
    flex-direction: column;
  }

  .item:nth-child(1) {
    order: 2;
    /* Make this item appear second */
  }

  .item:nth-child(2) {
    order: 1;
    /* Make this item appear first */
  }
}
</style>