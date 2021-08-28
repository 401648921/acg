<template>
  <div class="index-content">
    <div class="collection-content">
      <div class="pic-content">
        <el-image
          style="width: 120px; height:120px"
          :src="'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'"
          :fit="fit"></el-image>
      </div>
      <div class="infor-content">
        <div class="collection-title">合集标题</div>
        <div class="intro-content">合集简介合集简介合集简介合集简介</div>
        <div class="people-number">8.4w 浏览 444内容</div>
      </div>
      <el-button plain class="submit-button">关注圈子</el-button>
    </div>
  </div>
  <div class="tabs">
    <span class="tab">最热</span>
    <span class="tab">最新</span>
    <span class="tab">合集</span>
    <span class="tab">讨论</span>
    <span class="submit-button-go ">
      <el-button class="button-to-write" size="small" plain icon="el-icon-edit">发布</el-button>
    </span>
  </div>
  <div class="index-content-box">
    <div class="element" v-for="i in 6" :key="i">
      <article-card></article-card>
    </div>
  </div>
</template>

<script>
import articleCard from '../article/ArticleCard.vue'
export default {
  components:{
    articleCard
  }
}
</script>

<style scoped>
.index-content-box{
  position: relative;
  width:calc(80% + 10px);
  margin-top:0px;
  min-height:800px;
  margin-top:5px;
  overflow: hidden;
  margin-left:calc(10% - 5px);
}
.button-to-write{
  margin-top:5px;
  float: right;
  margin-right: 30px;
}
.tab{
  float: left;
  margin-left: 30px;
  margin-right: 80px;
  font-size: 15px;
  line-height: 40px;
}
.tabs{
  position: relative;
  width:calc(80% + 10px);
  margin-top:0px;
  height:40px;
  background: white;
  border:#d1d1d1 solid 1px;
  overflow: hidden;
  margin-left:calc(10% - 5px);
}
.submit-button{
  width:120px;
  position: absolute;
  right:30px;
  top:80px;
}
@media screen and (max-width:1400px){
  .index-content,.tabs,.index-content-box{
    width: 1120px !important;
  }
}
.index-content{
  position: relative;
  width:calc(80% + 14px);
  margin-top:50px;
  overflow: hidden;
  margin-left:calc(10% - 5px);
}
.recommend-button{
  position: absolute;
  width:90px;
  font-size: 16px;;
  right:40px;
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
  color: #d1d1d1;
  font-size: 17px;
  margin-bottom: 25px;
}
.collection-title{
  position: relative;
  top:8px;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 20px;
}
.infor-content{
  position: absolute;
  left: 140px;
  width:555px;
  top:10px;
}
.pic-content{
  position: absolute;
  left:10px;
  top:20px;
}
.collection-content{
  width: calc(100% - 5px);
  border:#dfdfdf solid 2px;
  background: white;
  position: relative;
  height:150px;
}
</style>
