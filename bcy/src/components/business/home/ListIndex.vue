<template>
<div class="midder-part">
      <span class="page-element-one">关注</span>
      <span class="page-element" @click="go('/home/index')">发现</span>
      <span class="page-element " @click="go('/home/questionResList')">问答</span>
      <span class="page-element active" @click="go('/home/list/dayCosList')">榜单</span>
      <span class="page-element">关注</span>
      <span class="page-element">关注</span>
    </div>
  <div class="list-part-header">
    <span class="list-tab-one" @click="goDay(1)">绘画榜</span>
    <span class="list-tab" @click="goDay(2)">COS榜</span>
    <span class="list-tab" @click="goDay(3)">写作榜</span>
  </div>
  <div class="list-daily-header">
    <span class="tab-one" @click="goDay(type)">日榜</span>
    <span class="tab" @click="goWeek(type)">周榜</span>
  </div>
  <div class="list-box">
    <router-view/>
  </div>
</template>

<script>
export default {
  methods:{
    goDay(type){
        this.$router.push({
          path:'/home/list/dayCosList',
          query:{
            type:type
          }
        });
     },
     goWeek(type){
        this.$router.push({
          path:'/home/list/weekCosList',
          query:{
            type:type
          }
        });
     },
     go(url){
        this.$router.push({
          path:url,

        });
     },
  },
  data(){
    return{
      type:this.$route.query.type==undefined?1:this.$route.query.type
    }
  }
}
</script>

<style scoped>
.active{
  color: #e0d9c0 !important;
}
.page-element-one{
  line-height: 40px;
  margin-right: 8%;
  color: #5e5859;
  font-weight: 700;
  margin-left:20%;
}
.page-element{
  line-height: 40px;
  margin-right: 8%;
  color: #5e5859;
  font-weight: 700;
}
.midder-part{
  position: absolute;
  line-height: 35px;
  height:35px;
  top:50px;
  left:0px;
  width:80%;
  left:10%;
  background: white;
  font-weight: 700;
  font-size: 19px;
}
.tab{
  margin-left:110px;
}
.tab-one{
  margin-left:40%;

}
.list-daily-header{
  position: absolute;
  line-height: 35px;
  height:35px;
  top:122px;
  left:0px;
  width:80%;
  left:10%;
  background: white;
  font-weight: 700;
  font-size: 19px;
}
.list-tab{
  margin-left:80px;
}
.list-tab-one{
  margin-left:35%;

}
.list-box{
  position: absolute;
  line-height: 35px;
  height:35px;
  top:160px;
  left:0px;
  width:80%;
  left:10%;
  background: white;
  font-weight: 700;
  font-size: 19px;
}
.list-part-header{
  position: absolute;
  line-height: 35px;
  height:35px;
  top:87px;
  left:0px;
  width:80%;
  left:10%;
  background: white;
  font-weight: 700;
  font-size: 19px;
}
@media screen and (max-width:1400px){
  .list-part-header,.midder-part,.list-daily-header,.list-box{
    width: 1120px !important;
  }
}
</style>
