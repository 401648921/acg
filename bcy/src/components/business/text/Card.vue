<template>
<div class="container">
        <div @click="push()" class="top">
            <img class="user_img" :src="photo"/>
            <div class="user_name">{{username}}</div>
            <div class="time">{{time}}</div>
        </div>
        <div class="text">{{description}}</div>
        <div class="img">
            <img  id="front" :src="cosPhoto[0]"/>
            <img v-for="(i,index) in cosPhoto" v-show="index!=0" :key="i" :src="item"/>
        </div>
        <div class="low">
            <div @click="like"  class="iconfont icon-weibiaoti-" id="front"></div>
            <p>{{getLikeCounts}}</p>
            <div  @click="favor" class="iconfont icon-shoucang"></div>
            <p>{{getFavorCounts}}</p>
            <div class="iconfont icon-pinglun"></div>
            <p>{{commentCounts}}</p>
            <div class="iconfont icon-fenxiang"></div>
            <p>{{shareCounts}}</p>
        </div>
    </div>
</template>

<script>
export default {
props:{
  number:{
    type:String,
    default:'111'
  },
  id:{
    type:String,
    default:'111'
  },
  username:{
    type:String,
    default:'111'
  },
  photo:{
    type:String,
    default:'111'
  },
  description:{
    type:String,
    default:'111'
  },
  label:{
    type:Array,
    default:[]
  },
  cosPhoto:{
    type:Array,
    default:[]
  },
  createTime:{
    type:String,
    default:'111'
  }
},
data(){
  return{
    time:this.createTime.substring(0,10),
    likeCounts:0,
    favorCounts:0,
    commentCounts:0,
    shareCounts:0,
    favorShow:false,
    likeShow:false
  }
},
 methods: {
   push(){
     this.$router.push({
       path:'/home/showQuestion',
       query:{
         number:this.number
       }
     })
   },
    favor(){
      if(!this.favorShow){
        this.favorCounts++;
        this.favorShow = !this.favorShow;
      }else{
        this.favorCounts = this.favorCounts -1;
        this.favorShow = !this.favorShow;
      }
      this.$emit('favor',this.number,this.favorShow)
    },
    like(){
      if(!this.likeShow){
        this.likeCounts++;
        this.likeShow = !this.likeShow;
      }else{
        this.likeCounts = this.likeCounts - 1;
        this.likeShow = !this.likeShow;
      }
      this.$emit('like',this.number,this.likeShow)
    },
    deleteCard(){
      this.$emit('deleteCard',this.index);
    },
    getCount(){
      this.$acgRequest({
          method:'get',
          url:'/cosCountsList',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            id:this.$store.getters.getId,
            number:this.number
          }
        }).then(res=>{
          let arr = res.data.data.cosCountsList[0];
          this.commentCounts=arr.commentCounts;
          this.likeCounts = arr.likeCounts;
          this.favorCounts = arr.favorCounts;
          this.shareCounts = arr.shareCounts;
        })
    },
    getLike(){
      this.$acgRequest({
          method:'get',
          url:'/judgeLikes',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            id:this.$store.getters.getId,
            numbers:this.number
          }
        }).then(res=>{
           if(res.data.data.status==0){
            this.likeShow=false;
          }
        })
    },
    getFavor(){
      this.$acgRequest({
          method:'post',
          url:'/judgeFavor',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            id:this.$store.getters.getId,
            number:this.number
          }
        }).then(res=>{
          if(res.data.data.status==0){
            this.favorShow=false;
          }
        })
    }
  },
  mounted(){
    this.getCount();
    this.getFavor();
    this.getLike();
  },
  computed:{
    getLikeCounts(){
      return this.likeCounts;
    },
    getFavorCounts(){
      return this.favorCounts;
    }
  }
}
</script>

<style scoped>

.container{
  width: 500px;
  background-color: #fff;
  padding-bottom: 20px;;
}
.top{
  width: 100%;
  height: 50px;
}
.text{
  width: 300px;
  padding-left: 50px;
  margin:10px 0;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp:5 ;   /*行数*/
  -webkit-box-orient: vertical;
  word-break: break-all;
  word-wrap: break-word;
}
.img{
  width: 100%;
  height: 200px;
}
.img img{
  display: inline-block;
  height:130px ;
  width: 130px;
  margin: 30px 0 20px 10px;
  border-radius: 4px;
}
#front{
  margin-left: 50px;
}
.low{
  width: 100%;
  height: 30px;
  margin-bottom: 20px;;
}
.user_img{
  display: inline-block;
  width: 30px;
  height: 30px;
  background-color:#000;
  margin:10px 5px 10px 10px;
  border-radius: 15px;
}
.user_name{
  display: inline-block;
  vertical-align: middle;
  width: 100px;
  height: 50px;
  line-height: 10px;
  margin: 20px 0;
}
.time{
  display: inline-block;
  vertical-align: middle;
  width: 100px;
  height: 50px;
  line-height: 10px;
  font-size: 12px;
  color: rgb(209, 208, 208);
}
.low>div{
  display: inline-block;
  font-size: 20px;
  margin-right: 3px;
}
.low>p{
  display: inline-block;
  width: 80px;

}
.icon-weibiaoti-{
  color: pink;
}
.icon-shoucang{
  color: rgb(255,152,0);
}
</style>
