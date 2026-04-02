import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/services/api";
import { FormUserEditPassData, UserDataProps } from "@/types/forms";
import axios from "axios";
import { useState } from "react";


export function useUserAPI() {

  const { login } = useAuth();

  // patients
  const [user, setUser] = useState<UserDataProps>();

  // loading
  const [isLoading, setIsLoading] = useState(false);

  
  ////// GET ///////
  
  // Function to load a health centers by user ID
  async function loadHealthCenterById(id: string | null) {
    try {
      const response = await api.get(`/health-center/${id}`);

      return response.data

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('AXIOS ERROR', error.message);
        console.log('CONFIG', error.config?.url);
      } else {
        console.log('UNKNOWN ERROR', error);
      }
    }
  }

  // Function to load a user by ID
  async function loadUserById(id: string | null) {
    try {
      const response = await api.get(`/users/${id}`);

      setUser(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('AXIOS ERROR', error.message);
        console.log('CONFIG', error.config?.url);
      } else {
        console.log('UNKNOWN ERROR', error);
      }
    }
  }



  ///// POST ///////

  // function to change password
  const changePassword = async (data: FormUserEditPassData) => {
      //  console.log(data);
  
      try {
        // 1. Envia patientData
        const response = await api.post(`/auth/change-password/`, 
          {
            "current_password": data.actualPassword, 
            "new_password": data.newPassword
          }, 
          {
          headers: {
            'Content-Type': 'application/json'
          },
        });
  
        // console.log("senha alterada com sucesso! novo token", response.data.token);

        await login(response.data.token)
  
  
      } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
          console.log('AXIOS ERROR', error.message);
          console.log('CONFIG', error.config?.url);
          if (error.response?.status === 400) {
            return { error: true, status: 400 };
          }
        }
      }
    }


  /////// PUT ///////

  //update patient data
  const updateUserData = async (data: any, id: string | string[]) => {
    try {
      const response = await api.patch(`/users/${id}/`, data);

      // reset();
      // setStep1(false)
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log('STATUS:', error.response?.status);
        console.log('HEADERS:', error.response?.headers);
        console.log('DATA:', JSON.stringify(error.response?.data, null, 2));
      } 
    }
  };

  const resetPassword = async (data: FormUserEditPassData, uid: string, token: string) => {
    // console.log(data, uid, token);
    try {
      const response = await api.post(`/auth/reset-password/`, 
        {"uid": uid, "token": token, "new_password": data.newPassword}, 
        {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      console.log("senha alterada com sucesso!");

      return response.data

    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {  
        console.log('AXIOS ERROR', error.message);
        console.log('CONFIG', error.config?.url);
        if (error.response?.status === 400) {
          return { error: true, status: 400 };
        }
      }
    }
  }


  return {
    updateUserData,
    loadHealthCenterById,
    loadUserById,
    user,
    changePassword,
    resetPassword
  };
}