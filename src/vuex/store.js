import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
      header:true,
      navbar:true,
      sousuo:true,
      paihang:true,
      gedan:[],
    },
    mutations: {
     xianshi:function(state,headers,navbars){
       state.header = headers;
       state.navbar = navbars;
     },
     plussong:function(state,gequ){
     state.gedan = state.gedan.concat(gequ)
     },
    }
})

export default store