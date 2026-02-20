<template>
  <section class="w-full">
    <div
      class="relative overflow-hidden rounded-[28px] bg-[#0A2E73] text-white"
    >
      <!-- Background image (right) -->
      <div
        class="absolute inset-0 bg-cover bg-right bg-no-repeat opacity-80"
        :style="{ backgroundImage: `url(${bgImage})` }"
        aria-hidden="true"
      />
      <!-- Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-[#071F52]/95 via-[#0A2E73]/90 to-[#0A2E73]/20"
        aria-hidden="true"
      />

      <!-- Content -->
      <div class="relative z-10 flex items-center justify-between gap-6 px-8 py-8 sm:px-12 sm:py-10">
        <!-- Left -->
        <div class="max-w-3xl">

          <h3 class="text-30 md:text-36 font-semibold leading-tight sm:text-5xl">
            {{ title }}
            <span v-if="highlight" class="block text-yellow-400">
              {{ highlight }}
            </span>
          </h3>

          <p v-if="description" class="mt-3 text-20 md:text-24  text-white/85">
            {{ description }}
          </p>
        </div>

        <!-- Right button -->
        <div class="shrink-0">
          <a
            :href="href"
            class="group inline-flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-6 py-4
                   backdrop-blur-md transition
                   hover:bg-white/15 hover:shadow-lg hover:shadow-black/20"
          >
          <ArrowDownTrayIcon class="h-6 w-6 mx-2"></ArrowDownTrayIcon>
            <span class="text-24  text-white/80 font-semibold">{{ buttonLabel }}</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<!-- File: components/Shared/DownloadBanner.vue -->
<script  >
import { ref } from "vue";
import { ArrowDownTrayIcon } from '@heroicons/vue/24/solid'

export default {
  name: "DownloadBanner",
  props: {
    lang: {
      type: String,
      default: "th",
    },
  },
  components: {
    ArrowDownTrayIcon
  },
  setup(props) {
    const title =
      props.lang === "en"
        ? "Announcement of Eligible Candidates for TEPCoT Executive Training Course"
        : "ประกาศรายชื่อผู้มีสิทธิ์เข้าอบรมหลักสูตรผู้บริหารระดับสูงด้านการค้าและการพาณิชย์ (TEPCoT) รุ่นที่ 18";
    const description =
      props.lang === "en"
        ? "Announcement Date: January 23, 2026"
        : "ประกาศ: วันที่ 20 กุมภาพันธ์ 2569";
    const buttonLabel =
      props.lang === "en" ? "Download Now" : "ดาวน์โหลดรายชื่อ";
    const href =
      props.lang === "en"
        ? "https://example.com/download-en"
        : "https://example.com/download-th";
    const bgImage = "/image/download-banner-bg.jpg";

    return {
      title,
      description,
      buttonLabel,
      href,
      bgImage,
    };
  },
};

</script>
