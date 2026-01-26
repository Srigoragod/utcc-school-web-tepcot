<template>
  <div class="container-content relative grid grid-cols-2">
    <div v-if="item.acf.image" class="bg-imag-staff mx-auto w-full bg-a-glod-D4B769 relative" :style="{
      backgroundImage: `url(${item.acf.image})`,
      backgroundRepeat: 'no-repeat',
      // backgroundPosition: 'center center',
      // backgroundSize: 'cover',
    }" loading="lazy">
           <img src="/image/2-CE-UTCC-1-min.png" class="logo w-[70%] p-4" alt="logo utcc" />

      <div>
        <img class="absolute bottom-0 right-0 w-[50%]" src="/image/CE-min-white.svg" alt="CE-min-white.svg" />
      </div>
    </div>

    <div v-else-if="item.acf.gender === 'female'"
      class="bg-imag-staff mx-auto w-full bg-a-glod-D4B769 relative" :style="{
        backgroundImage: `url(../../../public/staff/Human-02.png)`,
        backgroundRepeat: 'no-repeat',
        // backgroundPosition: 'center center',
        // backgroundSize: 'cover',
      }" loading="lazy">
           <img src="/image/2-CE-UTCC-1-min.png" class="w-[70%] p-4" alt="logo utcc" />

      <div>
        <img class="absolute bottom-0 right-0 w-[50%]" src="/image/CE-min-white.svg" alt="CE-min-white.svg" />
      </div>
    </div>

    <div v-else class="bg-imag-staff mx-auto w-full bg-a-glod-D4B769  relative" :style="{
      backgroundImage: `url(../../../public/staff/Human-01.png)`,
      backgroundRepeat: 'no-repeat',
      // backgroundPosition: 'center center',
      // backgroundSize: 'cover',
    }" loading="lazy">
           <img src="/image/2-CE-UTCC-1-min.png" class="w-[70%] p-4" alt="logo utcc" />

      <div>
        <img class="absolute bottom-0 right-0 w-[50%]" src="/image/CE-min-white.svg" alt="CE-min-white.svg" />
      </div>
    </div>

    <div class="div-content py-0 md:py-10 px-4 bg-white overflow-y-auto hide-scroll">
      <div class="sticky top-0 bg-white pt-4 z-10">
      <h3 class="text-30 text-a-gray-696F6F">{{ item.acf.position }}</h3>
      <h2 class="text-36 md:text-54 text-1-line -mt-2 text-staff-name text-a-blue-030e62">{{ item.acf.name }}</h2>
      <h3 class="text-30 -mt-2" v-html="item.acf.academic"></h3>
      </div>

      <div class="pb-10 border-b border-a-gray-BEC1C1">
        <span v-if="item.acf.education && item.acf.education.length > 0">
          <h2 class="text-24 mt-4 text-a-gray-696F6F text-left">วุฒิการศึกษา</h2>
          <ul class="text-20 text-left">
            <li v-for="(el, index) in item.acf.education" :key="index">
              {{ el.text }}
            </li>
          </ul>
        </span>

        <span v-if="item.acf.specialist && item.acf.specialist.length > 0">
          <h2 class="text-24 mt-4 text-a-gray-696F6F text-left">
            ความเชี่ยวชาญเฉพาะด้าน
          </h2>
          <ul class="text-20 text-left">
            <li v-for="(el, index) in item.acf.specialist" :key="index">
              {{ el.text }}
            </li>
          </ul>
        </span>
        <span v-else class="block py-40">&nbsp;</span>

        <div class="pt-4" v-html="item.acf.description"></div>

      </div>
      <div class="social-media pb-10">
        <div class="card-actions pt-4 justify-center items-center grid grid-cols-2 gap-2">
          <a href="#" v-if="item.acf.contact.facebook" target="_blank" class="cursor-not-allowed">
            <img src="/icon/sc-facebook.svg" class="h-6" alt="Icon Facebook" />
            <div>{{ item.acf.contact.facebook ? item.acf.contact.facebook : "-" }}</div>
          </a>
          <a href="#" v-if="item.acf.contact.instagram" target="_blank" class="cursor-not-allowed">
            <img src="/icon/sc-instagram.svg" class="h-6" alt="Icon Instagram" />
            <div>
              {{ item.acf.contact.instagram ? item.acf.contact.instagram : "-" }}
            </div>
          </a>
          <a href="#" v-if="item.acf.contact.twitter" target="_blank" class="cursor-not-allowed">
            <img src="/icon/sc-x-twitter.svg" class="h-6" alt="Icon X" />
            <div>{{ item.acf.contact.twitter ? item.acf.contact.twitter : "-" }}</div>
          </a>
          <a href="#" v-if="item.acf.contact.linkedin" target="_blank" class="cursor-not-allowed">
            <img src="/icon/sc-linkedIn.svg" class="h-6" alt="Icon LinkedIn" />
            <div>{{ item.acf.contact.linkedin ? item.acf.contact.linkedin : "-" }}</div>
          </a>
          <a :href="`tel:${item.acf.contact.phone}`" v-if="item.acf.contact.phone" target="_blank">
            <img src="/icon/sc-phone.svg" class="h-6" alt="Icon Phone" />
            <div>{{ item.acf.contact.phone ? item.acf.contact.phone : "-" }}</div>
          </a>
          <a :href="`mailto:${item.acf.contact.email}`" v-if="item.acf.contact.email" target="_blank">
            <img src="/icon/sc-mail.svg" class="h-6" alt="Icon email" />
            <div>{{ item.acf.contact.email ? item.acf.contact.email : "-" }}</div>
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
export default defineComponent({
  name: "ContentModalStaff",
  props: {
    item: { type: Object, required: false },
  },
});
</script>
<style scoped>
.bg-imag-staff {
  min-height: inherit;
  min-width: inherit;
  height: 40rem;
  min-height: calc(100vh - 300px);
  min-width: calc(100vh - 500px);
  background-position: bottom center;
  background-size: contain;
  border-radius: 0.5rem 0 0 0.5rem;
}

