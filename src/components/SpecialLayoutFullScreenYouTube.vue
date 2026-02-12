<template>
  <div class="wrap">
    <div class="video-bg">
      <iframe width="" height="100%"
        src="https://www.youtube.com/embed/hmKwI5TuRJ8?si=m20Ebyqa-2xkNu9n?controls=0&autoplay=1&mute=1&loop=1&showinfo=0&rel=0"
        title="YouTube video player" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
    <div class="content">
      <div class="container-vdo-vdo">
       <SwiperText :itemList="items" />
      </div>
    </div>
  </div>
</template>

<script>

import { ref, defineComponent } from "vue";
import SwiperText from "./SlideShow/SwiperText.vue";

export default defineComponent({
  name: "SpecialLayoutFullScreenYouTube",
  components: {
    SwiperText
  },
  props: {
    lang: { type: String, default: 'th' },
  },
  setup(props) {
    const items = ref(null);
    const txtContent = ref('')
    const uri = import.meta.env.PUBLIC_API_WP_SPECIAL;

    const fetchData = async () => {
      await fetch(`${uri}`, { mode: 'cors' }, { credentials: "include" }
      )
        .then((response) => response.json())
        .then((data) => (initialData(data)))
        .catch((error) =>
          console.error("Error fetching Facilities image data:", error)
        );
    }
    const initialData = (data) => {
      items.value = props.lang == 'en' ? data.en.contentList : data.th.contentList
  

    }
    fetchData();
    return {
      items,
      txtContent
    }
  }
})
</script>

<style scoped>
.wrap {
  position: relative;
  height: 654px;
}

.video-bg {
  position: relative;
  height: 654px;
  background: #000;
  overflow: hidden;
}

.video-bg::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .3);
  background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
}

.content {
  position: absolute;
  top: 0;
  left: 0;
  /* width: 100%;
  height: 100%; */
  color: #fff;
}

.container-vdo-vdo {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
}

.title {
  text-align: center;
}

@media only screen and (max-width: 767px) {

  .wrap {
  position: relative;
  height: 543px;
}
.video-bg {
  height: 543px;
}
.video-bg::after {
  height: 543px;
}
}

main .video-bg::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .3);
  background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
}

.video-bg iframe {
  box-sizing: border-box;
  height: 56.25vw;
  left: 50%;
  min-height: 100%;
  min-width: 100%;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  width: 177.77777778vh;
}

.content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #fff;
}

.container-vdo-vdo {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
}

.title {
  text-align: center;
}
</style>