<!-- Modal.vue -->
<template>
  <div class="fixed inset-0 z-[99]" :class="[customClass]" id="modal">
    <div class="flex items-center justify-center relative">
      <div class="fixed inset-0 backdrop-blur-xl bg-white/40" @click="closeModal"></div>
      <div class="relative rounded-2xl">
        <button @click="closeModal"
          class="btn-close btn btn-sm btn-circle flex absolute right-5 top-4 md:top-5 z-20 text-20 px-4 items-center   opacity-50 hover:opacity-100 bg-slate-400 hover:bg-blue-100 border-0">
          X
        </button>
        <div class="modal-dialog drop-shadow-xl relative bg-white rounded-lg">
          <div class="modal-dialog">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, watch } from 'vue'
export default defineComponent({
  name: "ModalVue",
  emits: ["close"],
  props: {
    isShow: { type: Boolean, require: true },
    customClass: { type: String, default: '' }
  },
  setup(props, ctx) {
    watch(props.isShow, () => {
      if (props.isShow == true) {
        console.log('watch .. isShow');
      }
    })
    const closeModal = () => {
      document.body.style.overflow = '';
      ctx.emit("close", true);
    }
    return {
      closeModal
    }
  }
});
</script>

<style scoped>
#modal {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  height: 100%;
  vertical-align: middle;
}

.modal-dialog {
  max-width: 999px;
  position: relative;
}

.modal-body {
  position: relative;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
}

@media only screen and (max-width: 767px) {
  .modal-dialog {
    max-width: 380px;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .modal-dialog {
    max-width: 678px;
  }

  .btn-close {
    top: 1rem;
    right: 1rem;
    color: #030e62;
  }
}
</style>