.div-content {
  border-radius: 0 0.5rem 0.5rem 0;
  max-height: 40rem;
}

.text-name {
  width: 100% !important;
  writing-mode: vertical-rl;
  text-orientation: sideways-right;
  font-style: normal !important;
  transform: rotate(180deg);
  position: absolute;
  bottom: 1rem;
  left: 0.5rem;
}

ol,
ul,
menu {
  list-style: disc;
  margin: 0 0 0 1.5rem;
  padding: 0;
}

.card-actions a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #0b0b0b;
}

@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .text-staff-name {
    font-size: 2.5rem;
  }

  .text-name {
    font-size: 14px;
    display: none;
  }

  .container-content {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  .bg-imag-staff {
    min-height: inherit;
    min-width: inherit;
    height: 380px;
    background-position: bottom center;
    background-size: contain;
    border-radius: 0.5rem 0.5rem 0 0;
  }

  .div-content {
    max-height: 24rem;
    border-radius:  0 0 0.5rem 0.5rem;
  }

  .card-actions {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    font-size: 1.25rem;
    gap: 2;
  }
}

@media (max-width: 767px) {
  .text-staff-name {
    font-size: 2.5rem;
  }

  .text-name {
    font-size: 8px;
  }

  .container-content {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  .bg-imag-staff {
    min-height: inherit;
    min-width: inherit;
    height: 450px;
    background-position: bottom center;
    background-size: contain;
    border-radius: 0.5rem 0.5rem 0 0;
  }

  .div-content {
    max-height: 25rem;
    border-radius: 0 0 0.5rem 0.5rem;
  }

  .card-actions {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    font-size: 1.25rem;
    gap: 2;
  }
}

</style>
