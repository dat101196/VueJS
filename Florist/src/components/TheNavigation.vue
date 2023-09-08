<template>
    <div id="nav">
        <div class="grid wide">
            <div class="header-with-search">
                <!-- <p>{{ router.currentRoute.value.name }}</p>
                <p>{{ router.currentRoute.value.params }}</p> -->
                <AppLink id="logo" to="/">
                    <img id="logo-img" src="../assets/img/rose_logo.png" />
                </AppLink>
                <!-- <AppLink v-for="des in destinations" :key="des.id"
                    :to="{ name: 'destination.show', params: { id: des.id, slug: des.slug }, query: {q1: 'test', q2: 123, q3: false} }">
                    {{ des.name }}
                </AppLink>
                <AppLink :to="{ name: 'protected' }">Dashboard</AppLink>
                <AppLink :to="{ name: 'invoices' }">Invoices</AppLink> -->
                <AppLink :to="{ name: 'about' }">About</AppLink>
                <AppLink to="https://google.com">Google</AppLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { watchEffect } from 'vue'
const router = useRouter();
watchEffect(() => {
    console.log('currentRoute: ', router.currentRoute.value);
})
</script>

<style scoped>
/* Navigation */

#nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin-top: 0;
    padding: 30px;
    height: var(--header-height);
    background-image: linear-gradient(90deg,
            var(--sub-color),
            var(--primary-color));
    color: white;
    display: flex;
    align-items: center;
    z-index: 2;
}

#nav a {
    display: inline-block;
    margin-right: 20px;
    color: white;
    opacity: 1;
}

#nav a:hover {
    background-color: transparent;
    opacity: 0.8;
}

/* Logo */
#logo,
#logo-img {
    width: 200px;
}

/* Header with search */
.header-with-search {
  height: var(--header-with-search-height);
  display: flex;
  align-items: center;
}
</style>