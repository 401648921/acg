<template>
  <div class="content">
    <div class="content-title">
      <span class="content-title-text">填写基本信息</span>
      <span class="content-title-jump" @click="push()">跳过</span>
    </div>
    <div class="user-box">
      <div @click="picShow" class="pic-show">
        <el-avatar :size="80" icon="el-icon-user-solid" :src="'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"></el-avatar>
      </div>
      <div class="submit-pic">
        <span>上传头像</span>
      </div>
    </div>
    <div class="sex-choice">
      <el-radio v-model="sex" label="男">男生</el-radio>
      <el-radio v-model="sex" label="女">女生</el-radio>
    </div>
    <div class="content-divider">
      <el-divider></el-divider>
    </div>

    <div class="user-name-box">
      <div class="user-name-box-title">
        昵称
      </div>
      <span class="user-input">
        <input v-model="userName" type="text" placeholder="请填写昵称">
      </span>
    </div>
     <el-button @click="submit" :size="mini" class="submit-admin" type="success" round>确 定</el-button>
  </div>
  <div class="img-group">
    <pic-card   @uploadSuccess="savePath" :urlPic="'/api4/photoUpload'"></pic-card>
  </div>
</template>

<script>
import picCard from '../pic/ShowCoper'
export default {
data(){
  return{
    sex:'男',
    userName:'',
    list:[],
    path:'',
    show:false
  }
},
components:{
picCard
},
methods:{
  submit(){
     this.$userRequest({
          method:'put',
          url:'/personalInfo',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            id:this.$store.getters.getId,
            sex:this.sex,
            username:this.userName
          }
        }).then(res=>{
           this.$router.push('/admin/recommend');
        }).catch(e=>{
          this.$alert('邮件失败','提示',{
            confirmButtonText:'确定'
          });
        })
  },
  savePath(path){
    this.url = path
  },
  picShow(){
    this.show = true
  },
  push(){
    this.$router.push('/admin/recommend');
  }
},
mounted(){
  //this.search(6,1)
}
}
</script>

<style scoped>
.img-group{
  position: absolute;
  top:80px;
  left:125px;
}
.user-name-box-title{
  font-weight: 700;
  font-size: 15px;
  position: relative;
  top:26px;
  left:30px;
}
.submit-admin{
  position: relative;
  display: block;
  width:280px;
  top:100px;
  left:65px;
  background: #37ca67;
}
.user-name-box{
  position: relative;
  top:60px;
  left:20px;
}
.user-input input{
  border:none;
  height: 35px;
  font-size: 15px;
  /*border-bottom: 1px solid #dbdbdb;*/
  outline:none;
  width:300px;
}
.user-input{
  display: inline-block;
  margin-top:30px;
  width:300px;
  margin-left: 30px;
  border-bottom: 1px solid #dbdbdb;
}
.content-divider{
  width:300px;
  position: relative;
  top:100px;
  left:50px;
}
.sex-choice .el-radio{
 margin-left:20px;
}
.sex-choice{
  position: relative;
  top:100px;
  left:100px;
}
.el-radio__input.is-checked + .el-radio__label {
  color: #fd7624 !important;
}
.el-radio__input.is-checked .el-radio__inner {
  background: #fd7624 !important;
  border-color: #fd7624 !important;
}
.submit-pic{
  color: #ccbe97;
  position: relative;
  color: #d7e0e3;
  top:60px;
  left:165px;
}
.pic-show{
  position: relative;
  left:160px;
  top:40px;
}
.content-title{
  margin-top:30px;
}
.content-title-jump{
  position: relative;
  left:280px;
  font-weight: 600;
  font-size: 13px;
}
.content-title-text{
  font-size: 20px;
  position: relative;
  left:140px;
}
</style>
