<template>
<span class="form-box">
  <span class="login-title">
    <p>密码登录</p>
    <span></span>
  </span>
  <span @click="push('/admin/signByPhone')" class="login-title">
    <p>短信登录</p>

  </span>
  <form>
    <span class="user-input">
      <input v-model="form.phone" type="text" placeholder="账号" @keyup.enter="sign">
    </span>
    <span class="user-input">
      <span v-show="!passwordShow" @click="passwordShow=true" class="look-icon icon-goyanjing1 iconfont-go"></span>
      <span v-show="passwordShow" @click="passwordShow=false" class="look-icon icon-goyanjing iconfont-go"></span>
      <input @keyup.enter="sign" v-model="form.password" autocomplete="off" :type="passwordType" placeholder="密码">
    </span>
      <el-link class="link-to" type="success">立即注册</el-link>
      <el-link class="link-to" target="_blank">忘记密码</el-link>
      <el-button @click="sign" class="submit-admin" type="success" round>登录</el-button>
      <div class="sign-link">
        <div class="sign-page">
          <span class="iconfont-go icon-goweixin sign-icon"></span>
          <div>微信</div>
        </div>
        <div class="sign-page">
          <span class="iconfont-go icon-goqq sign-icon"></span>
          <div>QQ</div>
        </div>
        <div class="sign-page">
          <span class="iconfont-go icon-goweibo1 sign-icon"></span>
          <div>微博</div>
        </div>
      </div>
      <el-checkbox v-model="form.choice"  class="check-admin">
        我已阅读并同意
        <a href="#">《##服务协议》</a>
        <a href="#">《隐私政策》</a>
      </el-checkbox>
  </form>
</span>
</template>

<script>
export default {
  created () {
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },
  data() {
      return {
        form: {
          phone:'',
          password: '',
          choice:false
        },
        repasswordShow:false,
        passwordShow:false,
        timer:null,
        count:'',
        show:true
      }
    },
    methods: {
      sign(){
        if(this.form.choice==false){
          this.$alert('请先同意协议','提示',{
            confirmButtonText:'确定'
          });
          return;
        }
        if(this.form.password==''){
           this.$alert('密码不能为空','提示',{
            confirmButtonText:'确定'
          });
          return;
        }
        if(this.form.phone==''){
           this.$alert('账号不能为空','提示',{
            confirmButtonText:'确定'
          });
          return;
        }
        this.$loginRequest({
          method:'post',
          url:'/oauth/token',
          params: {
            grant_type:'password',
            username:this.form.phone,
            password:this.form.password,
            client_id:'bcy-cloud-gateway',
            client_secret:'123456'
          }
        }).then(resp=>{

          this.$store.commit('SET_TOKEN', resp.data.access_token);
          //alert(this.$store.getters.getToken)
          this.$userRequest({
              method:'get',
              url:'/personalInfo',
              params: {
                phone:this.form.phone
              },
              headers:{
                token:undefined
              }
            }).then(res=>{
              /*if(res.data.error=='invalid_grant'){
                this.$alert('账号或密码错误')
              }*/
              this.$store.commit('SET_ID', res.data.data.personalInfo.id);
              this.$router.push('/home/index');
            }).catch(e=>{
              this.$alert('服务器错误')
            })
          //this.$router.push('/home');
        }).catch(e=>{
              this.$alert('账号或密码错误')
            })
      },
      push(way){
        //alert(1)
        this.$router.push(way);
      }
    },
    computed: {
      repasswordType(){
        if(this.repasswordShow==false){
          return 'password';
        }else{
          return 'text';
        }
      },
      getTime(){
        return this.count+'秒后获取验证码';
      },
      passwordType(){
        if(this.passwordShow==false){
          return 'password';
        }else{
          return 'text';
        }
      }
    }
}
</script>

<style scoped>
.sign-icon{
  font-size: 35px;
  color: green;
}
.sign-page div{
  margin-left:2px;
}
.sign-page{
  float: left;
  margin-right: 50px;
}
.sign-link{
  position: relative;
  left:120px;
  top:50px;
}
.sign-link img{
  border-radius: 50%;
  width:50px;
  height:50px;
  border:1px solid black;
  overflow: hidden;
}
.link-to{
  left:280px;
  margin-right:20px;
  position: relative;
}
.look-icon{
  font-size: 30px;
  position: absolute;
  left:370px;
}
.input{
  border:none;
  border-bottom: 1px solid #000
}
.login-title{
  margin-top: 30px;
  display: inline-block;
  margin-bottom: 10px;
  position: relative;
  left:120px;
  margin-right: 50px;
}
.login-title span{
  display: block;
  margin-top:-5px;
  margin-left:10px;
  border-bottom: 2px solid #03bb7a;
  width:45px;
}
.user-input input{
  border:none;
  height: 35px;
  font-size: 15px;
  /*border-bottom: 1px solid #dbdbdb;*/
  outline:none;
  width:380px;
}
.user-input{
  display: inline-block;
  margin-top:40px;
  width:380px;
  margin-left: 30px;
  border-bottom: 1px solid #dbdbdb;
}
.button-admin{
  position: absolute;
  right:50px;
  top:180px;
  border: 1px solid green;
  color: green;
}
.button-admin:hover{
  border: 1px solid green;
  color: green;
}
.check-admin{
  position: relative;
  margin-top:10px;
  margin-right:130px;
  left:70px;
  top:70px;
}
.check-admin a{
  color: #03bb7a;
}
.submit-admin{
  position: relative;
  display: block;
  width:350px;
  height:50px;
  top:30px;
  left:45px;
}
.admin-tansfer p{
  display: inline-block;
}
.admin-tansfer{
  position: relative;
  top:30px;
  left:20px;
  display: block;
  font-size: 10px;
}
.admin-tansfer a {
  color: #03bb7a;
}
</style>
