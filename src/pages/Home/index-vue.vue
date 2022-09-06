<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
// 引入组件
import ListContainer from './ListContainer/index-vue.vue'
import TodayRecommend from './TodayRecommend/index-vue.vue'
import Rank from './Rank/index-vue.vue'
import Like from './Like/index-vue.vue'
import Floor from './Floor/index-vue.vue'
import Brand from './Brand/index-vue.vue'
// 引入辅助函数
 import { mapState } from 'vuex'

export default {
  components:{
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  created() {
    // 请求floor数据
    this.$store.dispatch('home/getFloor')
  },
   mounted() {
    // 获取用户信息在首页展示
   this.$store.dispatch('getUserInfo') 
  },  
  computed:{
    ...mapState({floorList:state => state.home.floorList})
  }
}
</script>

<style>

</style>