<template>
  <div class="person-index-header">
    <img class="user-card-img" src="..\..\..\assets\user.png" alt="">
    <div class="user-card-box">
      <user-card :id="id"></user-card>
    </div>
  </div>
  <div class="jump-tabs">
    <div class="jump-tab"  @click="go('/home/personIndex/dynamicList')" :class="getParh()=='dynamicList'?'active':''">动态</div>
    <div class="jump-tab " @click="go('/home/personIndex/personGroup')" :class="getParh()=='personGroup'?'active':''">我的圈子</div>
    <div class="jump-tab " @click="go('/home/personIndex/myFollow')" :class="getParh()=='myFollow'?'active':''">收藏夹</div>
    <div class="jump-tab " @click="go('/home/personIndex/myLike')" :class="getParh()=='myLike'?'active':''">喜欢</div>
    <div class="jump-tab ">历史浏览</div>
    <div class="jump-tab " @click="go('/home/personIndex/questionList');type=6;" :class="getParh()=='questionList'||getParh()=='waitResponseList'?'active':''">提问箱</div>
    <div class="jump-tab " :class="getParh()=='followList'?'active':''"  @click="go('/home/personIndex/followList');type=8;">关注</div>
  </div>
  <div class="person-page-content">
    <router-view/>
  </div>
  <div class="user-card">
    <user-infor :id="id"></user-infor>
  </div>
</template>

<script>
import userCard from '../../common/user/UserCard'
import userInfor from '../person/UserCard.vue'
export default {
  components:{
    userCard,
    userInfor
  },
  methods:{
    go(path){
      this.$router.push(path)
    },
    getParh(){
      //alert(this.$route.path.split('/')[2]);
      return this.$route.path.split('/')[3];

    }
  },
  mounted () {
    /*this.$oauthRequest({
      method:'post',
      url:'/code',
      headers:{
        token:this.$store.getters.getToken
      },
      params: {
        id:this.$store.getters.getId
      }
    }).then(res=>{
        this.userData = res.data.data.personalInfo;
    }).catch(e=>{
      this.$alert('服务器连接失败','提示',{
        confirmButtonText:'确定'
      });
  })*/
  },
  data(){
    return{
      userData:{},
      id:this.$store.getters.getId,
      type:1
    }
  }
}
</script>

<style scoped>
.active{
  color: #f4e6bf;
}
.user-card{
  position: absolute;
  height:830px;
  width:calc(20% - 6px);
  left:calc(70% + 10px);
  top:393px;
}
.person-page-content{
  position: relative;
  height:830px;
  width:calc(60% + 10px);
  margin-left:calc(10% - 5px);
  background:white;
  margin-top:5px;
  border:#d1d1d1 solid 1px;
}
.jump-tabs{
  height:30px;
  width:calc(80% + 10px);
  margin-left:calc(10% - 5px);
  background:white;
  margin-top:5px;
  border:#d1d1d1 solid 1px;
}
.jump-tab{
  float: left;
  margin-left:20px;
  line-height: 30px;
  margin-right: 50px;;
}
.user-card-box{
  position: absolute;
  left:3px;
  top:180px;
  z-index: 10;
}
@media screen and (max-width:1400px){
  .person-index-header,.jump-tabs{
    width: 1120px !important;
  }
  .user-card{
    width:284px;
    left:calc(10% + 850px) !important;
  }
}
@media screen and (max-width:1400px){
  .person-page-content{
    width: 840px !important;
  }
}

.user-card-img{
  width:1540px;
  position: absolute;
  top:-120px;
  left:0px;
}
.person-index-header{
  position: relative;
  width:calc(80% + 10px);
  margin-top:50px;
  height:300px;
  overflow: hidden;
  margin-left:calc(10% - 5px);
}
</style>
