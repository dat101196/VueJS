<script setup lang="ts">
import { HideLoading, ShowLoading } from '@/helper/UIHelper';
import type { Flower } from '@/models/Flower';
import { useFlowerStore } from '@/stores/FlowerData';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router'
const { getFlowerDetail } = useFlowerStore()
const route = useRoute()
const flower = ref<Flower>()
const initData = async () => {
    ShowLoading()
    flower.value = await getFlowerDetail(route.params.id.toString())
    console.log('Flower: ', flower)
    HideLoading()
}

watchEffect(() => {
    console.log('Flower Id: ' + route.params.id)
    initData()
})


</script>
<template>
    <div class="product-detail" v-if="flower">
        <div class="grid wide">
            <div class="row">
                <div class="col l-6 m-6 s-12">
                    <div class="grid">
                        <div class="row">
                            <div class="col l-3 m-3 s-3 list-images">
                                <img src="" alt="">
                            </div>
                            <div class="col l-9 m-9 s-9">
                                <div class="product-image" :style="{ 'background-image': `url(${flower.thumbnail})` }"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col l-6 m-6 s-12">
                    <h1>{{ flower.flowerName }}</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.product-detail{
    margin-top: var(--margin-top-item-card);
}

.list-images{
    background-color: red;
}
.product-image {
    /* padding-top: 100% - 100% ở đây là = width của parent chứa nó */
    padding-top: 100%;
    background-color: var(--border-color);
    background-repeat: no-repeat;
    /* background-size
      -contain: thu nhỏ ảnh lại(nếu ảnh to) để vừa khung hình và giữ tỉ lệ => sẽ xuất hiện khoảng trống nếu tỉ lệ hình và khung chứa khác nhau.
      -cover: thu nhỏ ảnh lại(nếu ảnh to) và sẽ lấp đầy khung chứa theo tỉ lệ khung chứa, => bị mất ảnh 1 phần nếu tỉ lệ hình và khung chứa khác nhau.
    */
    background-size: contain;
    /* background-position: center để lấy trọng tâm là giữa ảnh */
    background-position: center;
}
</style>