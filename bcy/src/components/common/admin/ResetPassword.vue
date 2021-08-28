<template>
<span class="form-box">
  <span class="login-title">
    <p>重置密码</p>
    <span></span>
  </span>

  <form>
    <span class="user-input">
      <input v-model="form.phone" type="text" placeholder="电话号码">
    </span>
    <span class="user-input">
      <input v-model="form.code" type="text" placeholder="验证码">
      <el-button @click="getCode()" round class="button-admin" v-text="show?'获取验证码':getTime"></el-button>
    </span>
    <span class="user-input">
      <span v-show="!passwordShow" @click="passwordShow=true" class="look-icon icon-goyanjing1 iconfont-go"></span>
      <span v-show="passwordShow" @click="passwordShow=false" class="look-icon icon-goyanjing iconfont-go"></span>
      <input v-model="form.password" autocomplete="off" :type="passwordType" placeholder="设置密码: 6-16位字符，包含字母和数字">
    </span>
    <span class="user-input">
      <span v-show="!repasswordShow" @click="repasswordShow=true" class="look-icon icon-goyanjing1 iconfont-go"></span>
      <span v-show="repasswordShow" @click="repasswordShow=false" class="look-icon icon-goyanjing iconfont-go"></span>
      <input v-model="form.repassword" autocomplete="off" :type="repasswordType" placeholder="确认密码">
    </span>
    <el-checkbox v-model="form.choice"  class="check-admin">
      我已阅读并同意
      <a href="#">《##服务协议》</a>
      <a href="#">《隐私政策》</a>
      </el-checkbox>
      <el-button @click="register" class="submit-admin" type="success" round>注册账号</el-button>
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
          stuNo :'',
          code:'',
          password: '',
          repassword:'',
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
      getCode(){
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)
        }else{
          return;
        }
        if(this.form.phone==''){
          this.$alert('请先输入电话号','提示',{
            confirmButtonText:'确定'
          });
          return;
        }
        this.$oauthRequest({
          method:'post',
          url:'/code',
          params: {
            phone:this.form.phone,
            type:3
          }
        }).then(resp=>{
          this.$alert('验证码已发送','提示',{
            confirmButtonText:'确定'
          });
        }).catch(function(error){
          this.$alert('服务器异常','提示',{
            confirmButtonText:'确定'
          });
        })
      },
      register(){
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
        if(this.form.repassword==''||this.form.password!=this.form.repassword){
           this.$alert('确认密码相一致','提示',{
            confirmButtonText:'确定'
          });
          return;
        }
        if(this.form.phone==''){
           this.$alert('电话号不能为空','提示',{
            confirmButtonText:'确定'
          });
          return;
        }
        if(this.form.code==''){
           this.$alert('验证码不能为空','提示',{
            confirmButtonText:'确定'
          });
          return;
        }
        this.$oauthRequest({
          method:'post',
          url:'/changePassword',
          params: {
            code:this.form.code,
            newPassword: this.form.password,
            phone:this.form.phone
          }
        }).then(resp=>{
          if(resp.data.msg=='codeWrong'){
            this.$alert('验证码错误','提示',{
              confirmButtonText:'确定'
            });
            return;
          }
          if(resp.data.msg=='existWrong'){
            this.$alert('账号不存在','提示',{
              confirmButtonText:'确定'
            });
            return;
          }
          this.$alert('密码修改成功','提示',{
            confirmButtonText:'确定'
          });
          this.$router.push('/admin/sign')
        }).catch(function(error){
          alert(error.url);
        })
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
  left:200px;
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
  margin-top:30px;
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
  left:30px;
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
  left:65px;
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
