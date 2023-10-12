<template>
    <div class="container">
        <div class="grid wide">
            <h1>Danh sách sản phẩm</h1>
            <div class="cart-info" v-if="listSelectedItems && listSelectedItems?.length > 0">
                <!-- List items -->
                <div class="cart-info__list-items">
                    <div class="cart-info__item" v-for="(item, index) in listSelectedItems" :key="index">
                        <img :src="item.flower.thumbnail" :alt="item.flower.flowerName" class="cart-info__item-img">
                        <div class="cart-info__item-info">
                            <div>
                                <div class="cart-info__item-head">
                                    <h5 class="cart-info__item-name">{{ item.flower.flowerName }}</h5>
                                    <div class="cart-info__ite-price-wrap">
                                        <span class="cart-info__item-price">{{ formatNumber(item.flower.price)
                                        }}đ x {{ item.quantity }}</span>
                                    </div>
                                </div>
                                <p class="cart-info__item-total-price">= {{ formatNumber(item.flower.price *
                                    item.quantity) }}đ</p>
                            </div>
                            <div class="cart-info__item-body">
                                <span class="cart-info__item-description">
                                    Phân loại: {{ item.flower.size }}gl
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cart-info__total-price">
                    <div class="cart-info__total-price-row">
                        <p>Tổng cộng ({{ totalSelectedItem }} sản phẩm):</p>
                        <p>{{ formatNumber(totalSelectedPrice) }}đ</p>
                    </div>

                    <div class="cart-info__total-price-row">
                        <p>Phí vận chuyển:</p>
                        <p>{{ formatNumber(shippingFee) }}đ</p>
                    </div>

                    <div class="cart-info__total-price-row">
                        <p>Tổng tiền thanh toán:</p>
                        <p class="cart-info__total-payment">{{ formatNumber(totalPayment) }}đ</p>
                    </div>

                    <button class="btn btn--primary" :class="{ 'btn--disabled': !canCreateOrder }"
                        @click="$emit('create-order-click')">Thanh toán</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { formatNumber } from '@/helper/UIHelper';
import { useCartStore } from '@/stores/ShoppingCartManager';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useShippingStore } from "@/stores/ShippingData"

const store = useCartStore()
const { listSelectedItems, totalSelectedItem, totalSelectedPrice } = storeToRefs(store)

const shippingStore = useShippingStore()
const { canCreateOrder } = storeToRefs(shippingStore)

const shippingFee = ref(30000)
const totalPayment = ref(totalSelectedPrice.value + shippingFee.value)
</script>

<style scoped>
.cart-info {
    overflow: scroll;
    height: calc(100vh - var(--header-height) - 40px);
}

/* Cart item */
.cart-info__list-items {
    padding-left: 0;
    list-style-type: none;

}

.cart-info__item {
    display: flex;
    align-items: stretch;
    text-decoration: none;
    cursor: default;
    border-bottom: 1px solid var(--border-color);
}

.cart-info__item:last-child {
    border-bottom: none;
}

.cart-info__item:hover {
    background-color: var(--option-item-hover-color);
}

.cart-info__item-img {
    width: 64px;
    height: 64px;
    margin: 0 12px 0 0;
    border: 2px solid var(--border-color);
}

.cart-info__item-info {
    flex: 1;
    margin: 12px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.cart-info__item-head {
    display: flex;
    align-items: start;
    justify-content: space-between;
}

.cart-info__item-name {
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

.cart-info__ite-price-wrap {
    width: 120px;
    text-align: right;
}

.cart-info__item-price {
    font-size: 1.4rem;
    line-height: 2rem;
    font-weight: 400;
}

.cart-info__item-total-price {
    text-align: right;
}

.cart-info__item-body {
    display: flex;
    justify-content: space-between;
}

.cart-info__item-description {
    font-size: 1.2rem;
    font-weight: 300;
    color: #757575;
}

.cart-info__total-price {
    padding: 10px 0;
    background-color: #eee;
    text-align: right;
}

.cart-info__total-price-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.cart-info__total-payment {
    color: var(--primary-color);
    font-weight: 600;
    font-size: 1.6rem;
}

@media (max-width: 768px) {
    .cart-info {
        height: auto;
    }
}
</style>