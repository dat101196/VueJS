<template>
    <div class="home">
        <h1>All destinations</h1>
        <div class="destinations">
            <router-link v-for="des in destinations" :key="des.id" :to="des.slug">
                <h2>{{ des.name }}</h2>
                <img :src="`/images/${des.image}`" :alt="des.name">
            </router-link>
        </div>
    </div>
</template>   
<script>
import sourceData from '@/data.json';
export default {
    data() {
        return {
            destinations: sourceData.destinations
        }
    },
}
</script>