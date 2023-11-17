    import { createRouter, createWebHistory } from 'vue-router';
    // import jwt from 'jsonwebtoken';

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
            // meta: { requiresAuth: true, roles: 'admin' }, 
            beforeEnter: (to) => {
                const token = localStorage.getItem('jwtToken');
                
                if (!token) {
                    return '/login';
                } else {
                    return true;
                }
            }
        },
        {
            path: '/postcustomers',
            name: 'postCustomers',
            component: () => import('../views/PostCustomersView.vue'),
            // meta: { requiresAuth: true, roles: 'admin' }, 
            beforeEnter: (to) => {
                const token = localStorage.getItem('jwtToken');
                
                if (!token) {
                    return '/login';
                } else {
                    return true;
                }
            }
        },
        {
            path: '/patchcustomers/:id',
            name: 'PatchCustomers',
            component: () => import('../views/PatchCustomersView.vue'),
            // meta: { requiresAuth: true, roles: 'admin' }, 
            beforeEnter: (to) => {
                const token = localStorage.getItem('jwtToken');
                
                if (!token) {
                    return '/login';
                } else {
                    return true;
                }
            }
        },
        {
            path: '/deletecustomers/:id',
            name: 'DeleteCustomers',
            component: () => import('../views/DeleteCustomersView.vue'),
            // meta: { requiresAuth: true, roles: 'admin' }, 
            beforeEnter: (to) => {
                const token = localStorage.getItem('jwtToken');
                
                if (!token) {
                    return '/login';
                } else {
                    return true;
                }
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('../views/loginView.vue'),
        },
    ];

    const router = createRouter({
        history: createWebHistory(),
        routes,
    });

    // router.beforeEach((to, from, next) => {
    //     const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    //     const token = localStorage.getItem('jwtToken');
    
    //     if (requiresAuth && !token) {
    //         next('/login');
    //     } else {
    //         const userRole = token ? jwt.decode(token).role : null;
    //         const allowedRoles = to.meta.roles || [];
        
    //         if (requiresAuth && !allowedRoles.includes(userRole)) {
    //             next('/login');
    //         } else {
    //             next();
    //         }
    //     }
    // });

    export default router;