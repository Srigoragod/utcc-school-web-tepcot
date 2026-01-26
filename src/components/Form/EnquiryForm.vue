<template>
  <div class="py-40 bg-form">
    <div class="container mx-auto bg-white shadow-xl rounded-2xl p-4 sm:p-4 md:p-4 lg:p-10 ">
      <div class="text-center">
        <h2 class="text-54 md:text-54 lg:text-80 uppercas text-1-line leading-none  pl-8 lg:p-0 font-semibold ">
          Enquiry Form
        </h2>
        <h4 class="text-30"> Lorem ipsum dolor sit amet consectetur adipisicing elit.</h4>
      </div>
      <div class="py-8">
        <form @submit.prevent="submitForm" >
          <div class="grid grid-cols-3 gap-6 items-start items-group items-group-info border-b border-b-slate-200 pt-4">
            <div>
              <h4 class="text-30 text-a-gray-696F6F">Content Information</h4>
            </div>
            <div class="col-span-2 pt-2">
              <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <InputText
                   v-model:inputValue="nameInput"
                    :isShowError="true"
                    :isSubmitted="isSubmitted"
                    :inputLbl="{ label: 'Name', placeholder: 'Full Name' }"
                    :errorInfo="{ isValid: true, msg: 'Enter valid name' }"
                    :isRequired="true"
                    @update:inputValue="onValueUpdate()"
                  />
                </div>
                <div>
                  <InputText
                    v-model:inputValue="nationalityInput"
                    :isShowError="true"
                    :isSubmitted="isSubmitted"
                    :inputLbl="{ label: 'Nationality', placeholder: '' }"
                    :errorInfo="{ isValid: true, msg: 'Enter valid nationality'}"
                    :isRequired="true"
                    @update:inputValue="onValueUpdate()"
                  />
                </div>
                <div>
                  <InputEmail
                  v-model:inputValue="emailInput"
                  :isRequired="true"
                  :isShowError="true"
                  :isSubmitted="isSubmitted"
                  @update:inputValue="onValueUpdate()"></InputEmail>
                </div>
                <div class="relative">
                  <InputPhone 
                   class="absolute z-10"
                   v-model:inputValue="phoneInput"
                  :isRequired="true"
                  :isSubmitted="isSubmitted"
                  @update:inputValue="onValueUpdate()"
                  ></InputPhone>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-6 items-start items-group items-group-education border-b border-b-slate-200 pt-4">
            <div>
              <h4 class="text-30 text-a-gray-696F6F">Education</h4>
            </div>
            <div class="col-span-2 pt-2">
              <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <InputDropdown
                    v-model:inputValue="educationInput"
                    :inputLbl="{ label: 'Current Education Status', placeholder: 'Select' }"
                    :isRequired="true"
                    :itemList="educationList"
                    @update:inputValue="onValueUpdate()"
                  />
                </div>
                <div>
                  <InputText
                    v-model:inputValue="schoolInput"
                    :inputLbl="{ label: 'School /University Name ', placeholder: '' }"
                    :isRequired="true"
                    :isShowError="true"
                    :isSubmitted="isSubmitted"
                    :errorInfo="{ isValid: true, msg: 'Enter valid school /university name' }"
                    @update:inputValue="onValueUpdate()"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-6 items-start items-group">
            <div>
              <h4 class="text-30 text-a-gray-696F6F">Interests</h4>
            </div>
            <div class="col-span-2 pt-2">
              <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <InputDropdown
                    v-model:inputValue="programInput"
                    :inputLbl="{ label: 'Program Interested', placeholder: 'Select' }"
                    :isRequired="true"
                    :itemList="programList"
                    @update:inputValue="onValueUpdate()"
                  />
                </div>
                <div>
                  <InputDropdown
                    v-model:inputValue="semesterInput"
                    :inputLbl="{ label: 'Entry Semester', placeholder: 'Select' }"
                    :isRequired="true"
                    :itemList="semesterList"
                    @update:inputValue="onValueUpdate()"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-6 items-start items-group">
            <div>
            </div>
            <div class="col-span-2 pt-2">
              <label class="block mb-2" >Direct Message </label>
              <div class="mb-6">
                  <textarea v-model="descInput" class="textarea textarea-info text-24 w-full" placeholder="Enter Message" maxlength="1000"></textarea>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-6 items-start items-group">
            <div>
            </div>
            <div class="col-span-2 pt-2">
              <div class="mb-6 text-center">
                <button @click="clickSend()" class="btn btn-active button-2  bg-a-blue-0F2CE1 hover:bg-a-blue-22099E px-20 rounded-full font-normal uppercase text-white text-24" >
                    Send
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, onMounted } from "vue";
import InputText from "./InputText.vue";
import InputEmail from "./InputEmail.vue";
import InputPhone from "./InputPhone.vue";
import InputDropdown from "./InputDropdown.vue";

