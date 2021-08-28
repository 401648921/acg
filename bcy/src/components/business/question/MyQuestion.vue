<template>
<div class="card-element">
  <div class="card-top">
    <span class="time-text">{{time}}</span>
    <span class="close-icon el-icon-close"></span>
  </div>
  <div class="question">
    <div class="user-img-box">
      <el-avatar :size="35" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    </div>
    <div class="question-box">
      {{question}}
    </div>
  </div>
  <div class="response-box">
      <span class="response-box-icon icon-goyuandian iconfont-go"></span>
      <span class="response-box-text">{{answer}}</span>
    </div>
</div>
</template>

<script>
export default {
  props:{
    number:{
      default:'111',
      type:String
    },
    fromId:{
      default:'111',
      type:String
    },
    username:{
      default:'111',
      type:String
    },
    photo:{
      default:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      type:String
    },
    question:{
      default:'111',
      type:String
    },
    createTime:{
      default:'111',
      type:String
    },
    answer:{
      default:'111',
      type:String
    }
  },
  data(){
    return{
      time:this.createTime.substring(0,10)
    }
  }
}
</script>

<style scoped>
.response-box-text{
  font-size: 17px;
  line-height: 30px;
  position: relative;
  top:2px;
  margin-left:20px;
}
.response-box-icon{
  margin-left:27px;
  font-size: 13px;
  line-height: 30px;
  color: #d1d1d1;
}
.response-box{
  height:30px;
  margin-top:40px;
  padding-bottom: 20px;
}
.question-box{
  float: left;
  border:#d1d1d1 solid 2px;
  border-radius: 5px;
  margin-left:10px;
  margin-top:5px;
}
.question{
  margin-top:10px;
  height:40px;
}
.user-img-box{
  float: left;
  margin-left:10px;
}
.close-icon{
  float: right;
  margin-top:10px;
  font-size: 20px;
  margin-right: 10px;;
}
.card-element{
  background: white;
}
.card-top{
  margin-top:5px;
  height:25px;
}
.time-text{
  line-height: 25px;
  font-size: 13px;
  color: #ffba7b;
  margin-left:10px;
}
</style>
