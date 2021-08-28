<template>
  <div class="list">
    <div v-for="(item,index) in list" :key="item" class="element">
      <article-card :index="index" @deleteCard="deleteCard" @favor="favor" @like="like" :number="item.number" :id="item.id" :username="item.username" :createTime="item.createTime" :photo="item.photo" :description="item.description"></article-card>
    </div>
  </div>
</template>

<script>
import articleCard from '../article/ArticleCard.vue'
export default {
  components:{
    articleCard
  },
  data(){
    return{
      list:[],
      type:this.$route.query.type,
      page:1
    }
  },
  methods:{
    tran(type){
      this.list= [];
      this.search(type)
    },
    search(page){
      if(this.type==undefined){
        this.type= 1;
      }
    let time1 = new Date();
    time1.setTime(time1.getTime()-24*60*60*1000);
    let yy =time1.getFullYear();
    let mm = time1.getMonth()+1;
    let dd = time1.getDate();
    let time = yy+'-'+mm+'-'+dd;
    this.$acgRequest({
          method:'get',
          url:'/hotDayCos',
          headers:{
           token:this.$store.getters.getToken
          },
          params: {
            time:time,
            type:this.type
          }
        }).then(res=>{
           this.list= this.list.concat(res.data.data.cosHotList);
        }).catch(e=>{
          this.$alert('服务器连接失败','提示',{
            confirmButtonText:'确定'
          });
        })
    }
  },
  mounted(){
   this.search()
  }
}
</script>

<style scoped>

</style>
