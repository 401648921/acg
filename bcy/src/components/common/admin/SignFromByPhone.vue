<template>
<span class="form-box">
  <span @click="push('/admin/sign')" class="login-title">
    <p>密码登录</p>

  </span>
  <span class="login-title">
    <p>短信登录</p>
    <span></span>
  </span>
  <form>
    <span class="user-input">
      <input @keyup.enter="sign" v-model="form.phone" type="text" placeholder="手机号">
    </span>
    <span class="user-input">
      <input @keyup.enter="sign" v-model="form.code" autocomplete="off" placeholder="验证码">
      <el-button @click="getCode()" round class="button-admin" v-text="show?'获取验证码':getTime"></el-button>
    </span>
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
          phone :'',
          code:'',
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
        if(this.form.stuNo==''){
          this.$alert('请先输入电话号','提示',{
            confirmButtonText:'确定'
          });
          return;
        }
        this.$oauthRequest({
          method:'post',
          url:'/code',
          params: {
            phone: this.form.phone,
            type:1
          }
        }).then(res=>{
           this.$alert('邮件已发送','提示',{
            confirmButtonText:'确定'
          });
        }).catch(e=>{
          this.$alert('邮件失败','提示',{
            confirmButtonText:'确定'
          });
        })
      },
      sign(){
        if(this.form.choice==false){
          this.$alert('请先同意协议','提示',{
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
        if(this.form.phone==''){
           this.$alert('电话号不能为空','提示',{
            confirmButtonText:'确定'
          });
          return;
        }

        this.$oauthRequest({
          method:'post',
          url:'/loginBySms',
          params: {
            code:this.form.code,
            phone: this.form.phone,
            type:1
          }
        }).then(res=>{
          //alert(res.data.data)
           this.$userRequest({
              method:'get',
              url:'/personalInfo',
              params: {
                phone:this.form.phone
              }
            }).then(res=>{
              if(res.data.code==-1){
                this.$alert('账号或验证码错误','提示',{
                  confirmButtonText:'确定'
                });
                return;
              }
              this.$store.commit('SET_ID', res.data.data.personalInfo.id);
                //alert(res.data.data.personalInfo.id)
                this.$userRequest({
                  method:"post",
                  url:'/judgeNew',
                  params: {
                    id:res.data.data.personalInfo.id
                  }
                }).then(res=>{
                  if(res.data.msg=='codeWrong'){
                    this.$alert('验证码错误','提示',{
                      confirmButtonText:'确定'
                    });
                    return;
                  }
                  this.$store.commit('SET_TOKEN', res.data.data.token);
                  if(res.data.data.isNew==1){
                    this.$router.push('/admin/putInformation');
                  }else{
                    this.$router.push('/home/index');
                  }

                })
            })
        }).catch(e=>{
              this.$alert('账号或密码错误')
            })
      },
      push(way){
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
  left:340px;
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
  right:40px;
  top:200px;
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
  margin-top:30px;
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
