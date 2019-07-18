import Vue from 'vue'
import App from './App.vue'


Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {router} from './router/index';
// import moment from 'moment'//导入文件

// Vue.prototype.$moment = moment;//赋值使用
Vue.use(ElementUI);
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
