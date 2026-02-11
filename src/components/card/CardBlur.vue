<template>
     <!-- rounded-xlshadow-sm hover:ring-1 hover:ring-blue-300/30 -->
    <div class="flex flex-col justify-between p-3 h-full bg-white">
        <!-- Top: Value -->
        <div class="flex items-start justify-between gap-3">
            <div class=" h-24 w-24 group-hover:shadow-lg hover:ring-1 hover:ring-blue-300/30 mx-auto">
                <img :src="props?.icon" alt="icon" class="h-18 md:h-20 w-18 md:w-20 object-contain " loading="lazy" />
            </div>
        </div>
        <h4 class="text-20 md:text-24  mt-2 md:mt-4 mb-2  text-center text-a-blue-1c1c84">
            {{ props?.title }}
        </h4>
        <div class="text-base md:text-20 text-slate-700/90 mt-auto line-clamp-2 text-center  font-light">
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