<template>
<div  style="position:relative">
  <i @click="deleteCard" class="delete-icon el-icon-close"></i>
  <div  class="message-element">
    <div  class="img-content">
     <el-avatar shape="circle" :size="65"  :src="photo"></el-avatar>
    </div>
    <div class="message-infor">
      <div @click="choice" class="message-from">
        {{username}}
      </div>
      <div class="part-content-box">
        <span class="part-content-text">{{info.lastInfo}}</span>
      </div>
    </div>
    <div class="time-text">
      {{info.substring(0,10)}}
    </div>
  </div>
</div>
</template>

<script>
export default {
  props:{
    id:{
      type:String,
      default:'111'
    },
    username:{
      type:String,
      default:'111'
    },
    photo:{
      type:String,
      default:'111'
    },
    uuid:{
      type:String,
      default:'111'
    }
  },
  data(){
    return{
      info:'xxxxxxxxxxxxxxxxxxxxxxxxxx'
    }
  },
  mounted(){
    this.$communityRequest({
        method:'get',
        url:'/talkCounts',
        params: {
          id:this.$store.getters.getId,
          toId:this.id
        }
      }).then(res=>{
        this.info = res.data.data.talkCountsList[0].updateTime;
      })
  },
  methods: {
    deleteCard(){
      this.$emit('deleteCard');
    },
    choice(){
      this.$emit('choice',this.id,this.uuid,this.username)
    }
  }
}
</script>

<style scoped>
.delete-icon{
  position: absolute;
  left:2px;
  top:5px;
  z-index:10;
}
.message-from{
  width:120px;
  overflow: hidden;
   overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:1;
}
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
  margin-top:10px;
  margin-bottom: 0px;
}
.infor-part{
  font-size: 15px;
}
.part-content-text{
  font-size: 13px;
  color: #b6b6b6;
}
.part-content-box{
  margin-top:15px;
  margin-left:-3px;

}
.time-text{
  position: absolute;
  right:20px;
  top:18px;
}
.message-infor div{
  margin-bottom: 10px;;
}
.message-infor{
  position: absolute;
  left:90px;
  top:5px;
}
.img-content{
  position: absolute;
  left:10px;
  top:10px;
}
.message-element{
  width: calc(100% - 20px);

  height:80px;
  position: relative;
}
.infor-text{
  width: 180px;

}

</style>
