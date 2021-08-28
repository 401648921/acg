<template>
  <div class="super">
    <div class="choice-content" v-show="showIf"></div>
    <div class="top">
      <span class="iconfont icon-guanzhu"></span>
      <span class="top_text" @click="follow"> 关注</span>
    </div>
    <p class="title" @click="go()">{{title}}</p>
    <p class="text">
       {{description}}
    </p>
    <div class="tag-list">
      <span v-for="item in label" :key="item" class="tag-element">{{item}}</span>
    </div>
    <span class="iconfont icon-comment"></span>
    <span class="commentNum">{{count}}</span>
    <span class="timeShow">{{time}}</span>
  </div>
</template>

<script>
export default {
  props:{
    showIf:{
      type:Boolean,
      default:false
    },
    number:{
      type:String,
      default:'1111'
    },
    id:{
      type:String,
      default:'1111'
    },
    username:{
      type:String,
      default:'1111'
    },
    photo:{
      type:String,
      default:'1111'
    },
    description:{
      type:String,
      default:'1111'
    },
    title:{
      type:String,
      default:'1111'
    },
    label:{
      type:String,
      default:'1111'
    },
    qaPhoto:{
      type:String,
      default:'1111'
    },
    createTime:{
      type:String,
      default:'1111'
    }
  },
  data(){
    return{
      time:this.createTime.substring(0,10),
      count:6
    }
  },
  mounted(){
    this.$acgRequest({
      method:'get',
      url:'/qaTopic',
      headers:{
        token:this.$store.getters.getToken
      },
      params: {

        number:this.number
      }
    }).then(res=>{
        if(res.data.data.QATopic.answerCounts==null){
          this.count=0;
          return;
        }
        this.count = res.data.data.QATopic.answerCounts;
    })
  },
  methods: {
    go(){
      this.$router.push({
        path:'/home/detailQuestion',
        query:{
          number:this.number
        }
      })
    },
    follow(){
      this.$acgRequest({
      method:'post',
      url:'/followQA',
      headers:{
        token:this.$store.getters.getToken
      },
      params: {
        id:this.$store.getters.getId,
        number:this.number
      }
    }).then(res=>{
      if(res.data.msg=='repeatWrong'){
        this.$alert('已经关注过','提示',{
            confirmButtonText:'确定'
          });
          return;
      }
        this.$alert('关注成功','提示',{
            confirmButtonText:'确定'
          });
    })
    }
  }
}
</script>

<style>
.choice-content{
  opacity: 0.7;
  background: black;
  width:100%;
  height:100%;
  position: absolute;
}
.super{
  position: relative;
  width: calc(100% - 4px);
  height: 180px;
  border: rgb(229, 229, 229) 3px solid;
  margin: 0 auto;
}

.top{
  width: 98%;
  text-align: right;
  margin-top: 5px;
}
.icon-guanzhu {
  color: #000;
  font-weight: 900;
}
.top_text {
  font-weight: 600;
}
.title {
  margin-top:-5px;
  margin-bottom: 30px;;
  margin-left: 50px;
  font-size: 18px;
  font-weight: 600;
  width: 650px;
  }
.text {
  margin-left: 50px;
  font-size: 14px;
  height:40px;
  width: calc(100% - 100px);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  word-break: normal;
 }
.icon-comment{
  position: absolute;
  left: 10px;
  top:60px;
  font-size: 20PX;
  color: rgb(197, 194, 194);
}
.commentNum{
  position: absolute;
  left: 9px;
  top:89px;
  font-size: 12px;
  color: rgb(197, 194, 194);
}
.timeShow{
  position: absolute;
  left: 9px;
  bottom: 15px;
  font-size: 12px;
  color: #000;
  font-weight:700;
}
.tag-element{
  margin-right:10px;
  float: left;
}
.tag-list{
  position: relative;
  width:600px;
  height:30px;
  margin-left: 100px;
  margin-top:33px;
  font-size: 14px;
  color: rgb(197, 194, 194);
}
</style>
