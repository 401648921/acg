<template>
  <div class="user-box">
    <div class="user-box-left">
        <el-avatar :size="110" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
    </div>
    <div class="user-box-right">
      <div class="box-part">
        <span class="user-name">ssssss<i class="user-sex-icon iconfont-go icon-gonv"></i></span>
        <span class="user-watch">
          <span class="user-watch-number">{{followCounts}}</span>
          <span class="user-watch-text">关注</span>
        </span>
        <span class="user-fun">
          <span class="user-fun-number">{{fansCounts}}</span>
          <span class="user-fun-text">粉丝</span>
        </span>
      </div>
      <div class="bottom-part">
        <p v-html="getLine"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
 computed: {
   getLine(){
     return this.line.replaceAll(' ',"&nbsp;").replaceAll("\n","<br/>");
   }
 },
 data(){
   return{
     line:'11111111111111111111111111111111111111111111111111111111111111111111'
   }
 },
 props:{
   sex:{
    default:'男',
    type:String
   },
   username:{
    default:'XXXXXXXXXXXXXXXX',
    type:String
   },
   description:{
    default:'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    type:String
   },
   province:{
    default:'北京市',
    type:String
   },
   city:{
    default:'平成区',
    type:String
   },
   birthday:{
     default:'2021-8-16',
     type:String
   },
   fansCounts:{
     default:0,
     type:Number
   },
   followCounts:{
     default:0,
     type:Number
   },
   momentCounts:{
     default:0,
     type:Number
   }
 }
}
</script>

<style scoped>
.user-fun{
  margin-right: 10px;
  font-size: 13px;
  color: #a5aba4;
  position: relative;
  left:-10px;
  top:8px;
}
.user-watch{
  margin-right: 10px;
  font-size: 13px;
  color: #a5aba4;
  position: relative;
  left:-10px;
  top:8px;
}
.user-sex-icon{
  color: palevioletred;
}
.user-name{
  display: inline-block;
  font-size: 25px;
  width:120px;
  top:10px;
  position: relative;
}
.box-part{
  position: relative;
}
.user-box-left{
  position: absolute;
  left:0px;
  width:100px;
}
.user-box-right{
  position: absolute;
  right:0px;
  width:320px;
}
.user-box{
  width:440px;
  position: relative;
}
.bottom-part p{
  width:220px;
  height:38px;
  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
  overflow:hidden;
  word-break: break-all;
  word-wrap: break-word;
}
</style>
