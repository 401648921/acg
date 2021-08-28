<template>
  <div class="list">
    <div @click="push(item.number)" v-for="item in allList" :key="item" class="element">
      <article-card  :deleteShow="false" :number="item.number" :id="item.id" :username="item.username" :photo="item.photo" :description="item.description" :label="item.label" :cosPhoto="item.cosPhoto" :createTime="item.createTime"></article-card>
    </div>
  </div>
</template>

<script>
import articleCard from '../article/ArticleCard.vue'
export default {
  data(){
    return{
      allList:[],
      count:0,
    }
  },
  components:{
    articleCard
  },
  methods:{
    push(number){
        this.$router.push({
          path:'/home/showQuestion',
          query:{
            number:number
          }
        });
      },
    search(cnt,page){
     this.$esRequest({
          method:'get',
          url:'/labelCos',
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

           this.allList =this.allList.concat(res.data.data.cosList);
           for(let i =0;i<this.allList.length;i++){
            //alert(this.allList[i].cosPhoto.substring(1,this.allList[i].cosPhoto.length -1))
            //alert(this.allList[i].label.substring(1,this.allList[i].label.length -1))
            this.allList[i].label = this.allList[i].label.substring(1,this.allList[i].label.length -1).split(',');
            this.allList[i].cosPhoto = this.allList[i].cosPhoto.substring(1,this.allList[i].cosPhoto.length -1).split(',');
           }
        })
  }
  },
  mounted(){
    this.search(8,1)
  }
}
</script>

<style scoped>
.element{
  background: white;
}
</style>
