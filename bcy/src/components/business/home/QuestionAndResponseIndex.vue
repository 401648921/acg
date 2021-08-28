<template>
  <div class="page-list">
    <div class="midder-part">
      <span class="page-element">关注</span>
      <span class="page-element" @click="go('/home/index')">发现</span>
      <span class="page-element active" @click="go('/home/questionResList')">问答</span>
      <span class="page-element" @click="go('/home/list/dayCosList')">榜单</span>
      <span class="page-element">关注</span>
      <span class="page-element">关注</span>
    </div>
    <span class="page-last-element el-icon-s-operation" @click="dialogTableVisible=true"></span>
  </div>
  <div class="content-box-part">
    <div class="content-box-list">
      <el-scrollbar height="730px">
      <div v-for="item in allList" :key="item">
        <question-card :number="item.number" :id="item.id" :username="item.username" :photo="item.photo" :description="item.description" :title="item.title" :label="item.label" :qaPhoto="item.qaPhoto" :createTime="item.createTime"></question-card>
      </div>
    </el-scrollbar>
    </div>
    <div class="content-box-element">
      <div class="recommend-group">
        <div class="recommend-group-title">
          <div class="recommend-group-title-text">热门圈子
            <span class="recommend-group-title-add" @click="go('/home/createGroup')">创建圈子</span>
          <span class="recommend-group-title-icon el-icon-plus"></span>
          </div>

        </div>
         <div class="recommend-group-list">
          <div v-for="item in groupList" :key="item" class="recommend-group element">
            <group @follow="follow" :buttonIf="true" :circleName="item.circleName" :description="item.description" :photo="item.photo" :postCounts="item.postCounts" :followCounts="item.followCounts" :createTime="item.createTime"></group>
          </div>
        </div>
      </div>
    </div>
  </div>
 <el-dialog title="拖动调节频道顺序" v-model="dialogTableVisible" :width="800">
    <div class="tag-content">
      <span draggable="true" @dragend="change()" @dragstart="getItem1(index)" @dragenter="getItem2(index)" class="tag-element" v-for="(item,index) in label" :key="item">{{item}}</span>
    </div>
  </el-dialog>
</template>

<script>
import card from '../text/Card'
import group from '../../common/user/Group'
import questionCard from '../question/QuestionPersonCard.vue'
export default {
  components:{
    group,
    card,
    questionCard
  },
  data(){
    return{
      num1:6,
      num2:6,
      dialogTableVisible:false,
      allList:[],
      groupList:[],

    }
  },
   methods:{
      go(url){
        this.$router.push({
          path:url,

        });
     },
    handleScroll:function(){
      var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
        if(scrollTop+windowHeight==scrollHeight){
          this.num1+=2;
          this.num2+=2;
        }
    },
    search(cnt){
     this.$esRequest({
          method:'get',
          url:'/recommendQa',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            cnt:cnt,
            id:this.$store.getters.getId
          }
        }).then(res=>{
          //this.count = res.data.data.counts;
          //let height1 = parseInt(window.getComputedStyle(this.$refs.element1).height.substring(0,window.getComputedStyle(this.$refs.element1).height.length - 2));
          //let height2 = parseInt(window.getComputedStyle(this.$refs.element2).height.substring(0,window.getComputedStyle(this.$refs.element2).height.length - 2))
           this.allList =res.data.data.qaList;
           for(let i =0;i<this.allList.length;i++){
            //alert(this.allList[i].cosPhoto.substring(1,this.allList[i].cosPhoto.length -1))
            //alert(this.allList[i].label.substring(1,this.allList[i].label.length -1))
            this.allList[i].label = this.allList[i].label.substring(1,this.allList[i].label.length -1).split(',');
            this.allList[i].qaPhoto = this.allList[i].qaPhoto.substring(1,this.allList[i].qaPhoto.length -1).split(',');
           }
          /*for(let i =0;i<this.allList.length;i++){
            let flag = 0;
            if(height1>height2){
              flag = 1;
            }
            //alert(parseInt(window.getComputedStyle(this.$refs.element1).height.substring(0,window.getComputedStyle(this.$refs.element1).height.length - 2)))
            //alert(parseInt(window.getComputedStyle(this.$refs.element2).height.substring(0,window.getComputedStyle(this.$refs.element2).height.length - 2)))
            if(i%2==flag){
              this.list1.splice(this.list1.length,0,this.allList[i])
            }else{
              this.list2.splice(this.list2.length,0,this.allList[i])
            }
           }*/
        })
  }
  },
  mounted(){
    window.addEventListener('scroll',this.handleScroll,true)
    this.search(10)
     this.$acgRequest({
        method:'get',
        url:'/recommendList',
        headers:{
          token:this.$store.getters.getToken
        },
        }).then(res=>{
           this.label = res.data.data.cosRecommendLabelList;
           this.search(10,1);
        })

        this.$esRequest({
        method:'get',
        url:'/recommendCircle',
        headers:{
          token:this.$store.getters.getToken
        },
        params: {
            cnt:5,
            id:this.$store.getters.getId,
            page:1,
          }
        }).then(res=>{
           this.groupList = res.data.data.recommendCircleList
        })

  }
}
</script>

<style scoped>
.active{
  color: #e0d9c0 !important;
}
.tag-element{
  position: relative;
  display: inline-block;
  padding:0px;
  width:100px;
  height:30px;
  border: #d1d1d1 solid 2px;
  border-radius: 10px;
  margin-top:40px;
  margin-left:20px;
  text-align: center;
  line-height: 30px;
}
.tag-content{
  position: relative;
  width:650px;
  height:350px;
  margin-left:50px;
}
.recommend-group-title-add{
  position: absolute;
  font-size: 15px;
  right:25px;
  color: #bdbbbb;
}
.recommend-group-title-icon{
  position: absolute;
  font-size: 15px;
  right: 8px;
  line-height: 40px;
  color: #bdbbbb;
}
.recommend-group-title{
  text-indent: 13px;
  background: white;
  width:350px;
  height:40px;
  line-height: 40px;
  font-size: 20px;
  position: relative;
  margin-bottom: 5px;
  margin-top:10px;
}
.my-group-title{
  text-indent: 13px;
  background: white;
  width:350px;
  height:40px;
  line-height: 40px;
  font-size: 20px;;
  margin-bottom: 5px;
}
.content-box-list{
  float: left;
  margin-right: 10px;
  width:1050px;
}
.content-box-element{
  position: fixed;
  left:calc(10% + 1070px);
  top:110px;
}
.content-box-part{
  margin-top:70px;
  width:1400px;
  margin-left:10%;
}
.page-last-element{
  position: absolute;
  right:10px;
  font-size: 25px;
  line-height: 40px;
  top:0px;
}
.page-element{
  line-height: 40px;
  margin-right: 8%;
  color: #5e5859;
  font-weight: 700;
}

@media screen and (max-width:1400px){
  .page-list{
    width:1120px !important;
  }
}
.midder-part{
  position: relative;
  left:20%;
  width:80%;
  font-size: 18px;
}
.page-list{
  position: relative;
  top:50px;
  width:80.5%;
  left:9.75%;
  border: #cecece solid 1px;
  height:40px;
  background: white;
}
.nav-box{
  position: absolute;
  top:0px;
  left:0px;
  width:80%;
  left:10%;
  background: white;
}
</style>
