<template>
  <div class="container mx-auto">
    <slot></slot>
    <div v-if="isShowAboutUs">
      <div class="content indent-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start pt-20">
        <div class=" col-span-2 bg-slate-100/80 p-6 rounded-2xl shadow-sm h-full">
          <div v-for="(paragraph, index) in contentParagraphs" :key="index" class="text-20 md:text-24 text-slate-700 font-light py-4">
            <label>{{ paragraph }}</label>
          </div>
          <div>

          </div>
        </div>
        <div class="h-full flex justify-center items-center p-4 bg-slate-50 rounded-2xl shadow-sm">
          <img src="/../image/logo-tepcost.jpg" alt="about us image" class="w-[66%] h-full mx-auto my-auto" loading="lazy" />
        </div>
      </div>

       <PartnerSection  />

      <div class="grid grid-cols-2  gap-8">
      <div class="py-10">
        <h2 class="text-36 md:text-44 font-bold capitalize underline">
          {{ keyFeatures?.topic }}
        </h2>
        <ul class="list-inside list-disc mt-8 text-slate-700 font-light ">
          <li v-for="(item, index) in keyFeatures?.list" :key="index" class="text-24 px-8 py-4">
            {{ item }}
          </li>
        </ul>
      </div>

      <div class="py-10">
        <h2 class="text-36 md:text-44 font-bold capitalize underline">
          {{ objectives?.label }}
        </h2>
        <ul class="list-inside list-disc mt-8 text-slate-700 font-light ">
          <li v-for="(item, index) in objectives?.value" :key="index" class="text-24 px-8 py-1">
            {{ item.text }}
          </li>
        </ul>
      </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 py-20">
      <div class="p-10  bg-[#FAFAFF] rounded-2xl shadow-sm">
        <h2 class="text-36 md:text-44 font-bold capitalize underline">
          {{ participantsProfile?.topic }}
        </h2>
        <div class="text-20 md:text-24  py-4 text-slate-700 font-light ">
          <label>{{ participantsProfile?.desc }}</label>
        </div>
        <ul class="list-inside list-disc text-slate-700 font-light ">
          <li v-for="(item, index) in participantsProfile?.list" :key="index" class="text-24 px-8 py-1">
            {{ item }}
          </li>
        </ul>
      </div>
      <div>
        <DonutChart  />
      </div>
      </div>

       <div class="mt-10 flex flex-col items-center bg-blue-200/10 p-10 md:p-20 rounded-xl">
        <h3 class="text-24 md:text-44 text-center opacity-75" > วีดีโอแนะนำหลักสูตรผู้บริหารระดับสูงด้านการค้าและการพาณิชย์ </h3>
        <h2 class="text-36 md:text-54 mb-4 text-center"> TEPCoT 17 Be TEPCoT Family 2025 </h2>
        <div class="w-full md:w-[888px] h-56 md:h-[555px] rounded-xl overflow-hidden shadow-lg mx-auto">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/kPTiFWRAg-Q?si=xJk7FwXn3Ppt96Th?rel=0&autoplay=1&mute=1"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen>
          </iframe>
        </div>
      </div>


      <div class="py-10">
        <h3 class="text-44 md:text-54 text-gradient-blue font-bold capitalize  max-w-5xl mx-auto text-center">
          "{{ outro }}"
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useTranslations } from "../../i18n/utils";
// components
import WhyUsSection from "../WhyUs/WhyUsSection.vue";
import PartnerSection from "../Partner/PartnerSection.vue";
import DonutChart from "../charts/DonutChart.vue";
// import Timeline from "./Timeline.vue";

