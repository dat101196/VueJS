<script setup lang="ts">
import SideMenu from '@/components/Menus/SideMenu.vue';
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="container">
    <div class="grid wide">
      <div class="row">
        <div class="col l-2 m-4 s-12 left-side-menu">
          <SideMenu />
        </div>
        <div class="col l-10 m-8 s-12">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container{
  margin-top: 10px;
}
</style>
