<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
    <div class="w-full bg-blue-300">
        <nav class="flex space-x-2">
            <RouterLink to="/">Home</RouterLink>
            ||
            <RouterLink to="/about">About</RouterLink>
            ||
            <RouterLink to="/getcustomers">Get Customers</RouterLink>
            ||
            <RouterLink to="/postcustomers">Post Customers</RouterLink>
        </nav>
    </div>
    <div id="app">
        <RouterView />
    </div>
</template>
