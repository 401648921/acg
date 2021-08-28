<template>
  <div class="message-content">
    <div class="message-pages">
      <div class="message-title">
        <i class="message-icon el-icon-s-promotion"></i>
        <span class="message-title-text">消息中心</span>
      </div>
      <el-row class="tac">
        <el-col >
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-menu-item index="1">
            <i class="icon-goyuandian iconfont-go item-icon"></i>
            <span class="item-text" @click="go('/home/message/messageToMe')">@ 我的</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="icon-goyuandian iconfont-go item-icon"></i>
            <span class="item-text" @click="go('/home/message/myMessage')">评论我的</span>
          </el-menu-item>
          <el-menu-item index="3" >
            <i class="icon-goyuandian iconfont-go item-icon"></i>
            <span class="item-text" @click="go('/home/message/getGoodList')">收到的赞</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="icon-goyuandian iconfont-go item-icon"></i>
            <span class="item-text" @click="go('/home/message/messages')">我的消息</span>
          </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="message-content-box">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    go(path){
      this.$router.push(path)
    },

  },
  data(){
    return{

    }
  }
}
</script>

<style scoped>
.message-content-box{
  width: calc(80% - 210px);
  height:800px;
  left:calc(10% + 200px);
  margin-left:10px;
  top:50px;
  position: absolute;
  margin-right:-200px;
}
.tac{
  width:100%;
}
.message-pages{
  background: white;
  border: #d1d1d1 solid 2px;
  height:800px;
  width:200px;
  margin-left:9.75%;
}
.message-title-text{
  font-size: 20px;
  line-height: 40px;
}
.message-icon{
  font-size: 29px;
  line-height: 40px;
  margin-left:20px;
}
.message-content{
  width:100%;
  margin-top:50px;

}
.item-icon{
  font-size: 5px;
  margin-left:15px;
}
.item-text{
  margin-left:20px;
}
@media screen and (max-width:1400px){

  .message-content-box{
    width: 910px !important;
  }
}
</style>
