<template>
   <section class="destination">
    <h1>{{ destination.name }}</h1>
    <div class="destination-details">
        <img :src="`/images/${destination.image}`" :alt="destination.name">
        <p>{{ destination.description }}</p>
    </div>
   </section>
</template>
<script setup>
import { useRoute } from "vue-router";
import { computed } from 'vue';
import sourceData from '@/data.json';
const route = useRoute();
// const destinationId = computed(() => parseInt(route.params.id));
const destination = computed(async() => await fetch(`https://travel-dummy-api.netlify.app/${slug}.json`));
</script>