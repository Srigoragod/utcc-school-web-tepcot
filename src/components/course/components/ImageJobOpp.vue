<template>
  <div class="is-desktop grid lg:grid-cols-2 items-center my-8">
    <div>
      <SwiperEtc :items="data.image" :customHeight="'900px'"></SwiperEtc>
    </div>

    <div class="div-info px-4 md:px-8 pt-8 relative bg-a-yellow-CFECFF h-[885px]">
      <div>
        <h4 :class="isSliceSubject  ? 'text-24' : 'text-24 md:text-30'" class="text-24 uppercas mb-4 text-a-blue-021430">{{ data.subjects.label }}</h4>
        <div v-if="isSliceSubject" class="grid grid-cols-2 gap-4 text-20">
          <ul v-for="(el,indexI) in subjectListCustom" :key="indexI">
            <li
              v-for="(item, indexII) in el"
              :key="indexII"
              v-html="item.text"
            ></li>
          </ul>
        </div>
        <div v-else>
          <ul class="text-20 md:text-24">
            <li
              v-for="(item, index) in subjectList"
              :key="index"
              v-html="item.text"
            ></li>
          </ul>
        </div>
      </div>
      <div class="mt-4">
        <h4 :class="isSliceJopOpp  ? 'text-24' : 'text-24 md:text-30'" class="uppercas mb-4 text-a-blue-021430">{{ data.job_opp.label }}</h4>
        <div v-if="isSliceJopOpp" class="grid grid-cols-2 gap-4 text-20">
          <ul v-for="(el,indexI) in jobOppListCustom" :key="indexI">
            <li
              v-for="(item, indexII) in el"
              :key="indexII"
              v-html="item.text"
            ></li>
          </ul>
        </div>
        <div v-else>
          <ul class="text-20 md:text-24">
            <li
              v-for="(item, index) in jobOppList"
              :key="index"
              v-html="item.text"
            ></li>
          </ul>
        </div>
      </div>

      <div v-if="items.pdf" class="absolute z-[9]">
        <!-- <ButtonDownload :fileDownload="`${items.pdf}`" > -->
          <a :href="`${items.pdf}`" target="_blank" v-if="items.pdf">
          <button class="mt-8 w-[250px]">
            <img
              src="/image/btn-download.svg"
              alt="ดาวน์โหลดเอกสารเพิ่มเติม"
            />
          </button>
          </a>
        <!-- </ButtonDownload> -->
      </div>
      <img
        class="absolute z-[1] bottom-0 right-0 w-[66%]"
        src="/image/CE-min.svg"
        alt="ce"
      />
    </div>
  </div>

  <div class="container-tablet is-mobile pt-16">
    <div class="container pt-4 px-4 mx-auto md:h-[458.89px] bg-a-yellow-CFECFF ">
      <SwiperEtc :items="data.image" :customHeight="'459px'"></SwiperEtc>
    </div>
    <div class="content-tablet px-4 pb-32 bg-a-blue-030e62">
      <div
        class="bg-a-yellow-CFECFF site-icon container mx-auto w-full rounded-b-box"
      >
        <div class=""></div>
        <div
          class="div-info px-4 py-10 bg-a-yellow-CFECFF rounded-b-box relative"
        >
          <div>
            <h4 class="text-24 md:text-30 uppercas text-a-blue-021430">{{ data.subjects.label }}</h4>
            <ul class="text-20 md:text-24">
              <li v-for="(item, index) in data.subjects.value" :key="index">
                {{ item.text }}
              </li>
            </ul>
          </div>
          <div class="mt-10">
            <h4 class="text-24 md:text-30 uppercas text-a-blue-021430">{{ data.job_opp.label }}</h4>
            <ul class="text-20 md:text-24">
              <li v-for="(item, index) in data.job_opp.value" :key="index">
                {{ item.text }}
              </li>
            </ul>
          </div>
          <div class="flex justify-center" v-if="items.pdf">
            <a :href="`${items.pdf}`" target="_blank" v-if="items.pdf">
              <!-- <ButtonDownload :fileDownload="`${items.pdf}`" > -->
              <button class="mt-8 w-[250px]">
                <img
                  src="/image/btn-download.svg"
                  alt="ดาวน์โหลดเอกสารเพิ่มเติม"
                />
              </button>
              <!-- </ButtonDownload> -->
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
// components
import SwiperEtc from "../../SlideShow/SwiperEtc.vue";
import ButtonDownload from "../../Button/ButtonDownload.vue";

export default defineComponent({
  name: "ImageJobOop",
  components: {
    SwiperEtc,
    ButtonDownload
  },
  props: {
    items: { type: Object, require: true },
  },
  setup(props, ctx) {
    const data = ref(null);
    const subjectList = ref(props.items.subjects.value);
    const subjectListCustom = ref([]);
    const isSliceSubject = ref(false);
    const jobOppList =ref(props.items.job_opp.value)
    const jobOppListCustom = ref([]);
    const isSliceJopOpp = ref(false);
    const clickPdf = (val) => {
      location = val;
      target = "_blank";
    };
    const initialData = () => {
      data.value = props.items;

      if (subjectList.value && subjectList.value.length > 12) {
        isSliceSubject.value = true;
        subjectListCustom.value = dividedArray(subjectList.value);
      }

      if(jobOppList.value && jobOppList.value.length >12){
        isSliceJopOpp.value = true;
        jobOppListCustom.value = dividedArray(jobOppList.value);
      }

    };
    const dividedArray = (items) => {
      items.sort((a, b) => a.text.localeCompare(b.text, "th"));
      const setSize = 12;
      const dividedArray = [];
      for (let i = 0; i < items.length; i += setSize) {
        dividedArray.push(items.slice(i, i + setSize));
      }
      return dividedArray;
    };
    initialData();
    return {
      data,
      clickPdf,
      subjectList,
      isSliceSubject,
      subjectListCustom,
      jobOppList,
      isSliceJopOpp,
      jobOppListCustom
    };
  },
});
</script>
<style></style>

<style scoped>
@import "../../../styles/global.css";

a.custom-link {
  color: #030e62 !important;
}

ul {
  list-style-type: disc;
  list-style-position: outside;
  margin-left: 1rem;
  font-weight: 300;
}
/* .div-info::before {
  content: "";
  background-image: url(/image/TS.png);
  position: absolute;
  z-index: 10;
  bottom: 0;
} */

@media only screen and (max-width: 767px) {
  .is-desktop {
    display: none;
  }

  ul {
    margin-left: 2rem;
  }
}
@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .is-desktop {
    display: none;
  }
}
@media only screen and (min-width: 1024px) {
  .is-mobile {
    display: none;
  }
}
</style>
