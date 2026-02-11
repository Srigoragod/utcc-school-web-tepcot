<template>
  <div class="snap-page  overflow-hidden">
    <section id="overview" class="snap-section relative">
      <div class="wrap">
        <div class="relative ">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
                <div class="h-full w-full  min-h-[645px] min-w-[639px] relative" :style="{  backgroundImage: `url(${image})`,  backgroundRepeat: 'no-repeat',   backgroundPosition: 'center center',  backgroundSize: 'cover',}" loading="lazy">
                 <div class="absolute inset-0 bg-gradient-to-tr from-[#000068]/90 via-[#030e62]/30 to-blue-50"></div>
                </div>
                <div >
                     <Eyebrow class="bg-blue-900 text-white px-2 mb-2" :text="'Courses Overview'" />
                    <h3  class="mt-4 text-gradient-blue text-36 sm:text-44 font-semibold">{{ title }}</h3>
                    <div class="mt-4 space-y-4 text-20 md:text-24 font-light indent-4" v-html="subtitle"></div>
                </div>
            </div>
            <div class="absolute bottom-16 right-0 max-w-7xl z-10 ">
                <Stat :items="highlights" />
            </div>
            <div class="cta  absolute bottom-0  right-0">

            <button
            v-if="button1?.url"
            class="mt-6 py-3 text-20 md:text-24 font-light underline text-[#000068]"
          >
            {{ button1.title }}
          </button>
          <button
            v-if="button2?.url"
            class="mt-6 py-3 text-20 md:text-24 font-light underline text-[#000068]"
          >
            {{ button2.title }}
          </button>
          </div>
        </div>
      </div>
    </section>

    <section id="modules" class="snap-section alt">
      <div class="wrap">
        <Modules />
      </div>
    </section>

    <section id="facts" class="snap-section">
      <div class="wrap">
        <h2>รายละเอียดรุ่นเรียน</h2>
        <div class="facts">
          <div v-for="(f, i) in facts" :key="i" class="fact">
            <div class="label">{{ f.label }}</div>
            <div class="value">{{ f.value }}</div>
          </div>
        </div>
      </div>
    </section>

    <section id="apply" class="snap-section alt">
      <div class="wrap">
        <h2>สมัครเรียน TEPCoT</h2>
        <p>วางฟอร์มสมัคร / FAQ / ช่องทางติดต่อไว้ที่นี่</p>
        <a href="#overview" class="btn">กลับไปบนสุด</a>
      </div>
    </section>

    <!-- CSS-only Dot Nav (ไม่ active ตาม section แบบอัตโนมัติ) -->
    <nav class="dots pr-8" aria-label="Section navigation">
      <a href="#overview" title="ภาพรวม"></a>
      <a href="#modules" title="โมดูล"></a>
      <a href="#facts" title="ข้อมูล"></a>
      <a href="#apply" title="สมัคร"></a>
    </nav>
  </div>
</template>

<script >
import { ref, defineComponent } from "vue";
import Eyebrow from "../AboutUs/Eyebrow.vue";
import Modules from "../course/Modules.vue";
import Stat from "../course/Stat.vue";

export default defineComponent({
  name: "FullPageSnap",
  components: {
     Eyebrow,
     Modules,
     Stat
   },
  setup() {
    const uri_curriculum = import.meta.env.PUBLIC_API_WP_CURRICULUM;

    const title = ref('');
    const subtitle = ref('');
    const paragraphs = ref([]);
    const highlights = ref([]);
    const facts = ref([]);
    const image = ref(null);
    const button1 = ref('');
    const button2 = ref('');
    const modulesList = ref([]);

    const fetchData = () => {
      fetch(uri_curriculum)
        .then((response) => response.json())
        .then((data) => ( initialData(data)))
        .catch((error) => {
          console.error("Error fetching curriculum data:", error);
        });
    };

    const initialData = (data) => {
        // Process curriculumData if needed
        title.value = data.title || '';
        subtitle.value = data.description || '';
        image.value = data.image || null;
        highlights.value = data.highlights || [];

        button1.value = data.button1 || '';
        button2.value = data.button2 || '';

        modulesList.value = data.modules || [];

    }
    fetchData();

    return {
        title,
        subtitle,
        image,
        paragraphs,
        highlights,
        facts,
        button1,
        button2
    };
  },
});


</script>

<style scoped>
/* Container: snap behavior */
.snap-page{
  height: 100vh;
  overflow-y: auto;
  position: relative;
}

/* Each full page section */
.snap-section{
  min-height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always; /* บาง browser ช่วยให้ “หยุด” ชัดขึ้น */
  display: flex;
  align-items: center;
  padding: 64px 20px;

}

.snap-section.alt{ background: #F9FBFF; }

.wrap{
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}

h1{ font-size: clamp(28px, 4vw, 48px); margin: 0; line-height: 1.1; }
h2{ font-size: clamp(24px, 3vw, 36px); margin: 0; }
.sub{ margin-top: 14px; font-size: 18px; font-weight: 600; color: #334155; }
p{ margin-top: 14px; color: #475569; line-height: 1.75; }



.card{
  border: 1px solid #e2e8f0;
  border-radius: 24px;
  padding: 18px;
  background: #fff;
}

.facts{
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 12px;
}
@media (min-width: 640px){
  .facts{ grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
.fact{
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  padding: 16px;
}
.label{ font-size: 12px; color:#64748b; }
.value{ font-size: 18px; font-weight: 700; color:#0f172a; margin-top: 4px; }

.cta{ margin-top: 26px; display:flex; flex-wrap:wrap; gap:10px; }
.btn{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  padding: 12px 18px;
  border-radius: 999px;
  border: 1px solid #e2e8f0;
  color:#0f172a;
  text-decoration: none;
  font-weight: 700;
  font-size: 14px;
}
.btn.primary{
  background:#0f172a;
  color:#fff;
  border-color:#0f172a;
}
.link{
  display:inline-block;
  margin-top: 14px;
  font-weight: 700;
  color:#0f172a;
  text-decoration: underline;
}

/* Dot nav (CSS-only) */
.dots{
  position: fixed;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: none;
  flex-direction: column;
  gap: 10px;
}
@media (min-width: 768px){
  .dots{ display:flex; }
}
.dots a{
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #cbd5e1;
  display:block;
  border: 0;
}
.dots a:hover{ background: #64748b; }

/* ลด motion สำหรับคนที่ตั้งค่า reduce motion */
@media (prefers-reduced-motion: reduce){
  .snap-page{ scroll-behavior: auto; }
}

  .hs-skel{
    position:relative;
    overflow:hidden;
    background:#2a3346;
    opacity:.95;
  }
  .hs-skel::hover::after{
    content:"";
    position:absolute;
    inset:0;
    transform:translateX(-120%);
    background-image:linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,.18), rgba(255,255,255,.40), rgba(255,255,255,0));
    animation:hs-shimmer 3s infinite;
  }
  @keyframes hs-shimmer{ 100%{ transform:translateX(120%); } }
</style>
