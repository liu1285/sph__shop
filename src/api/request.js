// 对axios二次封装
import axios from 'axios'

// 创建axios实例
let request =  axios.create(
  {
    // 基础路径
    baseURL:'/api',
    // 请求超时时间
    timeout:5000
  }
)

//获取仓库:存储数据
import store from "@/store";

// 引入nprogress进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

// 请求拦截器
request.interceptors.request.use((config) => {
  // 进度条开始
  nprogress.start()

  if (store.state.ShopCart.USER_ID) {
        config.headers.userTempId = store.state.ShopCart.USER_ID;
    }

    // 将token带给服务器
    if(store.state.user.token){
        config.headers.token = store.state.user.token;
    }

  return config
},(err) => {
  console.log(err);
})

// 响应拦截器
request.interceptors.response.use((res) => {
  // 进度条结束
  nprogress.done()
  return res.data
},err => {
  console.log(err);
})

// 对外共享
export default request