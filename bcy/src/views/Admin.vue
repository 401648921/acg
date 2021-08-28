<template>
  <div class="box-card">
    <span class="pic-box"><img src="../assets/admin-back.png" alt="44"></span>
    <span class="content-box"><router-view/></span>
  </div>
</template>

<script>
export default {
/*created () {
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },*/
}
</script>

<style scoped>
  body{
    background-color: #f5f5fa;
  }
  .pic-box{
    position: absolute;
    height: 100%;
    left:0px;
    width:450px;
    border-radius:3px 3px 3px 3px;
    overflow: hidden;
  }
  .content-box{
    position: absolute;
    height: 100%;
    right:0px;
    width:450px;
    border-radius:3px 3px 3px 3px;
    overflow: hidden;
  }
  .pic-box>img{
      width:100%;
      top:-50px;
      position: relative;
  }
  .box-card {
    position: absolute;
    top:230px;
    left: 500px;
    width: 900px;
    height:520px;
    background-color: white;
    border-radius:10px;
    box-shadow: 3px 3px  #eaeaef;
  }
</style>
