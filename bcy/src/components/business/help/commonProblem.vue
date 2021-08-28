<template>
  <div class="list-header">
    常见问题
  </div>
  <div class="list-box">
    <div v-for="i in 6" :key="i" class="element-box">
      <div class="element">
        <span class="problem-text">刷不出内容怎么办？</span>
        <span class="problem-icon el-icon-arrow-right"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.list-header{
  text-indent: 1.3em;
  line-height: 40px;
  height:40px;
  color: #d1d1d1;
  border-bottom: #d1d1d1 solid 1px;
  font-size: 16px;
  font-weight: 700;
}
.element-box{
  border-bottom: #d1d1d1 solid 1px;
  height:40px;
}
.problem-text{
  float: left;
  font-size: 17px;
  text-indent: 1em;
  line-height: 40px;
  font-weight: 700;
}
.problem-icon{
  float: right;
  font-size:20px;
  line-height: 40px ;
  margin-right: 20px;
}
</style>
