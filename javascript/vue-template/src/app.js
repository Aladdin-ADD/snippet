import Vue from 'vue';
import {sync} from 'vuex-router-sync';
import router from './router.js';
import store from './store.js';
import App from './app.vue';

sync(store, router);

const app = new Vue(Vue.util.extend({
    router,
    store,
}, App));

app.$mount('#mount');
