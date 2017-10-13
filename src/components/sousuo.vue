<template>
    <div>
    <div v-show="this.$store.state.sousuo">
   <div class="input-group">
           <input type="text" id="tosearch" class="form-control" v-model="searchs" placeholder="输入相关歌手或歌名等关键字" />
           <span class="input-group-addon"><i class="glyphicon glyphicon-search" @click="Tosearch"></i></span>
  </div>
  <div class="hot" v-show='tianjia' style="color:	#C1FFE4;font-size:20px;"><div>添加中,播放时可查看······</div></div>
  <ul class="list-group-item"  id="win">
  <li class="list-group-item" v-for="(value,index) in search" >
  <span @click="bofang(value.songid)">{{value.songname}}</span> - <span>{{value.artistname}}</span>
  <span :id='value.songid' @click="gedan(index,value.songid)" style="float:right;color:white;font-size:20px;">+</span>
  </li>
  </ul>    
   </div> 
   <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data () {
            return {
             search:"",
             searchs:"汪苏泷",
             sousuo:true,
             tianjia:false,
            }
        },
        mounted: function() {
           this.Tosearch();
    },
        methods:{
     Tosearch:function(){
      this.$http.jsonp('http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.search.catalogSug&query='+this.searchs, {}, {
    }).then(function(response) {
      // 这里是处理正确的回调
      this.search = response.body.song;
        console.log(this.search)

    }, function(response) {
        // 这里是处理错误的回调
        console.log(response)
    });
       },
       bofang:function(id){
           this.$router.push({name:"tuijianbofang",params:{id:id}});
           this.$store.state.sousuo = false;
           this.$store.state.header = false;
           this.$store.state.navbar = false;
       },
       gedan:function(index,id){
           var gedans=[];
       gedans.push(this.search[index])
       this.$store.commit("plussong",gedans)
       this.tianjia = true;
       //this指向window获得v-show
       var that = this;
       setTimeout(function(){
        that.tianjia = false;
       },700)  
       console.log(this.$store.state.gedan)
       },
    },
    }
</script>
<style>
#win{
    background:linear-gradient(	#3C3C3C,	#2F0000);
    animation:fade-in 2s;
}
 @keyframes fade-in{
     0% {
        opacity:0;
     }
    100% {
        opacity:1;
    }
} 
#win{
    min-height:500px;
}
#win li{
  background-color:#3C3C3C;
  margin:10px;
  color:	#D9B300;
}
#tosearch{
    font-family:"微软雅黑";
    font-size:17px;
}
</style>