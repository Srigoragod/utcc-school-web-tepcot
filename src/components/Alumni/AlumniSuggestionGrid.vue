<template>
  <section class="w-full">

    <!-- Grid -->
    <ul
      class="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      role="list"
    >
      <li v-for="(avatar, index) in alumniList" :key="index" class="group relative">
        <AlumniCard :item="avatar" />
      </li>
    </ul>
  </section>
</template>

<script>

import { ref } from "vue";
import AlumniCard from "./AlumniCard.vue";
export default {
  components: {
    AlumniCard,
  },
  setup() {
    const originalList = ref([]);
    const listData = ref([]); 
    const alumniList = ref(null);
    const uri = import.meta.env.PUBLIC_API_WP_ALUMNI;

    const fetchData = () => {
      fetch(uri)
        .then((response) => response.json())
        .then((data) => initialData(data?.list2 ?? []))
        .catch((error) =>
          console.error("Error fetching Alumni data:", error)
        );
    };
    fetchData();
      const randomSort = () => {
      return Math.random() - 0.5;
    }
    const mutualAvatars = (key, name) => {
      return originalList.value
        .filter((item) => item.key === key  && item.name.trim() !== name)
        .map((item) => ({ image: item.image, name: item.name}));
    }
    const initialData = (data) => {
       originalList.value = data;
       listData.value = data.map((item, index) => ({
        name: item.name,
        company: item.company,
        generation: item.generation,
        image: item.image,
        mutualAvatars: mutualAvatars(item.key, item.name.trim())
      }));
      alumniList.value = listData.value.sort(randomSort);

    };

    return {
      alumniList,
    };
  },
};
</script>
