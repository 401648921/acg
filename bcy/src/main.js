import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {oauthRequest,acgRequest,communityRequest,esRequest,userRequest,loginRequest} from './network/request'
import ElementPlus from 'element-plus'
import axios  from 'axios'
//import VueCropper from 'vue-cropper'
//import Croppa from "vue-croppa";
//import "vue-croppa/dist/vue-croppa.css";
import 'element-plus/lib/theme-chalk/index.css'
import './assets/font.css'
import './assets/font/iconfont.css';
import './assets/font1/iconfont.css';


let app=createApp(App)

app.config.globalProperties.$axios=axios;
app.config.globalProperties.$oauthRequest=oauthRequest;
app.config.globalProperties.$esRequest=esRequest;
app.config.globalProperties.$loginRequest=loginRequest;
app.config.globalProperties.$acgRequest=acgRequest;
app.config.globalProperties.$communityRequest=communityRequest;
app.config.globalProperties.$userRequest=userRequest;

app.use(router).use(store).use(ElementPlus).mount('#app')
