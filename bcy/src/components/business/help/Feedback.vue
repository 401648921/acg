<template>
  <div class="feedback-header">
    <span class="header-icon el-icon-arrow-left"></span>
    <span class="header-text">问题详情</span>
  </div>
  <div class="problem-title">刷不出内容怎么办？</div>
  <div class="common-response">
    小伙伴你好！请先确认下是否允许app使用网络。如果允许的情况下仍然刷不出内容可以先尝试切换网络，重启路由器和app试试，以上方法都尝试过了仍然无法刷出内容请反馈给我们-XXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  </div>
  <div class="user-feedback-header">
    <div class="user-feedback-header-box">你的问题是否被解决</div>
    <div class="feedback-buttons">
       <el-button size="small" class="feedback-button">已解决</el-button>
       <el-button size="small" class="feedback-button">未解决</el-button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.feedback-buttons{
  margin-top:20px;
}
.feedback-button{
  margin-left:35px;
  width:80px;
}
.user-feedback-header-box{
  text-indent: 2em;
  font-weight: 700;
  font-size: 18px;
}
.common-response{
  height:300px;
  margin-top:12px;
  width:1500px;
  margin-left:2em;
  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:5;
  overflow:hidden;
  word-break: break-all;
  word-wrap: break-word;
}
.problem-title{
  text-indent: 2em;
  font-size: 18px;
}
.header-text{
  font-weight: 700;
  font-size: 17px;
  color: #d1d1d1;
  line-height: 40px;
  margin-left:6px;
  position: relative;
  top:-3px;
}
.header-icon{
  font-size: 25px;
  line-height: 40px;
}
.feedback-header{
  margin-top:3px;
  margin-left:4px;
}
</style>
