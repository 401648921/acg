<template>
  <div class="nav-box">
    <navt></navt>
  </div>
  <router-view />
</template>

<script>
import navt from '../components/business/home/Nav.vue'
export default {
  /*created () {
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },*/
components:{
    navt:navt,

  },
  mounted(){
    this.init();
  },
  data(){
    return{
      path:"wss://www.rat403.cn/websocket/"+this.$store.getters.getId,
      socket:{}
    }
  },
  /*destroyed () {
    // 销毁监听
    this.socket.onclose = this.close
  },*/
  methods: {
    send(say){
      //alert(111)
      this.socket.send(say);
    },
    init: function () {
            if(typeof(WebSocket) === "undefined"){
                alert("您的浏览器不支持socket")
            }else{
                // 实例化socket
                this.socket = new WebSocket(this.path)
                // 监听socket连接
                this.socket.onopen = this.open
                // 监听socket错误信息
                this.socket.onerror = this.error
                // 监听socket消息
                this.socket.onmessage = this.getMessage

            }
        },
        open: function () {
            console.log("socket连接成功");
            this.$store.commit('SET_SOCKET', this.socket);
            //this.socket.send('111')
            //this.$store.getters.getSocket.send('2422')
        },
        error: function () {
            console.log("连接错误")
        },
        getMessage: function (msgRan) {
            let msg = JSON.parse(msgRan.data);
            //console.log(msg.data)
            //alert(msg.number);
            function sayContent(fromId, toId, msg, uuid) {
              this.fromId = fromId;// thid.$store.getters
              this.toId= toId;// this.id
              this.message = msg;
              this.uuid =  uuid;// this.uuid
            }
            //alert(this.$store.getters.getChatId);
            //alert(msg.number)
            if(msg.msg=='talkInfo'&&this.$store.getters.getChatId==msg.number){
              let say = new sayContent(msg.number,this.$store.getters.getId,msg.data.content,'');
              this.$store.commit('PUSH_CHAT', say);
            }else if(msg.msg=='talkInfo'&&this.$store.getters.getChatId!=msg.number){
              this.$notify({
                title: '有用户私聊你',
                message: msg.data.content
              });
            }else if(msg.msg=='talkReceive'&&msg.data.isSuccess!=1){
              this.$alert('你被对方拉黑了','提示',{
                confirmButtonText:'确定'
              });
            }else{
              this.$notify({
                title: msg.data.title,
                message: msgRan.content
              });
            }

        },
        send: function (params) {
            this.socket.send(params)
        },
        close: function () {
            console.log("socket已经关闭")
        }
  }
}
</script>

<style scoped>
.nav-box{
  position: absolute;

  top:0px;
  left:0px;
  width:80%;
  left:10%;
  background: white;
}
@media screen and (max-width:1400px){
  .nav-box{
    width: 1120px !important;
  }
}
</style>
