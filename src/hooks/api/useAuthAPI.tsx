import { api } from "@/services/api";
import { FormLoginData } from "@/types/forms";
import axios from "axios";



export function useAuthAPI() {

  const searchUser = async (cpf: string) => {
    try {
      const response = await api.get(`/users/?search=${cpf}`);
      return response.data;
    } catch (error) {
      console.error("Error in searchUser:", error);
      if (axios.isAxiosError(error)) {
        console.error('AXIOS ERROR', error.message);
        console.error('CONFIG', error.config?.url); 
        if (error.response?.status === 404) {
          return { error: true, status: 404 };
        } 
      }
    }
  };

  const loginUser = async (data: FormLoginData) => {
    try {
      console.log("dados para login:", data);
      const response = await api.post(`/auth/login/`, data);

      console.log("fez login");

      return response.data;

    } catch (error) {

      console.log("erro ao fazer login:", error);

      if (axios.isAxiosError(error)) {
        console.log('AXIOS ERROR', error.message);
        console.log('CONFIG', error.config?.url);
        if (error.response?.status === 400) {
          return { error: true, status: 400 };
        }
      }

      }
  };

  const forgotPassword = async (email: string) => {
    try {
      const response = await api.post(`/auth/forgot-password/`, { email });
      return response.data;
    } catch (error) {
      console.error("Error in forgotPassword:", error);
      if (axios.isAxiosError(error)) {
        console.error('AXIOS ERROR', error.message);
        console.error('CONFIG', error.config?.url);
        if (error.response?.status === 400) {
          return { error: true, status: 400 };
        }
      }
    }
  };


  return { loginUser, forgotPassword, searchUser };
}