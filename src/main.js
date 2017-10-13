import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App.vue'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'


import VueRouter from "vue-router"
import VueResource from 'vue-resource'; 
Vue.use(VueResource);
//开启debug模式
Vue.config.debug = true;
Vue.use(VueRouter);

Vue.use(MintUI)



import store from './vuex/store'

import tuijianbofang from './components/tuijianbofang.vue'
// 创建一个路由器实例并且配置路由规则
const router = new VueRouter({
  base: __dirname,
  routes: [
  { path: '/components/tuijianbofang', name:'tuijianbofang',component: tuijianbofang },
  ]
})

// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
      router: router,
      store,
      render: h => h(App)
}).$mount('#app')

