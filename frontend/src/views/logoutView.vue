<script setup>
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const logout = () => {
        localStorage.removeItem('jwtToken');
        router.push('/login');
        location.reload();
    };
</script>

<template>
  <div class="p-4">
    <div class="mt-4 bg-white rounded-lg shadow-md p-4">
      <p class="mb-4 text-red-500 font-semibold">You are about to log out. Are you sure?</p>

      <button @click="logout" type="submit" class="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
        Log out
      </button>
    </div>
  </div>
</template>  