import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import VueLazyload from 'vue-lazyload'
import store from './store'

Vue.use(VueAwesomeSwiper /* { default global options } */)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'http://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=%E9%94%99%E8%AF%AF&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=undefined&cs=396805210,4266088262&os=3268477824,4175503894&simid=0,0&pn=2&rn=1&di=188551925760&ln=1746&fr=&fmq=1540714337839_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&objurl=http%3A%2F%2Fphoto.16pic.com%2F00%2F45%2F24%2F16pic_4524591_b.jpg&rpstart=0&rpnum=0&adpicid=0',
  loading: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540724476207&di=1b5ba9131308c5cd41a495f8cc52e2aa&imgtype=0&src=http%3A%2F%2Fwww.biymx.com%2Fdata%2Fupload%2Fueditor%2F20180308%2F5aa0d958deb0f.gif',
  attempt: 1
})

Vue.config.productionTip = false
/* eslint-disable no-new */
// 在进入路由之前 每一次都会执行此方法 全局钩子 拦截
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  if (to.path === '/list') {
    // next({path: '/add'})
    next()
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
