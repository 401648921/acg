import axios from "axios";

//用户登录的链接
export function oauthRequest(config){
  const instance = axios.create({
    baseURL:'/api1',
    timeout:5000
  })
  return instance(config);
};
//圈子、收藏、问答的管理接口
export function acgRequest(config){
  const instance = axios.create({
    baseURL:'/api2',
    timeout:5000
  })
  return instance(config);
};
//个人主页的接口
export function communityRequest(config){
  const instance = axios.create({
    baseURL:'/api3',
    timeout:5000
  })
  return instance(config);
};
//用户反馈、帮助、粉丝、关注的接口
export function userRequest(config){
  const instance = axios.create({
    baseURL:'/api4',
    timeout:5000
  })
  return instance(config);
}
//用户密码登录
export function loginRequest(config){
  const instance = axios.create({
    baseURL:'/api5',
    timeout:5000
  })
  return instance(config);
}
//搜索
export function esRequest(config){
  const instance = axios.create({
    baseURL:'/api6',
    timeout:5000
  })
  return instance(config);
}
