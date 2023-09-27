<script setup lang="ts">
import CategoryMenu from '@/components/menus/CategoryMenu.vue';
import { watchEffect } from 'vue';
import { RouterView, useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
console.log('first load shop view')
watchEffect(() => {
  console.log('[ShopView] Route name: ', route.name)
  //detect nếu route name = shop (là trang này) thì push route để hiển thị tất cả sản phẩm
  if (route.name && route.name == 'shop') {
    router.push({ name: 'products.show', params: { isn: -1, slug: 'Tất cả' } })
  }
})
</script>

<template>
  <div class="container">
    <div class="grid wide">
      <div class="row">
        <div class="col l-2 m-4 s-12 left-side-menu">
          <CategoryMenu />
        </div>
        <div class="col l-10 m-8 s-12">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 10px;
}
</style>
