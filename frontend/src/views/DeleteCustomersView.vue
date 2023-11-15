<script setup>
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const data = ref(null);
const loading = ref(true);
const id = ref(route.params.id);

const formData = reactive({
    id: '',
});

onMounted(async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8080/CustomersData/${id.value}`);

        data.value = response.data;
        loading.value = false;
    } catch (error) {
        console.error(error);
        loading.value = false;
    }
});

const deleteCustomer = async () => {
    try {
        // Display a confirmation message before deletion
        const confirmDelete = window.confirm(`Are you sure you want to delete customer ${id.value}?`);
        
        if (confirmDelete) {
            const response = await axios.delete(`http://127.0.0.1:8080/CustomersData/${id.value}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                router.push('/getcustomers');
            }
        }
    } catch (error) {
        console.error(error);
    }
};
</script>

<template>
    <div class="p-4">
        <form @submit.prevent="deleteCustomer" class="mt-4 bg-white rounded-lg shadow-md p-4">
            <p class="mb-4 text-red-500 font-semibold">You are about to delete customer {{ id }}. Are you sure?</p>

            <button type="submit" class="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
                Delete Customer
            </button>
        </form>
    </div>
</template>
