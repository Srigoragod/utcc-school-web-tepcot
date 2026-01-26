<template>
  <div class="container mx-auto">
    <slot></slot>
    <div v-if="isShowAboutUs">
      <div class="content indent-8 grid gap-8 items-center">
        <div>
          <div class="text-24 mt-4 md:pt-8 pb-4 leading-normal " v-html="content"></div>
        </div>
      </div>

      <div id="vision" class="grid grid-cols-2 gap-4 items-center pt-20 pb-16">
        <div class="item h-[450px] bg-cover bg-center rounded-2xl w-full"
          :style="`background-image: url(${visionImage});`"></div>
        <div class="item text-center">
          <h2 class="text-44 md:text-54 font-bold capitalize leading-none">
            {{ visionTopic }}
          </h2>
          <div class="desc text-24 px-4 md:px-8 py-2 text-a-gray-696F6F">
            <span v-html="visionDesc"></span>
          </div>
        </div>
      </div>
      <div id="philosophy" class="grid grid-cols-2 gap-4 items-center pb-20">
        <div class="item ">
          <h2 class="text-44 md:text-54 font-bold capitalize leading-none text-center">
            {{ philoTopic }}
          </h2>
          <div class="desc text-24 px-4 md:px-8 py-2 text-a-gray-696F6F">
            <span v-html="philoDesc"></span>
          </div>
        </div>
        <div class="item h-[450px] bg-cover bg-center rounded-2xl" :style="`background-image: url(${philoImage});`">
          &nbsp;
        </div>
      </div>
    </div>
  </div>
  <div id="mission" class="py-20 px-10 bg-slate-50">
    <div id="mission-info" class="grid grid-cols-2 gap-4 items-center container mx-auto">
      <div class="item flex justify-center items-center">
           <img src="/../image/1-CE-UTCC-2-min.png"  alt="logo cce" class="w-96 mx-auto duration-700"/>
        <!-- <img :src="missionImage" alt="" class="drop-shadow-lg rounded-full w-96" /> -->
      </div>
      <div class="desc item pl-4">
        <h4 class="text-44 md:text-54 capitalize pl-4">
          {{ missionTopic }}
        </h4>
        <ol class="decimal text-24 pl-8">
          <li v-for="(item, index) in missionList" :key="index">
            {{ item.text }}
          </li>
        </ol>
        <div v-if="objective" class="mt-4">
          <h4 class="text-44 md:text-54 capitalize pl-4">
            {{ objective.label }}
          </h4>
          <ol class="decimal text-24 pl-8">
            <li v-for="(item, index) in objective.value" :key="index">
              {{ item.text }}
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>

  <WhyUsSection :topic="whyusTopic" :itemList="whyusList" :desc="whyusDesc" :image="whyusImage" />
</template>

<script>
import { ref } from "vue";
import { useTranslations } from "../../i18n/utils";
// components
import WhyUsSection from "../WhyUs/WhyUsSection.vue";
// import Timeline from "./Timeline.vue";

export default {
  name: "AboutUsDetail",
  components: {
    WhyUsSection
  },
  props: {
    lang: { type: String, default: "en" },
    isShowAboutUs: { type: Boolean, default: true },
  },
  setup(props, ctx) {
    const t = useTranslations(props.lang);
    const items = ref("null");
    const uri_aboutus = import.meta.env.PUBLIC_API_WP_ABOUTUS;
    const content = ref("");
    const visionTopic = ref("");
    const visionDesc = ref("");
    const visionImage = ref("");

    const philoTopic = ref("");
    const philoDesc = ref("");
    const philoImage = ref("");

    const missionTopic = ref("");
    const missionList = ref([]);
    const missionImage = ref("");

    const whyusTopic = ref("");
    const whyusDesc = ref("");
    const whyusList = ref([]);
    const whyusImage = ref("");
    const time_line = ref([]);
    const identity = ref("");
    const yearSince = ref("");
    const colorSchool = ref("");
    const imageSchool = ref("");
    const objective = ref(null);

    const fetchData = async () => {
      await fetch(
        `${uri_aboutus}`,
        { mode: "cors" },
        { credentials: "include" }
      )
        .then((response) => response.json())
        .then((data) => initialData(data))
        .catch((error) =>
          console.error("Error fetching About page data:", error)
        );
    };

    const initialData = (data) => {
      if (props.lang) {
        let temp = {
          title:
            "quam viverra orci sagittis eu volutpat odio facilisis mauris sit",
          subtitle:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae aliquet nec ullamcorper sit amet. Ornare lectus sit amet est placerat in egestas erat imperdiet. Cras pulvinar mattis nunc sed blandit libero volutpat. Volutpat diam ut venenatis tellus in. Hac habitasse platea dictumst quisque sagittis. Lacinia quis vel eros donec ac odio tempor. Dolor sit amet consectetur adipiscing. Arcu cursus euismod quis viverra nibh cras pulvinar mattis. Neque viverra justo nec ultrices dui sapien eget. Eget sit amet tellus cras. Mattis aliquam faucibus purus in massa tempor nec feugiat. Venenatis urna cursus eget nunc scelerisque viverra mauris in. Arcu risus quis varius quam. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Eu sem integer vitae justo eget magna fermentum iaculis. Laoreet sit amet cursus sit amet dictum sit amet justo.",
          vision: {
            label: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            text: "quam viverra orci sagittis eu volutpat odio facilisis mauris sit",
            image: false,
          },
          philo: {
            label: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            text: "quam viverra orci sagittis eu volutpat odio facilisis mauris sit",
            image: false,
          },
          mission: {
            label: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            value: [],
            image: false,
          },
          whyus: {
            label: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            text: "quam viverra orci sagittis eu volutpat odio facilisis mauris sit",
            value: [],
            image: false,
          },
        };
        temp = props.lang == "th" ? data.th : data.en;
        content.value = temp.content;

        visionTopic.value = temp.vision.label;
        visionDesc.value = temp.vision.text;
        visionImage.value = temp.vision.image;

        philoTopic.value = temp.philo.label;
        philoDesc.value = temp.philo.text;
        philoImage.value = temp.philo.image;

        missionTopic.value = temp.mission.label;
        // console.log('temp.mission.value ...',temp.mission.value);
        missionList.value = temp.mission.value;
        missionImage.value = temp.mission.image;

        whyusTopic.value = temp.whyus.label;
        whyusDesc.value = temp.whyus.text;
        whyusList.value = temp.whyus.value;
        whyusImage.value = temp.whyus.image;
        // time_line.value = temp.time_line
        // identity.value = temp.identity
        // yearSince.value = temp.identity.year_since
        // colorSchool.value = temp.identity.color
        // imageSchool.value = temp.identity.symbol
        // objective.value = temp.objective

      }
    };
    fetchData();
    
    return {
      t,
      content,
      visionTopic,
      visionDesc,
      visionImage,
      philoTopic,
      philoDesc,
      philoImage,
      missionTopic,
      missionList,
      missionImage,
      whyusTopic,
      whyusDesc,
      whyusList,
      whyusImage,
      time_line,
      identity,
      yearSince,
      colorSchool,
      imageSchool,
      objective
    };
  },
};
</script>

