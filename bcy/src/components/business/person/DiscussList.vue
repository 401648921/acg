<template>
  <div class="list">
    <div @click="go(item.number)" v-for="item in allList" :key="item" class="element">
      <question-card @favor="favor" @like="like" :number="item.number" :id="item.id" :username="item.username" :photo="item.photo" :description="item.description" :title="item.title" :label="item.label" :qaPhoto="item.qaPhoto" :createTime="item.createTime"></question-card>
    </div>
  </div>
</template>

<script>
import questionCard from '../question/QuestionPersonCard.vue'
export default {
  components:{
    questionCard
  },
  mounted(){
    this.search(10,1)
  },
  data(){
    return{
      allList:[],
      count:0
    }
  },
  methods: {
    go(number){
      this.$router.push({
        path:'/home/detailQuestion',
        query:{
          number:number
        }
      })
    },
    search(cnt,page){
     this.$esRequest({
          method:'post',
          url:'/searchQa',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            cnt:cnt,
            id:this.$store.getters.getId,
            keyword:this.$route.query.circleName,
            page:page,
          }
        }).then(res=>{
          this.count = res.data.data.counts;

           this.allList =this.allList.concat(res.data.data.qaList);
           for(let i =0;i<this.allList.length;i++){
            //alert(this.allList[i].cosPhoto.substring(1,this.allList[i].cosPhoto.length -1))
            //alert(this.allList[i].label.substring(1,this.allList[i].label.length -1))
            this.allList[i].label = this.allList[i].label.substring(1,this.allList[i].label.length -1).split(',');
            this.allList[i].qaPhoto = this.allList[i].qaPhoto.substring(1,this.allList[i].qaPhoto.length -1).split(',');
           }
        })
  }
  }
}
</script>

<style scoped>

</style>
