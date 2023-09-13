<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { Flower } from '@/models/Flower';
import { useFlowerStore } from '@/stores/FlowerData';
import { ref, watchEffect } from 'vue';
import ItemCard from '@/components/ItemCard.vue'
const route = useRoute()
const flowerList = ref<Flower[]>();
const flowerStore = useFlowerStore();
const initData = async () => {
    let flowers = await flowerStore.getAllFlowers()
    if (flowers) {
        if((Number(route.params.isn)) > 0){
            flowers = flowers.filter(f => f.category.isn == (Number(route.params.isn)))
        }
        
        flowerList.value = flowers;
    }
    console.log('flowerList: ', flowerList)
}

watchEffect(() => {
    console.log('ISN: ', route.params.isn)
    initData()
})



</script>
<template>
    <div class="list-item">
        <div class="grid wide">
            <div class="row">
                <div class="col l-2-4 m-2-4 s-12" v-for="fl in flowerList" :key="fl.id">
                    <ItemCard :flower="fl" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.list-item {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
}
</style>