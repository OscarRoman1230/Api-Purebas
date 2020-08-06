import Vue from 'vue';
import App from './App.vue';
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';
import router from './router/index';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

// import Bootstrap
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue(Vue.util.extend({router}, App)).$mount('#app');
