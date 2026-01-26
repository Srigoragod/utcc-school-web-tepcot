<template>
  <div class="news py-16">
    <div class="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-8">
      <a :href="newsSlug + '/' + news.slug" v-if="newsList" v-for="(news, index) in newsList.slice(0,6)" :key="index"
        class="card w-full bg-base-100 shadow-md hover:shadow-lg transition-all">
        <div class="card-top"><img :src="news.acf.cover_image" :alt="news.title.rendered" /></div>
        <div class="card-body">
          <h3 class="card-title text-36 text-2-line" v-html="news.title.rendered"></h3>
          <div class="card-content text-24 text-1-line" v-html="news.acf.description"></div>
          <div class="card-actions justify-between">
            <span class="text-light">Student {{ news.type }} by {{ news._embedded['author']['0'].name }}</span>
            <span class="text-light">{{ moment(news.date).format('DD/MM/YYYY') }}</span>
          </div>
        </div>
      </a>
    </div>
    <div class="text-center pt-16">
      <a :href="newsSlug">
        <button class="btn btn-active btn-primary rounded-full font-normal uppercase text-24 load-button">
          อ่านเพิ่มเติม
        </button>
      </a>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import Card from "../card/Card.vue";
import moment from "moment";
import { useTranslations } from "../../i18n/utils";

export default {
  components: {
    Card
  },
  setup() {
    const lang = "th";
    const t = useTranslations(lang);
    const newsSlug = `/articles`;
    const newsList = ref(null);
    const embedURL = "https://demo2.utcc.ac.th/wp-json/wp/v2/news?_embed&acf_format=standard";
    const fetchData = async () => {
      // await fetch("https://tourism.utcc.ac.th/wp-json/wp/v2/posts?_embed")
      await fetch(embedURL, { mode: "cors" })
        .then((response) => response.json())
        .then((data) => (newsList.value = data))
        .catch((error) =>
          console.error("Error fetching News Data:", error)
        );
    };

    fetchData();
    return {
      newsList,
      moment,
      newsSlug,
      itemsToShow: 6,
    };
  },
};

</script>
<style scoped>
@import "../../styles/global.css";

.news .card {
  color: var(--black);
  overflow: hidden;
}

.news .card .card-top {
  position: relative;
  overflow: hidden;
}
.news .card .card-top img {
  object-fit: cover;
  height: 300px;
width: 100%;
}

.news .card .card-top:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: linear-gradient(0deg, #0B0B0B 0%, rgba(11, 11, 11, 0.00) 30%);
  opacity: 1;
  transition: ease-in-out 0.3s;
}

.news .card:hover .card-top:before {
  opacity: 0;
}

.news .card .card-title {
  line-height: 2.50rem;
}

.news .card:hover .card-title {
  color: var(--accent-dark);
}

.news .card p {
  line-height: 1.2;
}

.load-button {
  padding: 0.5rem 3rem;
}
</style>