<template>
    <div class="container">
        <div class="grid wide">
            <h1>Danh sách sản phẩm</h1>
            <div class="cart-info__have-items" v-if="listCartItems && listCartItems?.length > 0">
                <!-- List items -->
                <div class="cart-info__list-items">
                    <div class="cart-info__item" v-for="(item, index) in listCartItems" :key="index">
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
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { formatNumber } from '@/helper/UIHelper';
import { useCartStore } from '@/stores/ShoppingCartManager';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'

const store = useCartStore()
const { listCartItems} = storeToRefs(store)

</script>

<style scoped>
/* Cart item */
.cart-info__list-items {
    padding-left: 0;
    list-style-type: none;
    margin-bottom: 100px;
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

.cart-info__item-multiply {
    font-size: 0.9rem;

    margin: 0 4px;
    color: #757575;
}

.cart-info__item-quantity {
    font-size: 1.2rem;
    color: #757575;
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

.cart-info__item-remove {
    font-size: 1.4rem;
    color: red;
    cursor: pointer;
}

.cart-info__item-remove:hover {
    color: var(--primary-color);
}

.cart-info__qty {
    display: flex;
    margin: 10px 0;
    justify-content: right;
}

@media (max-width: 768px) {}
</style>