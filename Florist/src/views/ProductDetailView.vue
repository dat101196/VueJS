<script setup lang="ts">
import { HideLoading, ShowLoading } from '@/helper/UIHelper';
import type { Flower } from '@/models/Flower';
import { useFlowerStore } from '@/stores/FlowerData';
import { ref, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router'
import { formatNumber } from '@/helper/UIHelper';
import { useCartStore } from '@/stores/ShoppingCartManager';

const { getFlowerDetail } = useFlowerStore()
const route = useRoute()
const flower = ref<Flower>()
const qtyAddCart = ref(1)
const imageMain = ref("")
const selectedImgIndex = ref(0)
const initData = async () => {
    ShowLoading()
    flower.value = await getFlowerDetail(route.params.id.toString())
    console.log('Flower: ', flower)
    //
    if (flower.value) {
        imageMain.value = flower.value.thumbnail
    }
    //
    qtyAddCart.value = 1
    HideLoading()
}

watchEffect(() => {
    console.log('Flower Id: ' + route.params.id)
    initData()
})

function selectImage(imageURL: string, index: number) {
    imageMain.value = imageURL
    selectedImgIndex.value = index
}

const cartStore = useCartStore()
function addToCart() {
    if (!flower.value) {
        return
    }
    cartStore.addFlowerToCart(flower.value, qtyAddCart.value)
}

function changeQtyAddCart(qty: number) {
    qtyAddCart.value += qty
}

watch(qtyAddCart, (newVal) => {
    //Check min, max qty add cart
    if (newVal) {
        if (newVal < 0) qtyAddCart.value = 0
        if (newVal > 99999) qtyAddCart.value = 99999
    }
})

</script>
<template>
    <div class="product-detail" v-if="flower">
        <div class="grid wide">
            <div class="row">
                <div class="col l-8 m-12 s-12 image-container">
                    <div class="image view-image" :style="{ 'background-image': `url(${imageMain})` }"></div>
                    <ul class="list-images">
                        <li v-for="(flowerimage, index) in flower.listImages" :key="index"
                            @click="selectImage(flowerimage, index)">
                            <div class="image image-in-list" :class="{ 'image-selected': selectedImgIndex == index }"
                                :style="{ 'background-image': `url(${flowerimage})` }"></div>
                        </li>
                    </ul>
                </div>
                <div class="col l-4 m-12 s-12 info-container">
                    <h1>{{ flower.flowerName }}</h1>
                    <p>Loại: {{ flower.category.categoryName }}</p>
                    <span>Giá: <span class="product-price">{{ formatNumber(flower.price) }}đ</span></span>

                    <div class="btn-function">
                        <div class="select-qty-function">
                            <button class="btn btn--primary-solid btn-dec" @click="changeQtyAddCart(-1)">-</button>
                            <input type="number" class="input-select-qty" v-model="qtyAddCart" />
                            <button class="btn btn--primary-solid btn-inc" @click="changeQtyAddCart(1)">+</button>
                        </div>
                        <button class="btn btn--primary btn-add-to-cart" @click="addToCart">Thêm vào giỏ hàng</button>
                        <!-- <button class="btn btn--semi btn-round-corner btn-buy-now">Mua ngay</button> -->
                    </div>
                    <pre class="product-description">{{ flower.description }}</pre>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.product-detail {
    margin-top: var(--margin-top-item-card);
}

.image-container {
    display: flex;
    flex-direction: row-reverse;
    height: 60vh;
}

.list-images {
    width: 20%;
    overflow: scroll;
    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}

/* Hide scrollbar for Chrome, Safari and Opera */
.list-images::-webkit-scrollbar {
    display: none;
}

.list-images li:first-child .image-in-list {
    margin-top: 0px;
}

.list-images li:last-child .image-in-list {
    margin-bottom: 0px;
}

.image {
    /* padding-top: 100% - 100% ở đây là = width của parent chứa nó */
    /* padding-top: 100%; */
    background-color: #cecece;
    background-repeat: no-repeat;
    /* background-size
      -contain: thu nhỏ ảnh lại(nếu ảnh to) để vừa khung hình và giữ tỉ lệ => sẽ xuất hiện khoảng trống nếu tỉ lệ hình và khung chứa khác nhau.
      -cover: thu nhỏ ảnh lại(nếu ảnh to) và sẽ lấp đầy khung chứa theo tỉ lệ khung chứa, => bị mất ảnh 1 phần nếu tỉ lệ hình và khung chứa khác nhau.
    */
    background-size: contain;
    /* background-position: center để lấy trọng tâm là giữa ảnh */
    background-position: center;
    flex: 1;
}

.image-in-list {
    /* padding-top: 100% - 100% ở đây là = width của parent chứa nó */
    padding-top: 100%;
    margin: 10px 0;
    border: 1px solid #9b9b9b;
    cursor: pointer;
    height: 100%;
}

.image-selected.image-in-list {
    border: 3px solid var(--sub-color);
}

.image .btn-function {
    display: flex;
}

.product-price {
    font-size: 2.0rem;
    color: var(--primary-color);
}

.select-qty-function {
    border: 1px solid var(--primary-color);
    margin-right: 16px;
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
    width: 60px;
    height: 34px;
    text-align: center;
    outline: none;
}

.btn-function {
    display: flex;
    margin: 10px 0;
}

/* Remove arrow in input number */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
}

@media (max-width: 768px) {
    .product-detail {
        margin-top: 0;
    }

    .image-container {
        display: block;
        height: auto;
    }

    .view-image {
        height: 50vh;
    }

    .list-images {
        width: 100%;
        display: flex;
        overflow: auto;
        margin-top: 10px;
    }

    .list-images li:first-child .image-in-list {
        margin-left: 0px;
    }

    .list-images li:last-child .image-in-list {
        margin-right: 0px;
    }


    .image-in-list {
        margin: 0 10px;
        width: 90px;
    }

    .info-container {
        margin: 10px 10px 70px;
        padding-right: 20px;
    }

    .btn-function {
        margin: 0;
        align-items: center;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height: 60px;
        justify-content: center;
        background-color: #eee;
        box-shadow: 0px 0px 9px 0px #c2c2c2;
    }
}
</style>