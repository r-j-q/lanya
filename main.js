import Vue from 'vue'
import App from './App'
// import request from '@/common/request.js';
// Vue.prototype.$Z = request;
import uView from 'uview-ui';
Vue.use(uView);
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App 
})
app.$mount()
