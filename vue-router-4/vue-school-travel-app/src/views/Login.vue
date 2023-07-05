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
import { useRouter,useRoute } from 'vue-router'
const router = useRouter();
const route = useRoute();

const username = ref('');
const password = ref('');
const login = () => {
    window.user = username.value;
    const redirectPath = route.query.redirect || '/protected';
    router.push(redirectPath);
}
</script>