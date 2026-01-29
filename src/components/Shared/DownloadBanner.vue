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
          <div class="mb-4 flex items-center gap-3">
            <!-- Icon bubble -->
            <div class="relative flex h-10 w-10 items-center justify-center">
              <span class="absolute left-1 top-1 h-8 w-8 rounded-full bg-white/90" />
              <span class="absolute h-10 w-10 rounded-full bg-yellow-400" />
              <!-- simple “cap” icon -->
              <svg
                class="relative z-10 h-5 w-5 text-[#071F52]"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 3L2 8l10 5 10-5-10-5Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linejoin="round"
                />
                <path
                  d="M6 10v6c0 1 3 3 6 3s6-2 6-3v-6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>

          <h3 class="text-3xl font-semibold leading-tight sm:text-5xl">
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
            <span class="text-24  text-white/80 font-semibold">{{ buttonLabel }}</span>

            <!-- icon box -->
            <span
              class="inline-flex h-11 w-14 items-center justify-center rounded-xl border border-white/15 bg-white/10
                     transition group-hover:bg-white/15"
              aria-hidden="true"
            >
              <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 5h10v10"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19 5L10 14"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5 9v10h10"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<!-- File: components/Shared/DownloadBanner.vue -->
<script  >
import { ref } from "vue";

export default {
  props: {
    lang: {
      type: String,
      default: "th",
    },
  },
  setup(props) {
    const title =
      props.lang === "en"
        ? "Announcement of Eligible Candidates for TEPCoT Executive Training Course"
        : "ประกาศรายชื่อผู้มีสิทธิ์เข้าอบรมหลักสูตรผู้บริหารระดับสูงด้านการค้าและการพาณิชย์ (TEPCoT)";
    const description =
      props.lang === "en"
        ? "Announcement Date: January 23, 2026"
        : "ประกาศ: วันที่ 23 มกราคม 2569";
    const buttonLabel =
      props.lang === "en" ? "Download Now" : "ดาวน์โหลดตอนนี้";
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
