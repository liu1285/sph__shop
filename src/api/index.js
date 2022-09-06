// 对api接口进行统一管理
import request from './request.js'
import mockRequest from './mockRequest.js'

// 三级联动接口
export const reqCategoryList = () => {
  return request.get('/product/getBaseCategoryList')
}

// banner轮播图接口
export const reqBanner = () => {
  return mockRequest.get('/banner')
}

// floor组件数据接口
export const reqFloor = () => {
  return mockRequest.get('/floor')
}

// 搜索模块搜索数据接口
export const reqGetSearchInfo = (params) => {
  return request({url:'/list', method:'POST', data:params})
}

// 产品详情接口
export const reqGoodsInfo = (skuId) => {
  return request({url:`/item/${skuId}`, method:'GET'})
}

// 添加到购物车接口
export const reqAddShopCart = (skuId,skuNum) => {
  return request({url:`/cart/addToCart/${skuId}/${skuNum}`, method:'POST'})
}

// 获取购物车列表数据的接口
export const reqCartList = () => {
  return request({url:'/cart/cartList', method:'GET'})
}

// 删除购物车产品数据的接口
export const reqDeleteCartById = (skuId) => {
  return request({url:`/cart/deleteCart/${skuId}`, method:'DELETE'})
}

// 修改商品选中状态的接口
export const reqUpdateChecked = (skuId,isChecked) => {
  return request({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'GET'})
}

// 获取验证码的接口
export const reqGetCode = (phone) => {
  return request({url:`/user/passport/sendCode/${phone}`,method:'GET'})
}

// 注册用户的接口
export const reqRegister = () => {
  return request({url:'/user/passport/register',method:'POST'})
}

//登录的接口:请求体携带参数 phone&&password
export const reqUserLogin = (data) => request({url:`/user/passport/login`,method:'post',data});

//获取用户登录成功以后用户信息的接口
export const reqUserInfo = ()=>request({url:`/user/passport/auth/getUserInfo`,method:'get'});

//退出登录业务
export const reqUserLogout = ()=>request({url:`/user/passport/logout`,method:'get'});

//获取用户地址信息
export const reqAddressInfo = ()=>request({url:`/user/userAddress/auth/findUserAddressList`,method:'get'});

//获取商品清单数据
export const reqShopInfo = ()=>request({url:`/order/auth/trade`,method:'get'});

//提交订单接口
export const reqSubmitOrder = (tradeNo,data)=>request({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data});

//获取支付信息接口
export const reqPayInfo = (orderId)=>request({url:`/payment/weixin/createNative/${orderId}`,method:'get'});

//查询支付结果
export const reqPayResult = (orderId)=>request({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});

//获取我的订单
export const reqMyOrderList = (page,limit)=>request({url:`/order/auth/${page}/${limit}`,method:'get'});