<template>

 <div class="total">
<mt-header fixed :title='titles' style="background-color:#00CACA;color:	#424200;font-family:黑体;font-size:15px;">
 <span slot="left" icon="back"  @click="routerBack">返回</span>
 <span slot="right" @click="gedan" style="font-size:20px;">三</span>
 </mt-header>
 <div class="author">{{name}}</div>
 <div class="picture" id="pic"><img :src='imgsrc'/><br><br></div>
 <div class="picture2">
 
 <p id="lrcss"></p>
 
 <div class="row"  style="background-color:	#C1FFE4;">
 <div class="col-xs-8"><img src="../assets/4.png" id="pre" @click="pre" /></div>
 <div class="col-xs-4"><img src="../assets/6.png" id="next" @click="next" /></div>
 </div>
 <div class="semi-circle"></div>
  <audio id="audio" :src='audiosrc'  preload  controls="controls" @ended="next"></audio>
 </div>
          <div id="songlist" v-show="list">
       <ul class="list-group-item" id="dd">
       <p>歌单列表<span class="x" @click="close">×</span></p>
       <li class="list-group-item" id="dd2" v-for="(value,index) in song">
       <span class="xx" @click="thatsong(value.songid)">{{index+1}}.  {{value.songname}} - {{value.artistname}} </span>
       <span class="x1" @click="del(index)">×</span>
       </li>
       </ul>
          </div>
 </div>

</template>
<script>
//@ended="isNext"
    export default {
        data () {
            return {
            titles:'',
            imgsrc:'',
            audiosrc:'',
            name:'',
            lrc:'',
            list:false,
            song:'',
            id:'',
            index:'',//查找位置
            }
        },
        computed:{
     
        },
        mounted: function() {
         this.id = this.$route.params.id;
         this.song = this.$store.state.gedan //获取添加到歌单的内容
         this.first();
                    },
methods:{
      first:function(){
  let url = 'http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.song.play&songid='+this.id;
this.$http.jsonp(url, {}, {
    }).then(function(response) {
      // 这里是处理正确的回调
    this.tuijianbofang1 = response.body;
    this.imgsrc = response.body.songinfo.pic_radio;//图片路径
    this.titles = response.body.songinfo.title;//歌名标题
    this.audiosrc = response.body.bitrate.file_link;//播放路径
    this.name = response.body.songinfo.author;//播放路径
        console.log(response)
      //寻找歌词-------------------
      let url1 = 'http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.song.lry&songid='+this.id;
    this.$http.jsonp(url1, {}, {
    }).then(function(res) {
      // 这里是处理正确的回调
                         var line = res.body.lrcContent;  
                             //转换歌词为二维数组[time][歌词]
                          var  lyric = line.split('\n'); //先按行分割
                          var _l = lyric.length; //获取歌词行数
                          var lrc = new Array(); //新建一个数组存放最后结果
                          for(var i=0;i<_l;i++) {
                          var d = lyric[i].match(/\[\d{2}:\d{2}((\.|\:)\d{2})\]/g);  //正则匹配播放时间
                          var t = lyric[i].split(d); //以时间为分割点分割每行歌词，数组最后一个为歌词正文
                          if(d != null) { //过滤掉空行等非歌词正文部分
                          //换算时间，保留两位小数
                           var dt = String(d).split(':'); //不知道为什么一定要转换时间为字符串之后才能split，难道之前正则获取的时间已经不是字符串了么？ 
                          var _t = Math.round(parseInt(dt[0].split('[')[1])*60+parseFloat(dt[1].split(']')[0])*100)/100; //这一步我自己都觉得甚是坑爹啊！
                         lrc.push([_t, t[1]]);
                                        }
                                        //将歌词渲染到html上    
                                        //console.log(lrc) 
                                    this.geci(lrc);
                                                 }              

    }, function(response) {
        // 这里是处理错误的回调
        console.log(res)
    });
      //---------------------------
    }, function(response) {
        // 这里是处理错误的回调
        console.log(response)
    });
      },
        routerBack:function(){
        this.$router.go(-1);
        this.$store.state.header = true;
        this.$store.state.navbar = true;
        this.$store.state.sousuo = true;
        this.$store.state.paihang = true;
        this.$emit("listenToChildEvent",true);
        return false
      },
       geci:function(lrc){
                         var ad = document.getElementById("audio");
                         var i = 1;
                             ad.addEventListener('timeupdate', function() {
                             if(ad.currentTime > lrc[i][0]) {
                             document.getElementById('lrcss').innerHTML = lrc[i][1];
                                i++;
                               // console.log("i="+i)
                                              }
                               },false);
                        } ,
      gedan:function(){   
            this.list = true;
            this.song = this.$store.state.gedan //获取添加到歌单的内容
      },
      close:function(){   
            this.list = false;
      },
      thatsong:function(songid){
         this.id = songid;
         this.first();
         this.list = false;
      },
      del:function(index){
        this.$store.state.gedan.splice(index,1);
        this.gedan();
      },
      pre:function(){
           //查找当前播放的歌曲在第几个位置
       var id = this.id;
       for( var i=0;i<this.song.length;i++){
           if(this.song[i].songid == id){this.index = i}
          
             }
                 //播放上一首   
          if(this.index == 0)
              {
              this.thatsong(this.song[this.song.length-1].songid);
              return false;
              }
          else{
            var presong = this.song[this.index-1].songid;
            this.thatsong(presong);
             } 
      },
      next:function(){
       //查找当前播放的歌曲在第几个位置
       var id = this.id;
       for( var i=0;i<this.song.length;i++){
           if(this.song[i].songid == id){this.index = i}
                
          }
       //播放下一首   
          if(this.index == this.song.length-1)
              {
              this.thatsong(this.song[0].songid);
              return false;
              }
          else{

            var nextsong = this.song[this.index+1].songid;
            this.thatsong(nextsong);
             } 
      }, 
    }
    }
