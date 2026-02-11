<template>
    <div  id="stat-programs-group" class="grid grid-cols-3 gap-4 items-end relative">
        <div  v-for="(h, i) in items" :key="i" class="items-stat bg-slate-50 skeleton flex flex-col p-5 rounded-sm shadow hover:shadow-xl  relative">
            <h3 class="text-66 md:text-80   font-extrabold">
            {{ h.value }}
            </h3>
            <h6 class="py-0 text-20 md:text-30  font-semibold">
            {{ h.description }}
            </h6>
            <ul class="list-disc list-inside mt-2 text-base md:text-20  font-light">
                <li v-for="(label, idx) in h.labels" :key="idx">
                    {{ label.text }}
                </li>
            </ul>
        </div>
    </div>
</template>
<script >
import { ref, defineComponent } from "vue";
export default defineComponent({
    name: "Stat",
    props: {
        items: {
            type: Object,
            required: true
        }
    }
});
</script>
<style scoped>
/*
#stat-programs-group  div.items-stat:nth-child(1)   {
  height: 150px;
  background-color: #485AEE;
  color: #FFFFFF;
  opacity: 0.9;
}
#stat-programs-group  div.items-stat:nth-child(2)   {
  height: 220px;
  background-color: #1E0380;
  color: #FFFFFF;
}
#stat-programs-group  div.items-stat:last-child   {
  height: 300px;  
  background-color: #0A0327;
  color: #FFFFFF;
} */
 .bg--1 {
    background-color: rgb(11, 59, 102, 0.75);
    background-image: linear-gradient(180deg, rgb(5, 38, 63, 0.75) 0%, rgb(11, 59, 102, 0.75) 100%);
}
.bg--2 {
    background-color: rgb(14, 79, 127, 0.75);
    background-image: linear-gradient(180deg, rgb(6, 53, 86, 0.75) 0%, rgb(14, 79, 127, 0.75) 100%);
}
.bg--3 {
    background-color: #116493bf;
    background-image: linear-gradient(180deg, rgb(7, 78, 102, 0.75) 0%, rgb(17, 100, 147, 0.75) 100%);
}
.bg--4 {
    background-color: rgb(22, 135, 173, 0.75);
    background-image: linear-gradient(180deg, rgb(11, 98, 128, 0.75) 0%, rgb(22, 135, 173, 0.75) 100%);
}

 #stat-programs-group  div.items-stat   {
  color: #1c1c84;
  height: 100%;
  /* transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out; */
}

/* #stat-programs-group  div.items-stat:hover   {
  transform: scale(1.05);
  transition: transform 0.3s ease-in-out;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
} */

</style>