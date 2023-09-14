<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { Flower } from '@/models/Flower';
import { useFlowerStore } from '@/stores/FlowerData';
import { ref, watchEffect } from 'vue';
import ItemCard from '@/components/ItemCard.vue'
import { HideLoading, ShowLoading } from '@/helper/UIHelper';
import type AppLink from '@/components/AppLink.vue';
const route = useRoute()
const flowerList = ref<Flower[]>();
const flowerStore = useFlowerStore();
const initData = async () => {
    ShowLoading()
    let flowers = await flowerStore.getAllFlowers()
    if (flowers) {
        if ((Number(route.params.isn)) > 0) {
            flowers = flowers.filter(f => f.category.isn == (Number(route.params.isn)))
        }

        flowerList.value = flowers;
    }
    HideLoading()
    console.log('flowerList: ', flowerList)
}

watchEffect(() => {
    console.log('ISN: ', route.params.isn)
    initData()
})

function onGoDetail(flower: Flower) {
    console.log('onGoDetail: ', flower)
}

</script>
<template>
    <div class="list-item" v-if="flowerList">
        <div class="grid wide">
            <div class="row">
                <div class="col l-2-4 m-2-4 s-12" v-for="fl in flowerList" :key="fl.id">
                    <AppLink :to="{ name: 'flower-detail', params: { id: fl.id } }">
                        <ItemCard :flower="fl" @onClickItem="onGoDetail(fl)" />
                    </AppLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.list-item {
    margin-top: calc(0px - var(--margin-top-item-card));
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
}
</style>