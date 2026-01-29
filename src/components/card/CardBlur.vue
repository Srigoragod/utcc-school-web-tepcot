<template>
     <!-- rounded-xlshadow-sm hover:ring-1 hover:ring-blue-300/30 -->
    <div class="flex flex-col justify-between py-3 h-full">
        <!-- Top: Value -->
        <div class="flex items-start justify-between gap-3 mx-auto">
            <div class=" h-24 w-24 bg-gradient-to-r from-slate-50 to-slate-100 rounded-full shadow-sm hover:ring-1 hover:ring-blue-300/30">
                <img :src="props?.icon" alt="icon" class="h-full w-full object-contain " loading="lazy" />
            </div>
        </div>
        <h4 class="text-24 md:text-30 font-bold mt-2 md:mt-4 mb-2  text-center">
            {{ props?.title }}
        </h4>
        <div class="text-20 md:text-24 text-slate-700/90 mt-auto text-center">
            {{ props?.desc }}
        </div>
        <slot></slot>
    </div>
</template>
<script>
 import { ref,defineComponent } from "vue";

    export default defineComponent({
    name: "CardBlur",
    props: {
        icon: {
        type: String,
        required: false,
        default: "",
        },
        title: {
        type: String,
        required: true,
        },
        desc: {
        type: String,
        required: true,
        },
    },
    setup(props) {
        return {
        props,
        };
    },
    });

</script>