import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {},
    actions: {},
    mutations: {},
    getters: {},
    modules: {},
});

export default store;
