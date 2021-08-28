<template>
  <div class="feedback-header">
    <span class="header-icon el-icon-arrow-left"></span>
    <span class="header-text" @click="go('/home/setting/commonList')">问题详情</span>
  </div>
  <div class="problem-title">{{help.question}}</div>
  <div class="common-response">
    {{help.answer}}
  </div>
  <div class="user-feedback-header">
    <div class="user-feedback-header-box">你的问题是否被解决</div>
    <div class="feedback-buttons">
       <el-button size="small" class="feedback-button" @click="submit(1)">已解决</el-button>
       <el-button size="small" class="feedback-button" @click="submit(0)">未解决</el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    go(path){
      this.$router.push(path)
    },
    submit(type){
      this.$userRequest({
          method:'post',
          url:'/judgeHelp',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            isSolved:type,
            number:this.$route.query.number
          }
        }).then(res=>{
          this.$alert('已提交解决情况','提示',{
              confirmButtonText:'确定'
            });

        })
    }
  },
  data(){
    return{
      help:{}
    }
  },
  mounted(){
    this.$userRequest({
          method:'get',
          url:'/help',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            number:this.$route.query.number
          }
        }).then(res=>{
          this.help= res.data.data.help;

        })
  }
}
</script>

<style scoped>
.user-feedback-header{
  width:400px;
  left:500px;
  position: relative
}
.feedback-buttons{
  margin-top:20px;
}
.feedback-button{
  margin-left:35px;
  width:80px;
}
.user-feedback-header-box{
  text-indent: 2em;
  font-weight: 700;
  font-size: 18px;
}
.common-response{
  height:300px;
  margin-top:12px;
  width:calc(100% - 100px);
  margin-left:2em;
  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:5;
  overflow:hidden;
  word-break: break-all;
  word-wrap: break-word;
}
.problem-title{
  text-indent: 2em;
  font-size: 18px;
}
.header-text{
  font-weight: 700;
  font-size: 17px;
  color: #d1d1d1;
  line-height: 40px;
  margin-left:6px;
  position: relative;
  top:-3px;
}
.header-icon{
  font-size: 25px;
  line-height: 40px;
}
.feedback-header{
  margin-top:3px;
  margin-left:4px;
}
</style>
