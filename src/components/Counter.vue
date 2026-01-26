<template>
  <button @click="count++">Count is: {{ count }}</button>
  <br/>
  <button @click="clickBtn()">Function Count is: {{ count }}</button>
</template>

<script>
import {ref} from 'vue'

export default {
    name: "Counter",
    setup(props) {
        const  countx  = 0
        const count = ref(0)
        const clickBtn = () =>{
            console.log(countx);
            console.log(count.value);
        }
        return{
            count,
            clickBtn
        }
        
    }

}
</script>

<style lang="scss">
h1 {
    font-size: 5rem;
    span {
        color: yellow;
    }
}

</style>