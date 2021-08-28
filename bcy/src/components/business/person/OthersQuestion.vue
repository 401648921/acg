<template>
  <div class="person-index-header">
    <img class="user-card-img" src="../../../assets/otherUser.jpg" alt="">
    <div class="user-card-box">
      <user-card :id="id"></user-card>
    </div>
    <div class="buttons-box">
      <div class="button-submit">
        <i v-if="buttonText == '关注'" class="button-icon iconfont-go icon-gojiahao"></i>
        <span @click="follow" class="button-text">{{buttonText}}</span>
      </div>
      <div class="button-submit">
        <i class="button-icon1 el-icon-chat-dot-square"></i>
        <span class="button-text" @click="toChat()">发私信</span>
      </div>
      <div class="button-submit">
        <i class="button-icon"></i>
        <span class="button-text" @click=" centerDialogVisible= true">向他提问</span>
      </div>
    </div>
  </div>
  <div class="jump-tabs">
    <div class="jump-tab">{{'我收到的问题('+getCount+')'}}</div>
    <!--<div class="jump-tab">待回应的问题</div>-->
    <div class="jump-button">
       <el-button size="mini" type="primary" round @click="dialogFormVisible=true" >向他提问</el-button>

    </div>
  </div>
  <div class="person-page-content">
    <div class="element" v-for="item in list" :key="item">
      <question-card :number="item.number" :fromId="fromId" :username="item.username" :photo="item.photo" :question="item.question" :createTime="item.createTime"></question-card>
    </div>
  </div>
  <el-dialog width="850px" height="430px" v-model="dialogFormVisible">
    <div class="input-box">
      <textarea placeholder="请输入你想反馈的内容" cols="80" rows="16"></textarea>
      <div class="user-input-icon">
        <span class="submit-button">
          <el-button size="small">发送</el-button>
        </span>
        <span class="chat-icon icon-gosmiling iconfont-go"></span>
      </div>
    </div>
  </el-dialog>
  <div class="user-card">
    <user-infor :id="id"></user-infor>
    <div class="banOrCom">
      <span @click="toBlack">屏蔽该用户</span>
      <span>举报该用户</span>
    </div>
  </div>
  <el-dialog
    v-model="centerDialogVisible"
    width="850px"
    center>
   <div class="input-box">
    <textarea placeholder="请输入你想反馈的内容" cols="80" rows="16" v-model="description"></textarea>
    <div class="user-input-icon">
      <span class="submit-button">
         <el-button size="small" @click="submit">发送</el-button>
       </span>
       <el-popover
        placement="top"
        :width="400"
        trigger="click"
      >
        <template #reference>
          <span class="chat-icon icon-gosmiling iconfont-go"></span>
        </template>
        <div class="emoji-box">
          <Picker :data="emojiIndex" set="twitter" @select="choice"></Picker>
        </div>
      </el-popover>

    </div>
  </div>
  </el-dialog>
</template>

