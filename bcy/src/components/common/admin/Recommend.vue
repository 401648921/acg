<template>
  <div class="content">
    <div class="content-title">
      <p>推荐关注</p>
    </div>
    <div class="recommend-header">
      <span class="recommend-title">推荐关注</span>
      <span class="recommend-change">换一批</span>
      <span class="recommend-jump" @click="push">跳过</span>
    </div>
    <div class="recommend-list">
      <div class="recommend-element" v-for="(item,index) in list" :key='item'>
        <recommend @follow="follow" :item="index" :username="item.username" :photo="item.photo" :id="item.id"></recommend>
      </div>
    </div>
  </div>
</template>

<script>
import recommend from '../user/RecommendPage.vue'
export default {
  data(){
    return{
      list:[],
      page:7,
      list1:[]
    }
  },
  components:{
    recommend
  },
  methods:{
    follow(id,index){
      //alert(id)
      //alert(index)
      this.$userRequest({
        method:'post',
        url:'/follow',
        params: {
          fromId:this.$store.getters.getId,
          toId:id
        },
        headers:{
          token:this.$store.getters.getToken
        }
    }).then(res=>{
        this.list.splice(index,1);
        this.search(1,this.page++);
    })
    },
  search(cnt,page){
    this.$esRequest({
        method:'get',
        url:'/recommendUser',
        params: {
          cnt:cnt,
          page:page,
        },
        headers:{
          token:this.$store.getters.getToken
        }
    }).then(res=>{
      this.list1= [];
      let string = res.data.data.recommendUserList.substring(1,res.data.data.recommendUserList.length - 2);
      string = '), '+string
      let array = string.split('), RecommendUser(');
      array.splice(0,1);

      for(let i = 0;i<array.length;i++){
        array[i] = array[i].split(',')
      }
      function Person(id,username,photo){
        this.id = id;
        this.username = username;
        this.photo = photo;
      }
      for(let i =0;i<array.length;i++){

        this.list1[i] = new Person(array[i][0].substring(3,array[i][0].length),array[i][1].substring(10,array[i][1].length),array[i][2].substring(7,array[i][2].length));
      }
      for(let i = 0;i<this.list1.length;i++){
        if(this.list1[i].username==''){
          this.list1[i].username='用户名'
        }
        if(this.list1[i].photo='null'){
          this.list1[i].photo = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        }
      }
      this.list = this.list.concat(this.list1);
    })
  },
  push(){
    this.$router.push('/home/index');
  }
},
mounted(){
  this.search(6,1)
}
}
</script>

<style scoped>
.recommend-element{
  float: left;
  margin-right: 10px;
  margin-top:25px;
}
.recommend-list{
  width:500px;
  height:400px;
  position: absolute;
  top:100px;
  left:35px;
}
.recommend-jump{
  color: #4d504d;
  float: right;
  margin-right: 30px;
}
.recommend-change{
  color: #e0cb97;
  float: left;
  margin-left:10px;
}
.recommend-title{
  color: #cdcbcd;
  float: left;
  margin-left:40px;
}
.content-title{
  font-size: 18px;
  margin-top:25px;

}
.content-title p {
  text-align: center;
}
</style>
