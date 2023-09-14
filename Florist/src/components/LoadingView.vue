<script setup>
import { useLoadingStore } from '@/stores/LoadingManager'
const store = useLoadingStore()
</script>

<template>
    <div v-if="store.isLoading" class="loading-fade">
        <p class="loading-text">Đang tải...</p>
    </div>
</template>

<style scoped>
.loading-fade {
    display: flex;
    background-color: rgba(226, 226, 226, 0.8);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
}

.loading-text {
    color: var(--text-color);
    margin: auto;
    font-size: 1.6rem;
}
</style>