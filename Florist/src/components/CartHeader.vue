<template>
    <!-- Cart -->
    <div class="header__cart" :class="{ shake: shakeCart }">
        <div class="header__cart-wrap">

            <div class="header__cart-icon-container">
                <AppLink :to="{ name: 'cart-detail' }">
                    <i class="header__cart-icon ti-shopping-cart"></i>
                    <span class="header__cart-number-badge">{{ totalQty > 99 ? "99+" : totalQty }}</span>
                </AppLink>
            </div>

            <div class="header__cart-list">
                <!-- Empty cart UI -->
                <div class="header__cart-empty-cart" v-if="!listCartItems || listCartItems?.length <= 0">
                    <img src="../assets/img/empty-cart.png" alt="" class="header__cart-empty-cart-img">
                    <p class="header__cart-empty-cart-text">Giỏ hàng của bạn đang trống</p>
                </div>
                <!--  -->
                <div class="header__cart-have-items" v-if="listCartItems && listCartItems?.length > 0">
                    <h4 class="header__cart-heading">Sản phẩm đã thêm</h4>
                    <div class="header__cart-list-items">
                        <AppLink class="header__cart-item" v-for="( item, index ) in  listCartItems " :key="index"
                            :to="{ name: 'flower-detail', params: { id: item.flower.id } }">
                            <img :src="item.flower.thumbnail" :alt="item.flower.flowerName" class="header__cart-item-img">
                            <div class="header__cart-item-info">
                                <div class="header__cart-item-head">
                                    <h5 class="header__cart-item-name">{{ item.flower.flowerName }}</h5>
                                    <div class="header__cart-ite-price-wrap">
                                        <span class="header__cart-item-price">{{ formatNumber(item.flower.price) }}đ</span>
                                        <span class="header__cart-item-multiply">x</span>
                                        <span class="header__cart-item-quantity">{{ item.quantity }}</span>
                                    </div>
                                </div>
                                <div class="header__cart-item-body">
                                    <span class="header__cart-item-description">
                                        Phân loại: {{ item.flower.size }}gl
                                    </span>
                                    <!-- Stop để ngăn nhảy @click của thẻ cha và prevent ngăn reload page -->
                                    <span class="header__cart-item-remove"
                                        @click.stop.prevent="onRemoveItem(item.flower.id)">Xóa</span>
                                </div>
                            </div>
                        </AppLink>
                    </div>
                    <a href="#" class="header__cart-review btn btn--primary">Xem giỏ hàng</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { formatNumber } from '@/helper/UIHelper';
// import type { CartItem } from '@/models/CartItem';
import { useCartStore } from '@/stores/ShoppingCartManager';
import { storeToRefs } from 'pinia';
import { watch, ref, computed } from 'vue';
const store = useCartStore()
const { listCartItems, updateCart } = storeToRefs(store)
function onRemoveItem(id: string) {
    console.log("[onRemoveItem] id: ", id)
    store.removeFlowerFromCart(id)
}

const shakeCart = ref(false)
watch(() => updateCart, (newVal) => {
    console.log("[watch] newVal: ", newVal)
    if (newVal) {
        shakeCart.value = true
        setTimeout(() => shakeCart.value = false, 500)
    }
}, { deep: true })

const totalQty = computed(() => listCartItems.value ? listCartItems.value.reduce((sumQty, cartItem) => sumQty + cartItem.quantity, 0) : 0)
</script>