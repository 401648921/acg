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
        <span class="item-text" @click="handleSelect(item)">{{item}}</span>
        <span @click="deleteItem(item)" class=" item-delete-icon el-icon-close"></span>
      </template>
      </el-autocomplete>
    </div>
    <el-button class="submit-search" @click="search(1,5)" >搜索</el-button>
  </div>
  <div class="page-jump">
    <span class="page-element active" >文章</span>
    <span class="page-element" @click="go('/home/searchQuestion')">问答</span>
    <span class="page-element" @click="go('/home/searchGroup')">圈子</span>
    <span class="page-element" @click="go('/home/searchUser')">用户</span>
  </div>
  <div class="article-list">
    <el-scrollbar height="730px">
     <div class="article-element" v-for="item in list" :key="item">
      <article-box :deleteShow="false" :number="item.number" :id="item.id" :username="item.username" :photo="item.photo" :description="item.description" :label="item.label" :cosPhoto="item.cosPhoto" :createTime="item.createTime"></article-box>
    </div>
    </el-scrollbar>

  </div>
</template>

<script>
import articleBox from '../text/Article.vue'
export default {
  data(){
    return{
      input:'',
      list:[]
    }
  },
  components:{
    articleBox
  },
  methods:{
    go(path){
      this.$router.push(path)
    },
    handleSelect(item){
      //alert(111)
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
    search(cnt,page){
      this.list = [];
      this.getList(cnt,page)
    },
    getList(cnt,page){
      if(this.input==''){
        return;
      }
      this.$esRequest({
          method:'post',
          url:'/searchCos',
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
          this.list = this.list.concat( resp.data.data.cosList);
          for(let i =0;i<this.list.length;i++){

            this.list[i].label = this.list[i].label.substring(1,this.list[i].label.length -1).split(',');
            this.list[i].cosPhoto = this.list[i].cosPhoto.substring(1,this.list[i].cosPhoto.length -1).split(',');
            //alert(this.list[i].cosPhoto[1]);
           }
        }).catch(function(error){
          alert(error.url);
        })
    }
  },

}
</script>

<style scoped>
.active{
  color: #e0d9c0 !important;
}
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
.search-input-element>>>.el-autocomplete{
  width: 300px !important;
}
.article-element{
  margin-bottom: 5px;
}
.article-list{
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
  .nav-box,.page-jump,.search-box,.article-list{
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
