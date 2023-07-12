<template>
    <ul>
        <li>
            <router-link :class="{selected: store.selectedMenu == 'protected'}" :to="{ name: 'protected' }">Dashboard</router-link>
        </li>
        <li>
            <router-link :class="{selected: store.selectedMenu == 'invoices'}" :to="{ name: 'invoices' }">Invoices</router-link>
        </li>
    </ul>
</template>

<script setup>
import {useMenu} from '@/stores/menu'

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

.selected{
    color: red;
}
</style>