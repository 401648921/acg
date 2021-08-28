<template>
  <div class="content">
    <div class="time-content">
      <p class="time-content-text">{{createTime.substring(0,16)}}</p>
    </div>
    <div v-show="ShowOwn" class="own-page">
      <span class="own-page-element" @click="deleteCard">删除</span>
      <span class="own-page-element" @click="goModify">编辑</span>
    </div>
    <div class="tag-list">
      <div class="tag-element" v-for="item in label" :key="item">
        {{item}}
      </div>
    </div>
    <div class="text-title">

    </div>
    <div class="text-content">
      <div class="text-content-show">
        <p>{{description}}</p>
      </div>
    </div>
    <div class="recommend-tips">
      <div class="recommend-title">分享到</div>
      <div class="recommend-tip"><span class="iconfont-go icon-goweixin sign-icon"></span></div>
      <div class="recommend-tip"><span class="iconfont-go icon-goqq sign-icon"></span></div>
      <div class="recommend-tip"><span class="iconfont-go icon-goweibo1 sign-icon"></span></div>
    </div>
  </div>
</template>

<script>
export default {
props:{
  id:{
    type:String,
    default:'2021-10-1',
  },
  createTime:{
    type:String,
    default:'2021-10-1',
  },
  description:{
    type:String,
    default:'wwwwwwwwwwww',
  },
  label:{
    type:Array,
    default:[]
  }
},
methods:{
  ShowOwn(){
    return this.id == this.$store.getters.getId
  },
  deleteCard(){
    this.$acgRequest({
        method:'delete',
        url:'/cosOwner',
        headers:{
          token:this.$store.getters.getToken
        },
        params: {
          id:this.$store.getters.getId,
          number:this.$route.query.number
        }
        }).then(res=>{
          this.$router.push('/home/personIndex')
        })
  },
  goModify(){
    this.$router.push({
      path:'/home/ownerArticle',
      query:{
        number:this.$route.query.number
      }
    })
  }
}
}
</script>

<style scoped>
.own-page-element{
  color: #d1d1d1;
  font-size: 13px;
  margin-left:10px;
}
.own-page{
  position: absolute;
  top:10px;
  height:30px;
  right:30px;
}
.recommend-tips{
  width:900px;
  height:100px;
  line-height: 30px;

}
.recommend-tip span{
  font-size: 30px;
}
.recommend-tip{
  float: left;
  margin-left:20px;
  margin-top:20px;

}
.recommend-title{
  margin-left:300px;
  margin-top:20px;
  float: left;
}
.recommend-tips{
  position: relative;
}
.text-content-show p{
  width:800px;
}
.text-content-show{
  position: relative;
  font-size: 16px;
  left:48px;
  word-break: break-all;
  word-wrap: break-word;
}
.text-title-text{
  position: relative;
  left:48px;
}
.text-title{
  position: relative;
  font-size: 18px;
  font-weight: 700;
}
.tag-element{
  float: left;
  margin-left:60px;
  width:80px;
  height: 30px;
  border: #cecbec solid 1px;
  border-radius: 3px;
  line-height: 30px;
  text-align: center;
  margin-bottom: 30px;
}
.tag-list{
  position: relative;
  height:140px;
  width:750px;
  left:-10px;
  top:20px;
}
.content{
  position: relative;
  border: #e1e1e1 solid 2px;
  width:1000px;
  background: white;
}
.time-content-text{
  position: relative;
  left:50px;
  top:0px;
  font-size: 14px;
  color: #cecbcb;
}
.time-content-text{
  position: relative;
  top:0px;
  height:20px;
}
</style>
