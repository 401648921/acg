<template>
  <div class="message-content-header">
    <span>我的消息</span>
    <span class="input-box">
      <el-input
        placeholder="搜索"
        size="mini"
        prefix-icon="el-icon-search"
        v-model="input2">
      </el-input>
    </span>
  </div>
  <div class="message-box">
    <div class="message-card-list">
      <div class="card-list-header">近期消息</div>
      <el-scrollbar height="710px">
        <div v-for="(item,index) in talkList" :key="item" class="message-element">
          <message-card @deleteCard="deleteCard(index)" @choice="choice1" :id="item.id" :uuid="item.uuid" :username="item.username" :photo="item.photo"></message-card>
        </div>
      </el-scrollbar>
    </div>
    <div class="chat">
      <div class="chat-header">
        {{username}}
      </div>
      <div class="chat-show">
        <div class="super">

        <el-scrollbar height="540px">
        <div v-for="item in talkContent" :key="item">
          <!--<div :class="judgePeople(item.fromId)?'no-other':'other'" class="user">
              <img class="element-img" :src="judgeUser(item.fromId)?myPhoto:otherPhoto"/>
              <div class="element" v-html="getLine(item.message)"></div>
          </div>-->
          <el-popover
            placement="bottom-start"
            :width="40"
            trigger="click"
          >
            <template #reference>
              <div :class="judgePeople(item.fromId)?'no-other':'other'" class="user">
                <img class="element-img" :src="judgeUser(item.fromId)?myPhoto:otherPhoto"/>
                <div class="element" v-html="getLine(item.message)"></div>
              </div>
            </template>
            <div class="chat-button-box">
              <div class="chat-button-one">删除</div>
              <div class="chat-button">转发</div>
            </div>
          </el-popover>

        </div>

      </el-scrollbar>
          <!--<div class="user no-other">
              <img class="element-img" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"/>
              <div class="element" >xxxxx</div>
          </div>
          <div class="user other">
              <img class="element-img" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"/>
              <div class="element" >xxxxx</div>

          </div>
          <div class="user no-other">
              <img class="element-img" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"/>
              <div class="element" >xxxxx</div>
          </div>
          <div class="user other">
              <img class="element-img" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"/>
              <div class="element" >xxxxx</div>

          </div> -->
        </div>
      </div>
      <div class="chat-input-box">
        <div class="chat-input-box-header">
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

          <span class="chat-icon icon-goimage iconfont-go"></span>
        </div>
        <div class="chat-input">
          <textarea v-model="textarea" cols="30" rows="5"></textarea>
        </div>
        <el-button size="mini" plain class="chat-submit" @click="submit">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import data from "emoji-mart-vue-fast/data/all.json";
