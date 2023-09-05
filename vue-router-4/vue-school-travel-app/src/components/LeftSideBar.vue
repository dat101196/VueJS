<template>
    <ul>
        <li>
            <router-link :class="{ selected: store.selectedMenu == 'protected' }"
                :to="{ name: 'protected' }">Dashboard</router-link>
        </li>
        <li>
            <router-link :class="{ selected: store.selectedMenu == 'invoices' }"
                :to="{ name: 'invoices' }">Invoices</router-link>
        </li>
        <li v-for="des in destinations" :key="des.id">
            <AppLink
                :to="{ name: 'destination.show', params: { id: des.id, slug: des.slug }, query: { q1: 'test', q2: 123, q3: false } }">
                {{ des.name }}
            </AppLink>
        </li>

    </ul>
</template>

<script setup>
import { useMenu } from '@/stores/menu'
import sourceData from '@/data.json'
import { reactive } from 'vue';
const destinations = reactive(sourceData.destinations)
const store = useMenu();
</script>

<style scoped>
ul {
    background: white;
    padding: 10px;
    list-style-type: none;
    margin-right: 20px;
}

li {
    margin: 10px;
}

.selected {
    color: red;
}
</style>