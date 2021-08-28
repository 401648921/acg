<template>
  <div class="question-form-header">
    <span class="question-form-header-text">发布内容</span>
  </div>
  <div class="question-input">
    <el-input @focus="flag=1" class="question-title-input" v-model="title" placeholder="写下你像与大家讨论的问题"></el-input>
    <div class="diver">
      <el-divider></el-divider>
    </div>
    <textarea @focus="flag=2" v-model="desc" class="question-input-one" cols="30" rows="10"></textarea>
  </div>
  <div class="question-input">
    <el-select
      v-model="tip"
      multiple
      filterable
      allow-create
      popper-class="popper--question"
      class="question-title-input"
      default-first-option
      placeholder="请选择或输入标签"
      @focus="flag=3"
      >
      <el-option
        v-for="item in tips"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    <div class="diver">
      <el-divider></el-divider>
    </div>
    <div class="tag-list">
      <el-row :gutter="20">
        <el-col  v-for="i in tips" :key="i" :span="3"><div class="tag-element" @click="take(i)">{{i}}</div></el-col>
      </el-row>
    </div>
  </div>
  <div class="question-from-bottom">
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

    </div>
    <el-button class="next-button-submit" size="mini" @click="submit">提交</el-button>
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
    title:'',
    desc:'',
    tip:[],
    show:false,
    emojiIndex: emojiIndex,
    flag:1,
    tips:['cos','动漫','写作'],
    pic1:'',
    pic2:'',
    photo:[]
  }
},
components:{
  Picker,
  picCard
},
methods: {

  choice(emoji){
    if(this.flag==1){
      this.title+=emoji.native;
    }else if(this.flag==2){
      this.desc+=emoji.native;
    }else{
      this.tip+=emoji.native;
    }
  },
  take(i){
    if(this.tip[j]==i){
        return;
      }
    this.tip.splice(this.tip.length,0,i);
  },
  uploadSuccess(num,url){
    //alert(num+url);
    if(num==1){
      this.pic1=url
    }else if(num==2){
      this.pic2=url
    }
  },
  submit(){
    let picArray=[this.pic1,this.pic2];
    let url="/QA";
    url+='?description='+this.desc;
    url+='&id='+this.$store.getters.getId;
    for(let i = 0;i<this.tip.length;i++){
      url+='&label='+this.tip[i];
    }
    for(let i = 0;i<picArray.length;i++){
      url+='&photo='+picArray[i];
    }
    url+='&title='+this.title;
    this.$acgRequest({
          method:'post',
          url:url,
          headers:{
            token:this.$store.getters.getToken
          },
          /*params: {
            description:this.desc,
            id:this.$store.getters.getId,
            label:this.tip,
            photo:picArray,
            title:this.title
          },*/
          indices: false
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
.popper--question{
  display: none;
}
.right-tag{
  margin-right: 0px !important;
}
.tag-element{
  margin-right:80px;
  width:60px;
  float: left;
  height:24px;
  text-align: center;
  border:#d1d1d1 solid 1px;
  border-radius: 6px;
  margin-bottom: 30px;
  line-height: 24px;
  font-size: 14px;
}
.show-button-submit{
  width:80px;
  position: absolute;
  margin-top:5px;
  right:130px;
  top:0px;
}
.next-button-submit{
  width:80px;
  position: absolute;
  margin-top:5px;
  right:20px;
  top:0px;
}
.tag-list{
  margin-left:30px;
  width:90%;
  font-size: 20px;
  resize: none;
  border:0px;
  outline: none;
  font-size: 20px;
  height:170px;
}
.question-input-two{
  margin-top:20px;
  margin-left:30px;
  width:90%;
  font-size: 20px;
  resize: none;
  border:0px;
  outline: none;
  font-size: 20px;
  height:400px;
}
.question-input-one{
  margin-left:30px;
  width:90%;
  font-size: 20px;
  resize: none;
  border:0px;
  outline: none;
  font-size: 20px;
  height:400px;
}
.diver{
  margin-left:30px;
  width:90%;
  margin-top:-20px;
}
.question-title-input>>>.el-input__inner{
  border:0px;
}
.question-title-input{
  margin-left:20px;
  width:90%;
  margin-top:20px;
  font-size: 20px;
}
.question-input{
  width:calc(80% + 10px);
  background: white;
  margin-left: calc(10% - 5px);
  border:#d1d1d1 solid 1px;

}
.question-from-bottom{
  position: relative;
  width:calc(80% + 10px);
  height: 40px;
  border:#d1d1d1 solid 1px;
  background: white;
  margin-left: calc(10% - 5px);
}
@media screen and (max-width:1400px){
  .question-form-header,.question-input,.question-from-bottom{
    width: 1120px !important;
  }
}
.question-form-header-text{
  margin-left:10px;
}
.question-form-header{
  width:calc(80% + 10px);
  height: 40px;
  margin-top:50px;
  background: white;
  margin-left: calc(10% - 5px);
  font-size: 20px;
  line-height: 40px;
  border:#d1d1d1 solid 1px;
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
</style>
