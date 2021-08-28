<template>
<div class="page-content">
  <i class="page-close el-icon-close"></i>
  <div class="user-box">
    <img class="user-box-img" :src="photo" alt="服务器故障">
    <p class="user-name">{{username}}</p>
  </div>
  <el-button size="mini" class="submit-recommend" type="warning" round @click="follow">关注</el-button>
</div>
</template>

<script>
export default {
  props:{
    index:{
      tpye:Number,
      default:0
    },
    username:{
      tpye:String,
      default:'用户名'
    },
    photo:{
      tpye:String,
      default:'用户名'
    },
    id:{
      tpye:String,
      default:'001'
    },

  },
  methods:{
    follow(){
      //alert(this.id)
      this.$emit('follow',this.id,this.index)
    }
  }
}
</script>

<style scoped>
.user-name{
  text-align: center;
}
.submit-recommend{
  position: relative;
  left:28px;
  top:-5px;
  width:70px;
}
.user-box img{
  position: relative;
  left:35px;
  top:10px;
}
.user-box{
  position: relative;
  top:0px;
}
.page-close{
  position: relative;
  left:95px;
  top:5px;
  font-size: 20px;
}
.user-box-img{
  width:50px;
  height:50px;
  border-radius: 50%;
  border:1px solid #ccbe97;
}
.page-content{
  width:120px;
  height:160px;
  border: 1px solid #eaeaea;
  box-shadow:2px 2px 5px #ebebec;
  border-radius: 12px;
}
</style>
