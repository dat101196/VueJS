<template>
  <div class="product-category">
    <h3 class="product-category__heading">Danh mục</h3>
    <ul class="product-category-list">
      <li class="product-category-item">
        <AppLink class="product-category-item__link" :to="{ name: 'products.show', params: { isn: -1, slug: 'Tất cả' } }">
          Tất cả sản phẩm
        </AppLink>
      </li>
      <li class="product-category-item" v-for="cate in store.categories" :key="cate.isn">
        <AppLink class="product-category-item__link" :to="{ name: 'products.show', params: { isn: cate.isn, slug: cate.categoryName } }">
          {{ cate.categoryName }}
        </AppLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'
import { useCategorytore } from '../../stores/CategoryData'
const store = useCategorytore()
if (!store.categories || store.categories.length <= 0) {
  store.getAllCategory()
}

watchEffect(() => {
  console.log('categories: ', store.categories)
})
</script>

<style scoped>
.product-category {
  background-color: var(--white-color);
  border-radius: var(--border-radius-default);
}

.product-category__heading {
  font-size: 1.5rem;
  font-weight: 400;
  padding: 16px 16px 0;
  margin-top: 0;
  text-transform: uppercase;
}

.product-category-list {
  padding: 0 0 2px 0;
  list-style-type: none;
}

.product-category-item--active .product-category-item__link {
  color: var(--primary-color);
}

.product-category-item {
  position: relative;
}

.product-category-item:first-child::before {
  display: none;
}

.product-category-item::before {
  content: "";
  border-top: 1px solid var(--border-color);
  position: absolute;
  top: 0;
  left: 16px;
  right: 16px;
}

.product-category-item__link {
  position: relative;
  text-decoration: none;
  font-size: 1.4rem;
  color: var(--text-color);
  padding: 16px;
  display: block;
}

.product-category-item__link:hover {
  color: var(--primary-color);
}
</style>