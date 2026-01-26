<template>
  <!-- bg-a-red-890017 -->
    <div id="whyus" class="grid grid-cols-2 gap-4 items-center bg-gradient-to-br from-[#001053] to-[#004b90] text-white relative">
    <div class="bg-img" :style="`background-image: url(${image});`">&nbsp;</div>
    <div class="content container mx-auto h-full w-full">
      <h2 class="text-44 md:text-54 uppercase text-a-blue-F2DC98">{{ topic }}</h2>
      <div class="desc text-24 md:text-34 font-light">
        {{ desc }}
      </div>
      <ol class="decimal text-30 ">
        <li v-for="(item, index) in itemList" :key="index" >
            <span  v-html="item.text"></span>
        </li>
      </ol>
    </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "WhyUsSection",
  props: {
    topic: { type: String, default: "" },
    itemList: { type: String, dafault: "" },
    desc: { type: String, dafault: "" },
    image: { type: String, dafault: "" }
  }
});
</script>

<style scoped>
#whyus .content::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("/image/2-CE-UTCC-3-min.png");
  background-size: 33%;
  background-position: center right 0px;
  background-repeat: no-repeat;
  background-attachment: fixed;
  opacity: 0.08;
  z-index: 0;
}
.content {
  padding: 4rem 2.25rem;
}
.bg-img {
  background-repeat: no-repeat;
  background-position: top;
  background-size: cover;
  width: 100%;
  height: 740px;
}
#whyus ol {
  list-style: decimal;
  margin: 1rem;
  padding: .5rem;
}
 #whyus ul {
  list-style: disc;
  margin: 1rem;
  padding: 0;
}
#whyus li {
  margin: .5rem 0;
}
@media only screen and (max-width: 767px) {
  .content {
    padding: 2rem 1rem;
  }
  .bg-img {
    background-size: cover;
    height: 279px;
  }

  #whyus {
    display: flex;
    flex-direction: column;
  }

  h2 {
    font-size: 42px;
  }

  .desc {
    margin-bottom: 1rem;
  }

  ol.decimal,
  .desc {
    font-size: 24px;
  }
  #whyus .content::before {
    background-size: 100%;
    background-position: bottom 100px right 0px;
    background-attachment: fixed;
    opacity: 0.05;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .content {
    padding: 2rem 1rem;
  }
  .bg-img {
    background-size: contain;
    height: 279px;
  }

  #whyus {
    display: flex;
    flex-direction: column;
  }

  h2 {
    font-size: 42px;
    margin-bottom: 1rem;
  }

  .desc {
    margin-bottom: 1rem;
  }

  ol.decimal,
  .desc {
    font-size: 20px;
  }
}
</style>
