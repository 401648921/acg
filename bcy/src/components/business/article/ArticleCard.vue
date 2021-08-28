<template>
  <div class="article-box">
    <div @click="push()"  class="article-box-header">
      <el-avatar class="user-pic" :size="40" :src="userPhoto"></el-avatar>
      <span class="user-name-t">{{name}}</span>
      <span class="user-time">{{time.substring(0,10)}}</span>
    </div>
    <div class="article-text" v-html="getDescription(cosDescription)">
    </div>
    <div class="pic-list">
      <el-image v-for="item in COSPhoto" :key="item" class="article-pic"
        style="width: 100px; height: 100px"
        :src="item"></el-image>
    </div>
    <div class="tabs">
      <span class="tab" @click="like">
        <span :class="likeShow?'notOk':'isOk'" class="tab-icon iconfont icon-weibiaoti-"></span>
        <span class="tab-text">{{getLikeCounts}}</span>
      </span>
      <span class="tab" @click="favor">
        <span :class="favorShow?'notOk':'isOk'" class="tab-icon iconfont icon-shoucang"></span>
        <span class="tab-text">{{getFavorCounts}}</span>
      </span>
      <span class="tab">
        <span class="tab-icon iconfont icon-pinglun"></span>
        <span class="tab-text">{{commentCounts}}</span>
      </span>
      <span class="tab">
        <span class="tab-icon iconfont icon-fenxiang"></span>
        <span class="tab-text">{{shareCounts}}</span>
      </span>

    </div>
    <span v-show="deleteShow" @click="deleteCard" class="tab-detele el-icon-delete"></span>
  </div>
</template>

<script>
export default {
  props:{
    deleteShow:{
      type:Boolean,
      default:true
    },
    index:{
      type:Number,
      default:0
    },
    number:{
      type:String,
      default:'001'
    },
    id:{
      type:String,
      default:'001'
    },
    username:{
      type:String,
      default:'001'
    },
    description:{
      type:String,
      default:'001'
    },
    photo:{
      type:String,
      default:'001'
    },
    cosPhoto:{
      type:Array,
      default:[]
    },
    label:{
      type:Array,
      default:[]
    },
    createTime:{
      type:String,
      default:'1010-1-1'
    },

  },
  data(){
    return{
      cosNumber:this.number,
      userId:this.id,
      name:this.username,
      userPhoto:this.photo,
      COSPhoto:this.cosPhoto,
      coslabel:this.label,
      time:this.createTime,
      cosDescription:this.description,
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
        });
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
    },
    getDescription(line){
    if(line==undefined) return ''
     return  line.replaceAll(' ',"&nbsp;").replaceAll("\n","<br/>");

   },
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
.isOk{
  color: black;
}
.tab-detele{
  position: absolute;
  right: 5px;
  top:5px;
}
.tab-text{
  font-weight: 500;
  margin-left: 10px;
  position: relative;
  top:-3px;
}
.tab-icon{
  font-size: 25px;
}
.tab{
  margin-right: 60px;;
}
.tabs{
  position: relative;
  padding-top:30px;
  height:40px;
}
.icon-shoucang{
  color: orange;
}
.icon-weibiaoti-{
  color: pink;
  margin-left: 60px;
}
.article-pic{
  margin-right: 30px;
}
.pic-list{
  width:1100px;
  height:90px;
  margin-bottom: 10px;
  margin-left: 60px;
}
.article-text{
  font-weight: 500;
  width:1100px;
  height:40px;
  margin-bottom: 10px;
  margin-left: 60px;
}
.user-time{
  font-weight: 500;
  float: left;
  font-size: 12px;
  color: #d1d1d1;
  margin-left:10px;
  margin-top:12px;
}
.user-name-t{
  float: left;
  font-size: 14px;
  font-weight: 700;
  margin-left:60px;
  margin-top:10px;

}
.user-pic{
  position: absolute;
  left:10px;
  top:10px;
}
.article-box-header{
  height:50px;
}
.article-box{
  background: white;
  position: relative;
  border:#d1d1d1 solid 1px;
  border-radius: 6px;
}
</style>
