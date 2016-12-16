import Vue from 'vue'
import VueRouter from 'vue-router'
import Root from './root.vue'
import Main from './pages/main.vue'
import List from './pages/list.vue'
import store from './store/store'


Vue.use(VueRouter);

const routes = [
    { path: '/', component: Main},
    { path: '/list', component: List}
];

const router = new VueRouter({
    mode: 'history',
    routes
});


const app = new Vue(Vue.util.extend({
    router,
    store
}, Root));

export default {app, router, store}


