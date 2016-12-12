import { mapGetters } from 'vuex';

export default {
	destroyed() {
		this.$store.unregisterModule('standard');
	},
	created() {
		const data = {
			state: {
				x: 20,
			},
			actions: {},
			mutations: {},
			getters: {
				x: (state) => state.x,
			},
		};
		this.$store.registerModule('standard', data);
	},
	computed: {
		...mapGetters([
			'x',
		]),
	},
	render(h) {
		return (<p>world {this.x}</p>);
	},
};
