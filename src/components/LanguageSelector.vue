<template>
 <select v-model="lang" @change="handleLanguage()" class="select select-bordered w-full max-w-xs">
  <option value="th">ภาษาไทย</option>
  <option value="en">Englsh</option>
</select>
</template>

<script>
import {ref} from  'vue'
export default {
  name: "LanguageSelector",
  setup(props,ctx) {
    const locale = 'th'
    const  lang = ref();
    const setLocale = () => {
      lang.value = locale
    }
    const handleLanguage =()=>{
      console.log(lang.value);

    }
    setLocale()
    return {
      handleLanguage,
      lang
    }
  }

}
</script>
