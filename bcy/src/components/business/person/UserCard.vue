<template>

  <div class="content">
    <div class="user-infor-box">
      <div class="user-infor">
        <div class="user-infor-title">动态</div>
        <div class="user-infor-num">{{userMomentCounts}}</div>
      </div>

      <div class="user-infor">
        <div class="user-infor-title">关注</div>
        <div class="user-infor-num">{{userFollowCounts}}</div>
      </div>

      <div class="user-infor last-box">
        <div class="user-infor-title">粉丝</div>
        <div class="user-infor-num">{{userFansCounts}}</div>
      </div>
    </div>
    <div class="user-message-box">
      <div class="user-message-header">
        <span class="user-message-header-title">个人资料</span>
        <span class="user-message-header-button">
          <el-button plain size="mini">编辑资料</el-button>
        </span>
      </div>
      <div class="user-message-bottom">
        <span class="user-message-bottom-text">{{'籍贯: '+userProvince+userCity}}</span>
        <span class="user-message-bottom-text-right">{{'生日: '+userBirthday}}</span>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props:{
  id:{
    default:'001',
    type:String
   },
   sex:{
    default:'男',
    type:String
   },
   username:{
    default:'XXXXXXXXXXXXXXXX',
    type:String
   },
   description:{
    default:'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    type:String
   },
   province:{
    default:'北京市',
    type:String
   },
   city:{
    default:'平成区',
    type:String
   },
   birthday:{
     default:'2021-8-16',
     type:String
   },
   fansCounts:{
     default:0,
     type:Number
   },
   followCounts:{
     default:0,
     type:Number
   },
   momentCounts:{
     default:0,
     type:Number
   }
 },
 data(){
   return{
    userId:this.id,
    userSex: this.sex,
    name:this.username,
    userDescription:this.description,
    userProvince:this.province,
    userCity:this.city,
    userBirthday:this.birthday,
    userFansCounts:this.fansCounts,
    userFollowCounts:this.followCounts,
    userMomentCounts:this.momentCounts
   }
 },
 mounted () {
   this.$userRequest({
          method:'get',
          url:'/userCounts',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            userId:this.userId
          }
        }).then(res=>{
          this.userFansCounts = res.data.data.userCountsList[0].fansCounts;
          this.userFollowCounts = res.data.data.userCountsList[0].followCounts;
          this.userMomentCounts = res.data.data.userCountsList[0].momentCounts;
        })
        this.$userRequest({
          method:'get',
          url:'/personalInfo',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            id:this.userId
          }
        }).then(res=>{
          //alert(res.data.data.personalInfo.username)
          this.name = res.data.data.personalInfo.username;
          this.userSex = res.data.data.personalInfo.sex;
          this.userBirthday = res.data.data.personalInfo.birthday.substring(0,10)
          this.userDescription = res.data.data.personalInfo.description;
          this.userProvince = res.data.data.personalInfo.province;
          this.userCity = res.data.data.personalInfo.city;
          //alert(this.description)
        })

 }
}
</script>

<style scoped>
@media screen and (max-width:1500px){
  .user-message-bottom-text-right{
    display: none;
  }
}
.user-message-bottom-text-right{
  float: right;
  margin-right:2%;
  line-height: 55px;;
}
.user-message-bottom-text{
  float: left;
  line-height: 55px;
  margin-left:3%;
}
.user-message-header-button{
  margin-top:5px;
  float: right;
}
.user-message-header-title{
  float: left;
  line-height: 35px;
}
.user-message-header{
  border-bottom: #d1d1d1 solid 1px;
  width:95%;
  height:35px;
  margin-left:3%;
}
.user-message-box{
  margin-top:10px;
  height:90px;
  border:#d1d1d1 solid 1px;
  background: white;
}
.last-box{
  border:0px !important;
}
.user-infor-num{
  text-align: center;
  margin-top:20px;
}
.user-infor-title{
  margin-top:-10px;
  text-align: center;
}
.devider{
  float: left;
  height:80%;
  margin-top:10px;
}
.user-infor{
  width:40px;
  float: left;
  height:calc(100% - 40px);
  width:calc(33.333% - 1px);
  margin-top:20px;
  border-right: #d1d1d1 solid 1px;
}
.user-infor-box{
  height:90px;
  border:#d1d1d1 solid 1px;
  background: white;
}
.content{
  width:100%;

}
</style>
