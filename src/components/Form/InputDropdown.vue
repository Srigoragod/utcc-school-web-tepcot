<template>
  <div class="relative">
    <label
      class="mb-2"
      :class="[isRequired ? 'item-label-required' : '']"
      >{{ inputLbl.label }}
    </label>

    <select v-model="itemSelected" @change="selectItem()" class="select select-info select-bordered w-full text-24" >
      <option disabled selected class="text-a-gray-696F6F">Please select ...</option>
      <option v-for="(item,index) in itemList" :key="index"  >{{ item.label }}</option>
    </select>
    <div class="text-red-500 absolute left-0 w-full" v-if="isError">
      {{ getErrorMsg }}
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "InputDropdown",
  props: {
    // v-model
    inputValue: { type: String },
    itemList: { type: Array, required: false },
    isRequired: { type: Boolean, default: false },
    isShowError: { type: Boolean, default: false },
    isSubmitted: { type: Boolean, default: false },
    // label
    inputLbl: { type: Object, required: true },
    errorInfo:   { type: Object, required: true }
  },
  emits: ["update:inputValue"],
  setup(props, ctx) {
    const content = ref(props.inputValue);
    const showList = ref(false);
    const itemSelected = ref(null);
    const getErrorMsg = ref("");
    const isError = ref(false);
    const email = ref();

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email)) {
        isError.value = false;
        getErrorMsg.value = ""; // Email is valid
      } else {
        isError.value = true
        getErrorMsg.value = "Please enter a valid email address.";
      }
    };

    const selectItem =()=>{
      ctx.emit('update:inputValue', itemSelected.value);
    }

    const setSelectedDropdown = () => {
      console.log(props.itemList);
      let item = props.itemList.find((obj) => {
        return obj.value == content.value;
      });
      if (item != null) {
        itemSelected.value = item;
      }
    };

    onMounted(() => {
      setSelectedDropdown()
    });

    return {
      email,
      validateEmail,
      getErrorMsg,
      isError,
      itemSelected,
      selectItem
    };
  },
});
</script>

<style scoped>

form input,
form label {
  font-size: 1.5rem;
  background-color: #fff;
  text-align: left;
}
.item-label-required:before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
</style>
