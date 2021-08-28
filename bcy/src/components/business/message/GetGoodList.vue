<template>
  <div class="message-content-header">
    <span>收到的赞</span>
  </div>
  <div class="message-box">
    <el-scrollbar height="730px">
      <div v-for="item in list" :key="item" class="message-element">
        <get-good :inforText="item.info" :user="item.username" :userPic="item.photo" :createTime="item.createTime"></get-good>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import getGood from './GetGood'
export default {
components:{
  getGood,
},
data(){
    return{
      list:[],
    }
  },
  methods:{
    load(number,page){
      this.$communityRequest({
        method:'get',
        url:'/likeList',
        params: {
          cnt:number,
          id:this.$store.getters.getId,
          page:page
        }
      }).then(res=>{
        this.list = res.data.data.likeList;
      })
    }
  },
  mounted(){
    this.load(10,1);
  }
}
</script>

<style scoped>

.message-box{
  padding-top:10px;
  padding-left:10px;
  background: white;
  height:750px;
}
.message-content-header span{
  margin-left:10px;
}
.message-content-header{
  border: #d1d1d1 solid 2px;
  margin-bottom: 5px;
  height:40px;
  background: white;
  line-height: 40px;
  font-size: 18px;
}
</style>
