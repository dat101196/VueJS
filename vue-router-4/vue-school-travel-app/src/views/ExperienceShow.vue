<template>
    <section class="experience-details">
        <h1>{{ experience.name }}</h1>
        <div>
            <img :src="`/images/${experience.image}`" :alt="experience.name">
            <p>{{ experience.description }}</p>
        </div>
    </section>
</template>

<script setup>
import sourceData from '@/data.json';
import { computed } from 'vue';
const props = defineProps({
    id: {
        type: Number,
        required: true
    },
    experienceSlug: {
        type: String,
        required: true
    }
})

const destination = computed(() => sourceData.destinations.find(des => des.id === props.id));
const experience = computed(() => destination.value.experiences.find(exp => exp.slug === props.experienceSlug)); 
</script>