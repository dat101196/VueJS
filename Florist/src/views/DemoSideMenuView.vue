<template>
    <div class="container">
        <div class="grid wide">
            <div class="row">
                <div class="col l-2 m-4 s-12 left-side-menu">
                    <SideMenuDynamic :menu-items="listmenus" @on-menu-click="onMenuClick" />
                </div>
                <div class="col l-10 m-8 s-12">
                    <div class="content-container">
                        <h1>Content</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SideMenuDynamic from '@/components/menus/SideMenuDynamic.vue';
import type { MenuItem } from '@/models/MenuItem';
import { ref } from 'vue';

const listmenus = ref<MenuItem[]>([])
listmenus.value = [
    {
        name: "Menu Item 1",
        to: { name: '' }
    },
    {
        name: "Menu Item 2",
        to: { name: '' }
    }
]

function onMenuClick(menu: MenuItem) {
    console.log("[onMenuClick] menu: ", menu)
}
</script>

<style scoped>
.cart-detail-page.header__cart-list {
    display: block;
}

.content-container{
    background-color: aquamarine;
    margin-top: 10px;
    height: 100%;
}
</style>