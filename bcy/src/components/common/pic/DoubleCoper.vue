<template>
  <div id="app">
	  <my-upload field="photo"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
      v-model="show"
		  :width="150"
		  :height="150"
		  :url="urlPic"
		  :params="params"
		  :headers="headers"
		  img-format="png"></my-upload>
      <div @click="toggleShow" class="img-box">
        <div class="img-box-ele">
          <i @click="delete1" v-if="imgDataUrl1!=''" class="el-icon-close"></i>
          <i v-if="imgDataUrl1==''" class="img-icon el-icon-plus"></i>
          <img class="img" :src="imgDataUrl1">
        </div>
        <div class="img-box-ele">
          <i @click="delete2"  v-if="imgDataUrl2!=''" class="el-icon-close"></i>
          <i v-if="imgDataUrl2==''" class="img-icon el-icon-plus"></i>
          <img class="img" :src="imgDataUrl2">
        </div>

      </div>
  </div>
</template>

<script>
import myUpload from 'vue-image-crop-upload';
export default {
	data(){
	return{
      show: false,
			params: {
				id:this.$store.getters.getId
			},
			headers: {
				token: this.$store.getters.getToken
			},
			imgDataUrl1: '', // the datebase64 url of created image
      imgDataUrl2: '',
      num:1
    }
  },
  components:{
    'my-upload': myUpload
  },
  props: ['sizeNumber','urlPic','token','id'],
  methods:{
    toggleShow() {
				this.show = !this.show;
			},
			cropSuccess(imgDataUrl, field){

			},
			cropUploadSuccess(jsonData, field){
        //alert(this.imgDataUrl)
        //alert(jsonData.data.url)
        if(this.imgDataUrl1==''){
          this.imgDataUrl1 = jsonData.data.url;
          this.$emit('uploadSuccess',this.num++,this.imgDataUrl1);
          return;
        }
        if(this.imgDataUrl2==''){
          this.imgDataUrl2 = jsonData.data.url;
          this.$emit('uploadSuccess',this.num,this.imgDataUrl2);
          return;
        }

			},
			cropUploadFail(status, field){
				this.$alert('服务器错误','提示')
			},
      delete1(){
        this.imgDataUrl1 = this.imgDataUrl2;
        this.imgDataUrl2 = ''
        this.num=1
      },
      delete2(){
        if(this.imgDataUrl2==''){
          return;
        }
        this.imgDataUrl2 = '';
        this.num=2
      }
  },
  mounted(){
    //alert(this.urlPic)
  }
}
</script>

<style>
.el-icon-close{
  position: absolute;
  right:5px;
  top:5px;
  font-size: 20px;
}
.img-box-ele{
  float: left;
  border:#d1d1d1 solid 1px;
  width: 150px;
  height: 150px;
  margin-right: 20px;
  position: relative;
}
.img-icon{
  font-size: 30px;
  float: left;
  margin-top:60px;
  margin-left:60px;
}
.app{
  background: white;
  position: relative;
}
.img-box{
  width: 350px;
  height: 150px;

}
</style>
