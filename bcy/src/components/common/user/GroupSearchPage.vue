<template>
<div class="group-content">
  <div class="pic-content">
    <el-image
      style="width: 70px; height: 70px"
      :src="userPhoto"
      :fit="fit"></el-image>
  </div>
  <div class="infor-content">
    <div  class="group-title">{{userCircleName}}</div>
    <div  class="intro-content">{{userDescription}}</div>
    <div class="people-number">{{userNumber+'个成员'}}</div>
  </div>
  <el-button @click="talk(index)" v-show="getUserButtonIf" icon="el-icon-plus" size="mini" class="recommend-button" type="warning" plain round>{{buttonText}}</el-button>
</div>
</template>

<script>
export default {
props:{
  buttonText:{
    default:'关注',
    type:String
  },
  buttonIf:{
    default:true,
    type:Boolean
  },
  circleName:{
    default:'niww',
    type:String
  },
  description:{
    default:'niww',
    type:String
  },
  photo:{
    default:'niww',
    type:String
  },
  createTime:{
    default:100,
    type:Number
  },
  number:{
    default:100,
    type:Number
  },
  index:{
    default:0,
    type:Number
  }
},
data(){
  return{
    userButtonIf:true,
    userCircleName:this.circleName,
    userDescription:this.description,
    userPhoto:this.photo,
    userNumber:this.number,
    userIndex:this.index
  }
},
mounted () {
  this.$acgRequest({
          method:'get',
          url:'/circle',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            circleName:this.userCircleName,
          }
        }).then(resp=>{
          this.userNumber = resp.data.data.circleInfo.followCounts
        }).catch(function(error){
          alert(error.url);
        })
    this.$acgRequest({
          method:'get',
          url:'/judgeCircle',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            circleNames:this.userCircleName,
            id:this.$store.getters.getId
          }
        }).then(resp=>{
          if(resp.data.data.judgeCircleList[0].isFollow==1){
            this.userButtonIf= false;
          }
        }).catch(function(error){
          alert(error.url);
        })
},
methods: {
  push(){
        this.$router.push({
          path:'/home/showQuestion',
          query:{
            number:this.number
          }
        });
      },
  talk(index){
    this.userButtonIf=false;
    this.$emit('follow',this.userCircleName,index)
  }
},
computed:{
  getUserButtonIf(){
    return this.userButtonIf||this.buttonText=='取消屏蔽';
  }
}
}
</script>

<style scoped>
.recommend-button{
  position: absolute;

  font-size: 16px;;
  right:40px;
  top:30px;
}
.people-number{
  color: #a9a9ab;
  position: relative;
  top:5px;
  font-size: 16px;
}
.intro-content{
  position: relative;
  top:5px;
  font-size: 16px;
  margin-bottom: 5px;
}
.group-title{
  position: relative;
  top:8px;
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
.group-content{
  width: calc(100% - 5px);
  border:#dfdfdf solid 2px;
  background: white;
  position: relative;
  height:90px;
}
</style>
