<template>
    <div>
    <div id="tuijian">
     <div class="page-swipe" v-show="swite" >
        <mt-swipe :auto="4000" :show-indicators="true" :continuous="true" :defaultIndex="1">
            <mt-swipe-item class="slide1">
               
                    <img src="../assets/3.jpg"/>
                    
               
            </mt-swipe-item>
            <mt-swipe-item class="slide2">
            
                    <img src="../assets/2.jpg"/>
             
            </mt-swipe-item>
            <mt-swipe-item class="slide3">
          
                    <img src="../assets/1.jpg" />
          
            </mt-swipe-item>
        </mt-swipe>
    </div>
     <router-view v-show="tuijianbofang1" v-on:listenToChildEvent="c"></router-view>
    <div class="hot" v-show="hot"><div>热门推荐</div></div>      
                        <div class="container" v-show="container">         
                        <div class="row" v-for="(value,index) in tuijian">
                      <div class="col-xs-4">
                <router-link :to="{name:'tuijianbofang',params:{id:value.song_id}}">  
                 <img :src='value.pic_small' @click="b" />
                </router-link>
                      </div>
                      <div class="col-xs-8">
                      <span  class="col-xs-8" style="color:white;font-family:黑体;font-size:18px">{{value.title}}</span>
                      <span  class="col-xs-4" style="color:white">{{value.author}}</span><br><br>
                      <p style="color:	#d0d0d0">专辑： {{value.album_title}}</p>
                      </div>
                        </div>   
                        </div>     
        </div>    
    </div>
</template>
<script>
    export default {
        data () {
            return {
           tuijian:[],
           swite:true,
           hot:true,
           container:true,
           tuijianbofang1:false,
            }
        },
        mounted: function() {
this.$http.jsonp('http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.billboard.billList&type=1&size=10&offset=0', {}, {
    }).then(function(response) {
      // 这里是处理正确的回调
    this.tuijian = response.body.song_list
        //console.log(response)
        console.log(this.tuijian)
    }, function(response) {
        // 这里是处理错误的回调
        console.log(response)
    });
  },
methods:{
 b:function(){
     this.swite = false;
     this.hot = false;
     this.container = false;
     this.tuijianbofang1 = true;
     this.$store.commit('xianshi',false,false);
 },
 c:function(data){
     this.swite = true;
     this.hot = true;
     this.container = true;
 }
},
    }
</script>
<style>
.mint-swipe {
    width: 100%;
    height: 160px;
    font-size: 30px;
    text-align: center;
}
.page-swipe img{
    width: 100%;
}
.hot{
    background-color:#3C3C3C;
    color:	#FFD306;
    height:50px;
     display:flex;
     justify-content:center;
     align-items:center;
}   
.container{
    background-color:#3C3C3C;
}
.row{
    background-color:#3C3C3C;
    margin:10px;
}
#tuijian{
    animation:fade-ins 3s;
}
@keyframes fade-ins{
      0%{
     opacity:0;
    }
    100%{
     opacity:1;
    }
}
</style>
