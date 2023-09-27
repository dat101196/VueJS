<template>
    <div class="container">
        <div class="grid wide">
            <div class="cart-detail-page">
                <!-- Empty cart UI -->
                <div class="cart__detail-empty-cart" v-if="!listCartItems || listCartItems?.length <= 0">
                    <img src="../assets/img/empty-cart.png" alt="" class="cart__detail-empty-cart-img">
                    <p class="cart__detail-empty-cart-text">Giỏ hàng của bạn đang trống</p>
                </div>
                <!--  -->
                <div class="cart__detail-have-items" v-if="listCartItems && listCartItems?.length > 0">
                    <div class="cart__detail-list-items">
                        <div class="cart__detail-item" v-for="(item, index) in listCartItems" :key="index">
                            <AppLink class="cart__detail-item"
                                :to="{ name: 'flower-detail', params: { id: item.flower.id } }">
                                <img :src="item.flower.thumbnail" :alt="item.flower.flowerName"
                                    class="cart__detail-item-img">
                            </AppLink>
                            <div class="cart__detail-item-info">
                                <div>
                                    <div class="cart__detail-item-head">
                                        <h5 class="cart__detail-item-name">{{ item.flower.flowerName }}</h5>
                                        <div class="cart__detail-ite-price-wrap">
                                            <span class="cart__detail-item-price">{{ formatNumber(item.flower.price)
                                            }}đ</span>
                                        </div>
                                    </div>
                                    <div class="cart__detail-qty">
                                        <!-- <div class="cart__detail-select-qty-function">
                                            <button class="btn btn--primary-solid btn-dec"
                                                @click="changeQtyAddCart(-1, item)">-</button>
                                            <input type="number" class="input-select-qty" v-model="item.quantity" />
                                            <button class="btn btn--primary-solid btn-inc"
                                                @click="changeQtyAddCart(1, item)">+</button>
                                        </div> -->
                                        <ChangeQuantityControl :quantity-value="item.quantity" @change-quantity="changeQtyAddCart($event, item)" />
                                    </div>
                                    <p class="cart__detail-item-total-price">= {{ formatNumber(item.flower.price *
                                        item.quantity) }}đ</p>
                                </div>
                                <div class="cart__detail-item-body">
                                    <span class="cart__detail-item-description">
                                        Phân loại: {{ item.flower.size }}gl
                                    </span>
                                    <span class="cart__detail-item-remove" @click="onRemoveItem(item.flower.id)">Xóa</span>
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

const store = useCartStore()
const { listCartItems } = storeToRefs(store)
function onRemoveItem(id: string) {
    console.log("[onRemoveItem] id: ", id)
    store.removeFlowerFromCart(id)
}

function changeQtyAddCart(qty: number, cartItem: CartItem) {
    console.log("[changeQtyAddCart] qty: ", qty)
    cartItem.quantity = qty
}
</script>

<style scoped>
.cart-detail-page.cart__detail-list {
    display: block;
}

.cart__detail-empty-cart {
    padding: 30px 0;
}

.cart__detail-empty-cart-img {
    margin-bottom: 30px;
}

.cart__detail-empty-cart-text {
    font-size: 1.4rem;
    padding: 0;
    margin: 0;
    color: var(--text-color);
}

/* Cart item */
.cart__detail-heading {
    text-align: left;
    margin: 8px 0 8px 12px;
    color: var(--text-light-gray-color);
    font-weight: 400;
    font-size: 1.4rem;
}

.cart__detail-list-items {
    padding-left: 0;
    list-style-type: none;
}

.cart__detail-item {
    display: flex;
    align-items: stretch;
    text-decoration: none;
    cursor: default;
}

.cart__detail-item:hover {
    background-color: var(--option-item-hover-color);
}

.cart__detail-item-img {
    width: 128px;
    height: 128px;
    margin: 12px;
    border: 2px solid var(--border-color);
}

.cart__detail-item-info {
    flex: 1;
    margin: 12px 12px 12px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.cart__detail-item-head {
    display: flex;
    align-items: start;
    justify-content: space-between;
}

.cart__detail-item-name {
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

.cart__detail-ite-price-wrap {
    width: 120px;
    text-align: right;
}

.cart__detail-item-price {
    font-size: 1.4rem;
    line-height: 2rem;
    color: var(--primary-color);
    font-weight: 400;
}

.cart__detail-item-total-price {
    text-align: right;
}

.cart__detail-item-multiply {
    font-size: 0.9rem;

    margin: 0 4px;
    color: #757575;
}

.cart__detail-item-quantity {
    font-size: 1.2rem;
    color: #757575;
}

.cart__detail-item-body {
    display: flex;
    justify-content: space-between;
}

.cart__detail-item-description {
    font-size: 1.2rem;
    font-weight: 300;
    color: #757575;
}

.cart__detail-item-remove {
    font-size: 1.4rem;
    color: var(--text-color);
    cursor: pointer;
}

.cart__detail-item-remove:hover {
    color: var(--primary-color);
}

.cart__detail-select-qty-function {
    border: 1px solid var(--primary-color);
}

.btn-inc,
.btn-dec {
    min-width: 30px;
    width: 30px;
    height: 34px;
    border: none;
    border-radius: 0;
}

.input-select-qty {
    border-style: solid;
    border-color: var(--primary-color);
    border-width: 0 1px;
    width: 68px;
    height: 34px;
    text-align: center;
    outline: none;
}

.cart__detail-qty {
    display: flex;
    margin: 10px 0;
    justify-content: right;
}

@media (max-width: 768px) {}
</style>