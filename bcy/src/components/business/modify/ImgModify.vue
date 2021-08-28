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
        <img class="" :src="imgDataUrl">
      </div>
      <el-button @click="toggleShow" size="mini" class="img-button">上传头像</el-button>
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
			imgDataUrl: this.$store.getters.getPhoto // the datebase64 url of created image
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
				this.imgDataUrl = imgDataUrl;
        //alert(this.$store.getters.getToken)
        //alert(this.$store.getters.getId)
			},
			cropUploadSuccess(jsonData, field){
        alert(this.imgDataUrl)
        this.$emit('uploadSuccess',this.imgDataUrl);
			},
			cropUploadFail(status, field){
				this.$alert('服务器错误','提示')
			}
  }

}
</script>

<style scoped>
.img-button{
  position: absolute;
  left:200px;
  top:100px;
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
  width: 150px;
  overflow: hidden;
  height: 150px;
  border:#d1d1d1 solid 1px;
  border-radius: 50%;
}
</style>
