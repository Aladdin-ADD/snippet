import R from 'ramda';
import { mapGetters } from 'vuex';
import setup from '../utils/vuex-setup-getters.js';
import globalGetters from '../utils/vuex-global-getters';


const mod = setup({
    name: 'index',
    state: {},
    getters: {},
    actions: {},
    mutations: {},
});


export default {
    destroyed() {
        this.$store.unregisterModule(mod.name);
    },
    created() {
        this.$store.registerModule(mod.name, mod);
    },
    computed: {
        ...mapGetters(R.keys(mod.getters)),
        ...globalGetters,
    },
    components: {
    },
    render(h) {
        return (
            <div id="app">
            </div>
        );
    },
};
