<template>
  <div class="list-box">
    <div class="list-header">
      <span @click="deleteShow=!deleteShow" class="list-header-button el-icon-s-operation">
        批量管理
      </span>
      <span @click="deleteAll" v-show="deleteShow" class="delete-button el-icon-delete"></span>
    </div>
    <div class="element-item" v-for="(item,index) in list" :key="item">
      <div v-if="deleteShow" class="choice-content">
        <el-checkbox class="delete-box"  v-model="item.delete"></el-checkbox>
      </div>
      <article-box :index="index" @deleteCard="deleteCard" @favor="favor" @like="like" :number="item.cosNumber" :id="item.id" :username="item.username" :createTime="item.createTime" :photo="item.photo" :description="item.description"></article-box>
    </div>
  </div>
</template>

<script>
import articleBox from '../article/ArticleCard.vue'
export default {
  components:{
    articleBox
  },
  data(){
    return{
      list:[],
      deleteShow:false,
      radio:[]
    }
  },
  methods: {
    see(index){
      alert(index)
    },
    push(number){
        this.$router.push({
          path:'/home/showQuestion',
          query:{
            number:number
          }
        });
      },
    search(cnt,page){
      this.$acgRequest({
          method:'get',
          url:'/favorList',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            cnt:cnt,
            page:page,
            id:this.$store.getters.getId
          }
        }).then(res=>{
           this.list= this.list.concat(res.data.data.favorList);
           for(let i = 0;i<this.list.length;i++){
             this.list[i].delete = false
           }
        }).catch(e=>{
          this.$alert('连接失败','提示',{
            confirmButtonText:'确定'
          });
        })
    },
    like(number,flag){
        if(flag){
          this.$acgRequest({
          method:'post',
          url:'/likeCos',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            id:this.$store.getters.getId,
            number:number
          }
        }).then(res=>{

            this.$alert('点赞成功','提示',{
              confirmButtonText:'确定'
            });
            return;

        })
        }else{
          this.$acgRequest({
          method:'delete',
          url:'/likeCos',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            id:this.$store.getters.getId,
            number:number
          }
        }).then(res=>{

            this.$alert('取消点赞成功','提示',{
              confirmButtonText:'确定'
            });
            return;

        })
        }

    },
    deleteAll(){
      //alert(this.list[0].delete)
      for(let i =0;i<this.list.length;i++){
        if(this.list[i].delete){
          this.deleteCard(i)
        }
      }
    },
    deleteCard(index){


          this.$acgRequest({
            method:'delete',
            url:'/favorCos',
            headers:{
              token:this.$store.getters.getToken
            },
            params: {
              id:this.$store.getters.getId,
              number:this.list[index].cosNumber
            }
          }).then(res=>{
              this.list.splice(index,1);
            })
        return;


      //alert(11)
    },
    favor(number,flag){
      if(flag){
         this.$acgRequest({
          method:'post',
          url:'/favorCos',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            id:this.$store.getters.getId,
            number:number
          }
        }).then(res=>{
           if(res.data.msg=="repeatWrong"){
            this.$alert('重复收藏','提示',{
              confirmButtonText:'确定'
            });
            return;
           }
           this.$alert('收藏成功','提示',{
              confirmButtonText:'确定'
            });
        })
      }else{
         this.$acgRequest({
          method:'delete',
          url:'/favorCos',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            id:this.$store.getters.getId,
            number:number
          }
        }).then(res=>{
           if(res.data.msg=="repeatWrong"){
            this.$alert('重复收藏','提示',{
              confirmButtonText:'确定'
            });
            return;
           }
           this.$alert('取消收藏成功','提示',{
              confirmButtonText:'确定'
            });
        })
      }

    }
  },
  mounted(){
    this.search(10,1)
  }
}
</script>

<style scoped>
.delete-box{
  position: absolute;
  right:20px;
  top:20px;
}
.element-item{
  position: relative;
}
.choice-content{
  position: absolute;
  height:100%;
  width:100%;
  background: #797979;
  opacity: 0.2;
  z-index: 10;
}
.delete-button{
  float: right;
  line-height: 30px;
  margin-right:20px;
}
.list-header{
  height:30px;
}
.list-header-button{
  float: right;
  line-height: 30px;
  margin-right:20px;
}
</style>

