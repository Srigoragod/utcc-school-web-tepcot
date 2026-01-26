<template>
  <div class="table my-8">
    <h3 class="text-20  md:text-24">อัตราค่าเล่าเรียน</h3>
    <!-- table -->
    <div class="table-info grid grid-flow-col grid-cols-2 gap-4"
      :class="[detailFee && detailFee.length > 2 ? 'grid-rows-2' : '']">
      <div class="my-4 grid gap-4 bg-gray-100 rounded-2xl text-a-black-1F2937 " v-for="(item, index) in detailFee"
        :key="index">
        <div>
          <h3 class="text-20 md:text-24 py-2 text-center bg-gradient-gray rounded-t-2xl">
            {{ item.label }}
          </h3>
          <div class="grid grid-cols-3 text-20 md:text-24 rounded-2xl text-a-black-1F2937 shadow-xl ">
            <div v-for="slot in item.children" :key="slot.id">
              <h4 class="p-2 bg-gray-200 text-center font-thin">{{ slot.label }}</h4>
              <div
                class="p-2 text-1-line border-t border-a-black-1F2937 bg-gray-100  text-center rounded-b-2xl text-30">
                <h3 class="text-20 md:text-24 font-light" v-if="formatCurrencyThai(slot.amount) != '0'">
                  {{ formatCurrencyThai(slot.amount) }}&nbsp;{{
                    txtCurrency
                  }}</h3>
                <div v-else>-</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- / table -->
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
export default defineComponent({
  name: "TableDetailFee",
  props: {
    items: { type: Object, require: true },
  },
  setup(props, ctx) {
    const detailFee = ref(null);
    const txtCurrency = ref("");
    const formatCurrencyThai = (val) => {
      var price = parseInt(val);
      if (typeof price === "number") {
        const formatter = new Intl.NumberFormat("th-TH", {
          style: "currency",
          currency: "THB",
          maximumFractionDigits: 0,
        });
        return formatter.format(val).replace(/฿/g, "");
      } else {
        return null;
      }
    };
    const loadData = () => {
      detailFee.value = props.items;
      const lang = location.pathname.split("/")[1];
      txtCurrency.value = lang == "th" ? "บาท" : "THB";
    };
    loadData();
    
    return {
      detailFee,
      txtCurrency,
      formatCurrencyThai,
    };
  },
});
</script>

<style scoped>
@media only screen and (max-width: 767px) {
  .is-desktop {
    display: none;
  }

  .is-desktop {
    display: none;
  }

  .topic {
    padding: 0 1rem;
  }

  .table-info {
    display: flex;
    flex-direction: column;
    padding: 0 .25rem;
    gap: 0;

  }

  .p-4 {
    padding: 1rem .5rem;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .is-mobile {
    display: none;
  }

  .table-info {
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    gap: 0;
  }
}

@media only screen and (min-width: 1024px) {
  .is-mobile {
    display: none;
  }
}
</style>
