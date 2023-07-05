<template>
    <div class="login">
        <form class="form" @submit.prevent="login">
            <h1>Login</h1>
            <label for="username">Username</label>
            <input type="text" class="input" name="username" v-model="username">
            <label for="password">Password</label>
            <input type="text" class="input" name="password" v-model="password">
            <button class="btn">Login</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter();
const username = ref(null);
const password = ref(null);
const login = () => {
    window.user = username;
    router.push({ name: 'protected' });
}
</script>