<template>
  <div >
<!-- Component Start -->
    <div class="relative flex items-center group" v-if="fund.id">
        <img v-if="fund.id === '1' || fund.id === '1'" src="/icon/ubs-type-1.svg" alt="type1" />
        <img v-else-if="fund.id === '2' || fund.id === '2'" src="/icon/ubs-type-2.svg" alt="type2" />
        <img v-else-if="fund.id === '3' || fund.id === '3'" src="/icon/ubs-type-3.svg" alt="type3" />
   
        <div v-if="!isMobile" class="absolute left-0  items-center hidden ml-6 group-hover:flex">
            <div class="w-3 h-3 -mr-2 rotate-45 bg-black"></div>
            <span  class="relative text-sm  p-2 leading-none text-white w-full whitespace-no-wrap bg-black shadow-lg rounded">
              <span v-if="fund.id === '1' || fund.id === '1'">ลักษณะที่ 1 - ขาดแคลนทุนทรัพย์</span>
              <span v-else-if="fund.id === '2' || fund.id === '2'">ลักษณะที่ 2 - สาขาวิชาที่เป็นความต้องการหลัก</span>
              <span v-else-if="fund.id === '3' || fund.id === '3'"> ลักษณะที่ 3 - สาขาวิชาขาดแคลน/มุ่งส่งเสริมเป็นพิเศษ</span>
            </span>
        </div>
        <slot></slot>
    </div>
    <!-- Component End  -->
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
export default {
  name: "TypeIcon",
  props: {
    fund: { type: Object, require: true},
    isShowAll: {type: Boolean, require: false},
    isMobile: {type: Boolean, require: false}
  },
  setup(props) {
    const isActive =  ref(props.activeId)
    return{
      isActive
    }
  }
};
</script>

<style scoped>

.div-icon span {
  opacity: 0;
  -o-transition: 0.5s;
  -ms-transition: 0.5s;
  -moz-transition: 0.5s;
  -webkit-transition: 0.5s;

  transition: 0.1s;
}
.div-icon:hover > span {
  opacity: 1;
}
</style>
