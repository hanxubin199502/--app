import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/mytext/home/home'  //  征信首页 
import myorder from '@/components/mytext/myorder/myorder' // 我的订单
import login from '@/components/mytext/login/login' // 登录
import blacklistorder from '@/components/mytext/blacklistorder/blacklistorder' // 黑名单风险检测
import operatorlistorder from '@/components/mytext/operatorlistorder/operatorlistorder' // 运营商风险诊断
import contactlistorder from '@/components/mytext/contactlistorder/contactlistorder' // 紧急联系人风险检测
import blackorderhelp  from '@/components/mytext/blackorderhelp/blackorderhelp'//黑名单查看帮助
import blacklistdetail from '@/components/mytext/blacklistdetail/blacklistdetail'// 黑名单风险检测详情
import operlistdetail from '@/components/mytext/operlistdetail/operlistdetail'// 运营商诊断详情
import payseccess from '@/components/mytext/payseccess/payseccess' //支付成功回跳
// import pirese from '@/components/mytext/pirese/pirese'
import contlistdetail from '@/components/mytext/contlistdetail/contlistdetail'
Vue.use(Router) 


export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: '/home',
      meta:{index:0,haslist:true},
      component: home
    },
    {
      path: '/myorder',
      name: 'myorder',
      meta:{index:1,haslist:true},
      component: myorder
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/blacklistorder',
      name: 'blacklistorder',
      component: blacklistorder
    },
    {
      path: '/operatorlistorder',
      name: 'operatorlistorder',
      component: operatorlistorder
    },
    {
      path: '/contactlistorder',
      name: 'contactlistorder',
      component: contactlistorder
    },
    {
      path: '/blackorderhelp',
      name: '/blackorderhelp',
      component: blackorderhelp
    },
    {
      path: '/blacklistdetail',
      name: 'blacklistdetail',
      component: blacklistdetail
    },
    {
      path: '/operlistdetail',
      name: 'operlistdetail',
      component: operlistdetail
    },
    {
      path: '/payseccess',
      name: 'payseccess',
      component: payseccess
    },
    // {
    //   path: '/pirese',
    //   name: 'pirese',
    //   component: pirese
    // },
    {
      path: '/contlistdetail',
      name: 'contlistdetail',
      component: contlistdetail
    },
  ]
})
