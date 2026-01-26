<template>
  <div class="relative">
    <label
    for="email"
    class="block mb-2 text-a-black-160A10"
    :class="[isRequired ? 'item-label-required': '']"
    >Email </label
  >

  <input type="email" v-model="emailInput"  placeholder="name@example.com" class="input input-bordered input-primary w-full" :class="[isError? 'border-red-400': '']" @change="validateEmail(emailInput)" />
  <div class="text-red-500 absolute left-0 w-full"  v-if="isError">
          {{getErrorMsg}}
      </div>
  </div>
</template>

<script>
// computed
import { ref,defineComponent  } from "vue";

export default defineComponent({
  name: "InputEmail",
  props: {
    // v-model
    inputValue: { type: String },
    isRequired: { type: Boolean, default: false },
    isShowError: { type: Boolean, default: false },
    isSubmitted: { type: Boolean, default: false },
    errorInfo:   { type: Object, required: true }

  },
  emits: ['update:inputValue'],
  setup(props, ctx) {
    const getErrorMsg = ref('');
    const emailInput = ref(null);
    const isError  = ref(false)

    const validateEmail = (email) => {
      var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let data = null
      if (emailRegex.test(email)) {
        isError.value = false;
        getErrorMsg.value = ""; // Email is valid
        data = emailInput.value;
      } else {
        isError.value = true;
        getErrorMsg.value = "Please enter a valid email address.";
      }
      ctx.emit('update:inputValue', data);
    }
    return {
      emailInput,
      validateEmail,
      getErrorMsg,
      isError
    }
  }
})
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
