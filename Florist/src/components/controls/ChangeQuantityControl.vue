<template>
    <div class="qty-control">
        <button class="btn btn--primary-solid qty-control__btn-dec" @click="qtyValue--">-</button>
        <input type="number" class="qty-control__select-qty" v-model="qtyValue" />
        <button class="btn btn--primary-solid qty-control__btn-inc" @click="qtyValue++">+</button>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps<{
    quantityValue: number
}>()


const emit = defineEmits<{
    changeQuantity: [quantity: number]
}>()

const qtyValue = ref(props.quantityValue)
watch(qtyValue, (newVal) => {
    if (newVal <= 0) {
        qtyValue.value = 0
        return
    }

    if (newVal > 9999) {
        qtyValue.value = 9999
        return
    }
    emit('changeQuantity', newVal)
})
</script>

<style scoped>
.qty-control {
    display: flex;
    border: 1px solid var(--primary-color);
    border-radius: var(--border-radius-default);
    width: 130px;
    overflow: hidden;
}

.qty-control__btn-inc,
.qty-control__btn-dec {
    min-width: 30px;
    width: 34px;
    height: 34px;
    border: none;
    border-radius: 0;
}

.qty-control__btn-dec{
    padding: 0 14px 0 10px;
}

.qty-control__btn-inc{
    padding: 0 10px 0 14px;
}

.qty-control__select-qty {
    border-style: solid;
    border-color: var(--primary-color);
    border-width: 0 1px;
    width: 70px;
    height: 34px;
    text-align: center;
    outline: none;
    margin-left: -4px;
    margin-right: -4px;
    z-index: 1;
}
</style>