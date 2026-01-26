<template>
    <h2 class="text-44">
        <div class="text-container">
            <span style="--i: 0">UTCC หลักสูตรครบครันทุกระดับ ตั้งแต่ปริญญาตรี ปริญญาโท ปริญญาเอก ปริญญาตรีที่ 2 และ e-Learning จบปวส. พร้อมเทียบโอนหน่วยกิตได้
              ตอบโจทย์ทุกความต้องการอย่างมีคุณภาพ</span>
            <span style="--i: 1">こんにちは</span>
            <span style="--i: 2">안녕하세요 </span>
            <span style="--i: 3">你好</span>
            <span style="--i: 4">สวัสดี</span>
        </div>
    </h2>
</template>

<script>
import {ref, defineComponent} from "vue";
export default defineComponent({
    name: "WordRotation",
    setup(){

    }
})

</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

h2 {
  display: inline-block;
}

.text-container {
  display: inline-flex;
  flex-direction: column;
  height: 4rem;
  overflow: hidden;
}

.text-container span {
  height: 4.75rem;
  color: #FEE;
  animation: moveUp 8s linear infinite;
}

@keyframes moveUp {
  0% {
    transform: translateY(0);
  }
  
  5% {
    transform: translateY(0);
  }

  15% {
    transform: translateY(-1rem);
  }

  25% {
    transform: translateY(-2rem);
  }

  35% {
    transform: translateY(-3rem);
  }

  45% {
    transform: translateY(-4rem);
  }

  55% {
    transform: translateY(-5rem);
  }

  65% {
    transform: translateY(-6rem);
  }

  75% {
    transform: translateY(-9rem);
  }

  95% {
    transform: translateY(-11rem);
  }

  100% {
    transform: translateY(0);
  }
}

</style>