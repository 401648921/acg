<template>
<div class="comment-content">
  <div class="pic-content">
    <el-avatar shape="circle" :size="70" :src="photo"></el-avatar>
  </div>
  <div class="infor-content">
    <div class="user-name">{{username}}</div>
    <div class="intro-content" v-html="getLine"></div>
    <div v-show="getCommentShow" class="other-comment">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item  :title="'这条评论一共有'+commentCounts+'条回复'" name="1">
          <div v-for="item in list" :key="item" class="comment-content">
            <div class="pic-content">
              <el-avatar shape="circle" :size="70" :src="item.fromPhoto"></el-avatar>
            </div>
            <div class="infor-content">
              <div class="user-name">{{item.fromUsername}}</div>
              <div class="intro-content" v-html="getDescription(item.description,item.toUsername)"></div>
              <div class="other-comment"></div>
              <div class="date-text">{{item.createTime.substring(0,10)}}</div>
            </div>
            <div class="user-operator">
              <span class="user-operator-element user-operator-element-one">
                <i class="iconfont icon-fenxiang"></i>
              </span>
              <span class="user-operator-element">
                <i @click="postComment(number,item.number,item.id,item.fromUsername)" class="iconfont icon-pinglun"></i>
              </span>
              <span class="user-operator-element">
                <i @click="likeComment(item.number)" class="iconfont icon-weibiaoti-"></i>
              </span>
            </div>
          </div>

      </el-collapse-item>
    </el-collapse>
  </div>
    <div class="date-text">{{time}}</div>
  </div>

  <div class="user-operator">
      <span class="user-operator-element user-operator-element-one">
        <i class="iconfont icon-fenxiang"></i>
      </span>
      <span class="user-operator-element">
        <i @click="postComment(number,number,id,username)" class="iconfont icon-pinglun"></i>
      </span>
      <span class="user-operator-element">
        <i @click="likeComment(number)" class="iconfont icon-weibiaoti-"></i>
      </span>

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
      default:'111111111111111111\n1111111111111111111111111111111111111111111111111111111111111111111111111111111111'
    },
    createTime:{
      type:String,
      default:'111'
    },
  },
  data(){
    return{
      time:this.createTime.substring(0,10),
      list:[],
      commentShow:false,
      commentCounts:0
    }
  },
  methods:{
    getComment(cnt,page,type){
      this.$acgRequest({
        method:'get',
        url:'/cosCommentComment',
        headers:{
          token:this.$store.getters.getToken
        },
        params: {
          cnt:cnt,
          id:this.$store.getters.getId,
          number:this.number,
          page:page,
          type:type
        }
        }).then(res=>{
          this.commentCounts = res.data.data.counts;
          this.list =this.list.concat(res.data.data.commentCommentList );
          if(this.list.length != 0){
            this.commentShow = true;
          }
        })
    },
    getDescription(line,toName){

     let string =  line.replaceAll(' ',"&nbsp;").replaceAll("\n","<br/>");
     if(toName!=null){
       string = '<span style="color: #7392d7">'+'回复 '+toName +'</span> ' + string;
     }
     return string
   },
    likeComment(number){
      this.$acgRequest({
        method:'post',
        url:'/likeCosComment',
        headers:{
          token:this.$store.getters.getToken
        },
        params: {
          id:this.$store.getters.getId,
          number:number
        }
        }).then(res=>{
           this.$alert('点赞成功','提示',{
            confirmButtonText:'确定'
          });
        })
    },
    postComment(fatherNumber,replyNumber,toId,username){
      this.$emit('postComment',fatherNumber,replyNumber,toId,username);
    }
  },
  computed: {
   getLine(){
     return this.description.replaceAll(' ',"&nbsp;").replaceAll("\n","<br/>");
   },
   getCommentShow(){
     return this.commentShow;
   }
 },
 mounted(){
   this.getComment(6,1,0);
 }
}

</script>

<style scoped>
.comment-cope{
  color: #7392d7 !important;
}
.el-collapse >>> .el-collapse-item{
  background: #d1d1d1 !important;
}
.other-comment{
  margin-top:10px;
  width:calc(100% - 20px);
  background: #d1d1d1;
  line-height: 20px !important;
}
.user-operator span {
  margin-left:20px;
  color: #d1d1d1;
}
.user-operator{
  position: absolute;
  right: 30px;;
  bottom:10px;
}

.recommend-button{
  position: absolute;
  width:90px;
  font-size: 16px;;
  left:240px;
  top:30px;
}
.date-text{
  color: #a9a9ab;
  position: relative;
  top:5px;
  font-size: 16px;
}
.intro-content{
  position: relative;
  top:5px;
  font-size: 16px;
  margin-bottom: 5px;
  width:calc(100% - 100px);
  overflow: hidden;
   word-break: break-all;
  word-wrap: break-word;
}
.user-name{
  position: relative;
  top:8px;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 5px;
}
.infor-content{
  position: relative;
  left: 100px;
  width:calc(100% - 120px);
  top:0px;
  margin-bottom: 20px;
}
.pic-content{
  position: absolute;
  left:10px;
  top:10px;
}
.comment-content{
  width:100%;
  border:#dfdfdf solid 1px;
  background: white;
  position: relative;
}
</style>
