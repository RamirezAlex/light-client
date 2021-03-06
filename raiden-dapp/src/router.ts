/* istanbul ignore file */
import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import { RouteNames } from '@/route-names';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: RouteNames.HOME,
      component: Home
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/about',
      name: RouteNames.ABOUT,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/About.vue')
    },
    {
      path: '/send/:token/:partner',
      name: RouteNames.SELECT_TARGET,
      component: () => import('./views/SelectTarget.vue')
    },
    {
      path: '/connect',
      name: RouteNames.SELECT_TOKEN,
      component: () => import('./views/SelectToken.vue')
    },
    {
      path: '/connect/:token',
      name: RouteNames.SELECT_HUB,
      component: () => import('./views/SelectHub.vue')
    },
    {
      path: '/connect/:token/:partner',
      name: RouteNames.DEPOSIT,
      component: () => import('./views/Deposit.vue')
    },
    {
      path: '/channels/:token',
      name: RouteNames.CHANNELS,
      component: () => import('./views/Channels.vue')
    }
  ]
});
