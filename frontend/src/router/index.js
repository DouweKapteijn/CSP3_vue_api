// import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/Home.vue'
// import AboutView from '../views/About.vue'
// import axios from 'axios'
// import VueRouter from 'vue-router'

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/HomeView.vue'),
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/AboutView.vue'),
    },
    {
        path: '/getcustomers',
        name: 'GetCustomers',
        component: () => import('../views/GetCustomersView.vue'),
    },
    {
        path: '/postcustomers',
        name: 'postCustomers',
        component: () => import('../views/PostCustomersView.vue'),
    },
    {
        path: '/putcustomers',
        name: 'PutCustomers',
        component: () => import('../views/PutCustomersView.vue'),
    },
    {
        path: '/patchcustomers',
        name: 'PatchCustomers',
        component: () => import('../views/PatchCustomersView.vue'),
    },
    {
        path: '/deletecustomers',
        name: 'DeleteCustomers',
        component: () => import('../views/DeleteCustomersView.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const requiredRoles = to.meta.roles || [];

    if (requiresAuth && !token) {
        next('/login');
    } else if (requiresAuth && !requiredRoles.includes(userRole)) {
        next('/login'); // or another route for unauthorized access
    } else {
        next();
    }
});

export default router;