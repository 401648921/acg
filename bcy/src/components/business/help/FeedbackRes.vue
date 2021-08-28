<template>
  <div class="feedback-header">
    <span class="header-icon el-icon-arrow-left"></span>
    <span class="header-text">问题反馈</span>
  </div>
  <div class="input-box">
    <textarea placeholder="请输入你想反馈的内容" cols="80" rows="16"></textarea>
    <div class="user-input-icon">
      <span class="submit-button">
         <el-button size="small">发送</el-button>
       </span>
       <span class="chat-icon icon-gosmiling iconfont-go"></span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.submit-button{
  float: right;
  margin-right: 35px;
}
.chat-icon{
  font-size: 25px;
  line-height: 32px;
  margin-right: 10px;
  float: right;
}
.input-box textarea{
  background: #f5f5f5;
  outline: none;
  font-size: 18px;
  margin-left:20px;
  margin-top:20px;
}
.input-box{
  position: relative;
  top:200px;
  left:350px;
  border:#d1d1d1 solid 2px;
  width:800px;
  height:400px;
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
