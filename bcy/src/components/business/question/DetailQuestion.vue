<template>
  <div class="content-box">
    <div class="left-box">
      <div class="question-content">
        <div class="tag-content">
          <span v-for="item in qa.label" :key="item" class="tag-element">
            {{item}}
          </span>
        </div>
        <div class="question-title" v-html="getDescription(qa.title)">

        </div>
        <div class="question-infor" v-html="getDescription(qa.description)">

        </div>
        <div class="question-content-bottom">
          <span class="look-number">{{qa.followCounts+'关注'}}</span>
          <span class="response-button">
            <el-button type="info" size="mini"  icon="el-icon-edit" @click="responseShow=true">我也要回答</el-button>
          </span>
        </div>
      </div>
      <div class="mid-content">
        <span class="response-number">
          <i class="response-icon el-icon-chat-dot-square" ></i>
          <span class="response-text"> {{count+'回答'}}</span>
        </span>
        <span class="page-turn">
          <span class="comment-list-order" :class="type==1?'active':''">最新</span>
          <el-divider direction="vertical"></el-divider>
          <span class="comment-list-order" :class="type==2?'active':''">最热</span>
        </span>
      </div>
      <div class="question-list">
        <div class="question-element" v-for="item in list" :key="item">

          <question-card @toComment="toComment" :number="item.number" :id="item.id" username="item.username" :photo="item.photo" :description="item.description" :createTime="item.createTime" ></question-card>
        </div>
      </div>
    </div>
    <div class="box-right">
      <el-button class="submit-button" @click="follow" plain>关注问题</el-button>
    </div>
  </div>
  <el-dialog  v-model="responseShow" :width="850">
  <div class="dio-input-box">
    <textarea placeholder="请输入内容" cols="80" rows="16" v-model="reponse"></textarea>
    <div class="dio-user-input-icon">
      <span class="submit-button">
         <el-button size="small" @click="submitResponse">发送</el-button>
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
          <Picker :data="emojiIndex" set="twitter" @select="choice1"></Picker>
        </div>
      </el-popover>
      <el-popover
        placement="top"
        :width="400"
        trigger="click"
      >
        <template #reference>
          <span class="chat-icon icon-goimage iconfont-go"></span>
        </template>
        <div class="emoji-box">
          <pic-card @uploadSuccess="uploadSuccess" :urlPic="'/api2/photoUpload'" set="twitter" ></pic-card>
        </div>
      </el-popover>
    </div>
  </div>
</el-dialog>
<el-dialog v-model="replyShow" :width="850">
  <div class="dio-input-box">
    <textarea :placeholder="responseUser" cols="80" rows="16" v-model="reply"></textarea>
    <div class="dio-user-input-icon">
      <span class="dio-submit-button">
         <el-button size="small" @click="submitComment">发送</el-button>
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
          <Picker :data="emojiIndex" set="twitter" @select="choice2"></Picker>
        </div>
      </el-popover>

    </div>
  </div>
</el-dialog>
</template>

