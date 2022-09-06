import { reqGetSearchInfo } from "@/api/index.js"
// Search模块的仓库
const state = {
  SearchList:{}
} 
const getters = {
  // 简化SearchList中的数据
  goodsList(state) {
    // 为防止数据没有请求回来就开始渲染，给goodsList一个默认值为空数组
    return state.SearchList.goodsList || []
  },
  attrsList(state) {
    return state.SearchList.attrsList || []
  },
  trademarkList() {
    return state.SearchList.trademarkList || []
  }
}
const mutations = {
  // 获取搜索模块数据
  GETSEARCHLIST(state,SearchList) {
    state.SearchList = SearchList
  }
}
const actions = {
  // 获取搜索模块数据
  // params 默认为一个空对象
  async GetSearchList({commit},params={}) {
    const result = await reqGetSearchInfo(params)
    if(result.code === 200)
    commit('GETSEARCHLIST',result.data)
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