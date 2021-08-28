<template>
  <div class="response-title">
    <i class="titile-icon el-icon-arrow-left"></i>
    <span>回复提问</span>
  </div>
  <div class="response-content-box">
    <div class="response-content-box-header">提问:</div>
    <div class="response-question-text">
      {{question}}
    </div>
  </div>
  <div class="response-bottom">
    <div class="reponse-header">
      {{'回复@'+username}}
    </div>
    <div class="reponse-input">
      <textarea v-model="response" cols="30" rows="6"></textarea>
    </div>
    <div class="input-icons">
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
      <el-popover
        placement="top"
        :width="400"
        trigger="click"
      >
        <template #reference>
          <span class="chat-icon icon-goimage iconfont-go"></span>
        </template>
        <div class="emoji-box">
          <pic-card @uploadSuccess="uploadSuccess" :urlPic="'/api2/cosPhotoUpload'" set="twitter" ></pic-card>
        </div>
      </el-popover>
      <span class="input-submit">
        <el-button class="submit-button" size="small" plain @click="submit">提交</el-button>
      </span>
    </div >
  </div>
</template>

<script>
import data from "emoji-mart-vue-fast/data/all.json";
import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src";
import "emoji-mart-vue-fast/css/emoji-mart.css";
let emojiIndex = new EmojiIndex(data);
import picCard from '../../common/pic/DoubleCoper.vue'
export default {
  data(){
    return{
    show:false,
    emojiIndex: emojiIndex,
    response:'',
    flag:1,
    pic1:'',
    pic2:'',
    photo:[],
    question:this.$route.query.question,
    username:this.$route.query.username
  }
  },
  components:{
    Picker,
    picCard
},
methods: {
  choice(emoji){
    this.response+=emoji.native;
  },
  uploadSuccess(num,url){
    alert(num+url);
    if(num==1){
      this.pic1=url
    }else if(num==2){
      this.pic2=url
    }
  },
  submit(){
    /*let picArray=[this.pic1,this.pic2];
    let url="/QA";
    url+='?description='+this.desc;
    url+='&id='+this.$store.getters.getId;
    for(let i = 0;i<this.tip.length;i++){
      url+='&label='+this.tip[i];
    }
    for(let i = 0;i<picArray.length;i++){
      url+='&photo='+picArray[i];
    }*/
    //url+='&title='+this.title;
    this.$communityRequest({
          method:'post',
          url:'answer',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            answer:this.response,
            id:this.$store.getters.getId,
            number:this.$route.query.number
          }
        }).then(res=>{
           this.$alert('提交成功','提示',{
            confirmButtonText:'确定'
          });
        }).catch(e=>{
          this.$alert('提交失败','提示',{
            confirmButtonText:'确定'
          });
        })
  },

}
}
</script>

<style scoped>
.input-submit{
  float: right;
  margin-right: 24px;
}
.submit-button{
  width:90px;
}
.icon-goimage{
  font-size: 30px;
  position: relative;
  float: left;
  margin-left:26px;
}
.icon-gosmiling{
  font-size: 25px;
  margin-left:10px;
  float: left;
  position: relative;
  top:2px;
}
.reponse-input textarea{
  border:#d1d1d1 solid 1px;
  font-size: 20px;
  outline:none;
  margin-top:10px;
  width:96%;
  margin-left:2%;
  resize: none;
}
.reponse-header{
  margin-top:5px;
  text-indent: 5px;
  font-weight: 700;
}
.response-bottom{
  position: relative;
}
.response-question-text{
  margin-top:5px;
  width:calc(100% - 100px);
  margin-bottom: 30px;
  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:6;
  overflow:hidden;
  word-break: break-all;
  word-wrap: break-word;
  margin-left:1.2em;
}
.response-content-box-header{
  font-weight: 700;
  text-indent: 1.2em;
}
.response-content-box{
  margin-top:10px;
  height:567px;
  border-bottom: #d1d1d1 solid 1px;;
}
.response-title span{
  text-indent: 1em;
  font-size: 18px;
  font-weight: 700;
}
.response-title i{
  text-indent: 1em;
  font-size: 18px;
  font-weight: 700;
}
.response-title{
  margin-top:10px;
  font-size: 18px;
  font-weight: 700;
}
</style>
