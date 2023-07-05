<script>
import TheNavigation from '@/components/TheNavigation.vue';
export default {
  components: { TheNavigation }
}
</script>

<template>
  <TheNavigation />
  <div class="container">
    <!-- Without transition -->
    <!-- <router-view :key="route.path"></router-view> -->


    <!-- 
    With transition
    Add transition cho router-view
    thêm v-slot vô router-view với param và đoạn code transition vô như bên dưới 
  
    :key="route.path" attribute trong component dùng để bắt buộc transition giữa reused views nếu ko sẽ ko có transition giữa component giống nhau. Trong porject này nếu bỏ :key ra thì khi chuyển views giữa các nước ta sẽ ko thấy transition (vì xài lại DesinationShow.vue) mà chỉ thấy transition khi chuyển từ trang Home qua trang DestinationShow
  
    :name="route.meta.transition || 'moveUp'"
    Chỉ định dynamic name cho transition. Trong đó:
    -route.meta.transition là sử dụng transition cho từng route được khai báo trong property meta của route trong route/index.js
    -'moveUp' là tên transition default để trường hợp route.meta.transition null thì sẽ dùng tới. Có thể dùng moveUp,slide,fade,...
  -->
    <router-view v-slot="{ Component, route }">
      <!-- Slide transition -->
      <!-- <transition :name="route.meta.transition || 'slide'" mode="out-in"> -->

      <!-- Move up transition -->
      <transition :name="route.meta.transition || 'moveUp'">

        <!-- Fade transition -->
        <!-- <transition :name="route.meta.transition || 'fade'" mode="out-in"> -->
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </div>
</template>

<style lang="css">
/*Router Transition Slide style */
/* .slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-10%);
} */

/*Router Transition moveUp style */
.moveUp-enter-active {
  opacity: 0;
  animation: moveIn 0.4s linear;
  animation-delay: 0.4s;
}

@keyframes moveIn {
  from {
    opacity: 0;
    transform: translateY(400px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.moveUp-leave-active {
  animation: moveOut 0.4s linear;
}

@keyframes moveOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }

  to {
    opacity: 0;
    transform: translateY(-400px);
  }
}


/*Router Transition Fade style */
/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
} */
</style>