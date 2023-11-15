<script setup>
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();  // useRoute is used to access the current route
const router = useRouter(); // useRouter is used to access the router instance
const data = ref(null);
const loading = ref(true);
const id = ref(route.params.id); // Using ref to make it reactive

const formData = reactive({
    fname: null,
    lname: null,
    uname: null,
    userrole: null,
    password: null,
});

onMounted(async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8080/CustomersData/${id.value}`);
        data.value = response.data;
        loading.value = false;

        // Log the fetched data
        // console.log('Fetched Data:', response.data);

        // Populate the form with old data
        const user = response.data.message[0]; // Assuming the response is an array
        formData.fname = user.fname;
        formData.lname = user.lname;
        formData.uname = user.uname;
        formData.userrole = user.userrole;
        formData.password = user.password;

    } catch (error) {
        // console.error('Error Fetching Data:', error);
        loading.value = false;
    }
});

const updateCustomer = async () => {
    const dataToUpdate = {};
    for (const key in formData) {
        if (formData[key] !== null && formData[key] !== '') {
            dataToUpdate[key] = formData[key];
        }
    }

    try {
        const response = await axios.patch(`http://127.0.0.1:8080/CustomersData/${id.value}`, dataToUpdate, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            for (const key in formData) {
                formData[key] = null;
            }

            router.push('/getcustomers');
        }
    } catch (error) {
        console.error(error);
    }
};
</script>

<template>
    <div>
        <form @submit.prevent="updateCustomer" class="mb-4 p-4 border rounded-lg">
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