<style scoped>
@import "../../styles/global.css";

a:hover {
  color: var(--secondary);
  text-decoration: underline;
}

.content a {
  color: var(--secondary);
}

.menu li a {
  color: var(--primary);
  padding: 4px 12px;
  align-items: center;
  border-radius: 22px;
  margin: 0 0.25rem;
}

/* .menu li a:hover {
   background-color: var(--blue-light3);
  } */
.slides {
  -ms-overflow-style: none;
  /* Internet Explorer 10+ */
  scrollbar-width: none;
  /* Firefox */
}

.slides::-webkit-scrollbar {
  display: none;
  /* Safari and Chrome */
}

.tab {
  color: var(--accent-dark);
  font-size: 2.25rem;
}

.tabs-lifted>.tab {
  min-width: 240px;
  height: 80px;
}

.tabs-lifted>.tab:is(input:checked) {
  background-color: var(--accent-dark);
  border-bottom-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  color: white;
}

.tab-content {
  border-color: transparent;
  border-width: 0;
}

.tabs-lifted>.tab.tab-active:not(.tab-disabled):not([disabled]),
.tabs-lifted>.tab:is(input:checked) {
  border-width: 0;
}



ol.decimal {
  list-style: decimal;
}

.btn:hover,
.btn-active {
  color: #ffffff !important;
}

@media only screen and (max-width: 767px) {
  .is-desktop {
    display: none;
  }

  button {
    font-size: 20px;
  }

  .btn {
    height: 2rem;
  }

  .content {
    padding: 0 1rem;
    text-indent: 2rem;
    /* text-align: justify; */
  }

  .item {
    padding: 2rem 0;
  }

  #vision,
  #philosophy,
  #mission-info {
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    margin: 2rem 0;
  }

  #vision div.item:nth-child(1) {
    width: 100%;
    height: 403px;
  }

  #philosophy div.item:nth-child(2) {
    order: 1;
    width: 100%;
    height: 403px;
  }

  #philosophy div.item:nth-child(1) {
    order: 2;
  }

  #mission {
    padding: 2.5rem 0;
  }

  #mission h2 {
    font-size: 42px;
  }

  ol.decimal {
    margin-top: 1rem;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .is-desktop {
    display: none;
  }

  button {
    font-size: 20px;
  }

  .btn {
    height: 2rem;
  }

  .content {
    padding: 0 1rem;
    text-indent: 2rem;
    /* text-align: justify; */
  }

  .item {
    padding: 2rem 0;
  }

  #vision,
  #philosophy,
  #mission-info {
    display: flex;
    flex-direction: column;
    padding: .5rem  0;
    margin: 2rem 0;
  }

  #vision div.item:nth-child(1) {
    width: 100%;
    height: 403px;
  }

  #vision .desc,
  #philosophy .desc {
    padding: .5rem  0;
  }

  #philosophy div.item:nth-child(2) {
    order: 1;
    width: 100%;
    height: 403px;
  }

  #philosophy div.item:nth-child(1) {
    order: 2;
  }

  #mission {
    padding: 2.5rem 0;
  }

  #mission h2 {
    font-size: 42px;
  }

  ol.decimal {
    margin-top: 1rem;
  }
}
</style>
