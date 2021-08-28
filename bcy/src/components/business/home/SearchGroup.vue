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
        <span @click="handleSelect(item)"  class="item-text" >{{item }}</span>
        <span @click="deleteItem(item)" class=" item-delete-icon el-icon-close"></span>
      </template>
      </el-autocomplete>
    </div>
    <el-button class="submit-search" @click="search(10,1)">搜索</el-button>
  </div>
  <div class="page-jump">
    <span class="page-element" @click="go('/home/search')">文章</span>
    <span class="page-element" @click="go('/home/searchQuestion')">问答</span>
    <span class="page-element active">圈子</span>
    <span class="page-element" @click="go('/home/searchUser')">用户</span>
  </div>
  <div class="group-list">
    <el-scrollbar height="730px">
      <div @click="push('/home/groupIndex/groupHot',item.circleName)" class="group-element" v-for="(item ,index) in list" :key="item">
        <group-page @follow="deleteCircle" :index="index" :photo="item.photo" :circleName="item.circleName" :description="item.description" :buttonIf="true" ></group-page>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import groupPage from '../../common/user/GroupSearchPage.vue'
export default {
  data(){
    return{
      input:'',
      list:[]
    }
  },
  components:{
    groupPage
  },
  methods:{
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
    go(path){
      this.$router.push(path)
    },
    handleSelect(item){

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
    push(path,circleName){
      this.$router.push({
        path:path,
        query:{
          circleName:circleName
        }
      })
    },
    submit(){
      alert(1)
    },
    search(cnt,page){
      if(this.input==''){
        return;
      }
      this.$acgRequest({
          method:'get',
          url:'/searchCircle',
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
          this.list = resp.data.data.searchCircleList;
        }).catch(function(error){
          alert(error.url);
        })
      },
      deleteCircle(circleName,index){
        this.$acgRequest({
          method:'post',
          url:'/followCircle',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            circleName:circleName,
            id:this.$store.getters.getId
          }
        }).then(resp=>{
          alert(11)
          //this.list = resp.data.data.searchCircleList;
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
.group-list{
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
  .nav-box,.page-jump,.search-box,.group-list{
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
