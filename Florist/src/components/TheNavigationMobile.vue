<template>
    <div id="nav-mobile">
        <div id="nav">
            <div class="grid wide">
                <div class="header-with-search">
                    <i class="ti-menu" @click="store.onOpenSideMenu(true)"></i>
                    <ShopLogo />
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
import { ref, watch } from 'vue'
import SideMenuWithFade from './menus/SideMenuWithFade.vue';
import { useSideMenuStore } from '@/stores/SideMenuManager'
import CartHeader from '@/components/CartHeader.vue';
import ShopLogo from './ShopLogo.vue';
import { storeToRefs } from 'pinia';
const hideSearchBar = ref<boolean>(true)
function onShowSearch() {
    hideSearchBar.value = !hideSearchBar.value;
}

const store = useSideMenuStore()
const { isOpenSideMenu } = storeToRefs(store)

watch(isOpenSideMenu, (newVal) => {
    console.log('isOpenSideMenu: ', newVal)
    if (newVal) {
        document.body.classList.add('menu-open')
    } else {
        document.body.classList.remove('menu-open')
    }
})

// const body = document.body;
// const scrollUp = "scroll-up";
// const scrollDown = "scroll-down";
// let lastScroll = 0;
// window.addEventListener("scroll", () => {
//     // console.log('[scroll] lastScroll: ', lastScroll)
//     // console.log('[scroll] currentScroll: ', lastScroll)
//     const currentScroll = window.pageYOffset;
//     if (currentScroll <= 0) {
//         body.classList.remove(scrollUp);
//         return;
//     }
//     if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
//         // down 
//         console.log("down")
//         body.classList.remove(scrollUp);
//         body.classList.add(scrollDown);
//     } else if (
//         currentScroll < lastScroll &&
//         body.classList.contains(scrollDown)
//     ) {
//         // up 
//         console.log("up")
//         body.classList.remove(scrollDown);
//         body.classList.add(scrollUp);
//     }
//     lastScroll = currentScroll;
// });
</script>

<style scoped>
/* Navigation */
#nav-mobile {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    transition: transform 0.4s;
    z-index: 2;
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
    font-size: 2rem;
    height: var(--header-height);

}

#nav a {
    display: inline-block;
    color: white;
    opacity: 1;
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

/* Scroll to hide/show nav */
.scroll-down #nav-mobile {
    transform: translate3d(0, -100%, 0);
}

.scroll-up #nav-mobile {
    transform: none;
}

.scroll-up:not(.menu-open) #nav-mobile {
    background: var(--lightpurple);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.35);
}

/*  */

@media(max-width: 768px) {
    #nav-mobile {
        display: block;
    }
}
</style>