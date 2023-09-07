<script setup lang="ts">
import type { Flower } from '@/models/Flower';
import { useFlowerStore } from '@/stores/FlowerData';
import { ref } from 'vue';
import ItemCard from '@/components/ItemCard.vue'
const flowerList = ref<Flower[]>();
const flowerStore = useFlowerStore();
const initData = async () => {
    const flowers = await flowerStore.getAllFlowers()
    if (flowers) {
        flowerList.value = flowers;
    }
    console.log('flowerList: ', flowerList)
}
initData()
</script>
<template>
    <div class="list-item">
        <ItemCard v-for="fl in flowerList" :key="fl.id" :flower="fl" />
    </div>
</template>

<style scoped>
.list-item{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
}
</style>