<template>
  <div class="jump-tabs">
    <div class="tab" :class="getPath()=='modify'?'active':''">
      <i class="tab-icon el-icon-edit" :class="getPath()=='modify'?'active':''"></i>
      <span class="tab-text" @click="push('/home/setting/modify')">编 辑 资 料</span>
    </div>
    <div class="tab" :class="getPath()=='commonList'?'active':''">
      <i class="tab-icon icon-goiconset0143 iconfont-go" ></i>
      <span class="tab-text" @click="push('/home/setting/commonList')">帮助与反馈</span>
    </div>
    <div class="tab" :class="getPath()=='security'?'active':''">
      <i class="tab-icon el-icon-user"></i>
      <span class="tab-text" @click="push('/home/setting/security')">账号与安全</span>
    </div>
    <div class="tab" >
      <i class="tab-icon icon-goban iconfont-go"></i>
      <span class="tab-text">屏 蔽 设 置 <span  @click="tabShow = !tabShow" class="el-icon-arrow-down"></span></span>
    </div>
    <div v-show="getShow" class="tab" :class="getPath()=='banUser'?'active':''">
      <i class="tab-icon-no">    </i>
      <span class="tab-text" @click="push('/home/setting/banUser')">屏蔽的用户</span>
    </div>
    <div class="tab"  v-show="getShow" :class="getPath()=='banGroup'?'active':''">
      <i class="tab-icon-no">    </i>
      <span class="tab-text" @click="push('/home/setting/banGroup')">屏蔽的圈子</span>
    </div>
    <div class="tab">
      <i class="tab-icon el-icon-bell" :class="getPath()=='messagesSettings'?'active':''"></i>
      <span class="tab-text" @click="push('/home/setting/messagesSettings')">消息与提醒</span>
    </div>
  </div>
  <div class="content">
    <router-view/>
  </div>
</template>

<script>
export default {
  data(){
    return{
      tabShow:false
    }
  },
  methods: {
    push(path){
      this.$router.push(path)
    },
    getPath(){
      return this.$route.path.split('/')[3];
    }
  },
  computed:{
    getShow(){
      return this.tabShow||this.$route.path.split('/')[3]=='banUser'||this.$route.path.split('/')[3]=='banGroup'
    }
  }
}
</script>

<style scoped>
.active{
 color: #c1b800;
}
@media screen and (max-width:1400px){
  .content{
    width: 935px !important;
  }
}
.tab-icon-no{
  font-size: 20px;
  line-height: 30px;
  margin-left:35px;
}
.tab-text{
  font-size: 15px;
  line-height: 30px;
  margin-left:15px;
}
.tab-icon{
  font-size: 20px;
  line-height: 30px;
  margin-left:15px;
}
.tab{
  height:30px;
  margin-bottom: 10px;
}
.content{
  height:900px;
  width:calc(80% - 185px);
  margin-left:calc(10% - 5px);
  background:white;
  border:#d1d1d1 solid 1px;
  position: absolute;
  left:190px;
  top:50px;
}
.jump-tabs{
  height:900px;
  width:180px;
  margin-left:calc(10% - 5px);
  background:white;
  margin-top:50px;
  border:#d1d1d1 solid 1px;
}
</style>
