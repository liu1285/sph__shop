<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl">
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name:'CarouSel',
  props:['list'],
  watch:{
    // 为和ListContainer组件保持一致,以便于拆分组件,采用如下写法初始化swiper
    list:{
      handler() {
        this.$nextTick(() => {
          // 初始化swiper组件
        var mySwiper = new Swiper (this.$refs.mySwiper, {
          loop: true, // 循环模式选项
          
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          },
          
          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },  
        })
        })
      },
      immediate:true
    }
  }
}
</script>

<style>

</style>