<template>
  <div class="user-ban-list">
    <el-scrollbar height="730px">
      <div v-for="(item,index) in list" :key="item" class="message-element">
        <group-card @follow="deteleBlack" :index="index" :buttonText="'取消屏蔽'" :buttonIf="true" :circleName="item.circleName" :photo="item.photo" :description="item.description" :createTime="item.createTime"></group-card>
      </div>
      <el-empty v-show="getLeng" description="暂无拉黑"></el-empty>
    </el-scrollbar>
  </div>
</template>

<script>
import groupCard from '../../common/user/GroupSearchPage.vue'
export default {
  data(){
    return{
      array:[],
      list:[],
      number:0,
    }
  },
  components:{
    groupCard
  },
  mounted(){
    this.search(10,1)
  },
  methods: {
    deteleBlack(circleName,index){
      this.$communityRequest({
          method:'delete',
          url:'/blackCircle',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            circleName:this.list[index].circleName,
            id:this.$store.getters.getId
          }
        }).then(res=>{
           this.list.splice(index,1);
        }).catch(e=>{
          this.$alert('服务器连接失败','提示',{
            confirmButtonText:'确定'
          });
        })
    },
    search(cnt,page){
      //let arr;
      this.$communityRequest({
              method:'get',
              url:'/blackCircleList',
              params: {
                cnt:cnt,
                id:this.$store.getters.getId,
                page:page
              },
              headers:{
                token:this.$store.getters.getToken
              }
            }).then(res=>{
              this.list=res.data.data.blackCircleList;
            })

    }
  },
  computed:{
    getLeng(){
      return this.list.length==0;
    }
  }
}

</script>

<style scoped>
.message-element{
  width:calc(100% - 2px);
}
</style>
