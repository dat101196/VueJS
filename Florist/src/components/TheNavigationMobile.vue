<template>
    <div id="nav-mobile">
        <div id="nav">
            <div class="grid wide">
                <div class="header-with-search">
                    <i class="ti-menu" @click="onOpenSideMenu(true)"></i>
                    <AppLink id="logo" to="/">
                        <img id="logo-img" src="../assets/img/rose_logo.png" />
                    </AppLink>
                    <i class="ti-search" @click="onShowSearch"></i>
                    <CartHeader class="cart-header-moblie" />
                </div>
            </div>
        </div>
        <div class="header__search-bar" :class="{ 'search-hide': hideSearchBar }" v-show="!hideSearchBar">
            <!-- Search Input -->
            <div class="header__search-bar-wrap">
                <input type="text" class="header__search-bar-input" placeholder="Nhập để tìm kiếm sản phẩm">
            </div>
            <button class="btn btn--primary header__search-bar-btn">
                <i class="header__search-bar-btn-icon ti-search"></i>
            </button>
        </div>
    </div>
    <SideMenuWithFade />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SideMenuWithFade from './menus/SideMenuWithFade.vue';
import { useSideMenuStore } from '@/stores/SideMenuManager'
import CartHeader from '@/components/CartHeader.vue';
const hideSearchBar = ref<boolean>(true)
function onShowSearch() {
    hideSearchBar.value = !hideSearchBar.value;
}

const { onOpenSideMenu } = useSideMenuStore()
// function onOpenMenu() {
//     onOpenSideMenu(true)
// }
</script>

<style scoped>
/* Navigation */
#nav-mobile {
    display: none;
}

#nav {
    margin-top: 0;
    padding: 0 30px;
    background-image: linear-gradient(90deg,
            var(--sub-color),
            var(--primary-color));
    color: white;
    display: flex;
    align-items: center;
    z-index: 2;
    font-size: 2rem;
}

#nav a {
    display: inline-block;
    color: white;
    opacity: 1;
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
    justify-content: space-between;
}

/* Search bar */

.header__search-bar {
    background-color: var(--white-color);
    height: var(--header-search-bar-height);
    border-radius: var(--border-radius-default);
    display: flex;
    align-items: center;
    border: 1px solid var(--border-color);
    box-shadow: var(--box-shadow-default);
    z-index: 1;
    animation: mobileSearchSideIn linear 0.3s;
}

.header__search-bar.search-hide {
    animation: mobileSearchSideIn ease-in 0.3s;
}

@keyframes mobileSearchSideIn {
    from {
        height: 0;
        opacity: 0;
    }

    to {
        height: var(--header-search-bar-height);
        opacity: 1;
    }
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
    #nav-mobile {
        display: block;
    }
}
</style>