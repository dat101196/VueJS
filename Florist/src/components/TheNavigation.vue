<template>
    <div id="nav">
        <div class="grid wide">
            <div class="header-with-search">
                <!-- <p>{{ router.currentRoute.value.name }}</p>
                <p>{{ router.currentRoute.value.params }}</p> -->
                <ShopLogo />

                <!-- <AppLink v-for="des in destinations" :key="des.id"
                    :to="{ name: 'destination.show', params: { id: des.id, slug: des.slug }, query: {q1: 'test', q2: 123, q3: false} }">
                    {{ des.name }}
                </AppLink>
                <AppLink to="https://google.com">Google</AppLink> -->
                <!-- Search Input -->
                <div class="header-right" v-if="!hideSearchBar">
                    <AppLink :to="{ name: 'shop' }">Shop</AppLink>
                    <AppLink :to="{ name: 'about' }">Về chúng tôi</AppLink>
                    <AppLink :to="{ name: 'demo-menu-page' }">Demo</AppLink>

                    <div class="header__search-bar">
                        <!-- Search Input -->
                        <div class="header__search-bar-wrap">
                            <input type="text" class="header__search-bar-input" placeholder="Nhập để tìm kiếm sản phẩm">
                        </div>
                        <button class="btn btn--primary header__search-bar-btn">
                            <i class="header__search-bar-btn-icon ti-search"></i>
                        </button>
                    </div>
                    <CartHeader />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { watchEffect, ref } from 'vue'
import CartHeader from '@/components/CartHeader.vue';
import ShopLogo from './ShopLogo.vue';
const hideSearchBar = ref<boolean>(false)
const router = useRouter();
watchEffect(() => {
    console.log('currentRoute: ', router.currentRoute.value);
    console.log('currentRoute name: ', router.currentRoute.value.name);
    if (router.currentRoute.value.name == '' || router.currentRoute.value.name == 'home') {
        hideSearchBar.value = true;
    } else {
        hideSearchBar.value = false;
    }
})
</script>

<style scoped>
/* Navigation */

#nav {
    margin-top: 0;
    padding: 30px;
    height: var(--header-height);
    background-image: linear-gradient(90deg,
            var(--sub-color),
            var(--primary-color));
    color: white;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    transition: transform 0.4s;
    z-index: 2;
    font-size: 1.4rem;
}

#nav a {
    display: inline-block;
    margin-right: 20px;
    color: white;
    opacity: 1;
}

/* Header with search */
.header-with-search {
    height: var(--header-with-search-height);
    display: flex;
    align-items: center;
    justify-content: center;
}

.header-right {
    display: flex;
    justify-content: flex-start;
    flex: 1;
    align-items: center;
}

/* Search bar */

.header__search-bar {
    background-color: var(--white-color);
    flex: 1;
    height: 40px;
    margin-left: 32px;
    border-radius: var(--border-radius-default);
    display: flex;
    align-items: center;
}

.header__search-bar-wrap {
    flex: 1;
    height: 100%;
    position: relative;
}

.header__search-bar-input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding: 0 16px;
    color: var(--text-color);
    border-radius: var(--border-radius-default);
    font-size: 1.4rem;
}

.header__search-bar-input:focus~.header__search-bar-history {
    display: block;
    animation: fadeIn ease-in 0.2s;
}


/* Search button */
.header__search-bar-btn {
    height: 34px;
    margin-right: 3px;
    min-width: 0;
    width: 60px;
}

.header__search-bar-btn-icon {
    font-size: 1.4rem;
    color: var(--white-color);
}

@media(max-width: 768px) {
    #nav {
        display: none;
    }
}
</style>