export default {
  name: "AboutUsDetail",
  components: {
    WhyUsSection,
    PartnerSection,
    DonutChart
  },
  props: {
    lang: { type: String, default: "en" },
    isShowAboutUs: { type: Boolean, default: true },
  },
  setup(props, ctx) {
    const contentParagraphs = ref([
      "TEPCoT คือหลักสูตรผู้บริหารระดับสูงด้านการค้าและการพาณิชย์ ที่พัฒนาขึ้นเพื่อสร้างผู้นำที่มีวิสัยทัศน์ต่อเศรษฐกิจไทยและเวทีการค้าโลก โดยผสานองค์ความรู้ด้านธุรกิจ นโยบายสาธารณะ และเครือข่ายผู้กำหนดทิศทางประเทศไว้ในพื้นที่การเรียนรู้เดียวกัน",
      "หลักสูตรนี้ไม่ได้มุ่งเน้นเพียงการเรียนในห้องเรียน แต่เป็น \“เวทีของผู้นำ\” ที่เปิดโอกาสให้ผู้บริหารจากภาครัฐ เอกชน และวิชาชีพ ได้แลกเปลี่ยนประสบการณ์จริง เชื่อมโยงมุมมองเชิงยุทธศาสตร์ และร่วมกันสร้างแนวคิดที่สามารถนำไปใช้ได้จริงในระดับองค์กรและระดับประเทศ",
      "TEPCoT จึงเป็นทั้งพื้นที่ของการเรียนรู้ และพื้นที่ของการเชื่อมพลังเครือข่ายผู้นำที่มีบทบาทต่อระบบเศรษฐกิจไทยในระยะยาว"
    ]);

    const keyFeatures = ref({
      topic: "จุดเด่นของหลักสูตร TEPCoT",
      list: [
        "เป็นหลักสูตรที่เกิดจากความร่วมมือกันระหว่าง กระทรวงพาณิชย์ กับ หอการค้าไทย ซึ่งเป็นองค์กรที่มีความเชี่ยวชาญในแวดวงการค้าและการพาณิชย์มายาวนาน และมหาวิทยาลัยหอการค้าไทย ต่อมากระทรวงอุตสาหกรรม กระทรวงการคลัง และกระทรวงมหาดไทย เล็งเห็นถึงความสำคัญของหลักสูตรฯ จึงได้เข้ามามีส่วนร่วมในการพัฒนาและดำเนินการหลักสูตร TEPCoT จึงนับเป็นความร่วมมืออย่างลงตัวของ 6 องค์กร",
        "เป็นหลักสูตรที่เน้นกระบวนการแลกเปลี่ยนความรู้และวิสัยทัศน์ เรียนรู้จากประสบการณ์จริง จากผู้บริหารและผู้ประกอบการที่เป็นที่ยอมรับอย่างกว้างขวาง ทั้งด้านเศรษฐกิจ การค้า และการลงทุน",
        "เป็นหลักสูตรที่สามารถเสริมสร้างเครือข่ายความสัมพันธ์ด้านการค้าและการพาณิชย์ ระหว่างผู้บริหารระดับสูงในภาคส่วนต่าง ๆ",
      ]
    });



    const  objectives = ref({
      label: "วัตถุประสงค์ของหลักสูตร",
      value: [
        { text: "เพื่อพัฒนาผู้นำด้านการค้าและการพาณิชย์ให้มีความรู้ ความสามารถ และเครือข่ายที่จำเป็นต่อการขับเคลื่อนเศรษฐกิจไทย" },
        { text: "เพื่อเสริมสร้างองค์ความรู้เชิงยุทธศาสตร์ด้านเศรษฐกิจ การค้า และการบริหาร" },
        { text: "เพื่อพัฒนาศักยภาพผู้นำในการตัดสินใจระดับองค์กรและระดับนโยบาย" },
        { text: "เพื่อเชื่อมโยงเครือข่ายผู้บริหารจากหลากหลายภาคส่วน" },
        { text: "เพื่อส่งเสริมการแลกเปลี่ยนประสบการณ์และแนวปฏิบัติที่ดีระหว่างผู้บริหาร" }
      ]
    });


    const learningApproach = ref({
      topic: "รูปแบบการเรียนรู้ (Learning Approach)",
      desc: "การเรียนรู้ในหลักสูตรมุ่งเน้นการมีส่วนร่วมและการแลกเปลี่ยนประสบการณ์ของผู้บริหาร ผ่านรูปแบบที่หลากหลาย อาทิ",
      list: [
        "การบรรยายและสัมมนา (Lectures & Seminars): โดยผู้เชี่ยวชาญและผู้นำในวงการต่างๆ",
        "การวิเคราะห์กรณีศึกษา (Case Analysis): ฝึกทักษะการวิเคราะห์และแก้ไขปัญหาทางธุรกิจ",
        "การเสวนาและแลกเปลี่ยนมุมมองระดับผู้บริหาร (Executive Forums): เปิดโอกาสให้ผู้บริหารได้แลกเปลี่ยนประสบการณ์และแนวปฏิบัติที่ดี",
        "การเรียนรู้เชิงนโยบายและเศรษฐกิจ (Policy & Economic Learning): เข้าใจบริบทเศรษฐกิจและนโยบายที่มีผลต่อการค้าและการพาณิชย์",
        "การสร้างเครือข่ายความร่วมมือระหว่างผู้เข้าร่วมหลักสูตร (Networking Opportunities): ส่งเสริมการสร้างความสัมพันธ์ระหว่างผู้บริหารจากหลากหลายภาคส่วน"
      ]
    });

    const exucutiveNetwork = ref({
      topic: "เครือข่ายผู้บริหาร (Executive Network)",
      desc: "ผู้เข้าร่วมหลักสูตร TEPCoT ประกอบด้วยผู้บริหารจากหลายภาคส่วน ได้แก่",
      list: [
        "ภาครัฐ",
        "ภาคธุรกิจและอุตสาหกรรม",
        "องค์กรวิชาชีพ",
        "หน่วยงานด้านเศรษฐกิจและการค้า",
        "ความหลากหลายของผู้เข้าร่วมช่วยสร้างมุมมองที่รอบด้าน และก่อให้เกิดเครือข่ายความร่วมมือที่มีบทบาทต่อการพัฒนาประเทศในระยะยาว"
      ]
    });

    const participantsProfile = ref({
      topic: "Executive Profile of Participants",
      desc: "ผู้เข้าร่วมหลักสูตรผู้บริหารระดับสูงด้านการค้าและการพาณิชย์ เครือข่ายผู้เข้าร่วมหลักสูตรประกอบด้วยผู้นำองค์กรระดับประเทศ ซึ่งมีบทบาทโดยตรงต่อการกำหนดนโยบาย การขับเคลื่อนเศรษฐกิจ และการบริหารองค์กรขนาดใหญ่",
      list: [
        "อดีตรัฐมนตรี และผู้ดำรงตำแหน่งระดับนโยบาย",
        "ประธานกรรมการ และรองประธานกรรมการองค์กรด้านเศรษฐกิจระดับประเทศ",
        "ผู้บริหารระดับปลัดกระทรวงและรองปลัดกระทรวง",
        "ผู้บริหารสถาบันอุดมศึกษา เช่น อธิการบดี รองอธิการบดี และคณบดี",
        "ผู้นำองค์กรด้านตลาดทุนและภาคอุตสาหกรรม",
        "ผู้บริหารระดับสูงในกระบวนการยุติธรรม",
        "ผู้บริหารองค์กรส่งเสริมการลงทุนและเศรษฐกิจของประเทศ",
        "ประธานกรรมการ และผู้บริหารระดับสูงในบริษัทเอกชน",
        "ผู้บริหารระดับสูงในกองทัพและสำนักงานตำรวจแห่งชาติ"
      ],
      outro: "ความหลากหลายของผู้เข้าร่วมในระดับผู้นำองค์กรและระดับนโยบาย ทำให้หลักสูตรเป็นเวทีแลกเปลี่ยนมุมมองเชิงยุทธศาสตร์ที่มีความลึก และก่อให้เกิดเครือข่ายความร่วมมือที่มีผลต่อการพัฒนาเศรษฐกิจของประเทศในระยะยาว"
    });

    const kpiCards = ref([
      {
        title: "ภาคราชการ – รัฐวิสาหกิจ",
        value: "35"
      },
      {
        title: "ภาคเอกชน – ธุรกิจและอุตสาหกรรม",
        value: "57"
      },
      {
        title: "สถาบันการศึกษา",
        value: "5"
      },
      {
        title: "อื่น ๆ",
        value: "3"
      }
    ]);

    const impact = ref({
      topic: "ผลลัพธ์ที่คาดหวัง (Expected Impact)",
      desc: "หลังจากสำเร็จหลักสูตร TEPCoT ผู้เข้าร่วมจะมีความสามารถในการ",
      list: [
        "มองภาพเศรษฐกิจและการค้าในระดับโครงสร้าง",
        "ดสินใจเชิงยุทธศาสตร์ได้อย่างมีประสิทธิภาพ",
        "เชื่อมโยงความร่วมมือระหว่างองค์กรและภาคส่วนต่าง ๆ",
        "สร้างแนวคิดและโครงการที่เกิดผลจริงต่อเศรษฐกิจและสังคม"
      ]
    });

    const  outro = ref("หลักสูตรดำเนินการโดยมหาวิทยาลัยหอการค้าไทย ร่วมกับเครือข่ายภาคธุรกิจและองค์กรที่เกี่ยวข้อง เพื่อพัฒนาผู้นำที่มีบทบาทสำคัญต่อการขับเคลื่อนเศรษฐกิจและการค้าของประเทศ");
    const  cta =  ref({
      topic: "สอบถามข้อมูลเกี่ยวกับหลักสูตร TEPCoT",
      desc: "ทีมงานพร้อมให้ข้อมูลและคำแนะนำสำหรับผู้บริหารที่สนใจเข้าร่วมหลักสูตรอย่างเหมาะสมตามบทบาทและประสบการณ์",
      link: "/contact-us"
    })

    return {
      contentParagraphs,
      keyFeatures,
      objectives,
      learningApproach,
      exucutiveNetwork,
      participantsProfile,
      kpiCards,
      impact,
      outro,
      cta

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
