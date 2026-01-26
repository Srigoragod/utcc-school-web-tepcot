<template>
  <div class="card  bg-base-100 shadow-xl w-full">
    <figure class="bg-cover bg-center  bg-slate-200 p-0">
      <div class="filter filter--css">
        <div class="div-img bg-slate-200 w-full">&nbsp;</div>
      </div>
    </figure>
    <div class="p-4 px-8 bg-white  text-center leading-none rounded-b-2xl">
      <div class="name-staff pb-2 border-b border-a-gray-BEC1C1 items-center">
        <h3 class="text-24 h-[20px] my-2 bg-slate-200 skeleton w-4/12 mx-auto"> </h3>
        <h2 class="text-30 h-[28px] my-2 bg-slate-200 skeleton w-10/12 mx-auto"> </h2>
        <h3 class="text-24 h-[20px] my-2 bg-slate-200 skeleton w-6/12 mx-auto"> </h3>
      </div>
      <div class="card-actions py-4 justify-center gap-2">
        <div class="h-8 w-8 bg-slate-200 skeleton rounded-md"></div>
        <div class="h-8 w-8 bg-slate-200 skeleton rounded-md"></div>
        <!-- <div class="h-8 w-8 bg-slate-200 skeleton rounded-md"></div>
        <div class="h-8 w-8 bg-slate-200 skeleton rounded-md"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardStaffSkeleton",
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

.card .filter--css img {
  -webkit-filter: unset;
  filter: unset;
}

.card .filter--css::before {
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

.div-img {
  width: 352px;
  height: 352px;
}

@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .div-img {
    width: 352px;
    height: 352px;
  }
}

@media only screen and (min-width: 1024px) and (orientation: portrait) {
  .div-img {
    width: 229.25px;
    height: 229.25px;
  }
}
</style>