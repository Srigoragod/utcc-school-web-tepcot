<template>
  <h6 class="text-20 font-light  capitalize text-a-blue-265EF7 max-w-fit  group-hover:bg-blue-950">{{ textShow }} </h6>
</template>
<script >
export default {
  name: "Eyebrow",
  props: {
    text: { type: String, default: 'Executive Education' }
  },
  setup(props) {
    const textShow = props.text;
    return {
      textShow
    }
  }
}
</script>