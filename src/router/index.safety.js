import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './reg'
import store from '../store'
import axios from '@/config/axios'

const APP_NAME = process.env.VUE_APP_appName;

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        let position = { x: 0, y: 0 };
        if(to.hash) {
            position.selector = to.hash;
        }

        return position
    }
})

let isFetchUserRoutes = false;

router.beforeEach((to, from, next) => {
    let isLogin = store.getters['auth/isLogin'];
    if(isLogin && !isFetchUserRoutes) {
        axios.get('getMenu')
        .then(res => {
            // res.data

            isFetchUserRoutes = true;
            next();
        })
        .catch(() => {
            next();
        })
    }
    else {
        if(isLogin && to.path === '/login') {
            next({ path: '/' });
        }
        else {
            next();
        }
    }
})

router.onError(function(error) {
    router.push('/');
})

export default router
