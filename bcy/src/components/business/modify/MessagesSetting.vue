<template>
  <div class="message-setting-header">
    <div class="message-setting-header-title">
      消息设置
    </div>
    <div class="message-setting-header-info">
      有人关注你，评论或赞了你的动态，你将收到推送
    </div>
  </div>
  <div class="message-setting-content">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="评论与@">
        <el-switch class="switch-setting"
          style="display: block"
          v-model="pushComment"
          active-color="#ccbe97"
          @change="changeSetting"
        ></el-switch>
      </el-form-item>
      <el-divider></el-divider>
        <el-form-item label="点&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;赞">
        <el-switch class="switch-setting"
          style="display: block"
          v-model="pushLike"
          active-color="#ccbe97"
          @change="changeSetting"
        ></el-switch>
      </el-form-item>
      <el-divider></el-divider>
        <el-form-item label="粉&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;丝">
        <el-switch class="switch-setting"
          style="display: block"
          v-model="pushFans"
          active-color="#ccbe97"
          @change="changeSetting"
        ></el-switch>
      </el-form-item>
      <el-divider></el-divider>
        <el-form-item label="系统通知">
        <el-switch class="switch-setting"
          style="display: block"
          v-model="pushSystem"
          active-color="#ccbe97"
          @change="changeSetting"
        ></el-switch>
      </el-form-item>
      <el-divider></el-divider>
        <el-form-item label="消&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;息">
        <el-switch class="switch-setting"
          style="display: block"
          v-model="pushInfo"
          active-color="#ccbe97"
          @change="changeSetting"
        ></el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data(){
    return{
      pushComment:false,
      pushLike:false,
      pushFans:false,
      pushSystem:false,
      pushInfo:false
    }
  },
  methods: {
    changeSetting(){
      this.$userRequest({
          method:'put',
          url:'/personalSetting',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            id:this.$store.getters.getId,
            pushComment : this.pushComment ?1:0,
            pushLike : this.pushLike ?1:0,
            pushFans : this.pushFans ?1:0,
            pushSystem : this.pushSystem ?1:0,
            pushInfo : this.pushInfo ?1:0
          }
        }).then(resp=>{
        }).catch(function(error){
          alert(error.url);
        })
    }
  },
  mounted () {
    this.$userRequest({
          method:'get',
          url:'/personalSetting',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            id:this.$store.getters.getId,
          }
        }).then(resp=>{
          let res = resp.data.data.personalSetting;
          this.pushComment = res.pushComment==1;
          this.pushLike = res.pushLike == 1;
          this.pushFans = res.pushFans == 1;
          this.pushSystem = res.pushSystem ==1;
          this.pushInfo = res.pushInfo ==1;
        }).catch(function(error){
          alert(error.url);
        })
  }
}
</script>

<style>
.message-setting-content{
  width:100%;
  margin-top:100px;
}
.message-setting-header-info{
  margin-top:10px;
  text-indent: 3px;
  color: #a3a3a3;
}
.message-setting-header-title{
  font-size: 16px;
  font-weight: 700;
  line-height: 25px;
}
.message-setting-content .el-form-item__label{
  font-size: 18px;
  font-weight: 700;
}
.switch-setting{
  margin-left:250px;
  margin-top:12px;
}
</style>
