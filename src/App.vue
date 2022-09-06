<template>
  <div class="box">
    <Header></Header>
    <router-view></router-view>
    <!-- <Footer v-show="$route.path=='/home'||$route.path=='/search'"></Footer> -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>

</template>

<script>
// 引入组件
import Footer from '@/components/Footer/index-vue.vue'
import Header from '@/components/Header/index-vue.vue'
export default {
  components:{
    Footer,
    Header
  },
  created() {
    // 发送请求获取categoryList数据
    this.$store.dispatch('home/categoryList')
  }
}
</script>

<style>

</style>