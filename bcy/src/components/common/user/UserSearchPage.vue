<template>
<div class="user-page-content">
  <div @click="go" class="pic-content">
    <el-image @click="show"
      style="width: 70px; height: 70px"
      :src="userPhoto"
      :fit="fit"></el-image>
  </div>
  <div class="infor-content">
    <div class="user-name">{{username}}</div>
    <div @click="show" class="people-number">{{'粉丝数:'+userFansNumber}}</div>
  </div>
  <el-button @click="follow" v-show="showButton"  icon="el-icon-plus" size="mini" class="recommend-button" type="warning" plain round> {{userButtonText}}</el-button>
</div>
</template>

<script>
export default {
 props:{
    id:{
      default:'nitian',
      type:String
    },
    buttonIf:{
      default:true,
      type:Boolean
    },
    buttonText:{
      default:'关注',
      type:String
    },
    fansNumber:{
      default:10,
      type:Number
    },
    username:{
      default:'didi',
      type:String
    },
    photo:{
      default:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      type:String
    }
  },
  data(){
    return{
      userId:this.id,
      userbuttonIf:this.buttonIf,
      userButtonText:this.buttonText,
      userFansNumber:this.fansNumber,
      name:this.username,
      userPhoto:this.photo
    }
  },
  methods: {
    go(){
      this.$router.push({
        path:'/home/otherPersonIndex',
        query:{
          id:this.id
        }
      })
    },
    show(){
      //alert(this.userbuttonIf)
    },
    follow(){
      this.$emit('follow',this.id,this.userButtonText);
       if(this.userButtonText == '关注'){
        this.userButtonText = '取消关注';
      }else{
        this.userButtonText = '关注';
      }
    }
  },
  mounted () {
    this.$communityRequest({
          method:'get',
          url:'/othersInfo',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            id:this.id
          }
        }).then(resp=>{
          this.userFansNumber = resp.data.data.userInfo.fansCounts;
        }).catch(function(error){
          alert(error.url);
        })

        this.$userRequest({
          method:'post',
          url:'/judgeFollow',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            fromId:this.$store.getters.getId,
            toId:this.userId
          }
        }).then(resp=>{
            if(resp.data.data.status==1){
              this.userButtonText = '取消关注';
            }else{
              this.userButtonText = '关注';
            }
        }).catch(function(error){
          alert(error.url);
        })
  },
  computed:{
    showButton(){
      return this.userbuttonIf;
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
  position:relative;
  left: 100px;
  width:655px;
  top:0px;
}
.pic-content{
  position: absolute;
  left:10px;
  top:10px;
}
.user-page-content{
  width:100%;
  background: white;
  position: relative;
  height:90px;
}
</style>
