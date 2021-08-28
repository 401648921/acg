<template>
  <!--<div class="tabs">
    <span class="tab tab-left">我关注的</span>
    <span class="tab tab-right">我创建的</span>
  </div>-->
  <div class="list">
     <el-scrollbar height="710px">
        <div @click="push('/home/groupIndex/groupHot',item.circleName)" v-for="item in list" :key="item" class="element">
          <group-card :circleName="item.circleName" :photo="item.photo" :description="item.description"></group-card>
        </div>
      </el-scrollbar>

  </div>
</template>

<script>
import groupCard from '../../common/user/GroupSearchPage'
export default {
  components:{
    groupCard
  },
  data(){
    return{
      list:[]
    }
  },
  methods:{
    push(path,circleName){
      this.$router.push({
        path:path,
        query:{
          circleName:circleName
        }
      })
    },
    search(cnt,page){
      this.$acgRequest({
        method:'get',
        url:'/personalCircle',
        headers:{
          token:this.$store.getters.getToken
        },
        params: {
          cnt:cnt,
          id:this.$store.getters.getId,
          page:page
        }
    }).then(res=>{
        this.list= this.list.concat(res.data.data.personalCircleList);
    })
    }
  },
  mounted(){
    this.search(10,1)
  }
}
</script>

<style scoped>
.person-index-header{
  position: relative;
  width:calc(80% + 10px);
  margin-top:50px;
  height:300px;
  overflow: hidden;
  margin-left:calc(10% - 5px);
}
.tab-left{
  border-right: #d1d1d1 solid 1px;
  width:calc(50% - 2px);
  float: left;
}
.tab-right{
  width:50%;
  float: left;
}
.tabs{
  width:100%;
  font-size: 18px;
  height:40px;
  line-height: 40px;
  text-align: center;

}
</style>
