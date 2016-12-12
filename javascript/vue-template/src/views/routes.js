const routes = [{
    path: '/index.html',
	component: () => import('./index.vue'),
}, {
	path: '/standard/index.html',
	component: () => import('./standard/index.vue'),
}, {
	path: '*',
	redirect: '/index.html',
}];

export default routes;
