// 导入vue和vue-router相关的包
import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入仓库
import store from '@/store'

// 将vue-router注册为vue的插件
Vue.use(VueRouter)

// 导入需要的组件
import Home from '@/pages/Home/index-vue.vue'
import Login from '@/pages/Login/index-vue.vue'
import Register from '@/pages/Register/index-vue.vue'
import Search from '@/pages/Search/index-vue.vue'
import Detail from '@/pages/Detail/index.vue'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/paySuccess'
import Center from '@/pages/Center'
// 个人中心的二级路由组件
import MyOrder from '@/pages/Center/myOrder';
import TeamOrder from '@/pages/Center/teamOrder'

// 重写push和replace方法
let originPush = VueRouter.prototype.push

VueRouter.prototype.push = function(location,resolve,reject) {
  // 如果传递了回调函数
  if(resolve && reject) {
    // 用call()篡改函数上下文，否则函数的this为window
    originPush.call(this,location,resolve,reject)
  }
  // 没有传递回调函数
  else originPush.call(this,location,()=>{},()=>{})
}

// 创建路由实例对象
const router = new VueRouter({
  // 配置路由
  routes: [
     // 重定向
    { path: '/', redirect:'/home'},
    { path: '/home', component: Home, name:'home', meta:{show:true}, }, 
    { path: '/login', component: Login, meta:{show:false} },
    { path: '/register', component: Register, meta:{show:false} },
    { path: '/Search/:keyword?', component: Search, name:'search', meta:{show:true}, props:true, },
    { path: '/detail/:skuId', component:Detail, meta:{show:true} },
    { path: '/AddCartSuccess', component:AddCartSuccess, name:'AddCartSuccess', meta:{show:true}} ,
    { path: '/ShopCart',component:ShopCart, name:'ShopCart', meta:{show:true}},
    { path: '/trade',component:Trade, name:'Trade', meta:{show:true}},
    { path: '/pay',component:Pay, name:'Pay', meta:{show:true} },
    { path: '/pay',component:Pay, name:'Pay', meta:{show:true} },
    { path: '/paySuccess',component:PaySuccess, name:'PaySuccess', meta:{show:true} },
    { path: '/center',
      component:Center, 
      name:'Center', 
      meta:{show:true} ,
    // 配置二级路由
      children:[
             {
                  path:'myorder',
                  component:MyOrder
             }
             ,
             {
                 path:'teamorder',
                 component:TeamOrder
             }
             ,
             {
                 path:'',
                 redirect:'myorder'
             }
      ]

    },

  ],
  // 滚动行为
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

// 导航守卫 全局前置守卫
router.beforeEach(async (to, from, next) => {

    //用户是否登录:取决于仓库里面是否有token
    //token
    let hasToken = store.state.user.token;
    //用户信息
    let hasNickName = store.state.user.nickName;
    //用户登录
    if (hasToken) {
        //用户登录了,不能去login
        if (to.path == "/login") {
            next('/home');
        } else {
            //用户登陆了,而且还有用户信息【去的并非是login】
            if (hasNickName) {
                next();
            } else {
                //用户登陆了,但是没有用户信息 
                try {
                    //发请求获取用户信息以后在放行
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    //用户没有信息，还携带token发请求获取用户信息【失败】
                    //token失效:本地清空数据、服务器的token通知服务器清除
                    await store.dispatch('logout');
                    //回到登录页
                    next('/login');
                }
            }
        }
    } else {
        //用户未登录:不能进入/trade、/pay、/paysuccess、/center、/center/myorder  /center/teamorder
        let toPath = to.path;
        if ( toPath.indexOf('trade') != -1   ||  toPath.indexOf('pay') != -1  ||  toPath.indexOf('center') != -1 ) {
            next('/login?redirect='+toPath);
        } else {
            next();
        }
    }
}); 
// 将实例对象导出
export default router