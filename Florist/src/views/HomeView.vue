<template>
  <div>
    <div id="home-page" @scroll="scrolling($event)">
      <div class="content first">
        <div class="grid wide inside">
          <p class="first__title">Chào mừng các bạn đã đến với</p>
          <p class="first__shop-name">Rosie Shop - Vườn hoa hạnh phúc</p>
        </div>
        <div class="scroll-next">
          <p>Cuộn xuống để biết thêm về vườn chúng mình nhé</p>
          <img src="../assets/img/arrow_down.gif" />
        </div>
      </div>
      <div class="content second">
        <div class="grid wide inside">
          <p class="second__description">Chúng tôi là một nhà vườn nhỏ nhỏ xinh xinh chuyên kinh doanh các loại hoa hồng
            nội,
            hoa hồng ngoại. Ngoài ra chúng tôi còn nhận bảo dưỡng
            và chăm sóc vườn hoa hồng định kì.</p>
          <p class="second__slogant">"Sự hài lòng của khách hàng chính là niềm hạnh phúc của Rosie."</p>
          <p class="second__description">Với phương châm hoạt động như thế nên chúng tôi cam kết sẽ mang đến cho khách
            hàng
            200% giá trị với
            một khu vườn rực rỡ và tràn đầy hương thơm theo đúng mong ước của các bạn.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
function scrolling(e: Event) {
  if (e.target) {
    console.log("[scrolling] e: ", e)
    const homepage = (e.target as HTMLDivElement)
    const slo = homepage.querySelector('.second__slogant');
    console.log("[scrolling] homepage: ", homepage)
    console.log("[scrolling] slo: ", slo)
    if (slo) {
      const slogant = (slo as HTMLParagraphElement)
      const slideInAt = (homepage.scrollTop + homepage.clientHeight);
      console.log('slideInAt: ', slideInAt)
      //slogant's bottom
      const slogantBottom = slogant.offsetTop;
      console.log('slogant.offsetTop: ', slogant.offsetTop)
      console.log('slogantBottom: ', slogantBottom)
      const isHalfShown = slideInAt > slogant.offsetTop;
      const isNotScolledPast = homepage.scrollTop < slogantBottom;
      if (isHalfShown && isNotScolledPast) {
        slogant.classList.add('active');
      } else {
        slogant.classList.remove('active');
      }
    }
  }

}
</script>
  
<style scoped>
#home-page {
  overflow: auto;
  height: calc(100vh - var(--header-height));
}

.content {
  width: 100%;
  height: calc(100vh - var(--header-height));
  /*  */
  text-align: center;
  display: flex;
  align-items: center;
}

.scroll-next {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.scroll-next p {
  font-weight: 800;
}

.scroll-next img {
  width: 100px;
  height: 50px;
  object-fit: cover;
}

p,
span {
  font-family: 'Dancing Script', cursive;
  font-size: 4.0rem;
  font-weight: 500;
}

.first {
  width: 100%;
  background-image: linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url('../assets/img/background/bg_rose_1.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}


.first__title {
  font-size: 5.0rem;
}

.first__shop-name {
  font-family: 'Imperial Script', cursive;
  font-weight: 600;
  font-size: 8.0rem;
}

.second {
  /* background-color: rgb(247, 186, 255); */
  background-image: linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url('../assets/img/background/bg_rose_2.jpg');
}

.second__slogant {
  font-size: 8.0rem;
  font-weight: 600;
  opacity: 0;
  transition: opacity 2s;
}

.second__slogant.active {
  opacity: 1;
}
</style>
  