<template>
  <div>
    <ul class="menu w-auto lg:w-3/4 rounded-box sticky top-24 self-start text-20 py-4">
      <li class="research-tabs" id="all">
        <div class="text-1-line">ทั้งหมด</div>
      </li>
      <li class="research-tabs" v-for="item in researchType" :key="item" :id="`hi` + [item ? item : '0']">
        <div class="text-1-line">{{ item ? item : 'ไม่ระบุ' }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, defineComponent, watch } from "vue";
import { useTranslations } from "../../i18n/utils";

export default defineComponent({
  name: "Research",
  props: {
    lang: { type: String, default: 'th', required: true }
  },
  setup(props) {
    const researchList = ref([]);
    const researchType = ref([]);
    const uri = import.meta.env.PUBLIC_API_WP_RESEARCH;
    const t = useTranslations(props.lang);

    const fetchData = () => {
      fetch(uri, {
        mode: "cors",
      })
        .then((response) => response.json())
        .then((data) => {
          researchList.value = props.lang === 'en' ? data.en : data.th;
          initialData(researchList.value);
        })
        .catch((error) => console.error("Error fetching researchList Data:", error));
    };

    const initialData = (data) => {
      if (Array.isArray(data)) {
        researchList.value = data;
        const types = data.flatMap(item => item.type);
        researchType.value = [...new Set(types)].sort((a, b) => b.localeCompare(a));
      } else {
        console.error("Expected an array but got:", data);
      }
    };

    fetchData();

    // watch(researchType, (newTypes) => {
    //   console.log(">> researchType", newTypes);
    // });

    // console.log("-- type", researchType);

    return {
      researchList,
      researchType,
      t
    };
  }
});
</script>

<style scoped>
.menu {
  padding: 0;
}

.menu li a {
  border-radius: 0;
  line-height: 2rem;
  background-color: #ffeeee;
  color: #004290;
}

.menu li:first-child a {
  border-radius: 15px 15px 0 0;
}

.menu li:last-child a {
  border-radius: 0 0 15px 15px;
}

.menu li a:hover,
.menu li a.active {
  background: #004290;
  color: #ffeeee;
  text-decoration: none;
}

.research-tabs.active,
.research-tabs:hover {
  background: #004290;
  color: #ffeeee;
  text-decoration: none;
}
</style>