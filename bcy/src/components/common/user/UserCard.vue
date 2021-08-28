<template>
  <div class="user-box">
    <div class="user-box-left">
        <el-avatar :size="110" :src="user.photo"></el-avatar>
    </div>
    <div class="user-box-right">
      <div class="box-part">
        <span class="user-name">{{user.username}}<i class="user-sex-icon iconfont-go icon-gonv"></i></span>

      </div>

      <div class="bottom-part">
        <p v-html="getLine"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
 computed: {
   getLine(){
     return this.description.replaceAll(' ',"&nbsp;").replaceAll("\n","<br/>");
   }
 },
 props:{
   id:{
     default:'001',
     type:String
   }
 },
 data(){
   return{
     user:{},
     counts:{},
     description:'  '
   }
 },
 mounted(){
   this.$userRequest({
          method:'get',
          url:'/personalInfo',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            id:this.id
          }
        }).then(resp=>{
            this.user = resp.data.data.personalInfo;
            this.description = this.user.description;
        }).catch(function(error){
          alert(error.url);
        })
    }

}
</script>

<style scoped>
.user-birth-land{
  font-size: 13px;
  margin-top:15px;
  margin-bottom: -5px;
  color: #343434;
}
.user-fun{
  margin-right: 10px;
  font-size: 13px;
  color: #a5aba4;
  position: relative;
  left:-10px;
  top:8px;
}
.user-watch{
  margin-right: 10px;
  font-size: 13px;
  color: #a5aba4;
  position: relative;
  left:-10px;
  top:8px;
}
.user-sex-icon{
  color: palevioletred;
}
.user-name{
  display: inline-block;
  font-size: 22px;
  width:120px;
  top:10px;
  position: relative;
}
.box-part{
  position: relative;
}
.user-box-left{
  position: absolute;
  left:0px;
  width:100px;
}
.user-box-right{
  position: absolute;
  right:0px;
  width:320px;
}
.user-box{
  width:440px;
  position: relative;
}
.bottom-part p{
  width:220px;
  height:18px;
  color: #5a5a5a;
  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:1;
  overflow:hidden;
  word-break: break-all;
  word-wrap: break-word;
  position: relative;
  left:3px;
  top:10px;
}
</style>
