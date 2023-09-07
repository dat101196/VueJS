<script setup lang="ts">
import type { Flower } from '@/models/Flower';
import { useFlowerStore } from '@/stores/FlowerData';
import { ref } from 'vue';
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
    <pre>
        {{ flowerList }}
    </pre>
</template>