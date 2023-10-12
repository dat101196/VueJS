<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheNavigation from './components/TheNavigation.vue';
import TheNavigationMobile from './components/TheNavigationMobile.vue';
import LoadingView from './components/LoadingView.vue';
</script>

<template>
  <TheNavigation />
  <TheNavigationMobile />
  <RouterView id="main-content" />
  <LoadingView />
  <!-- <div class="container">
    <div class="grid wide">
      <div class="row">
        <div class="col l-2 m-4 s-12 left-side-menu">
          <RouterView name="LeftSideBar" />
        </div>
        <div class="col l-10 m-8 s-12">
          <RouterView />
        </div>
      </div>
    </div>
  </div> -->
</template>

<style scoped>
#main-content {
  margin-top: var(--header-height);
}
</style>
