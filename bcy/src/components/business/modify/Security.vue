<template>
  <div class="message-setting-header">
    <div class="message-setting-header-title">
      消息设置
    </div>
    <div class="message-setting-header-info">
    绑定手机和邮箱，并设置密码，账号更安全
    </div>
    <div class="message-setting-header-info">
    注意:为保证账号安全，需进行二次验证
    </div>
  </div>
  <div class="security-content">
    <div class="security-content-row">
      <span class="security-content-element">密码设置</span>
      <span class="security-content-element">已设置</span>
      <span class="security-content-button">重置密码</span>
    </div>
    <el-divider></el-divider>
    <div class="security-content-row">
      <span class="security-content-element">绑定手机</span>
      <span class="security-content-element">{{phone}}</span>
      <span class="security-content-button" @click="oldPhoneShow=true">更换手机</span>
    </div>
    <el-divider></el-divider>
    <div class="security-content-row">
      <span class="security-content-element">绑定微博</span>
      <span class="security-content-element">已绑定</span>
      <span class="security-content-button">解除绑定</span>
    </div>
    <el-divider></el-divider>
    <div class="security-content-row">
      <span class="security-content-element">绑定QQ</span>
      <span class="security-content-element">已绑定</span>
      <span class="security-content-button">解除绑定</span>
    </div>
    <el-divider></el-divider>
    <div class="security-content-row">
      <span class="security-content-element">绑定微信</span>
      <span class="security-content-element">已绑定</span>
      <span class="security-content-button" >解除绑定</span>
    </div>
  </div>
  <el-dialog
    v-model="oldPhoneShow"
    width="650px" title="更换手机号码"
    >
    <el-form ref="form"  label-width="80px">
      <el-form-item label="">
        <el-input class="phone-input" placeholder="请输入内容"  v-model="form.oldPhone">
          <template #prepend>原手机号:</template>
        </el-input>
      </el-form-item>
      <el-form-item label="">
        <div class="code-input-box">
           <el-input class="code-input"  v-model="form.oldCode" placeholder="请输入验证码"></el-input>
            <el-button plain>获取验证码</el-button>
        </div>
      </el-form-item>
       <el-form-item label="">
        <div >
           <span class="first-text">无法接受短信，</span>
           <span class="second-text">其他验证方式</span>
        </div>
      </el-form-item>
       <el-button class="submit-button" type="warning" round>下一步</el-button>
    </el-form>
  </el-dialog>
  <el-dialog
    v-model="newPhoneShow"
    width="650px" title="更换手机号码"
    >
    <el-form ref="form"  label-width="80px">
      <el-form-item label="">
        <el-input class="phone-input" placeholder="请输入内容"  v-model="form.newPhone">
          <template #prepend>新手机号:</template>
        </el-input>
      </el-form-item>
      <el-form-item label="">
        <div class="code-input-box">
           <el-input class="code-input"  v-model="form.newCode" placeholder="请输入验证码"></el-input>
            <el-button plain>获取验证码</el-button>
        </div>
      </el-form-item>
       <el-form-item label="">
        <div >
           <span class="first-text">无法接受短信，</span>
           <span class="second-text">其他验证方式</span>
        </div>
      </el-form-item>
       <el-button class="submit-button" type="warning" round>提交</el-button>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  methods:{
    see(){
      alert(this.form.phone)
    },
    submit(){
       if(this.form.newPhone==''){
        this.$alert('请先输入手机号','提示',{
          confirmButtonText:'确定'
        });
        return;
      }
      if(this.form.newCode==''){
        this.$alert('请先输入验证码','提示',{
          confirmButtonText:'确定'
        });
        return;
      }
      this.$userRequest({
          method:'get',
          url:'/changePhone',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            id:this.$store.getters.getId,
            code:this.form.oldCode,
            phone:this.form.newPhone,
          }
        }).then(res=>{
          this.$alert('修改成功','提示',{
          confirmButtonText:'确定'
        });

        })
    },
    next(){
      if(this.form.oldPhone==''){
        this.$alert('请先输入手机号','提示',{
          confirmButtonText:'确定'
        });
        return;
      }
      if(this.form.oldCode==''){
        this.$alert('请先输入验证码','提示',{
          confirmButtonText:'确定'
        });
        return;
      }
      this.$userRequest({
          method:'get',
          url:'/changePhone',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            id:this.$store.getters.getId,
            code:this.form.oldCode,
            phone:this.form.oldPhone,
          }
        }).then(res=>{
          this.oldPhoneShow = false;
          this.newPhoneShow = true;
        });
    }

  },
  data(){
    return{
      user:{},
      phone:'',
      oldPhoneShow:false,
      newPhoneShow:false,
      form:{
        oldPhone:'',
        oldCode:'',
        newPhone:'',
        newCode:''
      }
    }
  },
  mounted(){

    this.$userRequest({
          method:'get',
          url:'/communityInfo',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            id:this.$store.getters.getId
          }
        }).then(res=>{
          this.user= res.data.data.userCommunityInfo;
          this.phone = this.user.phone.substring(0,3)+'****'+this.user.phone.substring(7,this.user.phone.length);

        })
  }
}
</script>

<style scoped>
.submit-button{
  width:200px;
  margin-left:200px;
}
.second-text{
  font-size: 14px;
  font-weight: 700;
}
.first-text{
  font-size: 14px;
  font-weight: 700;
}
.phone-input{
  width:400px;
}
.code-input{
  width:290px;
}
.security-content-button{
  color: #4d82d4;
}
.security-content-element{
  width:330px;
  float: left;
  text-align: left;
}
.security-content-row{
  font-size: 18px;
}
.security-content{
  width:800px;
  position: relative;
  left:200px;
  top:60px;
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
</style>
