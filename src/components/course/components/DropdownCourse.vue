<template>
<div class="custom-container flex overflow-x-auto hide-scroll py-4 is-desktop">
  <button @click="clickDropdown(item.code)" class="custom-color btn-primary text-20 px-3  py-2 mx-2 flex items-center gap-2 h-[42px]" :class="[item.code == isActive ? 'active': '']" v-for="(item, index) in programList" :key="index">
    <CheckCircleIcon v-if="item.code == isActive" class="h-6 w-6 text-white" />
    {{ item.name }}
  </button>
</div>
<div class="is-mobile relative px-4">

  <select v-model="slect"  class="select select-primary w-full text-20" @change="clickDropdown()" >
  <option disabled selected>เลือกหลักสูตร</option>
  <option :value="item.code"   :selected="[item.code == isActive ? 'selected': '']" v-for="(item, index) in programList" :key="index" >   <div class="text-1-line text-a-black-1F2937">{{ item.name }}</div></option>
  </select>
</div>

</template>
<script>
import { ref, defineComponent } from "vue";
import { CheckCircleIcon } from '@heroicons/vue/24/solid'
export default defineComponent({
  name: "DropdownCourse",
  components: {
    CheckCircleIcon
  },
  emits:["degree"],
  setup(props,ctx) {
    const isActive = ref("all");
    const slect = ref('all')
    const programList = ref([
       {
        id: 0,
        code: "all",
        name: "ทั้งหมด",
      },
      {
        id: 1,
        code: "bachelor",
        name: "ปริญญาตรี",
      },
      {
        id: 3,
        code: "master",
        name: "ปริญญาโท",
      },
      {
        id: 4,
        code: "doctoral",
        name: "ปริญญาเอก",
      },
    ]);

    const clickDropdown =(el)=> {
 
      isActive.value = el ? el : slect.value
      ctx.emit("degree",  isActive.value);
    }

    return {
      programList,
      isActive,
      clickDropdown,
      slect
    };
  },
});
</script>
<style lang="css" scoped>

@import '../../../styles/global.css';
.custom-color{
  background-color: var(--accent);
  color: #fff;
  border-radius: 30px;
  border: 1px solid var(--3-e-7-adb,  var(--accent));
}
.custom-color:hover {
  background-color: var(--accent);
  color: #fff !important;
}


@media only screen and (max-width: 767px) {
  .is-desktop {
	display: none;
   }

}
@media only screen and (min-width: 768px) and (max-width: 1023px) {
   .is-desktop {
    display: none;
  }
}
@media only screen and (min-width: 1024px) {
.is-mobile {
	display: none;
 }
}
</style>
