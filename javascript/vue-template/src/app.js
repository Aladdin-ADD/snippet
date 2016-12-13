import Vue from 'vue';
import {sync} from 'vuex-router-sync';
import router from './router.js';
import store from './store.js';
sync(store, router);


import 'sanitize.css/sanitize.css';
import './common/global.scss';


import App from './app.vue';
const app = new Vue(Vue.util.extend({
    router,
    store,
}, App));


app.$mount('#mount');
