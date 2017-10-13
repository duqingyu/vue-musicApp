<template>
  <div id="app">
 <mt-header fixed v-show="this.$store.state.header" title="百度音乐" style="background-color:	#3C3C3C;color:	#FFD306;">
 <span slot="left"  @click="open()">设置</span>
 <span slot="right">↑</span>
 </mt-header>
 
        <mt-popup v-model="popupVisible" position="left" class="demo-popup-left">
            <div class="leftMuH">
                <p class="portrait"></p>
                <p class="userInfo">
                    <span>QQ音乐</span>
                    <span>懂你的音乐播放器</span>
                </p>
            </div>
            <ul class="optionsList">
                <li>会员中心</li>
                <li>我的音乐</li>
                <li>我的好友</li>
                <li>音乐推荐</li>
                <li>相关介绍</li>
                <li>功能说明</li>
                <li>使用指南</li>
                <li>QQ音乐</li>
                <li>关于作者</li>
                <li>意见反馈</li>
                <li>版本说明  v1.2.0</li>
            </ul>
        </mt-popup>
   <br><br>  
    <mt-navbar v-model="selected" v-show="this.$store.state.navbar" style="background-color:#3C3C3C;">
      <mt-tab-item id="推荐">  
        <span class="font" @click="yincang">推荐</span>
      </mt-tab-item>
      <mt-tab-item id="排行">    
        <span class="font" @click="yincang">排行榜</span>
      </mt-tab-item>
        <mt-tab-item id="搜索">
       <span class="font" @click="yincang">搜索</span>
      </mt-tab-item>  
    </mt-navbar>
          <mt-tab-container class="page-tabbar-container" v-model="selected">
        <mt-tab-container-item id="推荐">
          <tuijian></tuijian>
        </mt-tab-container-item>
             <mt-tab-container-item id="排行">
          <paihang></paihang>
        </mt-tab-container-item>
        <mt-tab-container-item id="搜索">
          <sousuo></sousuo>
        </mt-tab-container-item>
      </mt-tab-container>
      <tuijian v-show="first"></tuijian>
    </div>
</template>

<script>
import tuijian from './components/tuijian.vue'
import sousuo from './components/sousuo.vue'
import paihang from './components/paihang.vue'
  export default {
  name: 'app',
  data () {
    return {
      selected:"",
      popupVisible:false,
      first:true,
    }
  },
         mounted: function() {
  
  },
  methods: {
 open () {
          this.popupVisible = true
         },
 yincang () {
     this.first = false;
 }
  },
  components: {tuijian,sousuo,paihang}
}
</script>

<style>
body{
  background:linear-gradient(#3C3C3C,#3C3C3C);
}
.demo-popup-left {
        width: 80%;
        height: 100%;
        position: absolute;
        background: white;
    }
    .leftMuH{
        height: 30vh;
        padding-top: 15vh;
        background:url("./assets/landing_bg.jpg") no-repeat center;
        background-size: cover;
        display: flex;
    }
    .portrait{
        width:80px;
        height:80px;
        background: url("./assets/head_portrait.jpg") no-repeat center;
        background-size:cover ;
        border-radius: 40px;
        margin: 0 8%;
    }
    .userInfo{
        color: #00e09e;
    }
    .optionsList{
        background: #fff;
    }
    .optionsList li{
        border-bottom: 1px #999999 solid;
        font-size: 1.6rem;
        line-height: 6vh;
        padding-left: 2rem;
        color: #333;
    }
       .optionsList li:hover{
        background: #999;
    }
      .font{
      color: 		#E0E0E0;
    }
    .font:hover{
      color:	#FFD306;
    }
</style>
