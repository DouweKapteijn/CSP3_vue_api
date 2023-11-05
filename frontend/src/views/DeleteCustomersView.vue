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
    id: '',
});

const deleteCustomer = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8080/CustomersData', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.status === 200) {
            formData.id = '';
        }
    } catch (error) {
        console.error(error);
    }
};
</script>

<template>
    <div class="p-4">
        <form @submit.prevent="deleteCustomer" class="mt-4 bg-white rounded-lg shadow-md p-4">
            <label for="id" class="block font-semibold">Customer ID:</label>
            <input type="number" id="id" v-model="formData.id" required
                class="w-full mt-2 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300">

            <button type="submit" class="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                Delete Customer
            </button>
        </form>
    </div>
</template>

