<template>
    <div id="sidemenu" class="hidden z-30 fixed z-index-fixed top-0 right-0 overflow-hidden duration-1000 ease-in-out h-screen">
        <transition @click="closeMenu" name="fade">
            <div class="bg-black bg-opacity-70 w-full h-screen fixed top-0 right-0">
            </div>
        </transition>
        <div class="detail z-40 h-screen flex flex-col  relative">
            <div tabindex="0" role="button" id="menu-close-side" class="btn btn-custom btn-link absolute top-4 right-2"
                @click="closeMenu()">
                <img src="/icon/menu-close.svg" />
            </div>
            <div>
                <ul class="flex-1">
                    <li class="px-4 py-2  cursor-pointer"><a href="/">หน้าแรก</a></li>
                    <li class="px-4 py-2  cursor-pointer"><a href="aboutus">เกี่ยวกับคณะ</a></li>
                    <li class="px-4 py-2  cursor-pointer"><a href="/staff">บุคลากร</a></li>
                    <!-- <li class="px-4 py-2  cursor-pointer"><a href="/research">ผลงานวิจัย</a></li> -->
                    <li class="px-4 py-2  cursor-pointer"><a href="/#course">หลักสูตร</a></li>
                    <li class="px-4 py-2  cursor-pointer"><a href="/#faq">คำถามที่พบบ่อย</a></li>
                    <li class="px-4 py-2  cursor-pointer"><a href="/#partners">พันธมิตร</a></li>
                    <li class="px-4 py-2  cursor-pointer"><a href="/#alumni">ศิษย์เก่า</a></li>
                    <li class="px-4 py-2  cursor-pointer"><a href="/#news">ข่าวสารและกิจกรรม</a></li>
                    <li class="px-4 py-4">
                        <slot></slot>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, defineComponent } from 'vue';
export default defineComponent({
    name: "SideMenuRight",

    setup() {
        const isMenuActive = ref(true)
        const closeMenu = () => {
            isMenuActive.value = !isMenuActive.value
            sidebar.classList.remove("sidebar-open");
            sidebar.classList.add('sidebar-close');
            sidebar.classList.add('hidden');
            document.body.style.overflow = '';
        }
        return {
            isMenuActive,
            closeMenu
        }
    }

})
</script>

<style scoped>
@import "../../styles/global.css";

.detail {
    background-color: var(--accent-light);
    height: 100vh;
    padding: 94px 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    font-size: 24px;
}

#sidemenu {
    z-index: 99999;
}

.sidebar-open {
    width: 300px;
}

.sidebar-close {
    right: -300px;
}

a {
    color: white;
}

a:hover {
    color: whitesmoke;
}

.btn-custom {
    border-color: transparent !important;
    border-style: none !important;

}
</style>
