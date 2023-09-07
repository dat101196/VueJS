<script setup lang="ts">
import type { Flower } from '@/models/Flower';

defineProps<{
  flower: Flower
}>()
</script>

<template>
    <div>
        <p class="title">{{ flower.flowerName }}</p>
        <p class="price">{{ flower.price }} đ</p>
        <p class="size">{{ flower.size }} gl</p>
    </div>
</template>

<style scoped>

</style>