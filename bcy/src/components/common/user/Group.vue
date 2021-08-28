<template>
<div class="group-content">
  <div class="pic-content">
    <el-image
      style="width: 70px; height: 70px"
      :src="photo"
      :fit="fit"></el-image>
  </div>
  <div class="infor-content">
    <div class="group-title">{{circleName}}</div>
    <div class="intro-content">{{description}}</div>
    <div class="people-number">{{followCounts+'个成员'}}</div>
  </div>
  <el-button @click="follow" v-if="buttonIf" icon="el-icon-plus" size="mini" class="recommend-button" type="warning" plain round> 关注</el-button>
</div>
</template>

<script>
export default {
props:{
  buttonIf:{
    type:Boolean,
    default:false
  },
  circleName:{
    type:String,
    default:'圈子名'
  },
  description:{
    type:String,
    default:'圈子名'
  },
  photo:{
    type:String,
    default:'圈子名'
  },
  nickName:{
    type:String,
    default:'圈子名'
  },
  postCounts:{
    type:Number,
    default:0
  },
  followCounts:{
    type:Number,
    default:0
  },
  createTime:{
    type:String,
    default:'圈子名'
  }
},
data(){
  return{
    time:this.createTime.substring(0,10)
  }
},
methods: {
  follow(){
    this.$emit('follow',this.circleName)
  }
}
}
</script>

<style scoped>
.recommend-button{
  position: absolute;
  width:90px;
  font-size: 16px;;
  left:255px;
  top:30px;
}
.people-number{
  color: #a9a9ab;
  position: relative;
  top:5px;
  font-size: 16px;
}
.intro-content{
  position: relative;
  top:5px;
  width:calc(100% - 90px);
  font-size: 16px;
  margin-bottom: 5px;
  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:1;
  overflow:hidden;
  word-break: break-all;
  word-wrap: break-word;
}
.group-title{
  position: relative;
  top:8px;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 5px;
}
.infor-content{
  position: absolute;
  right: 0px;
  width:255px;
  top:0px;
}
.pic-content{
  position: absolute;
  left:10px;
  top:10px;
}
.group-content{
  width:350px;
  border:#dfdfdf solid 1px;
  background: white;
  position: relative;
  height:90px;
}
</style>
