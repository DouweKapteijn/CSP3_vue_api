    import { createRouter, createWebHistory } from 'vue-router';
    import { jwtDecode } from "jwt-decode";

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
            beforeEnter: () => {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    return '/login';
                } else {
                    const decodeToken = jwtDecode(token); 
                    if (decodeToken.role === 'admin' || decodeToken.role === 'user') {
                        return true;
                    }
                    else {
                        return '/login';
                    }
                }
            }
        },
        {
            path: '/postcustomers',
            name: 'postCustomers',
            component: () => import('../views/PostCustomersView.vue'),
            beforeEnter: () => {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    return '/login';
                } else {
                    const decodeToken = jwtDecode(token); 
                    if (decodeToken.role === 'admin') {
                        return true;
                    }
                    else {
                        return '/login';
                    }
                }
            }
        },
        {
            path: '/patchcustomers/:id',
            name: 'PatchCustomers',
            component: () => import('../views/PatchCustomersView.vue'),
            beforeEnter: () => {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    return '/login';
                } else {
                    const decodeToken = jwtDecode(token); 
                    if (decodeToken.role === 'admin') {
                        return true;
                    }
                    else {
                        return '/login';
                    }
                }
            }
        },
        {
            path: '/deletecustomers/:id',
            name: 'DeleteCustomers',
            component: () => import('../views/DeleteCustomersView.vue'),
            beforeEnter: () => {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    return '/login';
                } else {
                    const decodeToken = jwtDecode(token); 
                    if (decodeToken.role === 'admin') {
                        return true;
                    }
                    else {
                        return '/login';
                    }
                }
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('../views/loginView.vue'),
        },
        {
            path: '/logout',
            name: 'Logout',
            component: () => import('../views/logoutView.vue'),
        },
    ];

    const router = createRouter({
        history: createWebHistory(),
        routes,
    });

    export default router;