<template>
<div class="collection-page-content">
  <div class="pic-content">
    <el-image
      style="width: 70px; height: 70px"
      :src="'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'"
      :fit="fit"></el-image>
  </div>
  <div class="infor-content">
    <div class="collection-name">合集标题</div>
    <div class="collection-intro">合集简介</div>
    <div class="people-number">8.4w 浏览 444内容</div>
  </div>
  <span class="follow-button-box">
    <i class="el-icon-plus"></i>
    <span class="follow-text">关注</span>
  </span>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
.follow-button-box{
  position: absolute;
  right:10px;
  top:10px;
  color: orange;
}
.recommend-button{
  position: absolute;
  width:90px;
  font-size: 16px;;
  right:40px;
  top:30px;
}
.collection-intro{
  position: relative;
  top:15px;
  color: #d1d1d1;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 5px;
}
.people-number{
  color: #a9a9ab;
  position: relative;
  top:10px;
  font-size: 16px;
}
.intro-content{
  position: relative;
  top:5px;
  font-size: 16px;
  margin-bottom: 5px;
}
.collection-name{
  position: relative;
  top:15px;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 5px;
}
.infor-content{
  position: absolute;
  left: 100px;
  width:655px;
  top:0px;
}
.pic-content{
  position: absolute;
  left:10px;
  top:10px;
}
.collection-page-content{
  width:100%;
  background: white;
  position: relative;
  height:90px;
}
</style>
