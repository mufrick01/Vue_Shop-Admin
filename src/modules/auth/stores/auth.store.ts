import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { AuthStatus, type User } from '../interfaces';
import { loginAction, registerAction } from '../actions';
import { useLocalStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.Checking);
  const user = ref<User | undefined>();
  const token = ref(useLocalStorage('token', ''));

  const logOut = () => {
    authStatus.value = AuthStatus.Unauthenticated;
    user.value = undefined;
    token.value = '';
    return false;
  };

  const login = async (email: string, password: string) => {
    try {
      const loginResponse = await loginAction(email, password);

      if (!loginResponse.ok) {
        return logOut();
      }

      user.value = loginResponse.user;
      token.value = loginResponse.token;
      authStatus.value = AuthStatus.Authenticated;
      return true;
    } catch (error) {
      console.error(error);
      return logOut();
    }
  };

  const register = async (fullName: string, email: string, password: string) => {
    try {
      const registerResponse = await registerAction(fullName, email, password);

      if (!registerResponse.ok) {
        return logOut();
      }

      user.value = registerResponse.user;
      token.value = registerResponse.token;
      authStatus.value = AuthStatus.Authenticated;
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    user,
    token,
    authStatus,
    // Getters
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),

    // TODO: getter for admin role
    userName: computed(() => user.value?.fullName),

    // Actions
    login,
    register,
  };
});
