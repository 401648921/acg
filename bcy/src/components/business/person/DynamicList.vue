<template>
  <div class="list-box">
    <div  class="element-item" v-for="(item,index) in list" :key="item">
      <article-box :index="index" @deleteCard="deleteCard" @favor="favor" @like="like" :number="item.number" :id="item.id" :username="item.username" :createTime="item.createTime" :photo="item.photo" :description="item.description"></article-box>
    </div>
  </div>
</template>

<script>
import articleBox from '../article/ArticleCard.vue'
export default {
  components:{
    articleBox
  },
  data(){
    return{
      list:[]
    }
  },
  methods: {
    push(number){
        this.$router.push({
          path:'/home/showQuestion',
          query:{
            number:number
          }
        });
      },
    search(cnt,page){
      this.$communityRequest({
          method:'get',
          url:'/cosList',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            cnt:cnt,
            page:page,
            userId:this.$store.getters.getId
          }
        }).then(res=>{
           this.list= this.list.concat(res.data.data.cosUserList);
        }).catch(e=>{
          this.$alert('连接失败','提示',{
            confirmButtonText:'确定'
          });
        })
    },
    like(number,flag){
        if(flag){
          this.$acgRequest({
          method:'post',
          url:'/likeCos',
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
            return;

        })
        }else{
          this.$acgRequest({
          method:'delete',
          url:'/likeCos',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            id:this.$store.getters.getId,
            number:number
          }
        }).then(res=>{

            this.$alert('取消点赞成功','提示',{
              confirmButtonText:'确定'
            });
            return;

        })
        }

    },
    deleteCard(index){
      this.list.splice(index,1);
      //alert(11)
    },
    favor(number,flag){
      if(flag){
         this.$acgRequest({
          method:'post',
          url:'/favorCos',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            id:this.$store.getters.getId,
            number:number
          }
        }).then(res=>{
           if(res.data.msg=="repeatWrong"){
            this.$alert('重复收藏','提示',{
              confirmButtonText:'确定'
            });
            return;
           }
           this.$alert('收藏成功','提示',{
              confirmButtonText:'确定'
            });
        })
      }else{
         this.$acgRequest({
          method:'delete',
          url:'/favorCos',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            id:this.$store.getters.getId,
            number:number
          }
        }).then(res=>{
           if(res.data.msg=="repeatWrong"){
            this.$alert('重复收藏','提示',{
              confirmButtonText:'确定'
            });
            return;
           }
           this.$alert('取消收藏成功','提示',{
              confirmButtonText:'确定'
            });
        })
      }

    }
  },
  mounted(){
    this.search(10,1)
  }
}
</script>

<style scoped>

</style>
