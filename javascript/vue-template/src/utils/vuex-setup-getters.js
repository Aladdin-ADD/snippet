import R from 'ramda';

const setupGetters = (store) => {
    const genGetters = R.pipe(
		R.keys,
		R.map((key) => [key, (state) => state[key]]),
		R.fromPairs
	);
	const stateGetters = genGetters(store.state);
    store.getters = R.merge(stateGetters, store.getters);
	return store;
};

export default setupGetters;