<script>
import questionCard from '../question/QuestionCard'
import data from "emoji-mart-vue-fast/data/all.json";
import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src";
import "emoji-mart-vue-fast/css/emoji-mart.css";
let emojiIndex = new EmojiIndex(data);
import picCard from '../../common/pic/DoubleCoper.vue'
export default {

data(){
  return{
    number:this.$route.query.number,
    list:[],
    commentCount:[],
    qa:{},
    type:1,
    count:0,
    responseShow:false,
    replyShow:false,
    emojiIndex: emojiIndex,
    responseUser:'请输入内容',
    pic1:'',
    pic2:'',
    reponse:'',
    reply:'',
    fatherNumber:'',
    replyNumber:'',
    toId:''
  }
},
components:{
  Picker,
  picCard,
  questionCard
},
methods:{
  toComment(fatherNumber,replyNumber,toId,username){
    this.fatherNumber = fatherNumber;
    this.replyNumber = replyNumber;
    this.toId = toId,
    //this.responseUser = '回复@ '+username;
    this.replyShow = true;
  },
  submitComment(){
    this.$acgRequest({
      method:'post',
      url:'/answerComment',
      headers:{
        token:this.$store.getters.getToken
      },
      params:{
        answerNumber:this.$route.query.number,
        description:this.reply,
        fatherNumber:this.fatherNumber,
        id:this.$store.getters.getId,
        replyNumber:this.replyNumber,
        toId:this.toId
      }
    }).then(res=>{
      this.$alert('回复成功','提示',{
        confirmButtonText:'确定'
      });
      this.$router.go(0);
    })
  },
  submitResponse(){
    let string  = '?';
    string += 'description='+this.reponse;
    string += '&id='+this.$store.getters.getId;
    string += '&number='+this.$route.query.number;
    if(this.pic1!=''){
      string += '&photo='+this.pic1;
    }
    if(this.pic2!=''){
      string += '&photo='+this.pic2;
    }
    this.$acgRequest({
      method:'post',
      url:'/addAnswer'+string,
      headers:{
        token:this.$store.getters.getToken
      },
    }).then(res=>{
      this.$alert('提交成功','提示',{
        confirmButtonText:'确定'
      });
    })
  },
  uploadSuccess(num,url){
    //alert(num+url);
    if(num==1){
      this.pic1=url
    }else if(num==2){
      this.pic2=url
    }
  },
  search(cnt,page,type){
    this.$acgRequest({
      method:'get',
      url:'/qaTopic',
      headers:{
        token:this.$store.getters.getToken
      },
      params: {
        id:this.$store.getters.getId,
        number:this.$route.query.number
      }
    }).then(res=>{
        this.qa = res.data.data.QATopic;

        this.$acgRequest({
          method:'get',
          url:'/answerList',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            number:this.$route.query.number,
            cnt:cnt,
            id:this.$store.getters.getId,
            page:page,
            type:type
          }
        }).then(res=>{
            this.count = res.data.data.counts;
            this.list = this.list.concat(res.data.data.answerList);
            let string = '?'
            for(let i = 0;i<this.list.length;i++){
              string+='numbers='+this.list[i].number+'&'
            }
            string  = string.substring(0,string.length - 1);
            /*if(this.list.length!=0){
              this.$acgRequest({
                method:'get',
                url:'/qaAnswerCountsList'+string,
                headers:{
                  token:this.$store.getters.getToken
                },
              }).then(res=>{
                this.commentCount = res.data.data.qaAnswerCountsList;
                //alert(this.commentCount[0].likeCounts)
              })
            }*/

        })
    }).catch(e=>{
      this.$alert('服务器连接失败','提示',{
        confirmButtonText:'确定'
      });
    })
  },
  getDescription(line){
    if(line==undefined) return ''
     return  line.replaceAll(' ',"&nbsp;").replaceAll("\n","<br/>");

   },
   choice1(emoji){
     this.reponse+=emoji.native
   },
   choice2(emoji){
    this.reply+=emoji.native
   },
   follow(){
     this.$acgRequest({
        method:'post',
        url:'/followQA',
        headers:{
          token:this.$store.getters.getToken
        },
        params: {
          id:this.$store.getters.getId,
          number:this.$route.query.number
        }
      }).then(res=>{
        this.$alert('关注成功','提示',{
            confirmButtonText:'确定'
          });
      })
   }
},
mounted(){
  //alert(111)
   this.search(6,1,1)

},
computed:{
  getLike(index){
    if(this.commentCount.length==0){
      return 0
    }
    //alert(this.commentCount[index].likeCounts)
    return this.commentCount[index].likeCounts;
  },
  getCommentCounts(index){
    if(this.commentCount.length==0){
      return 0
    }
    return this.commentCount[index].commentCount;
  },
}
}
</script>

<style scoped>
.icon-goimage{
  font-size: 30px;
  line-height: 40px;
  float:left;
  margin-right: 10px;
}
.icon-gosmiling{
  font-size: 25px;
  line-height: 40px;
  float:left;
  margin-right: 20px;
  margin-left:10px;
}
.chat-input-box-header{
  height:40px;
}
.dio-submit-button{
  float: right;
  margin-right: 35px;
}
.dio-chat-icon{
  font-size: 25px;
  line-height: 32px;
  margin-right: 10px;
  float: right;
}
.dio-input-box textarea{
  background: #f5f5f5;
  outline: none;
  font-size: 18px;
  margin-left:20px;
  margin-top:20px;
}
.dio-input-box{
  position: relative;
  width:800px;
  height:400px;
}
.active{
  font-weight: 700;
}
.question-list{
  width:1100px;
  margin-top:5px;
}
.page-turn{
  font-size: 16px;
  line-height: 40px;
  float:right;
  margin-right: 20px;
}
.response-text{
  margin-left:-3px;
}
.response-icon{
  font-size: 20px;
  position: relative;
  top:2px;
  margin-right: 10px;
}
.response-number{
  float: left;
  margin-left: 15px;
  line-height: 40px;
}
.mid-content{
  margin-top:5px;
  width:1098px;
  height:40px;
  border:#d1d1d1 solid 2px;
}
.response-button{
  width:100px;
  float:right;
  margin-right: 30px;
}
.look-number{
  line-height: 35px;
  color: #d1d1d1;
  font-size: 14px;
  margin-left:10px;
}
.question-content-bottom{
  height:35px;

}
.question-infor{
  width:800px;
  text-indent:1em;
  margin-bottom: 30px;
  margin-top:10px;
  word-break: break-all;
  word-wrap: break-word;
}
.question-title{
  text-indent:1em;
  font-weight: 600;
  font-size: 18px;;

}
.tag-element{
  width:60px;
  text-align: center;
  height:26px;
  line-height: 26px;
  border-radius: 8px;
  font-size: 14px;
  color: #d1d1d1;
  float: left;
  border:#b1b1b1 solid 1px;
  margin-left:20px;
}
.tag-content{
  margin-top:10px;
  height:40px;
}
.question-content{
  border: #d1d1d1 solid 2px;
}
.content-box{
  margin-top:60px;
  width:100%;
}
.box-right{
  position: absolute;
  left:calc(10% + 1120px);
  top:60px;
}
.submit-button{
 width:200px;
}
.left-box{
  margin-left:10%;
  width:1100px;
}
@media screen and (max-width:1400px){

}
</style>
