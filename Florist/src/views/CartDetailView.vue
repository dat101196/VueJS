<template>
    <div class="container">
        <div class="grid wide">
            <div class="cart-detail-page">
                <!-- Empty cart UI -->
                <div class="cart-detail__empty-cart" v-if="!listCartItems || listCartItems?.length <= 0">
                    <img src="../assets/img/empty-cart.png" alt="" class="cart-detail__empty-cart-img">
                    <p class="cart-detail__empty-cart-text">Giỏ hàng của bạn đang trống</p>
                </div>
                <!--  -->
                <div class="cart-detail__have-items" v-if="listCartItems && listCartItems?.length > 0">
                    <!-- Heading -->
                    <div class="cart-detail__heading">
                        <div class="grid wide">
                            <div class="row no-gutter cart-detail__heading-row">
                                <div class="col l-6 m-6 s-12 cart-detail__select-all">
                                    <input type="checkbox" v-model="selectedAll" @change="onSelectedAllChange" />
                                    <p class="cart-detail__select-all-text">Chọn tất cả ({{ listCartItems.length
                                    }})</p>
                                </div>
                                <div class="col l-6 m-6 s-12 cart-detail__checkout">
                                    <p>Tổng thanh toán ({{ totalSelectedItem }}
                                        sản
                                        phẩm): <span class="cart-detail__checkout-total-selected-price">{{
                                            formatNumber(totalSelectedPrice) }}đ</span></p>
                                    <button class="btn btn--primary" :class="{ 'btn--disabled': totalSelectedItem <= 0 }"
                                        @click="onGoToCheckout">Thanh toán</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- List items -->
                    <div class="cart-detail__list-items">
                        <div class="cart-detail__item" v-for="(item, index) in listCartItems" :key="index">
                            <input type="checkbox" v-model="item.isSelected" />
                            <AppLink :to="{ name: 'flower-detail', params: { id: item.flower.id } }">
                                <img :src="item.flower.thumbnail" :alt="item.flower.flowerName"
                                    class="cart-detail__item-img">
                            </AppLink>
                            <div class="cart-detail__item-info">
                                <div>
                                    <div class="cart-detail__item-head">
                                        <h5 class="cart-detail__item-name">{{ item.flower.flowerName }}</h5>
                                        <div class="cart-detail__ite-price-wrap">
                                            <span class="cart-detail__item-price">{{ formatNumber(item.flower.price)
                                            }}đ</span>
                                        </div>
                                    </div>
                                    <div class="cart-detail__qty">
                                        <ChangeQuantityControl :quantity-value="item.quantity"
                                            @change-quantity="changeQtyAddCart($event, item)" />
                                    </div>
                                    <p class="cart-detail__item-total-price">Tổng: {{ formatNumber(item.flower.price *
                                        item.quantity) }}đ</p>
                                </div>
                                <div class="cart-detail__item-body">
                                    <span class="cart-detail__item-description">
                                        Phân loại: {{ item.flower.size }}gl
                                    </span>
                                    <span class="cart-detail__item-remove" @click="onRemoveItem(item.flower.id)">Xóa</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { formatNumber } from '@/helper/UIHelper';
import type { CartItem } from '@/models/CartItem';
import { useCartStore } from '@/stores/ShoppingCartManager';
import { storeToRefs } from 'pinia';
import ChangeQuantityControl from '@/components/controls/ChangeQuantityControl.vue';
import { watch } from 'vue';
import { useRouter } from 'vue-router'

const store = useCartStore()
const { listCartItems, totalSelectedItem, totalSelectedPrice, selectedAll } = storeToRefs(store)
function onRemoveItem(id: string) {
    console.log("[onRemoveItem] id: ", id)
    store.removeFlowerFromCart(id)
}

function changeQtyAddCart(qty: number, cartItem: CartItem) {
    console.log("[changeQtyAddCart] qty: ", qty)
    cartItem.quantity = qty
}


function onSelectedAllChange() {
    console.log("[onSelectedAllChange] selectedAll.value: ", selectedAll.value)
    if (listCartItems.value) {
        listCartItems.value.forEach(item => {
            item.isSelected = selectedAll.value
        })
    }
}

const router = useRouter()
function onGoToCheckout() {
    router.push({ name: "checkout" })
}

watch(listCartItems, (newVal) => {
    if (newVal) {
        const unseletedItem = newVal.find(item => !item.isSelected)
        if (unseletedItem) {
            selectedAll.value = false
        } else {
            selectedAll.value = true
        }
    }

}, { deep: true })

</script>

<style scoped>
.cart-detail-page {
    margin: 0 12px;
    position: relative;
}

.cart-detail-page.cart-detail__list {
    display: block;
}

/* Empty */
.cart-detail__empty-cart {
    padding: 30px 0;
}

.cart-detail__empty-cart-img {
    margin-bottom: 30px;
}

.cart-detail__empty-cart-text {
    font-size: 1.4rem;
    padding: 0;
    margin: 0;
    color: var(--text-color);
}

/* Have item */
.cart-detail__heading {
    padding: 10px 0;
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0px 0px 9px 0px #c2c2c2;
}

.cart-detail__heading p {
    font-size: 1.6rem;
    font-weight: 400;
}

.cart-detail__heading-row {
    padding: 0 10px;

}

.cart-detail__select-all-text {
    display: inline-block;
    margin: 0 10px;
}

.cart-detail__checkout {
    text-align: right;
}

.cart-detail__checkout-total-selected-price {
    color: var(--primary-color);
    font-size: 1.6rem;
    font-weight: 600;
}

/* Cart item */
.cart-detail__list-items {
    padding-left: 0;
    list-style-type: none;
    margin-bottom: 100px;
}

.cart-detail__item {
    display: flex;
    align-items: stretch;
    text-decoration: none;
    cursor: default;
    border-bottom: 1px solid var(--border-color);
}

.cart-detail__item:last-child {
    border-bottom: none;
}

.cart-detail__item:hover {
    background-color: var(--option-item-hover-color);
}

.cart-detail__item-img {
    width: 128px;
    height: 128px;
    margin: 12px;
    border: 2px solid var(--border-color);
}

.cart-detail__item-info {
    flex: 1;
    margin: 12px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.cart-detail__item-head {
    display: flex;
    align-items: start;
    justify-content: space-between;
}

.cart-detail__item-name {
    font-size: 1.4rem;
    line-height: 2rem;
    max-height: 4rem;
    overflow: hidden;
    font-weight: 500;
    color: var(--text-color);
    margin: 0;
    text-align: left;
    flex: 1;
    padding-right: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.cart-detail__ite-price-wrap {
    width: 120px;
    text-align: right;
}

.cart-detail__item-price {
    font-size: 1.4rem;
    line-height: 2rem;
    color: var(--primary-color);
    font-weight: 400;
}

.cart-detail__item-total-price {
    text-align: right;
}

.cart-detail__item-multiply {
    font-size: 0.9rem;

    margin: 0 4px;
    color: #757575;
}

.cart-detail__item-quantity {
    font-size: 1.2rem;
    color: #757575;
}

.cart-detail__item-body {
    display: flex;
    justify-content: space-between;
}

.cart-detail__item-description {
    font-size: 1.2rem;
    font-weight: 300;
    color: #757575;
}

.cart-detail__item-remove {
    font-size: 1.4rem;
    color: red;
    cursor: pointer;
}

.cart-detail__item-remove:hover {
    color: var(--primary-color);
}

.cart-detail__qty {
    display: flex;
    margin: 10px 0;
    justify-content: right;
}

@media (max-width: 768px) {}
</style>