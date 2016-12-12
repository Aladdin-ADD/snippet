import { mapGetters } from 'vuex';

export default {
	destroyed() {
		this.$store.unregisterModule('index');
	},
	created() {
		const data = {
			state: {
				x: 10,
			},
			actions: {},
			mutations: {},
			getters: {
				y: (state) => state.x,
			},
		};
		this.$store.registerModule('index', data);
	},
	computed: {
		...mapGetters([
			'y',
		]),
	},
	render(h) {
		return (
			<div>
				<router-link to="/standard/index.html">Go to Foo</router-link>
				<p>hello {this.y}</p>
			</div>
		);
	},
};
