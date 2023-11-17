<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const formData = ref({ uname: '', password: '' });

    const login = async () => {
    try {
        const response = await axios.post('http://127.0.0.1:8080/login', formData.value);
        localStorage.setItem('jwtToken', response.data.token);
        router.push('/');
        location.reload();
    } catch (error) {
        console.error(error);
    }
};

</script>

<template>
    <div>
        <form @submit.prevent="login" class="bg-white rounded-lg p-4 shadow-md">
            <label for="uname" class="block font-bold">Username:</label>
            <input type="text" id="uname" v-model="formData.uname" required class="w-full border rounded px-3 py-2 mb-2">
    
            <label for="password" class="block font-bold">Password:</label>
            <input type="password" id="password" v-model="formData.password" required class="w-full border rounded px-3 py-2 mb-2">
    
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
        </form>
    </div>
</template>