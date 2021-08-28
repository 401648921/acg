<template>
  <div class="create-header">
    <div class="create-header-title" @click="dialogVisible=true">创建圈子</div>
    <span class="create-header-icon el-icon-arrow-left"></span>
  </div>
  <div class="create-content">
    <div class="img-content" img-group>
       <div class="img-group">
         <pic-card @uploadSuccess="savePath" :urlPic="'/api2/circlePhoto'"></pic-card>
       </div>
    </div>
    <div class="group-title-input-box">
      <el-input class="group-title-input" v-model="title" placeholder="请输入圈子标题(5-20个字)"></el-input>
    </div>
    <div class="group-intro-input-box">
      <el-input class="group-intro-input"
        type="textarea"
        :autosize="{ minRows: 6, maxRows: 8}"
        placeholder="请输入圈子简介(50个字以内)"
        v-model="intro">
      </el-input>
    </div>
    <div class="group-people-input-box">
      <el-input class="group-people-input" v-model="userName" placeholder="请输入成员昵称(最多5个字)"></el-input>
    </div>
    <div class="submit-button-box">
      <el-button @click="createGroup" class="submit-button" size="" type="warning" round plain>确认创建</el-button>
    </div>
  </div>
</template>

<script>
import picCard from '../../common/pic/coper.vue'
export default {
  data(){
    return{
      path:'',
      title:'',
      intro:'',
      userName:'',

    }
  },
  methods: {
    createGroup(){
      if(this.path==''||this.title==''||this.intro==''||this.userName==''){
        this.$alert('请补充完整信息','提示',{
            confirmButtonText:'确定'
          });
          return;
      }
       this.$acgRequest({
        method:'get',
        url:'/recommendList',
        headers:{
          token:this.$store.getters.getToken
        },
        params: {
          circleName:this.title,
          description:this.intro,
          id:this.$store.getters.getId,
          nickName:this.userName,
          photo:this.path
        }
        }).then(res=>{
          if(res.data.data.msg=="repeatWrong"){
             this.$alert('圈子已存在','提示',{
            confirmButtonText:'确定'
          });
          return;
          }
           this.$alert('创建成功','提示',{
            confirmButtonText:'确定'
          });
        })
    },
    savePath(path){
      this.path = path;
    }
  },
  components:{
    picCard
  }
}
</script>

<style scoped>
.submit-button{
  width:20%;
  margin-left:40%;
}
.submit-button-box{
  margin-top:80px;
  padding-bottom: 100px;
}

.group-people-input{
  width:70%;
  margin-left:15%;
}
.group-people-input-box{
  margin-top:80px;
}
.group-intro-input{
  margin-left:15%;
}
.group-intro-input>>>textarea{
  width:70%;
}
.group-intro-input-box{
  margin-top:80px;
}
.group-title-input{
  width:70%;
  margin-left:15%;
}
.group-title-input-box{
  margin-top:80px;
}
.img-group{
  margin-left:45%;
}
.img-content{
  padding-top:100px;
}
.create-content{
  position: relative;
  left:9.75%;
  top:44px;
  background: white;
  width:80.5%;
  margin-top:10px;
}
@media screen and (max-width:1400px){
  .create-header{
    width: 1120px !important;
  }
  .create-content{
    width: 1120px !important;
  }
}
.create-header{
  position: relative;
  height:40px;
  left:9.75%;
  top:44px;
  background: white;
  width:80.5%;
}
.create-header-icon{
  position: absolute;
  left: 0px;
  top:0px;
  line-height: 40px;
  font-weight: 700;
  font-size: 25px;
}
.create-header-title{
  font-size: 20px;
  text-align: center;
  line-height: 40px;
}
</style>
