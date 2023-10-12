<template>
    <div class="grid wide checkout-container">
        <div class="row">
            <div class="col l-7 m-6 s-12">
                <FormShippingInfo />
            </div>
            <div class="col l-5 m-6 s-12">
                <CartInfo @create-order-click="onCreateOrder" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import CartInfo from "@/components/CartInfo.vue";
import FormShippingInfo from "@/components/forms/FormShippingInfo.vue"
import { useRouter } from 'vue-router'
import { useCartStore } from "@/stores/ShoppingCartManager";
const cartStore = useCartStore()
const router = useRouter()
function onCreateOrder() {
    //Call api create order
    //Success
    cartStore.clearSelectedItem()
    router.push({ name: "thankyou", params: { id: 'ABC123' } })
}

</script>

<style scoped>
@media (max-width: 740px) {
    .checkout-container {
        padding: 0 10px;
    }
}
</style>