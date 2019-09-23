import Vue from 'vue';
import axios from 'axios';
import router from '../router'

export const server = {
    ordertext:function(orderlist){
        return post('/stat/orderCount',orderlist);//订单数
    },
    regsms: function (regsmsObj) {
        return post(`/login/code/${regsmsObj}`); //验证码
    },
    logo: function (logoObj) {
    return post('/login', logoObj); //登录
    },
    immediately:function(detection){
        return post('/api/blackList',detection); //黑名单立即检测
    },
    payment:function(pay){
        return post(`/pay/doPay/pc/${pay}`);  //征信pc支付
    },
    paystatus:function(godpay){
        return post(`/order/${godpay}`); //订单信息（订单状态）
    },
    orderslist:function(looklist){
        return post(`/order/list/1/100`); //订单列表（我的报告）
    },
    detection:function(contacts){
        return post('/api/contacts',contacts); //联系人检测
    },
    examinelist:function(examine){
        return post(`/order/viewReport/${examine}`); //查看报告
    },
    channel:function(serverspay){
        return post(`/pay/payChannel/${serverspay}`); //获取支付通道
    },
    wxpayment:function(paylist){
        return post('/pay/doPay',paylist); // 征信h5支付
    },
    waiip:function(iplist){
        return post('https://pv.sohu.com/cityjson?ie=utf-8',iplist); //微信公众号登录获取外网ip
    },
    operater:function(regsmsoper){
      return post('/api/operator/code',regsmsoper);  //运营商获取验证码
    },
    operdiately:function(operction){
      return post('/api/operator',operction);  //运营商检测
    },
    getOpenid:function(getOpenidObj){
      return post('/user/getOpenid',getOpenidObj);  //获取openid
    },
    exitlist:function(exit){
      return post('/user/logout',exit);  //退出登录
    }


}

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, data)
        .then(response => {
          resolve(response.data);  
        }, err => {
          reject(err)
        })
    })
  }

axios.defaults.timeout = 30000; //网络超时 
// axios.defaults.baseURL = 'http://124.204.64.154:8889/lmhd-boot-gateway-crapi'// 本地域名
axios.defaults.baseURL = 'https://crapitest.kkswine.com/lmhd-boot-gateway-crapi' //测试域名

//http request 拦截器  
axios.interceptors.request.use(
  config => {
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type': 'application/json',
      accessToken:localStorage.getItem("accessToken") || ''
    }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);
//响应拦截器即异常处理  
axios.interceptors.response.use(response => {
  console.log(response.data.code)
  switch (response.data.code) {
    case "1103":
      localStorage.removeItem('accessToken')
      router.replace({
        path:'../login'
      })
      break;
    case "1101":
      router.replace({
        path:'../login'
      })
  }

  return response
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        console.log('错误请求')
        break;
      case 401:
        console.log('未授权，请重新登录')
        break;
      case 403:
        console.log('拒绝访问')
        break;
      case 404:
        console.log('请求错误,未找到该资源')
        break;
      case 405:
        console.log('请求方法未允许')
        break;
      case 408:
        console.log('请求超时')
        break;
      case 500:
        console.log('服务器端出错')
        break;
      case 501:
        console.log('网络未实现')
        break;
      case 502:
        console.log('网络错误')
        break;
      case 503:
        console.log('服务不可用')
        break;
      case 504:
        console.log('网络超时')
        break;
      case 505:
        console.log('http版本不支持该请求')
        break;
      default:
        console.log(`连接错误${err.response.status}`)
    }
  } else {
    console.log('连接到服务器失败')
    // 断网处理
  }
  return Promise.reject(err)
})


export let token = "4e6566d7ddf84dd5bd5926bf8ad05046" //版本号
export let url="https://crtest.kkswine.com/payseccess" //微信支付成功回跳

export default ({

})
