<template>
  <div class="card bg-base-100 shadow-xl relative mx-auto">
    <figure class="bg-cover bg-center bg-a-blue-030e62">
      <div class="filter filter--css">
        <img :src="item.image" :alt="item.name" />
      </div>
    </figure>
    <div class="p-4 px-8 bg-white text-center leading-none rounded-b-2xl">
      <div class="name-staff pb-2 border-b border-a-gray-BEC1C1 items-center">
        <h3 class="text-24"> {{ item.position ? item.position : '&nbsp;' }} </h3>
        <h2 class="text-30 block text-1-line"> {{ item.name }}</h2>
        <div class=" text-24 text-1-line text-a-blue-030e62 pt-2">{{ item.academic }}</div>
      </div>
      <div class="card-actions py-4 justify-center items-center gap-2">
        <a href="#" target="_blank" v-if="item.contact.facebook">
          <img src="../../../icon/sc-facebook.svg" alt="Icon Facebook" />
        </a>
        <a href="#" target="_blank" v-if="item.contact.instagram">
          <img src="../../../icon/sc-instagram.svg" alt="Icon Instagram" />
        </a>
        <a href="#" target="_blank" v-if="item.contact.twitter">
          <img src="../../../icon/sc-x-twitter.svg" alt="Icon X" />
        </a>
        <a href="#" target="_blank" v-if="item.contact.linkedin">
          <img src="../../../icon/sc-linkedIn.svg" class="h-4" alt="Icon LinkedIn" />
        </a>
        <a href="#" target="_blank" v-if="item.contact.phone">
          <img src="../../../icon/sc-phone.svg" class="h-4" alt="Icon Phone" />
        </a>
        <a href="#" target="_blank" v-if="item.contact.email">
          <img src="../../../icon/sc-mail.svg" class="h-4" alt="Icon email" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue"

export default {
  name: "CardStaff",
  props: {
    item: { type: Object, required: false }
  },
}
</script>


<style scoped>
@import "../../styles/global.css";

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