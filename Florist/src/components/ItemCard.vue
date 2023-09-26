<script setup lang="ts">
import { formatNumber } from '@/helper/UIHelper';
import type { Flower } from '@/models/Flower';

defineProps<{
  flower: Flower
}>()
</script>

<template>
  <a class="product-item" @click="$emit('onClickItem')">
    <div class="product-item__img" :style="{'background-image': 'url('+ flower.thumbnail +')'}">
    </div>
    <h4 class="product-item__name">{{ flower.flowerName }}
    </h4>
    <div class="product-item__price">
      <span class="product-item__price-current">{{ formatNumber(flower.price) }}đ</span>
    </div>
    <div class="add-to-cart">
      <button class="btn btn--semi-solid btn-round-corner btn-add-to-cart">Thêm vào giỏ hàng</button>
    </div>
    <!-- <div class="product-item__action">
      <span class="product-item__wish-list product-item__wish-list--active">
        <i class="product-item__wish-list-icon-inactive fa-regular fa-heart"></i>
        <i class="product-item__wish-list-icon-active fa-solid fa-heart"></i>
      </span>
      <div class="product-item__rating">
        <i class="product-item__star--gold fa-solid fa-star"></i>
        <i class="product-item__star--gold fa-solid fa-star"></i>
        <i class="product-item__star--gold fa-solid fa-star"></i>
        <i class="product-item__star--gold fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
      </div>
    </div> -->
  </a>
</template>

<style scoped>
.product-item {
  display: block;
  position: relative;
  background-color: var(--white-color);
  margin-top: var(--margin-top-item-card);
  padding-bottom: 10px;
  border-radius: var(--border-radius-default);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  transition: transform ease-in 0.1s;
}

.product-item:hover {
  box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

.product-item__img {
  /* padding-top: 100% - 100% ở đây là = width của parent chứa nó */
  padding-top: 100%;
  background-color: var(--border-color);
  background-repeat: no-repeat;
  /* background-size
      -contain: thu nhỏ ảnh lại(nếu ảnh to) để vừa khung hình và giữ tỉ lệ => sẽ xuất hiện khoảng trống nếu tỉ lệ hình và khung chứa khác nhau.
      -cover: thu nhỏ ảnh lại(nếu ảnh to) và sẽ lấp đầy khung chứa theo tỉ lệ khung chứa, => bị mất ảnh 1 phần nếu tỉ lệ hình và khung chứa khác nhau.
    */
  background-size: contain;
  /* background-position: center để lấy trọng tâm là giữa ảnh */
  background-position: center;
  border-top-left-radius: var(--border-radius-default);
  border-top-right-radius: var(--border-radius-default);
}

.product-item__name {
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 1.8rem;
  color: var(--text-color);
  height: 3.6rem;
  margin: 8px;
  text-align: center;
  /* Chỉnh giao diện để text chỉ hiển thị 2 dòng nếu dài hơn sẽ hiện dấu ... 
    Lưu ý: chỉ hỗ trợ cho phiên bản Edge 17, Firefox 68, Safari 5, Chrome 6, Opera 15 trở lên*/
  overflow: hidden;
  display: block;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.product-item__price {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  justify-content: center;
}

.product-item__price-old {
  font-size: 1.2rem;
  margin-left: 10px;
  text-decoration: line-through;
  color: var(--text-light-gray-color);
}

.product-item__price-current {
  font-size: 1.4rem;
  color: var(--primary-color);
  text-align: center;
}

.product-item__action {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 10px;
  flex-wrap: wrap;
}

.product-item__wish-list {
  font-size: 1.3rem;
  color: var(--text-color);
}

i.product-item__wish-list-icon-active {
  color: red;
  display: none;
}

.product-item__wish-list--active i.product-item__wish-list-icon-active {
  display: inline-block;
}

.product-item__wish-list--active i.product-item__wish-list-icon-inactive {
  display: none;
}

.product-item__rating {
  font-size: 0.8rem;
  color: #d5d5d5;
  /* margin-left: auto - đẩy div rating sát sang phải cho tới khi đụng div product-item__sold */
  margin-left: auto;
  margin-top: -1px;
}

.product-item__star--gold {
  color: var(--star-gold-color);
}

.product-item__sold {
  color: var(--text-color);
  margin-left: 4px;
}

.product-item__origin {
  display: flex;
  justify-content: space-between;
  margin: 1px 10px 0px;
  color: #595959;
  font-weight: 300;
  font-size: 1.1rem;
}

.btn-add-to-cart{
  display: block;
  margin: auto;
  font-size: 1.2rem;
}
</style>