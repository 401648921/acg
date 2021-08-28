<template>
  <div class="question-box">
    <div class="question-card">
      <div class="img-card">
        <el-avatar :size="50" :src="photo"></el-avatar>
      </div>
      <div class="top-content">
        <span class="user-name">{{username}}</span>
        <span class="time-content">{{time}}</span>
      </div>
      <div class="question-text" v-html="getLine(description)"></div>
      <div v-show="getCommentShow" class="other-comment">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item  :title="'这条评论一共有'+commentCount+'条回复'" name="1">
            <div class="question-box" v-for="item in list" :key="item">
              <div class="question-card">
                <div class="img-card">
                  <el-avatar :size="50" :src="photo"></el-avatar>
                </div>
                <div class="top-content">
                  <span class="user-name">{{item.username}}</span>
                  <span class="time-content">{{item.createTime.substring(0,10)}}</span>
                </div>
                <div class="question-text" v-html="getLine(item.description)"></div>
                <div class="click-list">

                  <span class="click-element el-icon-edit" @click="toComment(item.number,item.number,item.id,item.username)" ><span class="click-element-text"></span></span>

                  <span class="click-element iconfont-go icon-goaixin1" @click="likeComment(item.number)"><span class="click-element-text"></span></span>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="click-list">

        <span class="click-element el-icon-edit" @click="toComment(undefined,undefined,undefined,username)"><span class="click-element-text">{{count.commentCounts}}</span></span>

        <span class="click-element iconfont-go icon-goaixin1" @click="like" ><span class="click-element-text">{{count.likeCounts}}</span></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    number:{
      type:String,
      default:'111'
    },
    id:{
      type:String,
      default:'111'
    },
    username:{
      type:String,
      default:'111'
    },
    photo:{
      type:String,
      default:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    },
    description:{
      type:String,
      default:'111'
    },
    createTime:{
      type:String,
      default:'111'
    },
    likeCounts:{
      type:Number,
      default:11
    },
    commentCounts:{
      type:Number,
      default:11
    }
  },
  data(){
    return{
      time:this.createTime.substring(0,10),
      commentCount:0,
      list:[],
      commentShow:false,
      commentCount:this.commentCounts,
      likeCount:this.likeCounts,
      count:{},
      commentList:[]
    }
  },
  methods:{
    toComment(fatherNumber,replyNumber,toId,username){
      this.$emit('toComment',fatherNumber,replyNumber,toId,username);
    },
    like(){
      this.$acgRequest({
        method:'post',
        url:'/likeAnswer',
        headers:{
          token:this.$store.getters.getToken
        },
        params: {
          id:this.$store.getters.getId,
          number:this.number
        }
        }).then(res=>{
          this.$alert('服务器连接失败','提示',{
            confirmButtonText:'确定'
          });
        })
    },
     likeComment(number){
      this.$acgRequest({
        method:'post',
        url:'/likeComment',
        headers:{
          token:this.$store.getters.getToken
        },
        params: {
          id:this.$store.getters.getId,
          number:number
        }
        }).then(res=>{
          this.$alert('服务器连接失败','提示',{
            confirmButtonText:'确定'
          });
        })
    },
    getLine(description){
     return description.replaceAll(' ',"&nbsp;").replaceAll("\n","<br/>");
   },
   search(cnt,page,type){
     this.$acgRequest({
        method:'get',
        url:'/answerCommentList',
        headers:{
          token:this.$store.getters.getToken
        },
        params: {
          cnt:cnt,
          id:this.$store.getters.getId,
          answerNumber:this.number,
          page:page,
          type:type
        }
        }).then(res=>{
          this.commentCount = res.data.data.counts;
          this.list =this.list.concat(res.data.data.answerCommentList );
          if(this.list.length != 0){
            this.commentShow = true;
          }
        })
   }
  },
  computed: {
    getCommentShow(){
      return this.commentShow;
    }
 },
 mounted(){
   this.search(6,1,1);
   this.$acgRequest({
      method:'get',
      url:'/qaAnswerCountsList',
      params:{
        numbers:this.number
      },
      headers:{
        token:this.$store.getters.getToken
      },
      }).then(res=>{
        this.count = res.data.data.qaAnswerCountsList[0];
      })
 }
}
</script>

<style scoped>
.other-comment{
  margin-top:10px;
  width:calc(100% - 40px);
  margin-left:30px;
  background: #d1d1d1;
  line-height: 20px !important;
}
.click-list{
  margin-top:20px;
  height:40px;
}
.click-element-text{
  font-size: 15px;
  line-height: 40px;
}
.el-icon-star-on{
  color: orange;
}
.icon-goaixin1{
  color: pink;
}
.click-element{
  font-size: 25px;
  float: right;
  margin-right: 30px;
  line-height: 40px;;
}
.question-text{
  margin-left:70px;
  margin-top:10px;
  width:calc(100% - 100px);
  overflow:hidden;
  word-break: break-all;
  word-wrap: break-word;
}
.time-content{
  font-size: 12px;
  color: #d1d1d1;
  height:40px;
}
.user-name{
  font-size: 16px;
  font-weight: 700;
  margin-right: 20px;;
}
.top-content{
  margin-top:16px;
  margin-left:70px;
}
.question-box{
  position: relative;
  background: white;
}
.img-card{
  position: absolute;
  left:8px;
  top:8px;
}
.question-card{
  width:100%;
  border:#d1d1d1 solid 1px;
  border-radius: 7px;

}
</style>
