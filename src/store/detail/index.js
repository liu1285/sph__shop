import { reqGoodsInfo,reqAddShopCart } from "@/api/index.js"
// Detail模块的仓库
const state = {
  goodInfo:{}
} 
const getters = {
  categoryView(state) {
    return state.goodInfo.categoryView || []
  },
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || []
  }
}
const mutations = {
 // 获取产品信息
 GETGOODINFO(state,goodInfo) {
  state.goodInfo = goodInfo
 }
}
const actions = {
  // 获取产品信息
  async getGoodInfo( {commit}, skuId ) {
    let result = await reqGoodsInfo(skuId)
    if(result.code === 200) {
      commit('GETGOODINFO',result.data)
    }
  },
  // 将产品添加到购物车
  async AddShopCart({commit},{skuId, skuNum}) {
    let result = await reqAddShopCart(skuId, skuNum)
    if ( result.code === 200)
    return 'ok'
    else
    throw new Error('出错了')
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