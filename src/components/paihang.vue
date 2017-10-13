<template>
    <div>
    <router-view></router-view>
    <div id="paihang"  v-show="this.$store.state.paihang">
   <div id="container">
   <div class="row" id="bandan">
   <p class="col-xs-4" @click="types(1)">新歌榜</p>
   <p class="col-xs-5" @click="types(2)">热歌榜</p>
   <p class="col-xs-3" @click="types(11)">摇滚榜</p>
   <p class="col-xs-4" @click="types(21)">欧美金曲榜</p>
   <p class="col-xs-5" @click="types(22)">经典老歌榜</p>
   <p class="col-xs-3" @click="types(23)">情歌对唱榜</p>
   <p class="col-xs-4" @click="types(16)">流行</p>
   <p class="col-xs-5" @click="types(24)">影视金曲榜</p>
   <p class="col-xs-3" @click="types(25)">网络歌曲榜</p>
   </div>
   </div>
   <div class="hot" ><div>新歌榜</div></div>  
   <div id="container" class="shuchu">
      <ul class="list-group-item" >
      <li class="list-group-item" v-for="(value,index) in paihang">
      <img :src='value.pic_small' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span @click="Tobofang(value.song_id)">{{value.title}} - </span>
      <span class="titles" > {{value.author}}</span>
      </li>
      </ul>
   </div>
   </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
        paihang:"",
            }
        },
        mounted: function() {
      this.moren(1);
    },
        methods:{
   moren:function(id){
   var url = 'http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.billboard.billList&size=10&offset=0&type='+id;     
   this.$http.jsonp(url, {}, {
    }).then(function(response) {
      // 这里是处理正确的回调
    this.paihang = response.body.song_list
    }, function(response) {
        // 这里是处理错误的回调
        console.log(response)
    });
   },
   types:function(id){
     this.moren(id)
   },
   Tobofang:function(id){
     this.$router.push({name:'tuijianbofang',params:{id:id}});
     this.$store.state.paihang = false;
     this.$store.state.header = false;
     this.$store.state.navbar = false;
   },
    },
    }
</script>
<style>
#paihang{
    animation:fade-in1 2s;
}
@keyframes fade-in1{
    0% {
        transform: rotate(0deg);
     }
    100% {
        transform: rotate(360deg);
    }
    0% {
        opacity:0;
     }
    100% {
        opacity:1;
    }
}
#bandan{
    margin:0;
}
#bandan p{
color:	#C1FFE4;
font-size:5px;
}
.shuchu ul{
    background:linear-gradient(#3C3C3C,		#2F0000);
}
.shuchu li{
    border:none;
    font-family:"微软雅黑";
    font-size:15px;
    background:none;
    color:white;
    white-space:nowrap; 
    overflow:hidden;
    text-overflow: ellipsis;       
    -o-text-overflow:ellipsis;     
}
.shuchu img{
    border-radius:50px;
    width:50px;
}
.titles{
    color:	#d0d0d0;
}
</style>