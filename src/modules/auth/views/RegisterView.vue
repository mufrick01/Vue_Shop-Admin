<template>
  <h1 class="text-2xl font-semibold mb-4">Nueva cuenta</h1>
  <form @submit.prevent="onRegister">
    <!-- Username Input -->
    <div class="mb-4">
      <label for="name" class="block text-gray-600">Nombre</label>
      <input v-model="myForm.fullName" ref="fullNameInputRef" type="text" id="name" name="name"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off" />
    </div>

    <!-- Username Input -->
    <div class="mb-4">
      <label for="username" class="block text-gray-600">Correo</label>
      <input v-model="myForm.email" ref="emailInputRef" type="email" id="username" name="username"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off" />
    </div>
    <!-- Password Input -->
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Contraseña</label>
      <input v-model="myForm.password" ref="passwordInputRef" type="password" id="password" name="password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off" />
    </div>
    <!-- Forgot Password Link -->
    <div class="mb-6 text-blue-500">
      <a href="#" class="hover:underline">¿Olvidó la contraseña?</a>
    </div>
    <!-- Login Button -->
    <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">
      Crear cuenta
    </button>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center">
    <RouterLink :to="{ name: 'login' }" class="hover:underline">Ingresar por aquí</RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useAuthStore } from '../stores/auth.store';
import { useToast } from 'vue-toastification';

const toast = useToast();

const emailInputRef = ref<HTMLInputElement | null>(null);
const passwordInputRef = ref<HTMLInputElement | null>(null);
const fullNameInputRef = ref<HTMLInputElement | null>(null);

const myForm = reactive({
  fullName: '',
  email: '',
  password: ''
});


const useAuth = useAuthStore();




const onRegister = async () => {

  if (myForm.fullName.length === 0) {
    fullNameInputRef.value?.focus();
    return toast.error('El nombre es requerido');

  }

  if (myForm.email === '') {
    emailInputRef.value?.focus();
    return toast.error('El correo es requerido');
  }

  if (myForm.password.length < 6) {
    passwordInputRef.value?.focus();
    return toast.error('La contraseña debe tener al menos 6 caracteres');
  }


  const ok = await useAuth.register(myForm.fullName, myForm.email, myForm.password);
  if (!ok) {
    emailInputRef.value?.focus();
    return toast.error('El correo ya está registrado');
  }


  toast.success('Cuenta creada exitosamente');
};

</script>
