<template>
  <ul class="menu-container">
    <li class="menu-item" v-for="(menu, index) in menuItems" :key="index" @click="$emit('onMenuClick', menu)">
      <AppLink class="menu-item__link" :to="menu.to">{{ menu.name }}</AppLink>
    </li>
  </ul>
</template>
<script setup lang="ts">
import type { MenuItem } from '@/models/MenuItem';

defineProps<{
  menuItems: MenuItem[]
}>()

</script>

<style scoped>
.menu-container {
  margin-top: 10;
  padding: 10px 20px;
  list-style-type: none;
}
</style>