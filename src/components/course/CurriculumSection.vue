<template>
  <section id="curriculum" class="relative bg-white py-16 md:py-40">
    <div class="container mx-auto px-4 md:px-0">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <!-- Left -->
        <div class="lg:col-span-8">
          <Eyebrow class="bg-blue-900 text-white px-2 mb-2" :text="'Curriculum'" />
          <h2 class="mt-4 text-gradient-blue text-36 sm:text-44 font-semibold ">
            {{ title }}
          </h2>

          <p v-if="subtitle" class="text-20 md:text-30 font-bold my-2">
            {{ subtitle }}
          </p>

          <div class="mt-6 space-y-4 text-20 md:text-24 font-light">
            <p
              v-for="(p, idx) in paragraphs"
              :key="idx"
              class="text-slate-700"
            >
              {{ p }}
            </p>
          </div>

          <!-- Highlights -->
          <div v-if="highlights.length" class="grid grid-cols-1 gap-4">
            <div  v-for="(h, i) in highlights" :key="i" class="border-l-4 border-blue-950 rounded-r-lg  bg-white p-5 transition duration-300 shadow-lg hover:shadow-xl shadow-blue-500/5 hover:shadow-blue-500/5">
              <h3 class="text-24 md:text-30 font-bold text-blue-900">
                {{ h.title }}
              </h3>
              <p class="mt-2 text-20 md:text-24  text-slate-600">
                {{ h.desc }}
              </p>
            </div>
          </div>
        </div>

        <!-- Right: Sticky Panel -->
        <aside class="lg:col-span-4 relative">
          <div
            class="lg:sticky lg:top-24 rounded-[28px] overflow-hidden  bg-[#071F52] text-white shadow-xl shadow-black/10"
          >
            <!-- Panel header -->
            <div class="relative px-6 py-6">
              <div class="absolute inset-0 bg-gradient-to-br from-[#0A2E73] via-[#071F52] to-black/20"></div>
              <div class="relative">
                <p class="text-xs uppercase tracking-widest text-white/70">Key information</p>
                <p class="mt-2 text-xl font-semibold">ข้อมูลสำคัญของโปรแกรม</p>
              </div>
            </div>

            <!-- Facts -->
            <div class="px-6 pb-6">
              <ul class="space-y-3">
                <li
                  v-for="(f, i) in facts"
                  :key="i"
                  class="flex items-start gap-3 rounded-2xl bg-white/8 p-4 backdrop-blur"
                >
                  <span class="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    X
                  </span>

                  <div class="flex-1">
                    <p class="text-xs font-semibold text-white/70">{{ f.label }}</p>
                    <p class="mt-1 text-sm sm:text-base font-semibold text-white">{{ f.value }}</p>
                  </div>
                </li>
              </ul>

              <!-- CTA -->
              <div v-if="ctas.length" class="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  v-for="(c, idx) in ctas"
                  :key="idx"
                  :href="c.href"
                  class="inline-flex flex-1 items-center justify-center gap-2
                         rounded-2xl px-5 py-3 text-sm font-semibold transition"
                  :class="c.variant === 'secondary'
                    ? 'bg-white/10 text-white hover:bg-white/15 border border-white/15'
                    : 'bg-amber-400 text-slate-900 hover:bg-amber-300'"
                >
                  {{ c.label }}
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </a>
              </div>

              <p class="mt-4 text-xs text-white/60">
                แนะนำให้นัดหมายปรึกษาเพื่อรับข้อมูลรุ่นถัดไปและรายละเอียดการสมัคร
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>
<script>
import { ref, defineComponent } from "vue";
// components
import { ArrowDownTrayIcon } from "@heroicons/vue/24/solid";

import Eyebrow from "../AboutUs/Eyebrow.vue";

export default defineComponent({
  name: "CurriculumSection",
  components: {
    Eyebrow,
    ArrowDownTrayIcon
  },
  setup() {
    const itemData = ref(null);

    const uri_curriculum = import.meta.env.PUBLIC_API_WP_CURRICULUM;
    const curriculumData = ref(null);

    const title = "รายละเอียดหลักสูตร TEPCoT by UTCC";
    const subtitle = "หลักสูตรผู้บริหารระดับสูง เพื่อขับเคลื่อนขีดความสามารถการแข่งขันของเศรษฐกิจไทย";
    const paragraphs = [
      "TEPCOT ออกแบบมาเพื่อเสริมพลังให้ เศรษฐกิจไทยและภาคธุรกิจแข่งขันได้ ในโลกการค้าที่เปลี่ยนแปลงรวดเร็ว โดยมุ่งสร้างองค์ความรู้ 3 กลุ่มใหญ่ ครอบคลุม 3 โมดูลหลัก (21 หัวข้อ) พร้อมกิจกรรมการเรียนรู้เชิงปฏิบัติการผ่านการจัดทำ แผนยุทธศาสตร์ (Strategic Plans for Thailand’s Commerce and Trade)",
    ];

    const highlights = [
      { title: "Module 1: Environment Analysis (Outside-In)", desc: "วิเคราะห์ภาพรวมเศรษฐกิจและการค้าโลกจากภายนอก เพื่อเข้าใจแรงกดดัน โอกาส และทิศทางใหม่ของการค้าและบริการ" },
      { title: "Module 2: National & Organization Perspectives (Inside-Out)", desc: "เชื่อมโยงนโยบายระดับประเทศและมิติองค์กร เพื่อมองเห็นโครงสร้างเศรษฐกิจไทยและกลไกการขับเคลื่อนที่ส่งผลต่อธุรกิจจริง" },
      { title: "Module 3: Strategies & Competitiveness", desc: "ต่อยอดสู่การสร้างกลยุทธ์และความสามารถแข่งขัน ด้วยกรอบคิดผู้นำ ธรรมาภิบาล ความยั่งยืน และกฎหมายการค้า/การลงทุน" },
    ];

    const facts = [
      { label: "ระยะเวลา", value: "6 เดือน", icon: "calendar" },
      { label: "รูปแบบการเรียน", value: "ออนไลน์และออนไซต์", icon: "computer" },
      { label: "ค่าใช้จ่าย", value: "200,000 บาท", icon: "currency" },
      { label: "วันที่เริ่มต้น", value: "1 กันยายน 2024", icon: "clock" }
    ];

    const ctas = [
      { label: "สมัครตอนนี้", href: "#apply", variant: "primary" },
      { label: "ดาวน์โหลดโบรชัวร์", href: "/brochure.pdf", targetBlank: true, variant: "secondary" }
    ];

    const fetchData = () => {
      fetch(uri_curriculum)
        .then((response) => response.json())
        .then((data) => (itemData.value = data, initialData()))
        .catch((error) => {
          console.error("Error fetching overview data:", error);
        });
    };
    const initialData = () => {
     
      title.value = curriculumData.value.title || '';
      description.value = curriculumData.value.subtitle || '';

    }
    fetchData();

    return {
      title,
      subtitle,
      paragraphs,
      highlights,
      facts,
      ctas,
    }
  },
});

</script>
<style scoped>
#curriculum {
  background-image: url('/image/bg-white-resize.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: right;
}
</style>