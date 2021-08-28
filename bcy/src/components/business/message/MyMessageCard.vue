<template>
<div style="position:relative">
  <div class="message-element">
    <div class="img-content">
     <el-avatar shape="circle" :size="85"  :src="Pic"></el-avatar>
    </div>
    <div class="message-infor">
      <div class="message-from">
        {{username+'回复了我的评论'}}
      </div>
      <div class="infor-part" >
        {{userInforPart}}
      </div>
      <div class="time-tage-box">
        <span class="time-text" >{{userCreateTime.substring(0,10)}}</span>
        <span class="huifu">
          <i class="huifu-icon el-icon-chat-dot-square"></i>
          <span class="huifu-text" @click="goComment">回复</span>
        </span>
        <span class="dianzan">
          <i class="dianzan-icon icon-godamuzhi iconfont-go"></i>
          <span class="dianzan-text" @click="getGood">点赞</span>
        </span>
      </div>
    </div>
    <div class="infor-text">
      <p >{{userInforText}}</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  //props:['inforText','inforPart','number','userPic','createTime'],
  props:{
    inforText:{
      type: String,
      default: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    },
    inforPart:{
      type: String,
      default: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    },
    username:{
      type: String,
      default: "XXX11XXXXXXXXXX"
    },
    number:{
      type: String,
      default: "XXXXXXXXXXXXX"
    },
    userPic:{
      type: String,
      default: "XXXXXXXXXXXXXXXXXXXX"
    },
    createTime:{
      type: String,
      default: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    }
  },
  data(){
    return{
      userInforText:this.inforText,
      userInforPart:this.inforPart,
      userNumber:this.number,

      Pic:this.userPic,
      userCreateTime:this.createTime,
    }
  },
  methods:{
    goComment(){
      this.$router.push({
        path:'/home/showQuestion',
        query:{
          number:this.number
        }
      })
    },
    getGood(){
      this.$acgRequest({
        method:'post',
        url:'/likeCosComment',
        params: {
          id:this.$store.getters.getId,
          number:this.number
        }
      }).then(res=>{
        this.$alert('点赞成功','提示',{
            confirmButtonText:'确定'
          });
      })
    }
  }
}
</script>

<style scoped>
.huifu-text,.dianzan-text{
  line-height: 25px;
}
.huifu-icon,.dianzan-icon{
  margin-right: 10px;
  font-size: 18px;
  line-height: 25px;
}
.huifu,.dianzan{
  margin-left: 20px;;
}
.message-from{
  font-weight: 700;
}
.infor-part{
  font-size: 15px;
}
.time-text{
  font-size: 13px;
  color: #b6b6b6;
}
.time-tage-box{
  margin-left:-3px;

}
.infor-text{
  position: absolute;
  right:20px;
}
.message-infor div{
  margin-bottom: 10px;;
}
.message-infor{
  position: absolute;
  left:110px;
  top:10px;
}
.img-content{
  position: absolute;
  left:10px;
  top:10px;
}
.message-element{
  width: calc(100% - 20px);
  border: #d1d1d1 solid 2px;
  height:100px;
  position: relative;
}
.infor-text{
  width: 180px;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp:3 ;   /*行数*/
  -webkit-box-orient: vertical;
  word-break: break-all;
  word-wrap: break-word;
}

</style>