import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src";
import "emoji-mart-vue-fast/css/emoji-mart.css";
let emojiIndex = new EmojiIndex(data);
import messageCard from './LatelyMessageCard'
export default {
components:{
  messageCard,
  Picker,
},
data(){
  return{
    textarea:'',
    talkList:[],
    emojiIndex: emojiIndex,
    talkContent:[],
    id:'',
    uuid:'',
    photos:[],
    username:'',
    otherPhoto:'',
    myPhoto:this.$store.getters.getPhoto,
    timer:{}
    //socket:this.$parent.socket
  }
},
destroyed () {
  this.$store.commit('SET_CHAT', -1);
  clearInterval(this.timer);

},
  methods:{
    deleteContent(){
      this.$userRequest({
        method:'get',
        url:'/personalInfo',
        params: {
          id:id
        }
      }).then(res=>{
        this.otherPhoto = res.data.data.personalInfo.photo;
      })
    },
    deleteCard(index){
      this.$communityRequest({
        method:'delete',
        url:'/talk',
        params: {
          id:this.$store.getters.getId,
          toId:this.id
        }
      }).then(res=>{
        this.talkList.splice(index,1)
      })
    },
    judgeUser(id){
      //alert(this.myPhoto)
      return this.$store.getters.getId == id;
    },
    submit(){
      //alert(this.$parent.socket)
      //this.$root.send(111)
      function sayContent(fromId, toId, msg, uuid) {
        this.fromId = fromId;// thid.$store.getters
        this.toId= toId;// this.id
        this.msg = msg;
        this.uuid =  uuid;// this.uuid
      }
      let say = new sayContent(this.$store.getters.getId,this.id,this.textarea,this.uuid);
      this.$store.commit('send',JSON.stringify(say));
      //socket.send(say)

      function talkElement(fromId,message) {
        this.fromId = fromId;// thid.$store.getters
        this.message= message;
      }
      this.talkContent.splice(this.talkContent.length,0,new talkElement(this.$store.getters.getId,this.textarea));
      this.textarea = ''
      //this.getPhoto(this.$store.getters.getId,this.talkContent.length - 1);
      //this.$forceUpdate();
    },
    getOtherPhoto(id){
      this.$userRequest({
        method:'get',
        url:'/personalInfo',
        params: {
          id:id
        }
      }).then(res=>{
        this.otherPhoto = res.data.data.personalInfo.photo;
      })
    },
    getPhoto(id,index){
      //alert(111)
      this.$userRequest({
        method:'get',
        url:'/personalInfo',
        params: {
          id:id
        }
      }).then(res=>{
        this.photos.splice(index,0,res.data.data.personalInfo.photo)
      })
    },
    getLine(line){
     return line.replaceAll(' ',"&nbsp;").replaceAll("\n","<br/>&nbsp;");
   },
    getInfo(){
      //alert(11)
      let array = this.$store.getters.getList;
      for(let i =0;i<array.length;i++){
        array[i].uuid = this.uuid;
      }
      this.talkContent = this.talkContent.concat(array);
    },
    choice1(id,uuid,username){
      this.uuid=uuid;
      this.id = id;
      this.$store.commit('SET_CHAT', id)
      this.username = username
      this.getTalk(20,1);
      this.getOtherPhoto(id);
      this.timer = setInterval(this.getInfo, 4000);
    },
    choice(emoji){
      this.textarea +=emoji.native;
    },
    load(number,page){
      this.$communityRequest({
        method:'get',
        url:'/talkList',
        params: {
          cnt:number,
          id:this.$store.getters.getId,
          page:page
        }
      }).then(res=>{
        this.talkList = res.data.data.talkList;
        let flag = true;
        for(let i = 0;i<this.talkList.length;i++){
          //this.getPhoto(this.talkList[i].id,i)
          if(this.talkList[i].id==this.$route.query.id){
            flag = false
          }
        }
        if(this.$route.query.id!=undefined&&flag){
          function User(id,uuid,username,photo) {
            this.id = id;
            this.uuid= uuid;
            this.username = username;
            this.photo= photo;
          }
          let random = '';

          for(let i = 0;i<8;i++){
            random += Math.round(Math.random()*9);
          }
          this.talkList.splice(0,0,new User(this.$route.query.id,random,this.$route.query.username,this.$route.query.photo));
        }
      })

    },
    getTalk(number,page){
      //alert(11155)
      this.$communityRequest({
        method:'get',
        url:'/p2pTalkList',
        params: {
          cnt:number,
          id:this.$store.getters.getId,
          toId:this.id,
          page:page
        }
      }).then(res=>{
        //alert(111)
        this.talkContent = res.data.data.p2pTalkList;
        this.talkContent = this.talkContent.reverse();
      })
    },
    judgePeople(id){
      return id == this.$store.getters.getId;
    }
  },
  mounted(){
    this.load(20,1);
    //this.getTalk(10,1);
    //alert(11)
    for(let i = 0;i<this.talkContent.length;i++){
      this.getPhoto(this.talkContent[i].fromId,i);
      //this.$forceUpdate();
    }


  },
  computed:{

  }
}

</script>

<style scoped>
.chat-button-box div:hover{
  background: #dddddd;
}
.chat-button-one{
  border-bottom: #d1d1d1 solid 1px;
}
.chat-button-box{
  font-size: 18px;
  text-indent:1em;
  line-height: 35px;
}
.message-element{
  border-bottom: #d1d1d1 solid 1px;
}
.super{
  width: 100%;
}
.user{
  position: relative;
  width: 100%;
  min-height: 40px;
  margin-bottom: 50px;
}
.user img{
  width: 35px;
  height: 35px;
  border-radius: 25px;

  top:5px;
  left:5px;
}
.user>div{
  display: inline-block;
  overflow:hidden;
  width: 400px;
  line-height:30px;
  border-radius: 10px;
  border:1px solid ;
  font-size: 20px;
}
.other>.element{
  position: relative;
  left:40px;
  margin-top:5px;
}
.no-other>.element{
  position: relative;
  left:calc(100% - 460px);
  margin-top:5px;
}
.other>.element-img{
  position: absolute;
  left:0px;
}
.no-other>.element-img{
  position: absolute;
  left:calc(100% - 40px);
}
.chat-submit{
  position: absolute;
  left:calc(100% - 90px);
  top:700px;
}
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
.chat-show{
  height:545px;
  border-bottom: #d1d1d1 solid 1px;
  position: relative;
}
.chat-header{
  text-align: center;
  font-size: 18px;
  line-height: 30px;
}
.chat-header{
  height:30px;
  border-bottom: #d1d1d1 solid 1px;
}
.chat{
  position: absolute;
  border: #d1d1d1 solid 2px;
  top:47px;
  width:calc(100% - 300px);
  left:300px;
}
.chat-input textarea{
  border: 0 !important;
  resize: none !important;
  outline: none !important;
  font-size: 20px;
  width:calc(100% - 50px);
}
.card-list-header{
  height: 30px;
  width:300px;
  line-height: 30px;
  background: white;
  border-bottom: #d1d1d1 solid 1px;
}
.message-card-list{
  width:300px;
  margin-right: -30px;;
  margin-left:-10px;
  border: #d1d1d1 solid 1px;
}
.input-box{
  display: inline-block;
  width:300px;
  position: absolute;
  right:30px;
}
.message-box{
  text-indent: 0.3em;

  padding-left:10px;
  background: white;
  height:750px;
}
.message-content-header span{
  margin-left:10px;
}
.message-content-header{
  border: #d1d1d1 solid 1px;
  margin-bottom: 5px;
  height:40px;
  background: white;
  line-height: 40px;
  font-size: 18px;
}
</style>