</script>

<style>
.total{
    background:linear-gradient(#BBFFFF,	#D7FFEE);
}
.author{
    text-align:center;
    color:	#AE8F00;
    margin-bottom:5px;
    font-family:"黑体";
}
.picture{
     animation: rotation 15s linear infinite;
          /* -moz-animation: rotation 10s linear infinite;
          -webkit-animation: rotation 10s linear infinite;
          -o-animation: rotation 10s linear infinite; */
}
@keyframes rotation{
from {transform: rotate(0deg);}
to {transform: rotate(360deg);}
}
.picture img{
    width:100%;
    border-radius:180px;
}
.picture2 img {
    width:45px;
    height:45px;
   margin:20px;
}
#lrcss{
    font-size:20px;
    color:#AE8F00;
    height:30px;
    text-align:center;
}
#audio{
    width:100%;
    background:black;
}
.semi-circle{
  position:relative;
  width:50px;
  height:20px; 
  background-color:black;
  border-radius:0 0 50px 50px; /* 左上、右上、右下、左下 */
  left:40%;
  margin-bottom:5px;
}
#songlist{
    width:100%;
    position:fixed;
    Top:38px;
    z-index: 100;
    opacity:1;
}
#songlist p{
   text-align:center;
   font-size:15px;
   color:#4F4F4F;
}
.x{
   float:right;
   font-size:25px;
   color:red;
}
.x1{
    float:right;
    font-size:25px;
    margin-right:-15px;
    color:green
}
#dd{
    border:none;
    background-color:	#A6FFFF;
    opacity:0.9;
    animation:fade-in3 1.5s;
}
#dd li{
    border:none;
    background-color:	#A6FFFF;
    opacity:0.9;
    animation:fade-in3 1.5s;
}
@keyframes fade-in3 {
    0%{
   opacity:0;
    }
    100%{
   opacity:0.9;
    }
}
</style>