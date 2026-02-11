<template>
  <div class="card bg-base-100 shadow-xl relative mx-auto" :class="item.acf.type">
    <ArrowsPointingOutIcon class="absolute z-10 right-4 top-4  w-6 h-6" />
    <figure class="bg-cover bg-center">
      <div class="">
        <img v-if="item.acf.image" :src="item.acf.image" :alt="item.acf.name" />
        <img v-else-if="item.acf.gender === 'female'" src="/staff/Human-02.png" :alt="item.acf.name" />
        <img v-else src="/staff/Human-01.png" :alt="item.acf.name" />
      </div>
    </figure>
    <div class="px-2 py-4 bg-white text-center leading-none rounded-b-2xl">
      <div class="name-staff pb-2 border-b border-a-gray-BEC1C1 items-center">
        <h3 class="text-20 md:text-24"> {{ item.acf.position ? item.acf.position : '&nbsp;' }} </h3>
        <h2 class="text-24 md:text-30 block text-1-line text-a-blue-030e62"> {{ item.acf.name }}</h2>
        <div class="text-20 md:text-24 text-1-line   text-1-line" v-html="item.acf.academic"></div>
        <ul class="text-zinc-400 text-2-line description text-[18px] pt-1">
          <li v-for="(el, index) in item.acf.education" :key="index" >
            {{ el.text }}
          </li>
        </ul>
      </div>
      <div class="card-actions py-4 flex  justify-center gap-2 items-center">
        <a :href="`${item.acf.contact.facebook}`" target="_blank" v-if="item.acf.contact.facebook"
          class="flex justify-center items-center">
          <img src="/icon/sc-facebook.svg" class="h-4" alt="Icon Facebook" />
        </a>
        <a :href="`${item.acf.contact.instagram}`" target="_blank" v-if="item.acf.contact.instagram"
          class="flex justify-center items-center">
          <img src="/icon/sc-instagram.svg" class="h-4" alt="Icon Instagram" />
        </a>
        <a :href="`${item.acf.contact.twitter}`" target="_blank" v-if="item.acf.contact.twitter"
          class="flex justify-center items-center">
          <img src="/icon/sc-x-twitter.svg" class="h-4" alt="Icon X" />
        </a>
        <a :href="`${item.acf.contact.linkedin}`" target="_blank" v-if="item.acf.contact.linkedin"
          class="flex justify-center items-center">
          <img src="/icon/sc-linkedIn.svg" class="h-4" alt="Icon LinkedIn" />
        </a>
        <a :href="`tel:${item.acf.contact.phone}`" target="_blank" class="flex justify-center items-center" v-if="item.acf.contact.phone">
          <img src="/icon/sc-phone.svg" class="h-4" alt="Icon Phone" />
        </a>
        <a :href="`mailto:${item.acf.contact.email}`" target="_blank" class="flex justify-center items-center" v-if="item.acf.contact.email" >
          <img src="/icon/sc-mail.svg" class="h-4" alt="Icon Email" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { ArrowsPointingOutIcon } from '@heroicons/vue/24/solid'
export default {
  name: "CardStaffV2",
  props: {
    item: { type: Object, required: true },
  },
  components: {
    ArrowsPointingOutIcon
  }

}


</script>

<style>
.description p {
  margin-bottom: 0 !important;
}
</style>
<style scoped>
@import "../../styles/global.css";

.bg-cover {
  position: relative;
  background: var(--accent-light);
  background: linear-gradient(180deg, #F2E3BA 20%, #F0C571 80%);
}

.bg-cover::before {
  content: "";
  background-image: url(/image/UBS.svg);
  position: absolute;
  z-index: 99;
}
.filter--css {
  position: relative;
  display: inline-block;
}

.filter--css img {
  -webkit-filter: contrast(110%) saturate(0%) sepia(0%) hue-rotate(180deg);
  filter: contrast(110%) saturate(0%) sepia(0%) hue-rotate(180deg);
}

.filter--css::before {
  content: "";
  display: block;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
  pointer-events: none;
  mix-blend-mode: multiply;
  opacity: 0.5;
  background: var(--accent-dark);
  z-index: 2;
}

.card:hover .filter--css img {
  -webkit-filter: unset;
  filter: unset;
}

.card:hover .filter--css::before {
  background: transparent;
}

.filter--cloudinary::before {
  content: "";
  display: block;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
  pointer-events: none;
  opacity: 0.5;
  background: var(--accent-dark);
  z-index: 2;
}

.gallery {
  display: flex;
}

.gallery .original,
.gallery .filter {
  position: relative;
}

.gallery .original::after,
.gallery .filter::after {
  content: "original";
  position: absolute;
  bottom: 25px;
  left: 25px;
  opacity: .5;
  z-index: 3;
}

.gallery .filter::after {
  content: "filter";
}

.gallery .original>img,
.gallery .filter>img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-actions img {
  max-width: 80%;
}

@media only screen and (max-width: 767px) {
  .card .filter--css img {
    -webkit-filter: unset;
    filter: unset;
  }

  .card .filter--css::before {
    background: transparent;
  }

  .is-mobile {
    display: none !important;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .card .filter--css img {
    -webkit-filter: unset;
    filter: unset;
  }

  .card .filter--css::before {
    background: transparent;
  }
}

/* @media only screen and (min-width: 1366px) and (orientation: landscape) {
      .card .filter--css img {
        -webkit-filter: unset;
        filter: unset;
        }

        .card .filter--css::before {
        background: transparent;
        }
    } */
@media only screen and (min-width: 1024px) and (orientation: portrait) {
  .card .filter--css img {
    -webkit-filter: unset;
    filter: unset;
  }

  .card .filter--css::before {
    background: transparent;
  }
}
</style>