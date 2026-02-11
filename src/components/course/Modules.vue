<template>
<!-- Courses Overview: Modules (HTML only) -->
<div class="relative">
  <div class="mx-auto max-w-7xl px-4 sm:px-0">
    <!-- Module 1 -->
    <article class="overflow-hidden transition duration-300 shadow-xl shadow-blue-200/10" >
      <div class="grid grid-cols-1 lg:grid-cols-12">
        <!-- Media -->
        <div class="lg:col-span-6 relative min-h-[220px] sm:min-h-[280px] lg:min-h-full">
          <img
            src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80"
            alt="Module 1 Environment Analysis"
            class="absolute inset-0 h-full w-full object-cover roundedi"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#00296b]/85 via-[#00296b]/25 to-transparent"></div>

          <div class="absolute left-5 top-5 flex items-center gap-2">
            <span class="inline-flex h-2.5 w-2.5 rounded-full bg-[#FBEC4F]"></span>
            <span class=" text-white/90 text-20 md:text-24 font-light">รายละเอียดหลักสูตร</span>
          </div>

          <!-- Metric card -->
          <div class="absolute left-5 bottom-5 right-5">
            <div class="rounded-2xl bg-white/12 backdrop-blur-md border border-white/15 p-5">
              <div class="">
                <div>
                  <div class="text-54 md:text-66 font-bold text-white">4</div>
                  <div class="text-24 md:text-30 font-light text-white/80 -mt-2">Key topics</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="lg:col-span-6 p-6 sm:p-10 bg-white shadow">
          <h3 class="mt-3 text-36 md:text-44 ">
            <span class="font-bold text-gradient-blue">
            Module 1
            </span>
            <br />
            <span class="text-slate-900 font-light">
            Environment Analysis (Outside-In)</span>
          </h3>

          <p class="mt-4 text-20 md:text-24  text-blue-900">
            เป็นโมดูลเริ่มต้นที่ช่วยให้ผู้บริหารมองเห็นภาพใหญ่ของเศรษฐกิจโลกและภูมิทัศน์การค้าใหม่ เพื่อวางตำแหน่งองค์กรได้อย่างแม่นยำ
          </p>

          <p class="mt-4 text-20 md:text-24 font-light text-slate-800">
            ผู้เรียนจะได้ทำความเข้าใจแรงขับเคลื่อนสำคัญที่กำลังเปลี่ยนกติกาการค้าและบริการ ไม่ว่าจะเป็นเทคโนโลยี นวัตกรรม
            ห่วงโซ่อุปทาน และความผันผวนเชิงภูมิรัฐศาสตร์ พร้อมอัปเดตประเด็นสำคัญด้านการค้าระหว่างประเทศที่ส่งผลต่อการตัดสินใจของผู้บริหารโดยตรง
            เป้าหมายคือทำให้ผู้เรียน “อ่านเกม” ได้ไว มองเห็นทั้งความเสี่ยงและโอกาส และกำหนดทิศทางเชิงกลยุทธ์ได้ทันต่อการเปลี่ยนแปลง
          </p>

          <div class="mt-6">
            <p class="text-20 md:text-24 text-blue-950">หัวข้อการเรียนรู้ (Key Topics)</p>
            <ul class="mt-3 space-y-1 list-disc list-inside font-light">
              <li >
                <span class="text-20 md:text-24 text-slate-700">Executing Trade & Services 4.0 — เติบโตทั่วถึงแบบไทยเท่ (Inclusive Growth)</span>
              </li>
              <li>
                <span class="text-20 md:text-24 text-slate-700">Introduction to Commerce and Trade on the New Innovation Landscape</span>
              </li>
              <li>
                <span class="text-20 md:text-24 text-slate-700">A New Mindset for a Shifting Global Economy</span>
              </li>
              <li>
                <span class="text-20 md:text-24 text-slate-700">Current Issues in International Trade</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </article>
  </div>
</div>
</template>