import{reqBanner, reqCategoryList, reqFloor} from '@/api/index.js'
// Home模块的仓库

// 仓库数据
const state = {
  categoryList:[],
  bannerList:[],
  floorList:[]

}
// 修改仓库数据的唯一手段
const mutations = {
  // 三级联动数据
  CATEGORYLIST(state,categoryList) {
    state.categoryList = categoryList
  },
  // 轮播图数据
  GETBANNER(state,bannerList) {
    state.bannerList = bannerList
  },
  // floor数据
  GETFLOOR(state,floorList) {
    state.floorList = floorList
  }
}
// 处理action可以书写自己的业务逻辑，也可以处理异步
const actions = {
  // 向服务器发请求获取三级联动数据
  async categoryList({commit}) {
    const result = await reqCategoryList()
    if(result.code === 200)
    commit('CATEGORYLIST',result.data)
  },
  // 获取轮播图数据
  async getBanner ({commit}) {
    const result = await reqBanner()
    if(result.code === 200)
    commit('GETBANNER',result.data)
  },
  // 获取floor数据
  async getFloor ({commit}) {
    const result = await reqFloor()
    if(result.code === 200) 
    commit('GETFLOOR',result.data)
  }
}
// 计算属性，获取仓库数据更加方便
const getters = {
  addCount: state => state.count + 1,
  addNumber: state => (num) => state.count + num
}
// 对外暴露
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}