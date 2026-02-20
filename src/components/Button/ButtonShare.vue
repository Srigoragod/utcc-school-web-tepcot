<template>
    <div class="flex-col py-8 items-center justify-center">
       <span class="text-share flex justify-center text-20 lg:text-24 text-a-gold-F0C571 mb-2 ">
           {{ !isBlog ? ' แชร์ข่าวนี้' : 'แชร์บทความนี้' }}  
        </span>
    <div class="flex items-center justify-center gap-2">
    <div class="button-share">
        <button class="btn btn-circle bg-blue-50 hover bg-blue-100 shadow hover:shadow-md" @click="shareFacebook" aria-label="Share on Facebook">
           <img src="/icon/sc-facebook-black.svg" class="h-6" alt="Facebook" />
        </button>
        <button class="btn btn-circle bg-blue-50 hover bg-blue-100 shadow hover:shadow-md" @click="shareLine" aria-label="Share on Line">
                <img src="/icon/sc-line.svg" class="h-6" alt="Line" />
        </button>
        <button class="btn  btn-circle bg-blue-50 hover bg-blue-100 shadow hover:shadow-md" @click="shareLinkedIn" aria-label="Share on LinkedIn">
           <img src="/icon/sc-linkedIn.svg" class="h-4" alt="Icon LinkedIn" />
        </button>
        <button class="btn btn-circle bg-blue-50 hover bg-blue-100 shadow hover:shadow-md" @click="copyUrl" aria-label="Copy URL">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
        </svg>

        </button>
    </div>

    </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import Swal from "sweetalert2";
import 'sweetalert2/src/sweetalert2.scss'

export default {
    name: 'ButtonShare',
    props: {
        url: {type: String, required: true},
        isBlog: {type: Boolean, default: true}
    },
    setup(props) {
        const url =  ref(props.url);
        const copied = ref(false)
        const copyUrl = () => {
            navigator.clipboard.writeText(url.value).then(() => {
                copied.value = true
                Swal.fire({
                    icon: 'success',
                    title: 'คัดลอกแล้ว!',
                    showConfirmButton: false,
                    timer: 1500
                })

            })
        }
        const shareFacebook = () => {
            window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url.value)}`,
                '_blank'
            )
        }
        const shareLine = () => {
            window.open(
                `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url.value)}`,
                '_blank'
            )
        }
        const shareLinkedIn = () => {
            window.open(
                `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url.value)}`,
                '_blank'
            )
        }
        return { copied, copyUrl, shareFacebook, shareLine, shareLinkedIn }
    }
}

</script>

<style scoped>
.btn-circle {
    border-radius: 9999px !important;
}
.button-share {
    display: flex;
    align-items: center;
    gap: 8px;
}
.button-share button {
  
    border: none;
    cursor: pointer;
    padding: 6px;
    border-radius: 4px;
    transition: background 0.2s;
}

.button-share img {
    width: 24px;
    height: 24px;
}
.copied-msg {
    margin-left: 8px;
    color: #4caf50;
    font-size: 0.9em;
}
</style>