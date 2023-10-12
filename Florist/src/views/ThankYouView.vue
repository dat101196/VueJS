<template>
    <div class="grid wide thankyou__content">
        <p class="thankyou__text">Xin chân thành cảm ơn quý khách đã ủng hộ</p>
        <div class="thankyou__order-info">
            <p>Mã đơn hàng: #ABC</p>
            <p>Họ tên: {{ fullName }}</p>
            <p>Số điện thoại: {{ phoneNumber }}</p>
            <p>Địa chỉ giao hàng: {{ fullAddress() }}</p>
            <p>Tổng tiền thanh toán: {{ formatNumber(totalPayment()) }}đ</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { formatNumber } from '@/helper/UIHelper';
import { useAddressStore } from "@/stores/AddressData"
import { useShippingStore } from "@/stores/ShippingData"
import { useCartStore } from '@/stores/ShoppingCartManager';
import { storeToRefs } from "pinia";
const addrStore = useAddressStore()
const { selectedCity, selectedDistrict, selectedWard } = storeToRefs(addrStore)
const shippingStore = useShippingStore()
const { fullName, phoneNumber, addressLine } = storeToRefs(shippingStore)
const cartStore = useCartStore()
const { totalSelectedPrice } = storeToRefs(cartStore)
const shippingFee = 30000
function totalPayment() {
    return totalSelectedPrice.value + shippingFee
}

function fullAddress() {
    let addr = addressLine.value
    if (selectedWard.value) {
        addr += `, ${selectedWard.value.name}`
    }

    if (selectedDistrict.value) {
        addr += `, ${selectedDistrict.value.name}`
    }

    if (selectedCity.value) {
        addr += `, ${selectedCity.value.name}`
    }

    return addr
}
</script>
<style scoped>
.thankyou__content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.thankyou__text {
    font-size: 2.5rem;
}

.thankyou__order-info p {
    font-size: 1.6rem;
}
</style>