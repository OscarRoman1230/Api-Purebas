import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';
import router from './router/index';
import axios from 'axios';
import VueAxios from 'vue-axios';

require('./assets/css/cssB.css');
require('../node_modules/bootstrap/dist/js/bootstrap.js');
require('../node_modules/@fortawesome/fontawesome-free/css/all.css');
require('../node_modules/@fortawesome/fontawesome-free/js/all.js');

Vue.use(VueAxios, axios);

// import Bootstrap
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
