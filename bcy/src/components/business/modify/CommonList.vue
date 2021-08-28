<template>
  <div class="list-header">
    常见问题
  </div>
  <div class="list-box">
    <div @click="push('/home/setting/commonQuestionDetail',item.number)" v-for="item in list" :key="item" class="element-box">
      <div class="element">
        <span class="problem-text">{{item.question}}</span>
        <span class="problem-icon el-icon-arrow-right"></span>
      </div>
    </div>
    <div class="to-feedback">
      <span @click="push('/home/setting/feedback')">问题反馈</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    push(path,number){
      this.$router.push({
        path:path,
        query:{
          number:number
        }
      })
    }
  },
  data(){
    return{
      list:[]
    }
  },
  mounted(){
    this.$userRequest({
          method:'get',
          url:'/helpList',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            cnt:10,
            page:1,
            type:0
          }
        }).then(res=>{
          this.list= res.data.data.helpList;

        })
  }
}
</script>

<style scoped>
.to-feedback{
  margin-top:10px;
}
.to-feedback span{
  color: #d1d1d1;
  font-size: 13px;
  margin-left:20px;
}
.list-box{

  border-left:#d1d1d1 solid 1px;
  border-right:#d1d1d1 solid 1px;
}
.list-header{
  text-indent: 1.3em;
  line-height: 40px;
  height:40px;
  color: #d1d1d1;
  border-bottom: #d1d1d1 solid 1px;
  font-size: 16px;
  font-weight: 700;
}
.element-box{
  border-bottom: #d1d1d1 solid 1px;
  height:40px;
}
.problem-text{
  float: left;
  font-size: 17px;
  text-indent: 1em;
  line-height: 40px;
  font-weight: 700;
}
.problem-icon{
  float: right;
  font-size:20px;
  line-height: 40px ;
  margin-right: 20px;
}
</style>
