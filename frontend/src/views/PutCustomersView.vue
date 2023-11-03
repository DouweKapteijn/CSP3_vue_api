<script setup>
import { ref, onMounted, reactive } from 'vue';

const data = ref(null);
const loading = ref(true);

onMounted(async () => {
    try {
        const response = await fetch('http://127.0.0.1:8080/CustomersData', {
            method: 'GET',
        });

        const res = await response.json();
        data.value = res;
        loading.value = false;
    } catch (error) {
        console.error(error);
        loading.value = false;
    }
});

const formData = reactive({
    id: '', // New field for customer ID to update
    fname: '',
    lname: '',
    uname: '',
    userrole: '',
    password: '',
});

const updateCustomer = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8080/CustomersData', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.status === 200) {
            // Row updated successfully, you can handle this as needed
        }
    } catch (error) {
        console.error(error);
    }
};
</script>

<template>
    <div>
        <!-- Existing code for displaying the list of customers -->
        
        <!-- Form to update a customer -->
        <form @submit.prevent="updateCustomer" class="bg-white rounded-lg p-4 shadow-md">
            <label for="id" class="block font-bold">Customer ID:</label>
            <input type="number" id="id" v-model="formData.id" required class="w-full border rounded px-3 py-2 mb-2">

            <label for="fname" class="block font-bold">First Name:</label>
            <input type="text" id="fname" v-model="formData.fname" required class="w-full border rounded px-3 py-2 mb-2">

            <label for="lname" class="block font-bold">Last Name:</label>
            <input type="text" id="lname" v-model="formData.lname" required class="w-full border rounded px-3 py-2 mb-2">

            <label for="uname" class="block font-bold">Username:</label>
            <input type="text" id="uname" v-model="formData.uname" required class="w-full border rounded px-3 py-2 mb-2">

            <label for="userrole" class="block font-bold">User Role:</label>
            <input type="text" id="userrole" v-model="formData.userrole" required class="w-full border rounded px-3 py-2 mb-2">

            <label for="password" class="block font-bold">Password:</label>
            <input type="password" id="password" v-model="formData.password" required class="w-full border rounded px-3 py-2 mb-2">

            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update Customer</button>
        </form>
    </div>
</template>

