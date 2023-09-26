<template>
  <div class="side-menu-fade" :class="{ 'hide-menu': !store.isOpenSideMenu }" @click="store.onOpenSideMenu(false)"></div>
  <div class="side-menu" :class="{ 'hide-menu': !store.isOpenSideMenu }">
    <i class="ti-close btn-close-menu" @click="store.onOpenSideMenu(false)"></i>
    <ul class="menu-list" @click="store.onOpenSideMenu(false)">
      <li class="menu-item">
        <AppLink class="menu-item__link" :to="{ name: 'shop' }">Shop</AppLink>
      </li>
      <li class="menu-item">
        <AppLink class="menu-item__link" :to="{ name: 'about' }">Về chúng tôi</AppLink>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { useSideMenuStore } from '@/stores/SideMenuManager';
const store = useSideMenuStore()
</script>