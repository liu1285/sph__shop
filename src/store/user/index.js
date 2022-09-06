import { reqGetCode, reqRegister, reqUserLogin, reqUserInfo, reqUserLogout} from "@/api/index.js"
import Cookies from 'js-cookie'
// register模块的仓库
const state = {
 // 验证码
 code:'',
 // 身份验证信息
 token:Cookies.get('TOKEN'),
 // token:localStorage.getItem('TOKEN'),
 // 用户名
 nickName:''

} 
const getters = {
  
}
const mutations = {
 GETCODE(state,code) {
  state.code = code
 },
 SET_TOKEN(state, data) {
          state.token = data.token;
     },
 SET_USERINFO(state, nickName) {
          state.nickName = nickName;
     }, 
 CLEAR(state) {
          //清除仓库相关用户信息
          state.token = '';
          state.nickName = '';
          //本地存储令牌清空
          Cookies.remove('TOKEN')
          // localStorage.removeItem('TOKEN');
     }
}
const actions = {
  //获取验证码
     async getCode({ commit, state, dispatch }, phone) {
          let result = await reqGetCode(phone);
          if (result.code == 200) {
               commit('GETCODE', result.data);
               return 'ok';
          } else {
               return Promise.reject();
          }
     },
  //注册用户的地方
     async registerUser({ commit, state, dispatch }, obj) {
          //注册接口没有返回data,不需要提交mutation
          let result = await reqRegister(obj);
          if (result.code == 200) {
               //注册成功
               return 'ok';
          } else {
               //注册失败
               return Promise.reject(new Error(result.message));
          }
     },
    //用户登录的地方
     async userLogin({ commit, state, dispatch }, data) {
          let result = await reqUserLogin(data);
          //登录成功
          if (result.code == 200) {
               commit('SET_TOKEN', result.data);
               //持久化存储
               Cookies.set('TOKEN',result.data.token)
               // localStorage.setItem('TOKEN', result.data.token);
               return 'ok';
          } else {
               //登录失败
               return Promise.reject(new Error(result.message));
          }
     },
     //获取用户信息
   async getUserInfo({ commit, state, dispatch }) {
         let result = await reqUserInfo();
          if (result.code == 200) {
               commit('SET_USERINFO', result.data.nickName);
               return 'ok';
          } else {
               return Promise.reject(new Error(result.message));
          }
     }, 
     //退出登录的业务
     async logout({ commit, state, dispatch }) {
          //发请求通知服务器销毁当前token【学生证】
          let result = await reqUserLogout();
          if (result.code == 200) {
               commit('CLEAR');
               return 'ok';
          } else {
               return Promise.reject(new Error(result.message));
          }
     }
}

// 对外暴露
export default {
  state,
  getters,
  mutations,
  actions
}