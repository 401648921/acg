<template>
<div class="box-content">
<div class="main-content">
  <div class="text-content-box">
    <text-content :id="cos.id" :createTime="cos.createTime" :label="cos.label" :description="cos.description"></text-content>
  </div>
  <div class="comment-box">
    <div style="margin: 20px 0;"></div>
      <el-input class="conment-input"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        :placeholder="responseUser"
        v-model="description">
      </el-input>
      <div class="user-input-contro">
      <span class="user-input-submit "><el-button size="mini" plain @click="submitComment(fatherNumber,replyNumber,toId)">评论</el-button></span>

      <span class="user-input-icon2 icon-gosmiling iconfont-go"></span>
      <span class="user-input-icon1 icon-goimage iconfont-go"></span>
    </div>
    <div class="comment-list">
      <div class="comment-list-title">
        <span class="comment-list-title-text">{{'共'+count+'条评论'}}</span>
        <span class="comment-list-orders">
          <span class="comment-list-order" @click="change(0)" :class="type==0?'active':''">最新</span>
          <el-divider direction="vertical"></el-divider>
          <span class="comment-list-order" @click="change(1)" :class="type==1?'active':''">最热</span>
        </span>
      </div>
      <div class="comment-list-box">
        <div class="coment-element" v-for="item in list" :key="item">
          <comment @postComment="postComment" :number="item.number" :id="item.id" :photo="item.photo" :description="item.description" :createTime="item.createTime"></comment>
        </div>
      </div>
    </div>
    </div>

  </div>
<div class="user-content">
    <user-page class="user-page" :id="cos.id" :userName="cos.username" :photo="cos.photo" :fansCounts="cos.Counts"></user-page>
    <div class="user-operator">
      <span class="user-operator-element user-operator-element-one">
        <i class="iconfont icon-weibiaoti-"></i>
        <span class="user-operator-text">{{counts.fansCounts}}</span>
      </span>
      <span class="user-operator-element">
        <i class="iconfont icon-shoucang"></i>
        <span class="user-operator-text">{{counts.followCounts}}</span>
      </span>
      <span class="user-operator-element">
        <i class="iconfont icon-fenxiang"></i>
        <span class="user-operator-text">{{counts.momentCounts}}</span>
      </span>
    </div>

  </div>
  </div>
</template>

<script>
import textContent from '../text/TextContent.vue'
import comment from '../../common/user/Comment'
import UserPage from '../../common/user/UserPage.vue'
export default {
  components: { textContent, UserPage,comment },
  data(){
    return{
      description:'',
      cos:{},
      count:2,
      counts:{},
      list:[],
      fatherNumber:0,
      replyNumber:0,
      toId:0,
      type:0,
      responseUser:'请输入内容'
    }
  },
  methods: {
    getComment(cnt,page,type){
      this.$acgRequest({
        method:'get',
        url:'/cosComment',
        headers:{
          token:this.$store.getters.getToken
        },
        params: {
          cnt:cnt,
          id:this.$store.getters.getId,
          number:this.$route.query.number,
          page:page,
          type:type
        }
        }).then(res=>{
          this.list =this.list.concat(res.data.data.cosCommentList )
        })
    },
    submitComment(fatherNumber,relyNumber,toId){
      //alert(111)
      this.$acgRequest({
        method:'post',
        url:'/cosComment',
        headers:{
          token:this.$store.getters.getToken
        },
        params: {
          cosNumber:this.$route.query.number,
          description:this.description,
          fatherNumber:fatherNumber,
          id:this.$store.getters.getId,
          relyNumber:relyNumber,
          toId:toId
        }
        }).then(res=>{
          this.change(this.type);
          this.$router.go(0)
        })
    },
    change(type){
      if(type==this.type){
        return;
      }
      this.type = type;
      this.list = [];
      this.getComment(6,1,this.type);
    },
    postComment(fatherNumber,replyNumber,toId,username){
      this.fatherNumber = fatherNumber;
      this.replyNumber = replyNumber;
      this.toId = toId;
      this.responseUser='@回复 '+username
    }
  },
  mounted(){
     this.$acgRequest({
          method:'get',
          url:'/cos',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
             number:this.$route.query.number,
             id:this.$store.getters.getId
          }
        }).then(res=>{
           this.cos = res.data.data.cos;
           this.$userRequest({
              method:'get',
              url:'/userCounts',
              headers:{
                token:this.$store.getters.getToken
              },
              params: {
                userId:this.cos.id
              }
            }).then(res=>{
              this.counts = res.data.data.userCountsList[0];
            })
        })
        this.$acgRequest({
          method:'get',
          url:'/cosCommentCountsList',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
             number:this.$route.query.number,
             id:this.$store.getters.getId
          }
        }).then(res=>{
           this.count = res.data.data.cosCommentCountsList[0].likeCounts;
           if(this.count==null){
             this.count = 0;
           }
        }).catch(e=>{
          this.$alert('邮件失败','提示',{
            confirmButtonText:'确定'
          });
        })
        this.getComment(6,1,this.type)

  }
}
</script>

<style scoped>
.active{
  font-weight: 700;
}
.user-operator-text{
  display: inline-block;
  width:30px;
  text-align: center;
}
.comment-list-box{
  margin-left:2%;
  margin-bottom: 20px;;
}
.comment-list-orders{
  float:right;
  margin-right: 10px;
}
.comment-list-title-text{
  margin-left: 20px;
  float: left;
}
.comment-list-title{
  height:40px;
  border:#d1d1d1 solid 1px;
  width:95%;
  left:2%;
  position: relative;
  line-height: 40px;
  margin-bottom: 20px;;
}
.user-input-submit{
  float: right;
  margin-right: 30px;
}
.user-input-icon2{
  font-size: 20px;
  line-height: 40px;
  float: right;
   margin-right: 10px;
   position: relative;
  top:-4px;
}
.user-input-icon1{
  font-size: 25px;
  line-height: 40px;
  position: relative;
  top:-4px;
  margin-right: 10px;
  float: right;
}
.user-input-contro{
  height:40px;
}
.conment-input{
  width:95%;
  left:2%;
  position: relative;
  margin-bottom: 10px;
}
.comment-box{
  position: relative;
  border: #d1d1d1 solid 2px;
  background: white;
  padding-top:20px;
  width:100%;
  margin-top:10px;
}
.user-page{
  margin-left:3px;
}
.icon-weibiaoti-{
  color: pink;
}
.icon-shoucang{
  color: orange;
}
.user-operator-element-one{
  margin-left: 50px !important;
}
.user-operator-element{
  margin-left: 60px;
}
.user-operator{
  border:#dfdfdf solid 2px;
  width:calc(100% - 2px);
  height:40px;
  background: white;
  margin-left:3px;
  line-height: 40px;
  font-size: 18px;
}

.box-content{
  width:1500px;
  margin-left:9.6%;
  margin-top:60px;
}
.user-content{
  float: left;
  width: 350px;
}
.main-content{
  float: left;
}

@media screen and (max-width:1400px){
    .nav-content{
        width:1120px !important;
    }
}
</style>
