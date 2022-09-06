import { reqCartList, reqDeleteCartById, reqUpdateChecked } from "@/api/index.js"
import { SET_USERID } from '@/utils/USER_ID';
// ShopCart模块的仓库
const state = {
  // 游客临时身份
 USER_ID: SET_USERID(),
 // 购物车列表
 cartList:[]
} 
const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  }
 /*  cartInfoList(state) {
    return state.cartList[0].cartInfoList || []
 }  */
}
const mutations = {
 GETCARTLIST(state,cartList) {
  state.cartList = cartList
 }
}
const actions = {
  // 获取购物车数据列表
  async getCartList({commit}) {
    let result = await reqCartList()
    if(result.code===200)
    commit('GETCARTLIST',result.data)
  },
  // 删除某一商品的数据
  async deleteCartById({ commit }, skuId) {
          let result = await reqDeleteCartById(skuId);
          if (result.code == 200) {
               return 'ok';
          } else {
               return Promise.reject(new Error('faile'));
          }
     },
  //修改某一个商品勾选状态
  async changeChecked({ commit, state, dispatch }, { skuId, isChecked }) {
          let result = await reqUpdateChecked(skuId, isChecked);
          if (result.code == 200) {
               return 'ok';
          } else {
               return Promise.reject();
          }
     },
  //修改全部商品的勾选的状态
  allUpdateChecked({ commit, state, dispatch }, isChecked) {
          let arr = [];
          //获取购物车商品的个数,进行遍历
          state.cartList[0].cartInfoList.forEach(item => {
               //调用修改某一个商品的action【四次】
               let ps = dispatch("changeChecked", { skuId: item.skuId, isChecked });
               arr.push(ps);
          })
          //Promise.all():参数需要的是一个数组【数组里面需要promise】
          //Promise.all()执行一次,返回的是一个Promise对象,Promise对象状态：成功、失败取决于什么?
          //成功、还是失败取决于数组里面的promise状态:四个都成功、返回成功Promise、只要有一个失败、返回Promise失败状态！！！
          return Promise.all(arr);
     },
  //删除选中的商品
  deleteAllCart({ commit, state, dispatch }) {
          let arr = [];
          //获取仓库里面购物车的数据
          state.cartList[0].cartInfoList.forEach(item => {
               //商品的勾选状态是勾选的,发请求一个一个删除
               if (item.isChecked == 1) {
                    let ps = dispatch('deleteCartById', item.skuId);
                    arr.push(ps);
               }
          })
          return Promise.all(arr);
     }
}

// 对外暴露
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}