<template>
  <div class="message-content-header">
    <span>@ 我的</span>
    <span class="input-box">
      <el-input
        placeholder="搜索"
        size="mini"
        prefix-icon="el-icon-search"
        v-model="input2">
      </el-input>
    </span>
  </div>
  <div class="message-box">
    <el-scrollbar height="730px">
      <div v-for="item in list" :key="item" class="message-element">
        <message-card :infor-text="item.description" :infor-part="item.info" :number="item.cosOrQaNumber" :username="item.username" :user-pic="item.photo" :create-time="item.createTime"></message-card>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import messageCard from './MyMessageCard.vue'
export default {
  components:{
    messageCard,
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
        url:'/atList',
        headers:{
          token:this.$store.getters.getToken
        },
        params: {
          cnt:number,
          id:this.$store.getters.getId,
          page:page
        }
      }).then(res=>{
        this.list = res.data.data.atList;
      })
    }
  },
  mounted(){
    this.load(10,1);
  }
}

</script>

<style scoped>
.input-box{
  display: inline-block;
  width:300px;
  position: absolute;
  right:30px;
}
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
