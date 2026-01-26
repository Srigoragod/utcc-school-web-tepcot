<template>
    <div class="grid grid-cols-1 md:grid-cols-4 md:gap-6">
        <div class="py-4">
            <ul class="menu w-auto md:w-full lg:w-4/5 rounded-box text-20 py-4">
                <li v-for="type in uniqueTypes" :key="type" @click="filterData(type)" style="cursor: pointer;"
                    :class="{ active: activeType === type }">
                    <div class="text-1-line">{{ type === '0' ? 'ทั้งหมด' : type === '1' ? 'ผู้บริหารคณะ' : type ===
                        '2' ? 'อาจารย์ผู้เชี่ยวชาญพิเศษ' : type === '3' ? 'เจ้าหน้าที่' : type }}</div>
                </li>
            </ul>
        </div>
        <div class="col-span-3 py-4">
            <div class="container-staff grid grid-rows-1 grid-cols-3 gap-4 md:gap-6 fade-in">
                <CardStaffV2 :item="item" v-for="(item, index) in filteredData" :key="index" @click="clickShow(item)" />
            </div>
        </div>
    </div>
    <!-- Modal -->
    <ModalMaster v-if="showModal" :customClass="'content-center'" @close="clikeClose" :isShow="showModal">
        <!-- Modal content -->
        <div class="parent relative w-full rounded-2xl bg-white">
            <ContentModalStaff :item="itemShow"></ContentModalStaff>
            <div class="flex justify-end px-4">
                <button @click="clikeClose"
                    class="btn btn-sm text-20  absolute text-a-violet-5C019E bg-white bottom-4 right-4">Close</button>
            </div>
        </div>

    </ModalMaster>
    <!-- / Modal -->
</template>
<script>
import { ref, defineComponent } from "vue";
import CardStaffV2 from "./CardStaffV2.vue";
import CardStaffSkeleton from "./CardStaffSkeleton.vue";
import ModalMaster from "../Modal/Modal.vue";
import ContentModalStaff from "./ContentModalStaff.vue"

export default defineComponent({
    name: "StaffSectionV2",
    components: {
        CardStaffV2,
        CardStaffSkeleton,
        ModalMaster,
        ContentModalStaff
    },
    setup() {
        const isLoading = ref(true);
        const itemShow = ref([]);

        const showModal = ref(false);
        const allData = ref([]);
        const filteredData = ref([]);
        const uniqueTypes = ref([]);
        const activeType = ref('0');
        const uri = import.meta.env.PUBLIC_API_WP_STAFF;

        const fetchData = () => {
            fetch(`${uri}?per_page=60&_embed&acf_format=standard&_fields=title,acf,slug,id`, {
                mode: "cors",
            })
                .then(response => response.json())
                .then(data => {
                    allData.value = data;
                    filteredData.value = allData.value;
                    extractUniqueTypes();
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        };

        const extractUniqueTypes = () => {
            const types = new Set();
            allData.value.forEach(item => {
                item.acf.type.forEach(type => {
                    types.add(type);
                });
            });
            uniqueTypes.value = Array.from(types).sort((a, b) => {
                return Number(a) - Number(b);
            });
        };

        const filterData = (type) => {
            activeType.value = type;
            let filtered = allData.value.filter(item => item.acf.type.includes(type));
            filteredData.value = filtered;
        };

        const clickShow = (item) => {
            itemShow.value = item;
            showModal.value = true;
            document.body.style.overflow = "hidden";
        };

        const clikeClose = () => {
            document.body.style.overflow = '';
            showModal.value = false;
        };

        fetchData();

        return {
            filteredData,
            uniqueTypes,
            filterData,
            activeType,
            showModal,
            itemShow,
            clickShow,
            clikeClose,
        };
    },
});

</script>
<style scoped>
.menu {
    padding: 0;
}

.menu li {
    border-radius: 0;
    line-height: 2rem;
    background-color: #ffdead;
    color: #C9A163;
}

.menu li:first-child {
    border-radius: 15px 15px 0 0;
}

.menu li:last-child {
    border-radius: 0 0 15px 15px;
}

.menu li:hover {
    background: #ffdead;
    color: #C9A163;
    text-decoration: none;
}

.menu li.active {
    background: #030e62;
    color: #fff;
    text-decoration: none;
}

@media only screen and (max-width: 767px) {
    .container-staff {
        grid-template-columns: repeat(1, minmax(0, 1fr));
        /* padding: 0.5rem; */
    }
}

@media only screen and (min-width: 768px) and (max-width: 1023px) {
    .container-staff {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        /* padding: 1rem; */
    }
}

@media only screen and (min-width: 1366px) and (orientation: landscape) {
    .container-staff {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        /* padding: 1rem; */
    }
}

@media only screen and (min-width: 1024px) and (orientation: portrait) {
    .container-staff {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        /* padding: 1rem; */
    }
}

@media (max-width: 767px) {
    .menu {
        flex-direction: row;
        flex-wrap: nowrap;
        overflow-x: scroll;
    }

    .menu li:first-child {
        border-radius: 15px 0 0 15px;
    }

    .menu li:last-child {
        border-radius: 0 15px 15px 0;
    }
}
</style>