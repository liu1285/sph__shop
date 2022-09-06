import Vue from 'vue'
import Vuex from 'vuex'

// 引入仓库
import home from './home/index.js'
import search from './search/index.js'
import detail from './detail/index.js'
import ShopCart from './shopcart/index.js'
import user from './user/index.js'
import trade from './trade/index.js'

// 将vuex注册为vue的插件
Vue.use(Vuex)


// 对外暴露Store类的一个实例
export default new Vuex.Store({
  modules:{
    home,
    search,
    detail,
    ShopCart,
    user,
    trade
  }
})