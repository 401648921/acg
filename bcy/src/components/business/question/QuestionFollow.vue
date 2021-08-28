<template>
  <div class="create-header">
    <div class="create-header-title">XX人关注该问题</div>
    <span class="create-header-icon el-icon-arrow-left"></span>
  </div>
  <div class="follow-list">
    <div class="follow-element" v-for="i in 6" :key="i">
      <follow-list :width="'100%'"></follow-list>
    </div>
  </div>
</template>

<script>
import followList from '../../common/user/UserPage.vue'
export default {
components:{
  followList
}
}
</script>

<style scoped>
@media screen and (max-width:1400px){
  .nav-bo,.create-header,.follow-list{
    width: 1120px !important;
  }
}
.follow-element{
  border: #d1d1d1 solid 1px;
}
.follow-list{
  position: relative;
  height:40px;
  left:9.75%;
  top:52px;
  background: white;
  width:80.5%;
}
.create-header{
  position: relative;
  height:40px;
  left:9.75%;
  top:44px;
  background: white;
  width:80.5%;
}
.create-header-icon{
  position: absolute;
  left: 0px;
  top:0px;
  line-height: 40px;
  font-weight: 700;
  font-size: 25px;
}
.create-header-title{
  font-size: 20px;
  text-align: center;
  line-height: 40px;
}
</style>
