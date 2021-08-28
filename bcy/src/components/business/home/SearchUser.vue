<template>
  <div class="search-box">
    <div class="search-input">
      <el-autocomplete class="search-input-element"
        v-model="input" style="width:100%"
        prefix-icon="el-icon-search"
        :fetch-suggestions="loadAll"
        @select="handleSelect"
        @keyup.enter="search(1,5)"
        placeholder="请输入内容"
      >
      <template #default="{item}">
        <span class="item-icon icon-goshijianzhongbiao iconfont-go"></span>
        <span @click="handleSelect(item)" class="item-text" >{{item }}</span>
        <span @click="deleteItem(item)" class=" item-delete-icon el-icon-close"></span>
      </template>
      </el-autocomplete>
    </div>
    <el-button class="submit-search" @click="search(10,1)" >搜索</el-button>
  </div>
  <div class="page-jump">
    <span class="page-element" @click="goSearch('/home/search')">文章</span>
    <span class="page-element" @click="goSearch('/home/searchQuestion')">问答</span>
    <span class="page-element" @click="goSearch('/home/searchGroup')">圈子</span>
    <span class="page-element active" >用户</span>
  </div>
  <div class="user-list">
    <el-scrollbar height="730px">
      <div class="user-element" v-for="item in list" :key="item">
        <user-page @follow="follow" :buttonIf="true" :id="item.id" :username="item.username" :photo="item.photo"></user-page>
    </div>
    </el-scrollbar>

  </div>
</template>

<script>
import userPage from '../../common/user/UserSearchPage.vue'
export default {
  data(){
    return{
      input:'',
      list:[]
    }
  },
  components:{
    userPage
  },
  methods: {
    deleteItem(item){
      this.$esRequest({
          method:'delete',
          url:'/searchHistory',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            id:this.$store.getters.getId,
            keyword:item
          }
        }).then(resp=>{
          this.input=''
        })
    },
    goSearch(path){
      this.$router.push(path)
    },
    handleSelect(item){
      //alert(item)
      this.input = item;
    },
    loadAll(queryString,cb){
      this.$esRequest({
          method:'get',
          url:'/searchHistory',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            id:this.$store.getters.getId,
          }
        }).then(resp=>{

          let array = resp.data.data.keywordList;
          let data = array.substring(1,array.length -1).split(',');
          cb(data);
        })
    },
    show(item){
      alert(item.username)
    },
    follow(id,text){
      alert(text)
      this.$userRequest({
          method:text=='关注'?'post':'delete',
          url:'/follow',
          headers:{
            token:this.$store.getters.getToken

          },
          params: {
            fromId:this.$store.getters.getId,
            toId:id
          }
        }).then(resp=>{
          if(resp.data.msg=='repeatWrong'){
            this.$alert('操作过快','提示',{
              confirmButtonText:'确定'
            });

             return;
          }
          this.$alert(text=='关注'?'关注成功':'取消关注成功','提示',{
            confirmButtonText:'确定'
          });
        }).catch(function(error){
          alert(error.url);
        })
    },
    search(cnt,page){
      if(this.input==''){
        return;
      }
      this.$communityRequest({
          method:'get',
          url:'/searchUser',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            cnt:cnt,
            id:this.$store.getters.getId,
            keyword:this.input,
            page:page
          }
        }).then(resp=>{
          this.list = resp.data.data.searchUserList;
          //alert(this.list[0].username)
        }).catch(function(error){
          alert(error.url);
        })

    }
  },

}
</script>

<style scoped>
.item-delete-icon{
  float: left;
  line-height: 30px;
  font-size: 22px;
}
.item-text{
  float: left;
  width: calc(100% - 39px);
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp:1 ;   /*行数*/
  -webkit-box-orient: vertical;
  word-break: break-all;
  word-wrap: break-word;
}
.item-icon{
  float: left;
  margin-left:-10px;
  margin-right: 10px;
}
.active{
  color: #e0d9c0 !important;
}
.user-list{
  position: relative;
  width:81%;
  left:9.75%;
  top:300px;
}
.page-jump span{
  margin-left:20px;
  margin-right: 50px;
}
.page-jump{
  width:80%;
  background: white;
  height:200px;
  left:10%;
  position: absolute;
  margin-top:255px;
  line-height: 40px;
  font-size: 16px;
}
@media screen and (max-width:1400px){
  .nav-box,.page-jump,.search-box,.user-list{
    width: 1120px !important;
  }
}
.page-jump{
  height:40px;
  width:80%;
}
.submit-search{
  position: absolute;
  margin-left:19.9%;
  left:50%;
  top:90px;
}
.search-input{
  width:50%;
  position: absolute;
  left:20%;
  top:90px;
}
.search-box{
  width:80%;
  background: white;
  height:200px;
  left:10%;
  position: absolute;
  margin-top:50px;
}
</style>
