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
    width: 130px
}

.qty-control__btn-inc,
.qty-control__btn-dec {
    min-width: 30px;
    width: 30px;
    height: 34px;
    border: none;
    border-radius: 0;
}

.qty-control__select-qty {
    border-style: solid;
    border-color: var(--primary-color);
    border-width: 0 1px;
    width: 68px;
    height: 34px;
    text-align: center;
    outline: none;
}
</style>