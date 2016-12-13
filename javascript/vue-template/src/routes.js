const routes = [{
	meta: {
		title: 'homepage',
	},
    path: '/index.html',
	component: () => import('./views/index.vue'),
}, {
	path: '*',
	redirect: '/index.html',
}];

export default routes;
