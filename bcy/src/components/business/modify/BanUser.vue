<template>
  <div class="user-ban-list">
    <el-scrollbar height="730px">
      <div v-for="(item,index) in list" :key="item" class="message-element">
        <user-card @follow="deteleBlack(index)" :buttonText="'取消屏蔽'" :fansNumber="array[index]" :userName="item.username"></user-card>
      </div>
      <el-empty v-show="getLeng"  description="暂无拉黑"></el-empty>
    </el-scrollbar>
  </div>
</template>

<script>
import userCard from '../../common/user/UserPage.vue'
export default {
  data(){
    return{
      array:[],
      list:[],
      number:0,
    }
  },
  components:{
    userCard
  },
  mounted(){
    this.search(10,1)
  },
  methods: {
    deteleBlack(index){
      this.$communityRequest({
          method:'delete',
          url:'/black',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            blackId:this.list[index].id,
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
              url:'/blackList',
              params: {
                cnt:cnt,
                id:this.$store.getters.getId,
                page:page
              },
              headers:{
                token:this.$store.getters.getToken
              }
            }).then(res=>{
              this.list=res.data.data.blackList;
              for(let i=0;i<this.list.length;i++){
                this.$communityRequest({
                  method:'get',
                  url:'/othersInfo',
                  params: {
                    id:this.list[i].id
                  },
                  headers:{
                    token:this.$store.getters.getToken
                  }
                }).then(res=>{
                  function User(id, username, photo, fansCounts) {
                    this.id = id;
                    this.username = username;
                    this.photo = photo;
                    this.fansCounts = fansCounts;
                  }
                  this.list[i]= new User(this.list[i].id,this.list[i].username,this.list[i].photo,res.data.data.userInfo.fansCounts);
                })
                }

              //this.$store.commit('SET_ID', res.data.data.personalInfo.id);
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
