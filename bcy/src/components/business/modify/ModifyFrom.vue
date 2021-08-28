<template>
  <div class="content-from">
    <div class="img">
      <modify-img :urlPic="'/api4/photoUpload'" @uploadSuccess="savePic" class="img-box-show"></modify-img>
    </div>
    <div class="form-box">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="昵称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker
            v-model="form.date"
            type="form.date"

            value-format="YYYY-MM-DD"
            placeholder="添加我的生日">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地区">
          <el-cascader
            class="land-select"

            size="large"
            @change="ttt"
            v-model="form.selectedOptions"
            :options="form.options"
          >
      </el-cascader>
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="form.desc"></el-input>
        </el-form-item>
        <el-button @click="saveUser" type="warning" size="small" round class="submit-button">保存</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { regionData, CodeToText } from "element-china-area-data";
import modifyImg from './ImgModify.vue'
export default {
  components:{
    modifyImg
  },
  data(){
    return{
      form:{
        path:'',
        date:'',
        name:'',
        sex:'',
        place:'',
        desc:'',
        options: regionData,
        selectedOptions: []
      }
  }
},
methods:{
    savePic(path){
      this.form.path = path;
    },
    ttt(){
      alert(CodeToText[this.form.selectedOptions[2]])
    },
    saveUser(){
      this.$userRequest({
          method:'put',
          url:'/personalInfo',
          header:{
            token:this.$store.getters.getToken
          },
          params: {
            birthday:this.form.date ==''?undefined:this.form.date,
            city:this.form.selectedOptions[2]==undefined?undefined:CodeToText[this.form.selectedOptions[2]],
            description:this.form.desc==''?undefined:this.form.desc,
            id:this.$store.getters.getId,
            province:this.form.selectedOptions[0]==undefined?undefined: CodeToText[this.form.selectedOptions[0]],
            sex:this.form.sex==''?undefined:this.form.sex,
            username:this.form.name==''?undefined:this.form.name
          }
        }).then(resp=>{
          this.$alert('修改成功','提示',{
            confirmButtonText:'确定'
          });
          //this.$router.push('/admin/sign');
        }).catch(function(error){
          alert(error.url);
        })
    }
  }
}


</script>

<style scoped>
.submit-button{
  position: relative;
  left:200px;
  top:20px;
  width:200px;
}
.form-box{
  width:50%;
  position: relative;
  left:20%;
  top:120px;
}
.img-box-show{
  position: relative;
  top:60px;
  left:40%
}
</style>
