// 对axios二次封装
import axios from 'axios'

// 创建axios实例
let request =  axios.create(
  {
    // 基础路径
    baseURL:'/mock',
    // 请求超时时间
    timeout:5000
  }
)

// 引入nprogress进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

// 请求拦截器
request.interceptors.request.use((config) => {
  // 进度条开始
  nprogress.start()
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