<template>
    <div id="nav">
        <p>{{ router.currentRoute.value.name }}</p>
        <p>{{ router.currentRoute.value.params }}</p>
        <AppLink id="logo" to="/">Vue School Travel App</AppLink>
        <AppLink v-for="des in destinations" :key="des.id"
            :to="{ name: 'destination.show', params: { id: des.id, slug: des.slug }, query: {q1: 'test', q2: 123, q3: false} }">
            {{ des.name }}
        </AppLink>
        <AppLink :to="{ name: 'protected' }">Dashboard</AppLink>
        <AppLink :to="{ name: 'invoices' }">Invoices</AppLink>
        <AppLink to="https://google.com">Google</AppLink>
    </div>
</template>

<script setup>
import sourceData from '@/data.json';
import { useRouter } from 'vue-router'
import { watchEffect, ref } from 'vue'
const destinations =  ref(sourceData.destinations)
const router = useRouter();
watchEffect(()=>{
  console.log('currentRoute: ', router.currentRoute.value);
})
</script>