import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import setup from './utils/vuex-setup-getters.js';

import pages from './utils/router-pages.js';

export const store = setup({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        pages,
    },
    actions: {},
    mutations: {},
    getters: {},
    modules: {},
});

export default new Vuex.Store(store);
