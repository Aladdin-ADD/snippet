import R from 'ramda';
import { mapGetters } from 'vuex';
import setup from '../../utils/vuex-setup-getters.js';


const mod = setup({
    name: '',
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
    },
    components: {
    },
    render(h) {
        return (
            <div>
            </div>
        );
    },
};
