<template>
  <div class="list-header">
    <span class="tab" @click="go('/home/personIndex/questionList')">{{'我收到的问题('+number+')'}}</span>
    <span class="tab active" >待回应问题</span>
  </div>
  <div class="list">
    <div class="element" v-for="item in list" :key="item">
      <question-card v-show="item.answer==undefine" @goResponse="goResponse" :number="item.number" :fromId="item.fromId" :username="item.username" :photo="item.photo" :question="item.question" :createTime="item.createTime"></question-card>
    </div>
  </div>
</template>

<script>
import questionCard from '../question/QuestionNoResponse.vue'
export default {
  components:{
    questionCard
  },
  data(){
    return{
      list:[],
      number:0
    }
  },
  methods: {
    go(path){
      this.$router.push(path)
    },
    search(cnt,page){
       this.$communityRequest({
          method:'get',
          url:'/askList',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            cnt:cnt,
            id:this.$store.getters.getId,
            page:page
          }
        }).then(res=>{
          this.list = this.list.concat(res.data.data.askList);
        })
    },
    goResponse(number,username,question){
      //alert(111)
      this.$router.push({
        path:'/home/personIndex/response',
        query:{
          number:number,
          username:username,
          question:question
        }
      })
    }
  },
  mounted(){
    this.$communityRequest({
          method:'get',
          url:'/waitingAsk',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            cnt:100,
            id:this.$store.getters.getId,
            page:1
          }
        }).then(res=>{
          this.number = res.data.data.waitingAskList.length;
        })
    this.search(10,1)
  }
}
</script>

<style scoped>
.active{
  color: #edd6a4;
}
.element{
  border-bottom:#d1d1d1 solid 1px;
}
.tab{
  margin-left:15px;
  font-size: 16px;
  line-height: 40px;
  margin-right: 60px;
}
@media screen and (max-width:1400px){
  .list-header{
    width: 1120px !important;
  }
}
.list-header{
  height:40px;
  border-bottom: #d1d1d1 solid 1px;
}
</style>
