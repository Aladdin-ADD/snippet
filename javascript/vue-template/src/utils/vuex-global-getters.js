import R from 'ramda';
import { mapGetters } from 'vuex';
import { store } from '../store.js';

const globalGetters = mapGetters(R.keys(store.getters));

export default globalGetters;
