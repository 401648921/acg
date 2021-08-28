<template>
  <div class="page-list">
    <div class="midder-part">
      <span class="page-element" @click="gogo">关注</span>
      <span class="page-element">发现</span>
      <span class="page-element">问答</span>
      <span class="page-element">关注</span>
      <span class="page-element">关注</span>
      <span class="page-element">关注</span>
    </div>
    <span class="page-last-element el-icon-s-operation" @click="dialogTableVisible=true"></span>
  </div>
  <div class="content-box-part">
    <div ref="element1" class="content-box-list">
      <div  v-for="item in 4" :key="item" class="content-box-element">
        <card></card>
      </div>
    </div>
    <div class="content-box-element">

      <div class="recommend-group">
        <div class="recommend-group-title">
          <div class="recommend-group-title-text">热门圈子
            <span class="recommend-group-title-add">创建圈子</span>
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

export default {
  components:{
    group,
    card
  },
  data(){
    return{
      num1:9,
      num2:6,
      allList:[],
      list1:[],
      list2:[],
      groupList:[],
      dialogTableVisible:false,
      label:[1,2,3,4,5,6,7,8,9,10,11,12],
      item1:0,
      item2:0,
      page:3,
      count:0
    }
  },
   methods:{
     gogo(){
       this.num1+=2;
       alert(window.getComputedStyle(this.$refs.element1).height)
     },
    handleScroll:function(){
      if(this.list1.length+this.list2.length==this.count){
        return;
      }
      var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
        if(scrollTop+windowHeight==scrollHeight){
          this.search(5,this.page)
        }
    },
    move(e){
      let odiv = e.target;        //获取目标元素
      //算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft;
      let disY = e.clientY - odiv.offsetTop;
      document.onmousemove = (e)=>{       //鼠标按下并移动的事件
          //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
          let left = e.clientX - disX;
          let top = e.clientY - disY ;

          //绑定元素位置到positionX和positionY上面
          this.positionX = top;
          this.positionY = left;

          //移动当前元素
          odiv.style.left = left + 'px';
          odiv.style.top = top + 'px';
      };
      document.onmouseup = (e) => {
          document.onmousemove = null;
          document.onmouseup = null;
          alert(this.positionX)
      };

  },
  follow(circleName){
    this.$acgRequest({
          method:'post',
          url:'/followCircle',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            circleName:circleName,
            id:this.$store.getters.getId
          }
        }).then(res=>{
           this.$alert('关注成功','提示',{
            confirmButtonText:'确定'
          });
        })
  },
  getItem1(index){
    this.item1 = index
  },
  getItem2(index){
    this.item2 = index
  },
  change(){
    let itemA = this.label[this.item1];
    let itemB = this.label[this.item2];
    this.label.splice(this.item1,1,itemB);
    this.label.splice(this.item2,1,itemA);

  },
  search(cnt,page){
     this.$esRequest({
          method:'get',
          url:'/labelCos',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            cnt:cnt,
            id:this.$store.getters.getId,
            keyword:this.label[0]+'/'+this.label[1],
            page:page,
          }
        }).then(res=>{
          this.count = res.data.data.counts;
          let height1 = parseInt(window.getComputedStyle(this.$refs.element1).height.substring(0,window.getComputedStyle(this.$refs.element1).height.length - 2));
          let height2 = parseInt(window.getComputedStyle(this.$refs.element2).height.substring(0,window.getComputedStyle(this.$refs.element2).height.length - 2))
           this.allList =res.data.data.cosList;
           for(let i =0;i<this.allList.length;i++){
            //alert(this.allList[i].cosPhoto.substring(1,this.allList[i].cosPhoto.length -1))
            //alert(this.allList[i].label.substring(1,this.allList[i].label.length -1))
            this.allList[i].label = this.allList[i].label.substring(1,this.allList[i].label.length -1).split(',');
            this.allList[i].cosPhoto = this.allList[i].cosPhoto.substring(1,this.allList[i].cosPhoto.length -1).split(',');
           }
          for(let i =0;i<this.allList.length;i++){
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
           }
        })
  }
  },
  mounted(){
    window.addEventListener('scroll',this.handleScroll,true)

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
.recommend-group{
  margin-top:-10px;
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
  width:1000px;
  min-height: 10px;
}
.content-box-element{
  float: left;
  margin-bottom: 10px;;
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
