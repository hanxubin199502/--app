// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "./assets/reset.css"
import 'iview/dist/styles/iview.css'
import 'lib-flexible'
import vpay from 'vpay'   
import layer from 'vue-layer'
import store from './vuex/index'
import VueScroller from 'vue-scroller'
import {server} from './util/util'
import {url} from './util/util'
import 'swiper/dist/css/swiper.css'
import iView from 'iview'
import highcharts from 'highcharts'
import Highcharts from 'highcharts/highstock'
import HighchartsMore from 'highcharts/highcharts-more.js'
import SolidGauge from 'highcharts/modules/solid-gauge.js'
import Wordcloud from  'highcharts/modules/wordcloud'
import wx from 'weixin-js-sdk'
Vue.config.productionTip = false
Vue.prototype.$layer = layer(Vue);
Vue.prototype.$wx = wx;
HighchartsMore(highcharts)
SolidGauge(highcharts)
Vue.use(highcharts)
Wordcloud(Highcharts)
Vue.use(vpay)
Vue.use(iView);
Vue.use(VueScroller)
Vue.prototype.$server=server
Vue.prototype.$url=url
// Vue.prototype.$parameter=parameter

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
