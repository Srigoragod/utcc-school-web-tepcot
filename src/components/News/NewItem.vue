<template>
    <div class="px-5">
        <div v-if="newsItem" v-for="(item, index) in newsItem.slice(0, 1)" :key="item.id">
            <div>
                <img :src="item._embedded['wp:featuredmedia']['0'].source_url" :alt="item.title.rendered"
                    class="mx-auto main-image shadow-md">
            </div>
            <div class="content py-20">
                <p>Student {{ item.type }} by {{ item._embedded['author']['0'].name }} — {{ moment(item.date).format('DD/MM/YYYY') }}</p><span class="text-light"></span>
                <div class="text-54" v-html="item.title.rendered"></div>
                <div class="text-24 font-bold" v-html="item.content.rendered">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from "vue";
import moment from "moment";

export default {
    components: {

    },
    setup() {
        const newsItem = ref(null);
        const firstPost = ref(null);
        const fetchData = async () => {
            await fetch("https://tourism.utcc.ac.th/wp-json/wp/v2/posts?_embed")
                .then((response) => response.json())
                .then((data) => (newsItem.value = data))
                .catch((error) =>
                    console.error("Error fetching Faq Data:", error)
                );
        };
        fetchData();
        const postItem = () => {
            newsItem.length ? newsItem[0] : null;
        };
        postItem();

        return {
            newsItem,
            moment,
            firstPost
        };
    },
};

</script>
<style scoped>
.main-image {
    width: 50%;
    height: auto;
}
</style>