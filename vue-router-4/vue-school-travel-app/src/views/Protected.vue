<template>
    <div>
        <h1>Greetings, {{ username }}</h1>
        <button class="btn" @click="logout">Logout</button>
        <router-link :to="{ name: 'invoices' }">
            <button>Invoices</button>
        </router-link>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMenu } from '@/stores/menu'
//
const store = useMenu();
console.log('bf: ', store.selectedMenu);
store.onSetSelectedMenu('protected');

console.log('aft: ', store.selectedMenu);
//
const router = useRouter();
const username = ref(window.user);
const logout = () => {
    window.user = null;
    router.push({ name: 'Home' });
}
</script>