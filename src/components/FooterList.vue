<template>
  <div class="col-span-3">
    <div class=" grid-cols-1 lg:grid-cols-3 gap-4 hidden lg:grid">

      <!-- ส่วน Quick Links -->
      <div class="item text-left pb-4 md:pb-8">
        <h6 class="text-30">Quick Links</h6>
        <ul>
          <li v-for="(item, index) in quickLinks" :key="'quick-' + index">
            <a :href="item.link" target="_blank" rel="noopener">{{ item.title }}</a>
          </li>
        </ul>
      </div>

      <!-- ส่วน Faculty -->
      <div class="item text-left pb-4 md:pb-8">
        <h6 class="text-30">คณะและวิทยาลัย</h6>
        <ul>
          <li v-for="(item, index) in facultyList" :key="'fac-' + index">
            <a :href="item.link" target="_blank" rel="noopener">{{ item.title }}</a>
          </li>
        </ul>
      </div>

      <!-- ส่วน Main Links -->
      <div class="item text-left pb-4 md:pb-8">
        <h6 class="text-30">มหาวิทยาลัย</h6>
        <ul>
          <li v-for="(item, index) in mainLinks" :key="'main-' + index">
            <a :href="item.link" target="_blank" rel="noopener">{{ item.title }}</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- Mobile Footer Collapse with custom colors and checkbox -->
    <div class="lg:hidden">
      <div v-for="(section, idx) in [
      { title: 'Quick Links', items: quickLinks },
      { title: 'คณะและวิทยาลัย', items: facultyList },
      { title: 'มหาวิทยาลัย', items: mainLinks }
      ]" :key="idx" class="mb-2">
      <div class="collapse collapse-arrow  rounded  border-b border-black/50 bg-transparent">
        <input type="checkbox" :id="'collapse-' + idx" class="peer" />
        <div class="collapse-title font-medium text-30 cursor-pointer text-left px-0">
        {{ section.title }}
        </div>
        <div class="collapse-content px-4">
        <ul>
          <li v-for="(item, index) in section.items" :key="section.title + '-' + index">
          <a :href="item.link" target="_blank" rel="noopener" class="opacity-70 hover:opacity-100">
            {{ item.title }}
          </a>
          </li>
        </ul>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, defineComponent } from "vue";

export default defineComponent({
  name: "FooterList",
  props: {
    lang: {
      type: String,
      default: "th", // th, en, cn
    },
  },
  setup(props) {
    const isActive = ref(false);
    const facultyList = ref([]);
    const quickLinks = ref([]);
    const mainLinks = ref([]);
    const uri = import.meta.env.PUBLIC_API_WP_FOOTER;
    const schoolId = import.meta.env.PUBLIC_SCHOOL;

    const fetchData = async () => {
      try {
        const response = await fetch(uri, { mode: "cors" });
        const data = await response.json();
        initializeData(data);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };

    const getTitle = (item) => {
      return props.lang === "en"
        ? item.en || item.th
        : props.lang === "cn"
          ? item.cn || item.th
          : item.th;
    };

    const initializeData = (data) => {
      facultyList.value = (data.faculty || [])
      .filter((item) => item.school !== schoolId)
      .map((item) => ({
        link: item.link,
        title: getTitle(item),
      }));
      quickLinks.value = (data.quick_link || []).map((item) => ({
        link: item.link,
        title: getTitle(item),
      }));
      mainLinks.value = (data.main_link || []).map((item) => ({
        link: item.link,
        title: getTitle(item),
      }));
    };

    onMounted(() => {
      fetchData();
    });

    const clickActive = (index) => {
      isActive.value = isActive.value === index ? false : index;
    };

    return {
      facultyList,
      quickLinks,
      mainLinks,
    };
  },
});
</script>

<style scoped>
.collapse {
  border-radius: unset;
}
footer ul li {
  font-weight: 300;
  text-align: left;
  line-height: none;
  color: #f7f7f7;
}

footer ul li a {
  color: #f7f7f7;
  opacity: 0.7;
}

footer ul li a:hover {
  opacity: 1;
}

</style>
