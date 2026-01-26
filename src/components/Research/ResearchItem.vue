<template>
    <div class="container py-4 grid grid-rows-1 md:grid-cols-1 lg:grid-cols-2 gap-4" id="researchChild">
        <div class="item flex shadow-sm hover:shadow-md rounded-md cursor-pointer" v-for="item in researchList" :key="item"
            :class="[item.type ? item.type : '0']" @click="clickShow(item)">
            <div class="item-image bg-a-blue-0033A1 min-w-32 px-4 flex justify-center items-center rounded-l-lg">
                <img src="../../../public/icon/UTCC_Vertical_AI-02.png" alt="Utcc Logo">
            </div>
            <div class="p-4">
                <h3 class="text-a-red-E9252B text-24 border-b-2  border-b-a-blue-0033A1 mb-2 text-1-line">{{
                    item.title }}
                </h3>
                <div class="flex gap-2 items-start">
                    <UserCircleIcon class="h-6 w-6 text-slate-300" />
                    <div>{{ item.staff }}</div>
                </div>
                <div class="flex gap-2 items-start">
                    <BookOpenIcon class="h-6 w-6 text-slate-300" />
                    <div class="text-2-line font-light"> {{ item.content ? item.content : '-'  }} </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <ModalMaster v-if="showModal" :customClass="'content-center'" @close="clikeClose" :isShow="showModal">
        <!-- Modal content -->
        <div class="parent relative w-full rounded-2xl bg-white max-w-96">
            <div class="min-h-64  max-auto">
                <div class="flex justify-center items-center">
                    <div class=" max-w-40 p-4 bg-a-blue-030e62 rounded-full mt-8">
                        <img src="../../../public/icon/UTCC_Vertical_AI-02.png" alt="Utcc Logo">
                    </div>
                </div>

                <div class="pb-10 px-4">
                    <h2 class="text-24 lg:text-30 text-a-orage-F36A10">
                        {{ itemShow.title }}
                    </h2>
                    <div class="text-24 py-4 max-w-96  overflow-y-auto max-h-52">
                        {{ itemShow.content }}
                    </div>

                    <h2 class="card-title flex gap-2 items-center font-light">
                        <UserCircleIcon class="h-4 w-4 text-slate-300" />
                        <div>{{ itemShow.staff }}</div>
                    </h2>
                    <div class="flex gap-2 items-center font-light" >
                        <ClockIcon class="h-4 w-4 text-slate-300" />
                        <div>{{ itemShow.type ? itemShow.type : 'ไม่ระบุ' }}</div>
                    </div>
                </div>

            </div>
            <div class="flex justify-end px-4">
                <button @click="clikeClose"
                    class="btn btn-sm text-20  absolute text-a-black-1F2937 bottom-4 right-4">Close</button>
            </div>
        </div>
    </ModalMaster>
    <!-- / Modal -->
</template>

<script>
import { ref, defineComponent } from "vue";
import { useTranslations } from "../../i18n/utils";
import { UserCircleIcon, BookOpenIcon, ClockIcon } from '@heroicons/vue/24/solid'

import ModalMaster from "../Modal/Modal.vue"

export default defineComponent({
    name: "Research",
    components: {
        ModalMaster,
        UserCircleIcon,
        BookOpenIcon,
        ClockIcon
    },
    props: {
        lang: { type: String, default: 'th', require: true }
    },
    setup(props) {
        const itemShow = ref(null);
        const showModal = ref(false);
        const researchList = ref(null);
        const uri = import.meta.env.PUBLIC_API_WP_RESEARCH;
        const t = useTranslations(props.lang);
        const fetchData = () => {
            fetch(uri, {
                mode: "cors",
            })
                .then((response) => response.json())
                .then((data) => ((
                    researchList.value = props.lang == 'en' ? data.en : data.th
                ), initialData(researchList.value)))
                .catch((error) => console.error("Error fetching researchList Data:", error));
        }
        const initialData = (data) => {
            researchList.value = data
        }
        const clickShow = (item) => {
            // console.log('clickShow ... ', item);
            itemShow.value = item;
            showModal.value = true;
            document.body.style.overflow = "hidden";
        };
        const clikeClose = () => {
            document.body.style.overflow = '';
            showModal.value = false;
        }
        fetchData();
        return {
            researchList,
            t,
            itemShow,
            showModal,
            clickShow,
            clikeClose
        }
    }

})

</script>

<style lang="scss" scoped>
.item-image {
    width: 100px;
    height: auto;

    img {
        width: 100%;
        height: auto;
        min-width: 80px;
    }
}
</style>