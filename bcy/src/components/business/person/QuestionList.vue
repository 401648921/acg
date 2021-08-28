<template>
  <div class="list-header">
    <span class="tab active">{{'我收到的问题('+list.length+')'}}</span>
    <span class="tab" @click="go('/home/personIndex/waitResponseList')">待回应问题</span>
  </div>
  <div class="list">
    <div  class="element" v-for="item in list" :key="item">
      <question-card :number="item.number" :fromId="fromId" :username="item.username" :photo="item.photo" :question="item.question" :createTime="item.createTime"></question-card>
    </div>
  </div>
</template>

<script>
import questionCard from '../question/MyQuestion'
export default {
  components:{
    questionCard
  },
  methods: {
    go(path){
      this.$router.push(path)
      //alert(this.$route.path)
    },
    search(cnt,page){
       this.$communityRequest({
          method:'get',
          url:'/waitingAsk',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            cnt:cnt,
            id:this.$store.getters.getId,
            page:page
          }
        }).then(res=>{
          this.list = this.list.concat(res.data.data.waitingAskList);
        })
    }
  },
  mounted(){
    this.search(10,1)
  },
  data(){
    return{
      list:[]
    }
  },

}
</script>

<style scoped>
.active{
  color: #ecd291;
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
