<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const data = ref(null);
const loading = ref(true);

onMounted(async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8080/CustomersData');

        data.value = response.data;
        loading.value = false;
    } catch (error) {
        console.error(error);
        loading.value = false;
    }
});
</script>

<template>
    <div>
        <div v-if="loading" class="text-center py-4">Loading...</div>
        <div class="mb-6 bg-white rounded-lg p-3" v-else>
            <ul>
                <li v-for="user in data.message" :key="user.id" class="mb-4">
                    <p class="text-xl font-semibold mb-2">ID: {{ user.id }}</p>
                    <p class="mb-2">First Name: {{ user.fname }}</p>
                    <p class="mb-2">Last Name: {{ user.lname }}</p>
                    <p class="mb-2">Username: {{ user.uname }}</p>
                    <p class="mb-2">User Role: {{ user.userrole }}</p>
                    <p class="mb-2">Password: {{ user.password }}</p>
                    <p class="mb-2">
                        <router-link :to="'/patchcustomers/' + user.id" class="border-solid bg-gray-300 border-gray-400 border-2">Update</router-link>
                    </p>
                    <p class="mb-2">
                        <router-link :to="'/deletecustomers/' + user.id" class="border-solid bg-gray-300 border-gray-400 border-2">Delete</router-link>
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>

