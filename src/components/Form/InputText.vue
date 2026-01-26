<template>
  <div class="relative">
    <label
    for="email"
    class="block mb-2 text-a-black-160A10"
    :class="[isRequired ? 'item-label-required': '']"
    >{{inputLbl.label}} </label
  >
  <input type="text"  v-model="content" @input="onChange()" :placeholder="inputLbl.placeholder" class="input input-bordered input-primary w-full" maxlength="200"  :class="[isError? 'border-red-400': '']"  required />
  <div class="text-red-500 absolute left-0 w-full"  v-if="isError">
        {{getErrorMsg}}
  </div>
  </div>
</template>

<script>
import { ref,defineComponent,computed, onMounted } from "vue";

export default defineComponent({
  name: "InputText",
  props: {
  // v-model
   inputValue:  { type: String },
   isRequired:  {type: Boolean, default: false},
   isShowError: { type: Boolean, default: false },
   isSubmitted: { type: Boolean, default: false },
   errorInfo:   { type: Object, required: true },
   // label
   inputLbl:    { type: Object, required: true }
  },
  emits: ['update:inputValue'],
  setup(props,ctx) {

    const content = ref(props.inputValue)
    const email = ref();

    const onChange = (val) => {
      let result = content.value;
      ctx.emit('update:inputValue', result);
    }

    const isError = computed(() => {
            return (props.isShowError && props.isSubmitted && !props.errorInfo.isValid);
        })
    const getErrorMsg = computed(() => {
        if (props.isShowError && props.isSubmitted && !props.errorInfo.isValid) {
            return props.errorInfo.msg
        }
        return ''
    })

    const validateInput = () => {
       if (props.isRequired && !content.value) {
          isError.value = true
          getErrorMsg.value = props.errorInfo.msg;
       }
    }

    onMounted(() => {
        validateInput()
    })
    return {
      email,
      onChange,
      getErrorMsg,
      isError,
      content
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
