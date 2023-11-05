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
    fname: '',
    lname: '',
    uname: '',
    userrole: '', 
    password: '',
});

const addCustomer = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8080/CustomersData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.status === 201) {
            // Item added successfully
        }
    } catch (error) {
        console.error(error);
    }
};
</script>

<template>
    <div>
        <form @submit.prevent="addCustomer" class="bg-white rounded-lg p-4 shadow-md">
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

            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Customer</button>
        </form>
    </div>
</template>
