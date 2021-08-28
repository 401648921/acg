import { createStore } from 'vuex'

export default createStore({
  state: {
    token:sessionStorage.getItem("token"),
    id:sessionStorage.getItem("id"),
    socket:sessionStorage.getItem("scoket"),
    photo:sessionStorage.getItem("photo"),
    chatUserId: '-1',
    chatList:[]
  },
  mutations: {
    SET_TOKEN:(state, token)=>{
      state.token = token;
      sessionStorage.setItem("token",token);
    },
    SET_ID:(state, id)=>{
      state.id = id;
      sessionStorage.setItem("id",id);
    },
    SET_SOCKET:(state,socket)=>{
      state.socket = socket;
      sessionStorage.setItem("socket",socket);
    },
    SET_PHOTO:(state,photo)=>{
      state.photo = photo;
      sessionStorage.setItem("photo",photo);
    },
    send:(state,say)=>{
      state.socket.send(say)
    },
    SET_CHAT:(state,userId)=>{
      state.chatUserId = userId;
      sessionStorage.setItem("chatUserId",userId);
    },
    PUSH_CHAT:(state,chat)=>{
      state.chatList.splice(state.chatList.length,0,chat);
    }

  },
  actions: {

  },
  modules: {

  },
  getters:{
    getId: state =>{
      return state.id;
    },
    getToken: state =>{
      return state.token;
    },
    getSocket: state =>{
      state.socket.send("ok")
      return state.socket;
    },
    getPhoto:state=>{
      return state.photo;
    },
    getChatId:state=>{
      return state.chatUserId
    },
    getList:state=>{
      let array = state.chatList.reverse();
      state.chatList = [];
      return array;
    }
  }
})
