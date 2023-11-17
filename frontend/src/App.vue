<script setup>
import { ref } from 'vue';
import { RouterView, RouterLink } from 'vue-router';
import { jwtDecode } from "jwt-decode";
import router from './router';

const admin = ref(false);
const user = ref(false);
const token = localStorage.getItem('jwtToken');

if (!token) {
    router.push('/login');
} else {
    const decodeToken = jwtDecode(token); 
    if (decodeToken.role === 'admin') {
        admin.value = true;
        user.value = true;
    }
    else if (decodeToken.role === 'user') {
        user.value = true;
    }
}


</script>

<template>
    <div class="w-full bg-blue-300">
        <nav class="flex w-full">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about"> || About</RouterLink>
            <RouterLink to="/getcustomers" v-if="user"> || Get Customers</RouterLink>
            <RouterLink to="/postcustomers" v-if="admin"> || Post Customers</RouterLink>
            <RouterLink to="/login" v-if="!token" class="absolute pr-2 right-0">login</RouterLink>
            <RouterLink to="/logout" v-if="token" class="absolute pr-2 right-0">logout</RouterLink>	
        </nav>
    </div>
    <div id="app">
        <RouterView />
    </div>
</template>
