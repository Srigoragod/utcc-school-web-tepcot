<template>
  
  <div class="is-desktop grid lg:grid-cols-2 items-center bg-gradient-to-b md:bg-gradient-to-br from-[#000000] to-[#04105d]">
    <div>
      <SwiperEtc :items="data.image" :customHeight="''"></SwiperEtc>
    </div>

    <div class="div-info px-4 md:px-8 p-10  relative bg-gradient-to-b md:bg-gradient-to-br from-[#000000] to-[#04105d] text-white h-[885px] pb-40 overflow-y-scroll">
         <!-- <div class="text-44 font-semibold">{{ timetable.title }}</div>
          <p class="text-20 font-light mt-4 mb-8">{{ timetable.note }}</p>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="(item, index) in timetable.items" :key="index" class="flex flex-col">
              <div class="text-24 font-light">{{ item.label }}</div>
              <div class="text-30 font-semibold text-a-gold-F0C571">{{ item.value }}</div>
             </div>
          </div> -->

          <div class="mt-12">
            <div class="text-44 font-semibold">{{ applySteps.title }}</div>
            <p class="text-24 font-light mt-4 mb-8">{{ applySteps.subtitle }}</p>
            <div class="space-y-6">
              <div v-for="(step, index) in applySteps.steps" :key="index" class="flex items-start gap-4">
                <div class="text-30 font-bold text-a-gold-F0C571">{{ step.no }}</div>
                <div>
                  <div class="text-24 font-semibold">{{ step.title }}</div>
                  <p class="text-24 font-light mt-1">{{ step.desc }}</p>
                </div>
              </div>
            </div>

            <div class="mt-12 flex flex-col sm:flex-row gap-4">
              <a v-for="(cta, index) in applySteps.ctas" :key="index" :href="cta.href" target="_blank" class="px-6 py-3 bg-a-gold-F0C571 text-white rounded hover:bg-a-gold-F0C571/80 transition text-center text-24">
                {{ cta.label }}
              </a>
            </div>

            <!-- <div class="mt-12">
              <div class="text-44 font-semibold">คุณสมบัติผู้สมัคร</div>
              <div class="grid grid-cols-2 gap-4 mt-6">
                <div v-for="(req, index) in applySteps.reqs" :key="index" class="flex flex-col">
                  <div class="text-24 font-light">{{ req.label }}</div>
                  <div class="text-30 font-semibold text-a-gold-F0C571">{{ req.value }}</div>
                </div>
              </div>
            </div> -->
          </div>
    </div>
  </div>

  <div class="container-tablet is-mobile pt-16">
    <div class="container pt-4 px-4 mx-auto md:h-[458.89px]bg-gradient-to-b md:bg-gradient-to-br from-[#000000] to-[#04105d] text-white ">
      <SwiperEtc :items="data.image" :customHeight="'459px'"></SwiperEtc>
    </div>
    <div class="content-tablet px-4 pb-32 bg-a-blue-030e62">

    </div>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
// components
import SwiperEtc from "../../SlideShow/SwiperEtc.vue";

