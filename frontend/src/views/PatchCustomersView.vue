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
    id: null,
    fname: null,
    lname: null,
    uname: null,
    userrole: null,
    password: null,
});

const updateCustomer = async () => {
    const dataToUpdate = {};
    for (const key in formData) {
        if (formData[key] !== null && formData[key] !== '') {
            dataToUpdate[key] = formData[key];
        }
    }

    try {
        const response = await fetch('http://127.0.0.1:8080/CustomersData', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToUpdate),
        });

        if (response.status === 200) {
            for (const key in formData) {
                formData[key] = null;
            }
        }
    } catch (error) {
        console.error(error);
    }
};
</script>

<template>
    <div>
        <form @submit.prevent="updateCustomer" class="mb-4 p-4 border rounded-lg">
            <label for="id" class="block">Customer ID:</label>
            <input type="number" id="id" v-model="formData.id" required class="block border p-2 w-full mb-2">

            <label for="fname" class="block">First Name:</label>
            <input type="text" id="fname" v-model="formData.fname" class="block border p-2 w-full mb-2">

            <label for="lname" class="block">Last Name:</label>
            <input type="text" id="lname" v-model="formData.lname" class="block border p-2 w-full mb-2">

            <label for="uname" class="block">Username:</label>
            <input type="text" id="uname" v-model="formData.uname" class="block border p-2 w-full mb-2">

            <label for="userrole" class="block">User Role:</label>
            <input type="text" id="userrole" v-model="formData.userrole" class="block border p-2 w-full mb-2">

            <label for="password" class="block">Password:</label>
            <input type="password" id="password" v-model="formData.password" class="block border p-2 w-full mb-2">

            <button type="submit" class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Update Customer</button>
        </form>
    </div>
</template>

