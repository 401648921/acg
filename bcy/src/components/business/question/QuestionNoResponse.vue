<template>
  <div class="element-box">
    <div class="user-box">
      <div class="user-img-box">
        <el-avatar :size="40" :src="photo"></el-avatar>
      </div>
      <span class="close-icon el-icon-close"></span>
      <div class="user-name">
       {{username}}
      </div>
      <div class="time-text">
        {{time}}
      </div>
    </div>
    <div class="question-box">
      {{question}}
    </div>
    <div class="question-response-box">
      <span class="response-button-text" @click="response">回复</span>
      <span class="response-button-icon el-icon-chat-dot-square"></span>

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
    }
  },
  methods:{
    response(){
      //alert(111)
      this.$emit('goResponse',this.number,this.username,this.question)
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
.response-button-text{
  line-height: 30px;
  float: right;
}
.question-response-box{
  height:30px;
  margin-right: 20px;
}
.response-button-icon{
  font-size: 23px;
  line-height: 30px;
  float: right;
}
.question-box{
  margin-left:17px;
  font-size: 13px;
  font-weight: 600;
  margin-top:10px;
  height:80px;
  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
  overflow:hidden;
  word-break: break-all;
  word-wrap: break-word;
}
.close-icon{
  float: right;
  margin-top:10px;
  font-size: 20px;
  margin-right: 10px;;
}
.time-text{
  padding-top:0px;
  margin-left:60px;
  font-size: 12px;
  color: #d1d1d1;
}
.user-name{
  padding-top:15px;
  margin-left:60px;
  font-size: 15px;
}
.element-box{
  background: white;
}
.user-box{
  position: relative;
}
.user-img-box{
  position: absolute;
  top:10px;
  left:10px;
}
</style>
