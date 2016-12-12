import Vue from 'vue';
import Router from 'vue-router';
import routes from './views/routes.js';

Vue.use(Router);

const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
        return savedPosition;
    } else if (to.hash) {
        return {
            selector: to.hash,
        };
    } else {
        return {
            x: 0,
            y: 0,
        };
    }
};

const router = new Router({
    mode: 'history',
    routes,
    scrollBehavior,
});

export default router;
