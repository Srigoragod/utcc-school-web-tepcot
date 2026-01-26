<template>
  <div class="p-4 md:p-10 bg-white shadow-xl relative">
    <div class="container mx-auto rounded-2xl ">
      <div class="text-center">
        <h2 class="text-36 md:text-44 text-a-blue-0F2CE1">
          ดาวน์โหลดไฟล์
        </h2>
        <!-- <h6 class="text-[18px] md:text-20 text-a-gray-696F6F  pb-4 font-light leading-none text-center">
          Explore our innovative programs and opportunities. <br/> Download our file to learn more about our curriculum and community.
        </h6> -->
        <div>
              <h4 class="text-24 text-a-blue-0F2CE1 font-light text-center">กรอกข้อมูลเพื่อดาวน์โหลดไฟล์รายละเอียดเพิ่มเติม</h4>
            </div>
      </div>
      <div class="px-4 max-h-[645px] w-max-8/12 md:max-h-fit overflow-y-auto hide-scroll">
        <form @submit.prevent="submitForm" >
          <div class="grid grid-cols-1 gap-6 items-start items-group items-group-info pt-0">
            <div class="pt-2">
              <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <InputText
                   v-model:inputValue="nameInput"
                    :isShowError="true"
                    :isSubmitted="isSubmitted"
                    :inputLbl="{ label: 'ชื่อ', placeholder: 'ชื่อ' }"
                    :errorInfo="{ isValid: true, msg: 'กรุณากรอกชื่อ' }"
                    :isRequired="true"
                    @update:inputValue="onValueUpdate()"
                  />
                </div>
                <div>
                  <InputText
                   v-model:inputValue="lastNameInput"
                    :isShowError="true"
                    :isSubmitted="isSubmitted"
                    :inputLbl="{ label: 'นามสกุล', placeholder: 'นามสกุล' }"
                    :errorInfo="{ isValid: true, msg: 'กรุณากรอกนามสกุล' }"
                    :isRequired="true"
                    @update:inputValue="onValueUpdate()"
                  />
                </div>
              </div>
              <div class="grid grid-cols-1 gap-6">
                <div >
                  <InputEmail
                  v-model:inputValue="emailInput"
                  :isRequired="true"
                  :isShowError="true"
                  :isSubmitted="isSubmitted"
                  @update:inputValue="onValueUpdate()"></InputEmail>
                </div>
                <div class="relative" >
                  <InputPhone
                   class=""
                   v-model:inputValue="phoneInput"
                  :errorInfo="{ isValid: true, msg: 'กรุณากรอกเบอร์มือถือ' }"
                  :isRequired="false"
                  :isShowError="true"
                  :isSubmitted="isSubmitted"
                  @update:inputValue="onValueUpdate()"
                  ></InputPhone>
                </div>

                <div class="relative">
                  <div class="form-control flex-row">
                      <label class="label cursor-pointer flex gap-4 items-center">
                        <input v-model="isConsent" type="checkbox" class="checkbox checkbox-primary  checkbox-md" />
                        <span class="label-text text-20 text-left font-light">
                          ข้าพเจ้าอ่านและยินยอมตามนโยบายคุ้มครองข้อมูลส่วนบุคคลของมหาวิทยาลัย หรือที่อาจเปลี่ยนแปลงแก้ไขในภายหลัง <br/>
                          <a href="https://www.utcc.ac.th/privacy-policy" target="_blank" class="text-a-blue-0F2CE1 underline underline-offset-1">https://www.utcc.ac.th/privacy-policy</a>
                        </span>
                      </label>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div class="grid grid-cols-1 gap-6 relative pt-10">
              <div class="text-center">
                <button  :disabled="!isConsent" class="btn  button-2 bg-a-blue-0033A1  hover:bg-a-blue-021430 px-20 rounded-full uppercase text-white text-20 md:text-24" >
                    ส่งข้อมูล
                </button>
              </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
import axios from 'axios';
import InputText from "./InputText.vue";
import InputEmail from "./InputEmail.vue";
import InputPhone from "./InputPhone.vue";
import InputDropdown from "./InputDropdown.vue";

import Swal from "sweetalert2";
import 'sweetalert2/src/sweetalert2.scss'


export default defineComponent({
  name: "DownloadForm",
  components: {
    InputText,
    InputEmail,
    InputPhone,
    InputDropdown
  },
  emits: ['handleDownload'],
  setup(props,ctx) {
    const isSubmitted = ref(false)
    const educationInput = ref(null)
    const programInput = ref(null)
    const semesterInput = ref(null)
    const phoneInput = ref(null)
    const emailInput = ref(null)
    const nationalityInput = ref(null)
    const nameInput = ref(null)
    const lastNameInput = ref(null)
    const schoolInput = ref(null)
    const descInput =ref(null)

    const educationList = ref(null)
    const programList = ref(null)
    const semesterList = ref(null)
    const isConsent = ref(false)

    const onValueUpdate = () => {
       let data = {
         name: nameInput.value,
         lastName: lastNameInput.value,
         email: emailInput.value,
         phone: phoneInput.value,
         isConsent: isConsent.value
       }

       if( isConsent.value   &&  !phoneInput.value ){
           isConsent.value = false
       }
    }

    const submitForm = async() => {
        isSubmitted.value = true
        const url =  import.meta.env.PUBLIC_API_DOWNLOAD_FILE;
        const currentUrl = window.location.href;
        const recordData = {
            "first_name":  nameInput.value,
            "last_name": lastNameInput.value,
            "email": emailInput.value,
            "phone_number": phoneInput.value,
            "postal_code": '10400',
            "is_consent" : 1,
            "course_code": currentUrl
          }

          try {
            const response = await axios.post(url, recordData);
            if(response){
              Swal.fire({
              title: 'สำเร็จ!',
              text: 'กดปุ่มดาวน์โหลดเพื่อเพื่อรับรายละเอียดเพิ่มเติม',
              icon: 'success',
              confirmButtonText: 'Download'
            }).then((result) => {
              if (result.isConfirmed) {
                ctx.emit("handleDownload", false);
              }
            });
            }
           
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            title: 'ผิดพลาด!',
            text: 'เกิดข้อผิดพลาดในการส่งแบบฟอร์มของคุณ โปรดลองอีกครั้ง',
            icon: 'error',
            confirmButtonText: 'ตกลง'
        });
    }
    }



    return {
      isConsent,
      onValueUpdate,
      educationInput,
      programInput,
      semesterInput,
      phoneInput,
      emailInput,
      nationalityInput,
      isSubmitted,
      semesterList,
      educationList,
      programList,
      nameInput,
      lastNameInput,
      schoolInput,
      descInput,
      submitForm

    }
  }
})
</script>

<style>
.btn:disabled {
  background-color: #E9F0FF;
  opacity: 0.5;
}
.swal2-confirm {
  background-color: #0F2CE1;
  color: #fff;
  font-size: 1.5rem;
}
#swal2-html-container {
  font-size: 1.5rem;
}
.templateWidth{
  width: 100% !important;
}
</style>
<style scoped>

form input,
form label {
  font-size: 1.5rem;
  background-color: #fff;
  color: #160A10 !important;
}
@media only screen and (max-width: 767px) {
  .items-group {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  .custom-container{
    padding: 0 1rem;
  }
}
@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .items-group {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>
