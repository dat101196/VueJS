<script setup>
import { useLoadingStore } from '@/stores/LoadingManager'
const store = useLoadingStore()
</script>

<template>
    <!--  -->
    <div v-if="store.isLoading" class="loading-fade">
        <div class="loading-content">
            <div class="loading-img"></div>
        </div>
    </div>
    <!-- <p class="loading-text">Đang tải...</p> -->
</template>

<style scoped>
.loading-fade {
    display: flex;
    background-color: rgba(255, 255, 255, 0.8);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
}

.loading-content {
    margin: auto;
}

.loading-img {
    background-image: url(../assets/img/loading.gif);
    opacity: 1;
    background-repeat: no-repeat;
    background-size: contain;
    width: 10vh;
    height: 10vh;
}

/* .loading-text {
    color: var(--text-color);
    font-size: 1.6rem;
    z-index: 999;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 10px;
} */
</style>