<template>
  <div class="nav-content">
    <span class="app-name">未次元</span>
    <span class="input-box">
      <el-input @keyup.enter="goSearch()" size="mini" class="nav-input" placeholder="请选择日期" suffix-icon="el-icon-search" v-model="input"></el-input>
    </span>
     <el-popover
      placement="bottom-end"
      :width="300"
      trigger="hover"
    >
    <div class="button-content">
      <div class="button-content-header">
        <div class="button-show" @click="push('/home/putArticle')">
          <i class="button-icon el-icon-s-order"></i>
          <span class="button-first-text">发布</span>
          <span class="button-second-text">晒文/写文</span>
        </div>
      </div>
      <div class="button-content-bottom">
        <div class="button-show-bottom" @click="push('/home/putQuestion')">
          <i class="button-icon iconfont-go icon-goliaotian"></i>
          <span class="button-first-text">提问</span>
          <span class="button-second-text">问问大家</span>
        </div>
      </div>
    </div>
    <template #reference>
      <span class="nav-right-submit">
        <el-button class="nav-submit" size="small" type="success" plain>发布</el-button>
      </span>
    </template>
  </el-popover>
    <el-popover
      placement="bottom"
      :width="150"
      trigger="hover"
    >
    <div class="button-content">
      <div class="user-libs-to">
        <i class="user-libs-to-icon el-icon-user-solid"></i>
        <span class="user-libs-to-text" @click="push('/home/personIndex')">个人主页</span>
      </div>
      <div class="user-libs-to">
        <i class="user-libs-to-icon el-icon-question"></i>
        <span class="user-libs-to-text" @click="push('/home/setting/commonList')">帮助与反馈</span>
      </div>
      <div class="user-libs-to">
        <i class="user-libs-to-icon el-icon-s-tools"></i>
        <span class="user-libs-to-text" @click="push('/home/setting/messagesSettings')">设置</span>
      </div>
    </div>
    <template #reference>
      <span class="nav-right-pic">
      <el-avatar :src="photo" icon="el-icon-user-solid"></el-avatar>
    </span>
    </template>
  </el-popover>

    <span class="nav-right">
      <i class="nav-item-icon el-icon-bell"></i>
      <span class="nav-item-text" @click="push('/home/message')">消息</span>
    </span>
    <span class="nav-right">
      <i class="nav-item-icon el-icon-s-cooperation"></i>
      <span class="nav-item-text" @click="push('/home/personIndex/questionList')">提问箱</span>
    </span>
    <span class="nav-right">
      <i class="nav-item-icon el-icon-time"></i>
      <span class="nav-item-text" @click="push('/home/personIndex/MyHistory')">历史浏览</span>
    </span>
    <span class="nav-right">
      <i class="nav-item-icon iconfont-go icon-goaixin"></i>
      <span class="nav-item-text" @click="push('/home/personIndex/MyLike')">喜欢</span>
    </span>
    <span class="nav-right">
      <i class="nav-item-icon el-icon-star-off"></i>
      <span class="nav-item-text" @click="push('/home/personIndex/MyFollow')">收藏夹</span>
    </span>
    <span class="nav-right">
      <i class="nav-item-icon el-icon-s-home"></i>
      <span class="nav-item-text " @click="push('/home')">主页</span>
    </span>

  </div>

</template>

<script>
export default {
  /*created () {
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },*/
  data(){
    return{
      input:'',
      photo:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    }
  },
  methods:{
     push(path){
      this.$router.push(path)
    },
    goSearch(){
      this.$router.push({
        path:'/home/searchUser',
        query:{
          input:this.input
        }
      })
    },

  },
  mounted(){
    this.$userRequest({
        method:'get',
        url:'/personalInfo',
        params: {
          id:this.$store.getters.getId
        }
      }).then(res=>{
        this.photo= res.data.data.personalInfo.photo;
        this.$store.commit('SET_PHOTO',this.photo);
      })
  }
}
</script>

<style scoped>
.user-libs-to-text{
  margin-left:10px;
}
.user-libs-to-icon{
  margin-left:10px;
  margin-right: 10px;
  font-size: 22px;
}
.user-libs-to{
  height:35px;
  line-height: 35px;
}
.button-second-text{
  font-size: 14px;
  font-weight: 700;
  line-height: 50px;
  position: relative;
  top:-4px;
  color: #d1d1d1;
  margin-left:36px;
}
.button-first-text{
  font-size: 16px;
  color: white;
  font-weight: 700;
  line-height: 50px;
  position: relative;
  top:-4px;
  margin-left:23px;
}
.button-icon{
  font-size: 30px;
  color: white;
  line-height: 50px;
  margin-left:20px;
}
.button-show-bottom{
  width:270px;
  margin-left:15px;
  border:#d1d1d1 solid 1px;
  background: #41b2d0;
  height:50px;
  border-radius: 10px;
}
.button-show{
  width:270px;
  margin-left:15px;
  border:#d1d1d1 solid 1px;
  background: #37ca67;
  height:50px;
  border-radius: 10px;
}
.button-content-bottom{
  margin-top:20px;
}
.button-content-header{
  height:60px;
}
.nav-item-icon{
  font-size: 18px;
}
.nav-right-submit{
  float: right;
  width:100px;
  margin-right:0px;
  margin-top:8px;
}
.nav-right-pic{
  float: right;
  width:60px;
  margin-right:0px;
  margin-top:4px;
}
.nav-right{
  float: right;
  margin-right:20px;
  margin-top:14px;
}
.nav-submit{
  width:80px;
}
.nav-input{
  outline: none;
}
.nav-input .el-textarea__inner,.el-input__inner{
  background: #e1e1e1;
}
.input-box{
  width:200px;
  float: left;
  margin-left:20px;
  margin-top:8px;
}
@media screen and (max-width:1400px){
    .nav-content{
        width:1120px !important;
    }
}
.nav-content{
  height:40px;
  width:100%;

}
.app-name{
  font-family: 'www';
  font-size: 22px;
  float: left;
  margin-left:30px;
  margin-top:10px;
}
</style>
