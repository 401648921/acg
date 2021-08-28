<template>
  <div class="list-content">
    <div class="list-title">
      <span class="list-cab " @click="go('/home/personIndex/followList')">关注</span>
      <span class="list-cab active">粉丝</span>
    </div>
    <div v-for="item in list" :key="item" class="card-element">
      <fan-card :id="item.id" @follow="follow" :userName="item.username" :fansNumber="item.fansCounts" :photo="item.photo"></fan-card>
    </div>
    <el-empty v-show="list.length == 0" description="暂无粉丝"></el-empty>
  </div>
</template>

<script>
import fanCard from '../../common/user/UserPage.vue'
export default {
  data(){
    return{
      list:[]
    }
  },
  components:{
    fanCard
  },
  mounted () {
    this.save(10,1)
  },
  methods:{
    go(path){
      this.$router.push(path)
    },
    save(cnt,page){
      this.$userRequest({
          method:'get',
          url:'/fansList',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            cnt:cnt,
            id:this.$store.getters.getId,
            page:page
          }
        }).then(res=>{
           this.list = this.list.concat(res.data.data.fansList)
        }).catch(e=>{
          this.$alert('服务器连接失败','提示',{
            confirmButtonText:'确定'
          });
        })
    },
    follow(id){
      this.$userRequest({
          method:'post',
          url:'/follow',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            fromId:this.$store.getters.getId,
            toId:id
          }
        }).then(res=>{
           this.$alert('互粉成功','提示',{
            confirmButtonText:'确定'
          });
        }).catch(e=>{
          this.$alert('服务器连接失败','提示',{
            confirmButtonText:'确定'
          });
        })
    }
  }
}
</script>

<style scoped>
.active{
  color: #edd6a4;
}
.list-title{
  background: white;
  height:30px;
}
.list-cab{
  margin-left:20px;
  margin-right: 40px;
  line-height: 30px;
}
</style>
