import { api } from "@/services/api";
import { ProfissionalProps } from "@/types/forms";
import { useState } from "react";


export function useProfessionalAPI() {
  const [professional, setProfessional] = useState<ProfissionalProps>();
  


  ////// GET ///////
  

  // Search if professional exists
  const searchProfessional = async (search: any): Promise<boolean> => {
    try {
      const { data } = await api.get(`/patients/?search=${search}`);
      return data.results.length > 0;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getProfessionalByCPF = async (cpf: string | string[]) => {
    try {
      const { data } = await api.get(`/patients/?search=${cpf}`);
      console.log(data.results[0])
      setProfessional(data.results[0])
    } catch (error) {
      console.log(error);
    }
  }
  


  return {
    searchProfessional,
    getProfessionalByCPF,
    professional
  };
}