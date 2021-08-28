<template>
  <div class="index-content">
    <div class="group-content">
      <div class="pic-content">
        <el-image
          style="width: 120px; height:120px"
          :src="group.photo"
          :fit="fit"></el-image>
      </div>
      <div class="infor-content">
        <div class="group-title">{{group.circleName}}</div>
        <div class="intro-content">{{group.description}}</div>
        <div class="people-number">{{group.postCounts+'帖子 '+group.followCounts+'成员'}}</div>
      </div>
      <div class="submit-button">
      <el-dropdown >
        <el-button plain  @click="follow">
        关注圈子<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>举报该圈子</el-dropdown-item>
            <el-dropdown-item @click="banGroup">屏蔽该圈子</el-dropdown-item>
            <el-dropdown-item>不感兴趣</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    </div>
  </div>
  <div class="tabs">
    <span class="tab" :class="type==1?'active':''" @click="go(1)">文章</span>
    <span class="tab" :class="type==2?'active':''" @click="go(2)">讨论</span>
    <span class="submit-button-go ">
      <el-button class="button-to-write" size="small" plain icon="el-icon-edit">发布</el-button>
    </span>
  </div>
  <div class="index-content-box">
    <router-view/>
  </div>
</template>

<script>
export default {
  mounted(){
    this.$acgRequest({
          method:'get',
          url:'/circle',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            circleName:this.$route.query.circleName
          }
        }).then(res=>{
          this.group = res.data.data.circleInfo;
        })
  },
  data(){
    return{
      group:{},
      type:1
    }
  },
  methods:{
    banGroup(){
      this.$communityRequest({
          method:'post',
          url:'/blackCircle',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            circleName:this.$route.query.circleName,
            id:this.$store.getters.getId
          }
        }).then(res=>{
          this.$alert('拉黑成功','提示',{
            confirmButtonText:'确定'
          });
        })

    },
    go(type){
      if(this.type==type){
        return;
      }
      this.type = type;
      this.$router.push({
        path:type==2?'/home/groupIndex/groupDiscuss':'/home/groupIndex/groupHot',
        query:{
          circleName:this.$route.query.circleName
        }
      })
    },
    follow(){
      this.$acgRequest({
          method:'post',
          url:'/followCircle',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            circleName:this.$route.query.circleName,
            id:this.$store.getters.getId
          }
        }).then(res=>{
          if(res.data.msg=="repeatWrong"){
            this.$alert('已经关注过','提示',{
              confirmButtonText:'确定'
            });
            return;
          }
          this.$alert('关注成功','提示',{
            confirmButtonText:'确定'
          });
        })
    }
  }
}
</script>

<style scoped>
.active{
  color: #e0d9c0 !important;
}
.index-content-box{
  position: relative;
  width:calc(80% + 10px);
  margin-top:0px;
  min-height:800px;
  margin-top:5px;
  overflow: hidden;
  margin-left:calc(10% - 5px);
}
.button-to-write{
  margin-top:5px;
  float: right;
  margin-right: 30px;
}
.tab{
  float: left;
  margin-left: 30px;
  margin-right: 80px;
  font-size: 15px;
  line-height: 40px;
}
.tabs{
  position: relative;
  width:calc(80% + 10px);
  margin-top:0px;
  height:40px;
  background: white;
  border:#d1d1d1 solid 1px;
  overflow: hidden;
  margin-left:calc(10% - 5px);
}
.submit-button{
  width:120px;
  position: absolute;
  right:30px;
  top:80px;
}
@media screen and (max-width:1400px){
  .index-content,.tabs,.index-content-box{
    width: 1120px !important;
  }
}
.index-content{
  position: relative;
  width:calc(80% + 14px);
  margin-top:50px;
  overflow: hidden;
  margin-left:calc(10% - 5px);
}
.recommend-button{
  position: absolute;
  width:90px;
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
  color: #d1d1d1;
  font-size: 17px;
  margin-bottom: 25px;
}
.group-title{
  position: relative;
  top:8px;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 20px;
}
.infor-content{
  position: absolute;
  left: 140px;
  width:555px;
  top:10px;
}
.pic-content{
  position: absolute;
  left:10px;
  top:20px;
}
.group-content{
  width: calc(100% - 5px);
  border:#dfdfdf solid 2px;
  background: white;
  position: relative;
  height:150px;
}
</style>