export default defineComponent({
  name: "ImageJobOop",
  components: {
    SwiperEtc
  },
  props: {
    items: { type: Object, require: true },
  },
  setup(props, ctx) {
    const data = ref(null);
    const timetable = ref({
    title: 'กำหนดการเรียน (ตัวอย่าง)',
    note:
      'กำหนดการอาจมีการปรับตามรุ่น/วิทยากร โปรดติดต่อทีมงานเพื่อรับตารางล่าสุด',
    items: [
      { label: 'ระยะเวลา', value: '6 เดือน (24 สัปดาห์)' },
      { label: 'วันเรียน', value: 'พฤหัสบดี–เสาร์ (ตามรอบที่กำหนด)' },
      { label: 'เวลาเรียน', value: '09:00–17:00 น.' },
      { label: 'ความถี่', value: 'ประมาณ 2 ครั้ง/เดือน (รวม ~12 ครั้ง)' },
      { label: 'ชั่วโมงเรียนรวม', value: 'ประมาณ 144 ชั่วโมง' },
      { label: 'Company Visit', value: '2 ครั้ง ระหว่างหลักสูตร' },
      { label: 'Capstone Presentation', value: 'สัปดาห์ท้ายของหลักสูตร' }
    ]
  });

  const applySteps = ref({
    title: 'วิธีรับสมัครเรียน TEPCoT',
    subtitle:
      'ขั้นตอนกระชับ เหมาะกับผู้บริหาร—สมัครได้รวดเร็ว และสามารถนัดพูดคุยเพื่อประเมินความเหมาะสมก่อนสมัคร',
    steps: [
      {
        no: '01',
        title: 'ส่งข้อมูลเบื้องต้น',
        desc: 'กรอกฟอร์มสมัคร/สนใจหลักสูตร พร้อมข้อมูลติดต่อและประสบการณ์โดยสังเขป'
      },
      {
        no: '02',
        title: 'รับคำแนะนำจากทีมหลักสูตร',
        desc: 'ทีมงานติดต่อกลับเพื่อให้รายละเอียด กำหนดการ ค่าใช้จ่าย และตอบคำถามที่เกี่ยวข้อง'
      },
      {
        no: '03',
        title: 'ยืนยันสิทธิ์และเอกสารประกอบ',
        desc: 'ส่งเอกสารตามที่แจ้ง (เช่น ประวัติย่อ/หนังสือรับรอง หากมี) เพื่อดำเนินการยืนยันสิทธิ์'
      },
      {
        no: '04',
        title: 'ชำระค่าลงทะเบียน/ยืนยันการเข้าร่วม',
        desc: 'ชำระตามช่องทางที่กำหนด และรับเอกสารยืนยัน + ตารางเรียนฉบับเต็ม'
      }
    ],
    ctas: [
      { label: 'สมัครเข้าร่วมหลักสูตร', href: '/apply' },
      { label: 'ขอ Brochure & ตารางเรียน', href: '/brochure' }
    ],
    reqs: [
      { label: 'กลุ่มเป้าหมาย', value: 'ผู้บริหารระดับสูง/เจ้าของกิจการ/ผู้นำองค์กร' },
      { label: 'คุณสมบัติแนะนำ', value: 'มีประสบการณ์บริหารหรือบทบาทตัดสินใจในองค์กร' },
      { label: 'เอกสารที่มักใช้', value: 'ข้อมูลส่วนตัว + ประวัติย่อ (ถ้ามี) + ช่องทางติดต่อ' }
    ]
  });
    // const subjectList = ref(props.items.subjects.value);
    // const subjectListCustom = ref([]);
    // const isSliceSubject = ref(false);
    // const jobOppList =ref(props.items.job_opp.value)
    // const jobOppListCustom = ref([]);
    // const isSliceJopOpp = ref(false);
    const clickPdf = (val) => {
      location = val;
      target = "_blank";
    };
    const initialData = () => {
      data.value = props.items;

      // if (subjectList.value && subjectList.value.length > 12) {
      //   isSliceSubject.value = true;
      //   subjectListCustom.value = dividedArray(subjectList.value);
      // }

      // if(jobOppList.value && jobOppList.value.length >12){
      //   isSliceJopOpp.value = true;
      //   jobOppListCustom.value = dividedArray(jobOppList.value);
      // }

    };
    // const dividedArray = (items) => {
    //   items.sort((a, b) => a.text.localeCompare(b.text, "th"));
    //   const setSize = 12;
    //   const dividedArray = [];
    //   for (let i = 0; i < items.length; i += setSize) {
    //     dividedArray.push(items.slice(i, i + setSize));
    //   }
    //   return dividedArray;
    // };
    initialData();
    return {
      data,
      timetable,
      applySteps,
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
