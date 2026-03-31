import { api } from "@/services/api";
import { ProfissionalProps } from "@/types/forms";
import axios from "axios";
import { useState } from "react";
import { useHealthCenterId } from "../useHealthCenterId";
import { useProfissionalForm } from "../useProfissionalForm";


export function useProfessionalAPI() {

  // professionals
  const [professional, setProfessional] = useState<ProfissionalProps>();
  const [professionals, setProfessionals] = useState<ProfissionalProps[]>([]);

  const [professionalsCount, setProfessionalsCount] = useState<number>(0);

  const { profissionalData, setProfissionalData } = useProfissionalForm();


  // loading
  const [isLoading, setIsLoading] = useState(false);

  //pagination
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // health center id
  const { healthCenterId } = useHealthCenterId();

  


  ////// GET ///////

   // Function to load professionals with pagination
  async function loadProfessionals() {

    
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      //console.log("HEADER AUTH:", api.defaults.headers.Authorization);
      const { data } = await api.get(`/professionals/?page=${page}`);

      if (data.results) {
        const newProfessionals = data.results;
        setProfessionals(prev => [...prev, ...newProfessionals]);
        //console.log(data.next);
      }

      if(data.next){
        setPage(prev => prev + 1);
      } else {
        setHasMore(false);
        //console.log("has more false");
      }

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  
  // Function to load professionals by health unity with pagination
  async function loadProfessionalsByHealthUnity(id: string | null) {

    
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const { data } = await api.get(`/health-units/${id}/professionals/?page=${page}`);

      if (data) {
        setProfessionalsCount(data.count);
      }

      if (data.results) {
        const newProfessionals = data.results;
        setProfessionals(prev => [...prev, ...newProfessionals]);
      }

      if(data.next){
        setPage(prev => prev + 1);
      } else {
        setHasMore(false);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  // function to load all professionals
  async function loadAllProfessionals() {
    setIsLoading(true);

    try {
      const { data } = await api.get(`/professionals/`);

      if (data) {
        setProfessionalsCount(data.count);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  // Function to load professionals based on search query
  const loadProfessionalsSearch = async (pageNumber: number, search: string) => {
    if (isLoading || (!hasMore && search.length === 0)) return;
    setIsLoading(true);

    try {
      const endpoint = search.length > 0
        ? `/professionals/?search=${encodeURIComponent(search)}`
        : `/professionals/?page=${pageNumber}`;

      const { data } = await api.get(endpoint);
      const newProfessionals = data.results || [];

      setProfessionals(prev => pageNumber === 1 ? newProfessionals : [...prev, ...newProfessionals]);

      if (search.length === 0 && data.next) {
        setHasMore(true);
        setPage(prev => prev + 1);
      } else if (search.length === 0) {
        setHasMore(false);
      }
      
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to load a professional by ID
  async function loadProfessionalById(id: string | null) {
    try {
      // setIsLoadingProfessionals(true)
      const response = await api.get(`/professionals/${id}`);
      setProfessional(response.data);
      //console.log(response.data);

      // setIsLoadingProfessionals(false)
    } catch (error) {
      // setIsLoadingProfessionals(false);
      if (axios.isAxiosError(error)) {
        console.log('AXIOS ERROR', error.message);
        console.log('CONFIG', error.config?.url);
      } else {
        console.log('UNKNOWN ERROR', error);
      }
    }
  }

  // Check if professional already exists
  const checkIfProfessionalExists = async (search: any): Promise<boolean> => {
    try {
      const { data } = await api.get(`/professionals/?search=${search}`);
      return data.results.length > 0;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  

  // Search if professional exists
  const searchProfessional = async (search: any): Promise<boolean> => {
    try {
      const { data } = await api.get(`/professionals/?search=${search}`);
      return data.results.length > 0;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getProfessionalByCPF = async (cpf: string | string[]) => {
    try {
      const { data } = await api.get(`/professionals/?search=${cpf}`);
      console.log(data.results[0])
      setProfessional(data.results[0])
    } catch (error) {
      console.log(error);
    }
  }

  // get invitation token data
  const getInvitationTokenData = async (token: string) => {
    try {
      const { data } = await api.get(`/auth/invitations/${token}/`);
      return data;
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
  };

  ///// POST ///////

  // Create a new professional
  const createProfessional = async () => {

    console.log(profissionalData)

    try {
      const response = await api.post(`/professionals/`, 
        {
          "name": profissionalData.name, 
          "email": profissionalData.email,
          "cpf": profissionalData.cpf,
          "health_unit": healthCenterId,
          "permission_role": "technician"
        }, 
        {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      
      console.log("profissional cadastrado com sucesso:", response.data);
      setProfissionalData({});

    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log('STATUS:', error.response?.status);
        console.log('HEADERS:', error.response?.headers);
        console.log('DATA:', JSON.stringify(error.response?.data, null, 2));
      } 
    }
  };

  // Create a new professional
  const inviteProfessional = async () => {

    console.log(professional)

    try {
      const response = await api.post(`/professionals/`, 
        {
          "name": professional?.user?.name, 
          "email": professional?.user?.email,
          "cpf": professional?.user?.cpf,
          "health_unit": healthCenterId
        }, 
        {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      
      console.log("profissional vinculado com sucesso:", response.data);

    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log('STATUS:', error.response?.status);
        console.log('HEADERS:', error.response?.headers);
        console.log('DATA:', JSON.stringify(error.response?.data, null, 2));
        if (error.response?.status === 400) {
          return { error: true, status: 400 };
        }
      } 
    }
  };

  // complete professional registration (set password)
  const completeProfessionalRegistration = async (data: any, token: string) => {
    try {
      const response = await api.post(`/auth/invitations/${token}/complete/`, 
        {
          "password": data.newPassword
        }, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      console.log("profissional cadastro completo com sucesso:", response.data);

    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log('STATUS:', error.response?.status);
        console.log('HEADERS:', error.response?.headers);
        console.log('DATA:', JSON.stringify(error.response?.data, null, 2));
      }
    }
  };


  /////// PUT ///////

  //update professional data
  const updateProfessionalData = async (data: any, id: string | string[]) => {
    try {
      const response = await api.patch(`/professionals/${id}/`, data);

    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log('STATUS:', error.response?.status);
        console.log('HEADERS:', error.response?.headers);
        console.log('DATA:', JSON.stringify(error.response?.data, null, 2));
      } 
    }
  };
  


  return {
    searchProfessional,
    getProfessionalByCPF,
    professional,
    professionals,
    professionalsCount,
    loadProfessionals,
    loadProfessionalsByHealthUnity,
    loadAllProfessionals,
    loadProfessionalById,
    checkIfProfessionalExists,
    isLoading,
    hasMore,
    setProfessional,
    setProfessionals,
    page,
    setPage,
    setHasMore,
    loadProfessionalsSearch,
    updateProfessionalData,
    createProfessional,
    completeProfessionalRegistration,
    getInvitationTokenData,
    inviteProfessional
  };
}