<script>
import data from "emoji-mart-vue-fast/data/all.json";
import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src";
import "emoji-mart-vue-fast/css/emoji-mart.css";
let emojiIndex = new EmojiIndex(data);
import userCard from '../../common/user/UserCard'
import questionCard from '../../business/question/MyQuestion'
import userInfor from '../person/UserCard.vue'
export default {
  components:{
    questionCard,
    userInfor,
    userCard,
    Picker
  },
  data(){
    return{
      dialogFormVisible:false,
      id:this.$route.query.id,
      buttonText:'关注',
      centerDialogVisible:false,
      emojiIndex: emojiIndex,
      description:'',
      list:[]
    }
  },
  computed:{
    getCount(){
      return this.list.length
    }
  },
  mounted(){
    this.search(10,1);
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
          if(res.data.data.status==0){
            this.buttonText = '关注'
          }else{
            this.buttonText = '取消关注'
          }
        })
  },
  methods:{
    toChat(){
      this.$userRequest({
          method:'get',
          url:'/personalInfo',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            id:this.$route.query.id
          }
        }).then(res=>{
          //this.name = res.data.data.personalInfo.photo;
          this.$router.push({
            path:'/home/message/messages',
            query:{
              id:this.$route.query.id,
              photo:res.data.data.personalInfo.photo,
              username:res.data.data.personalInfo.username
            }
          })
        })

    },
    toBlack(){
      this.$communityRequest({
          method:'post',
          url:'/black',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            blackId:this.$route.query.id,
            id:this.$store.getters.getId
          }
        }).then(res=>{
           if(res.data.msg=='success'){
             this.$alert('拉黑成功','提示',{
              confirmButtonText:'确定'
            });
           }else if(res.data.msg=='repeatWrong'){
             this.$alert('你已经拉黑过','提示',{
              confirmButtonText:'确定'
            });
           }
        }).catch(e=>{
          this.$alert('连接失败','提示',{
            confirmButtonText:'确定'
          });
        })
    },
    go(){
      this.$router.push({
        path:'/home/otherPersonIndex',
        query:{
          id:this.$route.query.id
        }
      })
    },
    search(cnt,page){
       this.$communityRequest({
          method:'get',
          url:'/waitingAsk',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            cnt:cnt,
            id:this.$route.query.id,
            page:page
          }
        }).then(res=>{
          this.list = this.list.concat(res.data.data.waitingAskList);
        })
    },
    choice(emoji){
      this.description+=emoji.native;
    },
    submit(){
      //alert(1111)
      this.$communityRequest({
          method:'post',
          url:'/ask',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            fromId:this.$store.getters.getId,
            question:this.description,
            toId:this.id
          }
        }).then(res=>{
          this.description='';
           this.$alert('问题已发送','提示',{
            confirmButtonText:'确定'
          });
          this.centerDialogVisible=false;
          this.$router.go(0)
        }).catch(e=>{
          this.$alert('问题发送失败','提示',{
            confirmButtonText:'确定'
          });
        })
    },
    follow(){
      this.$userRequest({
          method:this.buttonText == '关注'?'delete':'post',
          url:'/follow',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            fromId:this.$store.getters.getId,
            toId:this.id
          }
        }).then(res=>{
          if(this.buttonText != '关注'){
            this.buttonText = '关注'
          }else{
            this.buttonText = '取消关注'
          }
        })
    }
  }

}
</script>

<style scoped>
.button-text{
  line-height: 30px;
  margin-left:5px;
}
.button-icon{
  line-height: 30px;
  margin-left:10px;
  width:20px;
}
.button-icon1{
  font-size: 21px;
  line-height: 30px;
  margin-left:10px;
  width:20px;
}
.button-submit{
  float: left;
  margin-left:10px;
  width:100px;
  height:30px;
  border:white solid 2px;
  border-radius: 10px;
  color: white;
}
.buttons-box{
  position: absolute;
  right:40px;
  top:250px;
}
.banOrCom span{
  margin-right:20px;
  font-size: 14px;
  color: #d1d1d1;
}
.banOrCom{
  margin-top:10px;
}
.user-card{
  position: absolute;
  height:830px;
  width:calc(20% - 6px);
  left:calc(70% + 10px);
  top:403px;
}
.submit-button{
  float: right;
  margin-right: 35px;
}
.chat-icon{
  font-size: 25px;
  line-height: 32px;
  margin-right: 10px;
  float: right;
}
.input-box textarea{
  background: #f5f5f5;
  outline: none;
  font-size: 18px;
  margin-left:20px;
  margin-top:20px;
}
.input-box{
  position: relative;
  width:800px;
  height:400px;
}
.jump-button{
  float: right;
  margin-right: 20px;
  margin-top:5px;
}
.element{
  background: white;
}
.person-page-content{
  position: relative;
  height:830px;
  width:calc(60% + 10px);
  margin-left:calc(10% - 5px);
  background:white;
  margin-top:5px;
  border:#d1d1d1 solid 1px;
}
.jump-tabs{
  height:40px;
  width:calc(80% + 10px);
  margin-left:calc(10% - 5px);
  background:white;
  margin-top:5px;
  border:#d1d1d1 solid 1px;
}
.jump-tab{
  float: left;
  margin-left:20px;
  line-height: 40px;
  margin-right: 50px;;
}
.user-card-box{
  position: absolute;
  left:3px;
  top:180px;
  z-index: 10;
}
@media screen and (max-width:1400px){
  .person-index-header,.jump-tabs{
    width: 1120px !important;
  }
  .user-card{
    width:284px;
    left:calc(10% + 850px) !important;
  }
}
@media screen and (max-width:1400px){
  .person-page-content{
    width: 840px !important;
  }
}
.user-card-img{
  width:1540px;
  position: absolute;
  top:-120px;
  left:0px;
}
.person-index-header{
  position: relative;
  width:calc(80% + 10px);
  margin-top:50px;
  height:300px;
  overflow: hidden;
  margin-left:calc(10% - 5px);
}
</style>