import Swal from "sweetalert2";
import 'sweetalert2/src/sweetalert2.scss'
export default defineComponent({
  name: "EnquiryForm",
  components: {
    InputText,
    InputEmail,
    InputPhone,
    InputDropdown
  },
  setup(props) {
    const isSubmitted = ref(false)
    const educationInput = ref(null)
    const programInput = ref(null)
    const semesterInput = ref(null)
    const phoneInput = ref(null)
    const emailInput = ref(null)
    const nationalityInput = ref(null)
    const nameInput = ref(null)
    const schoolInput = ref(null)
    const descInput =ref(null)

    const educationList = ref(null)
    const programList = ref(null)
    const semesterList = ref(null)

    const messageAlert = () => {
      // Swal.fire({
      //   title: "Thank You!",
      //   text: "Your message has been received. We will contact you as soon as possible.",
      //   icon: "question",
      //   timer: 3000
      // });
      Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  }
});
      
    };

    const setEducationList = ()=>{
      educationList.value = [
        {
          id:0,
          label: 'Grade 12',
          value: 'Grade 12'
        },
        {
          id:1,
          label: 'M.6',
          value: 'M.6'
        },
        {
          id:2,
          label: 'GED',
          value: 'GED'
        },
        {
          id:3,
          label: 'IB Certificate',
          value: 'IB Certificate'
        },
        {
          id:4,
          label: 'A LEVEL',
          value: 'A LEVEL'
        },
        {
          id:5,
          label: 'Bachelor’s degree',
          value: 'Bachelor’s degree'
        },
        {
          id:5,
          label: 'Master’s degree',
          value: 'Master’s degree'
        }
      ]
    }
    const setProgramList = ()=>{
      programList.value = [
        {
          id:0,
          label: 'BBA - International Business Management',
          value: 'BBA - International Business Management'
        },
        {
          id:1,
          label: 'BACC – Bachelor of Accountancy',
          value: 'BACC – Bachelor of Accountancy'
        },
        {
          id:2,
          label: 'BA - Business English Option in the major',
          value: 'BA - Business English Option in the major'
        },
        {
          id:3,
          label: 'GLOBAL MBA',
          value: 'GLOBAL MBA'
        },
        {
          id:4,
          label: 'BBA (MCU Program)',
          value: 'BBA (MCU Program)'
        },
        {
          id:5,
          label: 'XMBA',
          value: 'XMBA'
        },
        {
          id:5,
          label: 'Doctor of Management',
          value: 'Doctor of Management'
        }
      ]
    }
    const setSemester = () =>{
      // const currentYear = new Date().getFullYear();
      semesterList.value = [
         {
          id:0,
          label: 'JAN 2023',
          value: 'JAN 2023'
        },
        {
          id:1,
          label: 'AUG 2023',
          value: 'AUG 2023'
        },
        {
          id:2,
          label: 'JAN 2024',
          value: 'JAN 2024'
        },
        {
          id:3,
          label: 'AUG 2024',
          value: 'AUG 2024'
        }
      ]
    }
    const onValueUpdate = () => {
       let data = {
         name: nameInput.value,
         nationality: nationalityInput.value,
         email: emailInput.value,
         phone: phoneInput.value,
         status_education: educationInput.value,
         history_school: schoolInput.value,
         programInters: programInput.value,
         semesterInters: semesterInput.value,
         direct_message: descInput.value
       }
       messageAlert()
       console.log('data ...', JSON.stringify(data,null,4));
    }

    const clickSend = () => {
      messageAlert()
    }

    onMounted(() => {
      setEducationList();
      setProgramList();
      setSemester();
    });

    return {
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
      schoolInput,
      descInput,
      clickSend

    }
  }
})
</script>

<style scoped>
form input,
form label {
  font-size: 1.25rem;
  background-color: #fff;
  text-align: left;
}
.bg-form {
  background-image: url('../../assets/image/wavy_black-01.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
}
@media only screen and (max-width: 767px) {
  .items-group {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  .items-group-info {
     padding-bottom: 6rem;
  }
  .custom-container{
    padding: 0 1rem;
  }
  h4 {
    font-size: 1.75rem;
  }
}
@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .items-group {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  .items-group-info {
     padding-bottom: 6rem;
  }
}
</style>
