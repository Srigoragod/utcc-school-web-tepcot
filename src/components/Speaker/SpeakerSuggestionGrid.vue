<template>
  <section class="w-full">
    <!-- Search Bar -->
    <div class="mb-8">
      <AlumniSearchBar :generations="generations" />
    </div>
    <!-- Grid -->
    <ul
      class="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      role="list"
    >
      <li
        v-for="(avatar, index) in alumniList"
        :key="index"
        class="h-full"
      >
        <AlumniCard
          :item="avatar"
          class="h-full"
        />
      </li>
    </ul>
  </section>
</template>

<script>
import { ref, computed } from "vue";
import AlumniCard from "./SpeakerCardV2.vue";
import AlumniSearchBar from "./SpeakerSearchBar.vue";
export default {
  components: {
    AlumniCard,
    AlumniSearchBar,
  },
  setup() {
    const originalList = ref([]);
    const listData = ref([]);
    const alumniList = ref(null);
    const generations = ref([]);
    const uri = import.meta.env.PUBLIC_API_WP_ALUMNI;
    const uriGeneration = import.meta.env.PUBLIC_API_WP_ALUMNI_GENERATION;

    const fetchGenerations = () => {
      fetch(`${uriGeneration}?per_page=100&acf_format=standard`, { mode: "cors" })
        .then((response) => response.json())
        .then((data) => {
          generations.value = data.map((item) => ({
            id: parseInt(item.slug.split('-')[1]),
            key: item.key,
            name: item.name
          })).sort((a, b) => b.id - a.id);
        })
        .catch((error) =>
          console.error("Error fetching Alumni Generation data:", error),
        );
    };

    const fetchData = () => {
      fetch(
        `${uri}?per_page=100&acf_format=standard&_fields=id,slug,title,acf`,
        { mode: "cors" },
      )
        .then((response) => response.json())
        .then((data) => initialData(data))
        .catch((error) => console.error("Error fetching Alumni data:", error));
    };

    const createdGenerations = computed(() => {
      const m = new Map();

      (originalList.value || []).forEach((item) => {
        const numKey = Number(item?.key);
        if (numKey)
          m.set(String(numKey).trim(), {
            id: Number(item?.key),
            key: String(numKey).trim(),
            name: `TEPCoT รุ่น ${String(numKey).trim()}`,
          });
      });

      return Array.from(m.values()).sort((a, b) => b.id - a.id);
    });

    fetchData();

    const randomSort = () => {
      return Math.random() - 0.5;
    };
    const mutualAvatars = (key, slug) => {
      return originalList.value
        .filter((item) => item.key === key && item.slug.trim() !== slug)
        .map((item) => ({ image: item.image, name: item.name }));
    };
    const initialData = (data) => {
      originalList.value = data.map((item) => ({
        name: item.title.rendered,
        slug: item.slug.trim(),
        image: item.acf.image,
        key: item.acf.key,
      }));

      listData.value = data.map((item, index) => ({
        slug: item.slug.trim(),
        name: item.title.rendered,
        company: item.acf.company,
        generation: item.acf.generation,
        image: item.acf.image,
        mutualAvatars: mutualAvatars(item.acf.key, item.slug.trim()),
      }));

      alumniList.value = listData.value.sort(randomSort);
      fetchGenerations();
    };

    return {
      alumniList,
      generations,
    };
  },
};
</script>
