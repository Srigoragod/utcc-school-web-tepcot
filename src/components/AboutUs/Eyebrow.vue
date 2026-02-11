<template>
  <h6 class="text-20 font-light  text-a-blue-2B7FFF max-w-fit group-hover:bg-blue-950 rounded-[20px_0_20px_0] px-4">{{ textShow }} </h6>
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