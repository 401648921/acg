<template>
<div class="user-page-content" >
  <div class="pic-content">
    <el-image
      style="width: 70px; height: 70px"
      :src="photo"
      :fit="fit"></el-image>
  </div>
  <div class="infor-content">
    <div class="user-name">{{getName}}</div>
    <div class="people-number">{{'粉丝数:'+fansNumber}}</div>
  </div>
  <el-button @click="follow"  v-if="!buttonShow"  icon="el-icon-plus" size="mini" class="recommend-button" type="warning" plain round> {{buttonText}}</el-button>
  <span v-if="buttonShow" class="each-button">
    <i class="each-button-icon iconfont-go icon-go-huxiangguanzhu"></i>
    <span class="each-button-text">互相关注</span>
  </span>
</div>
</template>

<script>
export default {
  props:{
    id:{
      default:'001',
      type:String
    },
    buttonIf:{
      default:false,
      type:Boolean
    },
    buttonText:{
      default:'关注',
      type:String
    },
    fansNumber:{
      default:0,
      type:Number
    },
    userName:{
      default:'didy3i',
      type:String
    },
    photo:{
      default:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      type:String
    }
  },
  data(){
    return{
      name:this.userName,
      userFansNumber:this.fansNumber,
      buttonShow:this.buttonIf,
      name:this.userName==''?'暂无用户名':this.userName
    }
  },
  methods: {
    follow(){
      this.$emit('follow',this.id);
      this.buttonShow= !this.buttonShow;
    },

  },
  mounted () {
    this.$userRequest({
          method:'post',
          url:'/judgeFollow',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            fromId:this.$store.getters.getId,
            toId:this.id
          }
        }).then(res=>{
           this.buttonShow = res.data.data.status==2
        }).catch(e=>{
          this.$alert('服务器连接失败','提示',{
            confirmButtonText:'确定'
          });
        })
  },
  computed: {
    getName(){
      return this.userName==''?'暂无用户名':this.userName;
    }
  }
}
</script>

<style scoped>
.each-button-icon{
  margin-left:5px;
  font-size: 20px;
  line-height: 30px;
}
.each-button{
  position: absolute;
  width:100px;
  height:30px;
  font-size: 16px;;
  right:10px;
  top:35px;
  color:#dbd1b6 ;
  border:#dbd1b6 solid 1px;
  border-radius: 10px;
}
.recommend-button{
  position: absolute;

  font-size: 16px;;
  right:30px;
  top:30px;
}
.people-number{
  color: #a9a9ab;
  position: relative;
  top:25px;
  font-size: 16px;
}
.intro-content{
  position: relative;
  top:5px;
  font-size: 16px;
  margin-bottom: 5px;
}
.user-name{
  position: relative;
  top:15px;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 5px;
}
.infor-content{
  position: absolute;
  left: 100px;
  width:255px;
  top:0px;
}
.pic-content{
  position: absolute;
  left:10px;
  top:10px;
}
.user-page-content{
  width:calc(100% - 2px);
  border:#dfdfdf solid 2px;
  background: white;
  position: relative;
  height:90px;
}
</style>
