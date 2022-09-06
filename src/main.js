import Vue from 'vue'
import App from './App.vue'

// 导入路由模块
import router from '@/router/index.js'

// TypeNav组件
import TypeNav from '@/components/TypeNav/index-vue.vue'
Vue.component(TypeNav.name,TypeNav)
// Carsouel组件
import CarouSel from '@/components/CarouSel/index-vue.vue'
Vue.component(CarouSel.name,CarouSel)
// Pagination组件 
import PaginaTion from '@/components/PaginaTion/index-vue.vue'
Vue.component(PaginaTion.name,PaginaTion)

// 引入仓库
import store from '@/store/index.js'

// 引入mock模块
import '@/mock/mockServer.js'

// 引入swiper样式
import 'swiper/css/swiper.css'

// 引入element组件样式
import { MessageBox } from 'element-ui';
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//将项目全部请求函数引入进来[分别暴露]
import  * as http from '@/api';
//通过Vue.prototype原型对象,将全部请求函数挂载到原型对象身上[VC:就可以使用请求函数]
Vue.prototype.$http = http;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 路由
  router,
  // 全局组件
  TypeNav,
  CarouSel,
  PaginaTion,
  // store仓库，组件身上会多出一个$store属性
  store,
  // 安装全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
  },
}).$mount('#app');
