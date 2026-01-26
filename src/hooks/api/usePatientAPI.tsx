import { api } from "@/services/api";
import { PatientProps } from "@/types/forms";
import axios from "axios";
import { useState } from "react";
import { useGeneralHealthForm } from "../useGeneralHealthForm";
import { usePatientForm } from "../usePatientForm";
import { usePatientId } from "../usePatientId";


export function usePatientAPI() {

  // patients
  const [patients, setPatients] = useState<PatientProps[]>([]);
  const [patient, setPatient] = useState<PatientProps>();
  const [patientsCount, setPatientsCount] = useState<number>(0);

  //pagination
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // loading
  const [isLoading, setIsLoading] = useState(false);

  //chronic diseases
  const [chronicDiseasesList, setChronicDiseasesList] = useState<string[]>([]);

  //medicines
  const [medicinesDataList, setMedicinesDataList] = useState<string[]>([]);

  // allergies
  const [allergiesDataList, setAllergiesDataList] = useState<string[]>([]);

  const { generalHealthData, setGeneralHealthData } = useGeneralHealthForm();
  const { updatePatientId } = usePatientId();
  const { setPatientData, patientData, setImages } = usePatientForm();

  

  ////// GET ///////
  
  // Function to load patients with pagination
  async function loadPatients() {

    
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const { data } = await api.get(`/patients/?page=${page}`);

      if (data.results) {
        const newPatients = data.results;
        setPatients(prev => [...prev, ...newPatients]);
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

  // function to load all patients
  async function loadAllPatients() {
    setIsLoading(true);

    try {
      const { data } = await api.get(`/patients/`);

      if (data) {
        setPatientsCount(data.count);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  // Function to load patients based on search query
  const loadPatientsSearch = async (pageNumber: number, search: string) => {
    if (isLoading || (!hasMore && search.length === 0)) return;
    setIsLoading(true);

    try {
      const endpoint = search.length > 0
        ? `/patients/?search=${encodeURIComponent(search)}`
        : `/patients/?page=${pageNumber}`;

      const { data } = await api.get(endpoint);
      const newPatients = data.results || [];

      setPatients(prev => pageNumber === 1 ? newPatients : [...prev, ...newPatients]);

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
  
  // Function to load a patient by ID
  async function loadPatientById(id: string | null) {
    try {
      // setIsLoadingPatients(true)
      const response = await api.get(`/patients/${id}`);

      setPatient(response.data);
      //console.log(response.data);

      // setIsLoadingPatients(false)
    } catch (error) {
      // setIsLoadingPatients(false);
      if (axios.isAxiosError(error)) {
        console.log('AXIOS ERROR', error.message);
        console.log('CONFIG', error.config?.url);
      } else {
        console.log('UNKNOWN ERROR', error);
      }
    }
  }

  // Check if patient already exists
  const checkIfPatientExists = async (search: any): Promise<boolean> => {
    try {
      const { data } = await api.get(`/patients/?search=${search}`);
      return data.results.length > 0;
    } catch (error) {
      console.log(error);
      return false;
    }
  };


  // load chronic diseases
  const loadChronicDiseases = async () => {
    try {
      const { data } = await api.get('/chronic-diseases/');

      if (data) {
        const onlyNames: string[] = data.map((item: { name: string }) => item.name);
        setChronicDiseasesList(onlyNames);
        //console.log(chronicDiseasesList);
        //console.log(data);
      }

    } catch (error) {
      console.log(error);
    }
  }

  // load medicines
  const loadMedicines = async () => {
    try {
      const { data } = await api.get('/medicines/');

      if (data) {
        const onlyNames: string[] = data.map((item: { name: string }) => item.name);
        setMedicinesDataList(onlyNames);
        //console.log(medicinesDataList);
      }

    } catch (error) {
      console.log(error);
    }
  }

  // load allergies
  const loadAllergies = async () => {
    try {
      const { data } = await api.get('/allergies/');

      if (data) {
        const onlyNames: string[] = data.map((item: { name: string }) => item.name);
        setAllergiesDataList(onlyNames);
        //console.log(allergiesDataList);
      }

    } catch (error) {
      console.log(error);
    }
  }



  ///// POST ///////

  // register patient

  const sendRegisterPatient = async () => {
     console.log(patientData);
    // console.log(generalHealthData)

    try {
      // 1. Envia patientData
      const response = await api.post(`/patients/`, 
        {
          "date_of_birth": patientData.date_of_birth, 
          "gender": patientData.gender,
          "other_gender": patientData.other_gender, 
          "phone_number": patientData.phone_number, 
          "sus_number": patientData.sus_number, 
          "user": {
            "cpf": patientData.user?.cpf, 
            "email": patientData.user?.email, 
            "name": patientData.user?.name
          }
        }, 
        {
        headers: {
          'Content-Type': 'application/json'
        },
      });

      console.log("patientData enviado com sucesso:", response.data);

      // // 2. Pega o user ID da resposta
       const userId = response.data?.user?.id;

      

      console.log("ID do usuário retornado:", userId);

      if (!userId) {
        console.error("ID do usuário não encontrado na resposta");
        return;
      }

      if (userId){

        // 3. Envia generalHealthData para a rota com userId
        const formattedChronicDiseases = generalHealthData.chronic_diseases && generalHealthData.chronic_diseases.length > 0 ? generalHealthData.chronic_diseases.map((d) => ({ name: d })) : [];

        const formattedMedicines = generalHealthData.medicines && generalHealthData.medicines.length > 0 ? generalHealthData.medicines.map((d) => ({ name: d })) : [];

        const formattedAllergies = generalHealthData.allergies && generalHealthData.allergies.length > 0 ? generalHealthData.allergies.map((d) => ({ name: d })) : [];


        console.log("Enviando generalHealthData com os seguintes dados:");
        // console.log({
        //   "surgeries": generalHealthData.surgeries,
        //   "physical_activity_frequency": generalHealthData.physical_activity_frequency,
        //   "chronic_diseases": formattedChronicDiseases,
        //   "medicines": formattedMedicines,
        //   "allergies": formattedAllergies
        // });
        // console.log(`/patients/${userId}/forms/general-health/`)

        
        const generalResponse = await api.post(
          `/patients/${userId}/forms/general-health/`,
          {
            "surgeries": generalHealthData.surgeries,
            "physical_activity_frequency": generalHealthData.physical_activity_frequency,
            "chronic_diseases": formattedChronicDiseases,
            "medicines": formattedMedicines,
            "allergies": formattedAllergies
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log("generalHealthData enviado com sucesso:", generalResponse.data);

        // 4. pega versao do termo de consentimento:
        const termVersionResponse = await api.get(`/consent-terms/latest/`);

        const termVersion = termVersionResponse.data?.id;

        console.log("ID do termo:", termVersion);

        if (!termVersion) {
          console.error("ID do termo não encontrado na resposta");
          return;
        }

        if(termVersion) {
          // 5. envia os termos:

          const form = new FormData();

          form.append("term", termVersion.toString());
          form.append("has_signed", "true");

          if (patientData.terms_photos && patientData.terms_photos.length > 0) {
            patientData.terms_photos.forEach((image, index) => {
              const filename = image.split("/").pop() || `image_${index}.jpg`;
              const ext = /\.(\w+)$/.exec(filename)?.[1] || "jpg";
              const mimeType = `image/${ext}`;

              form.append("images", {
                uri: image,
                type: mimeType,
                name: filename,
              } as any);
            });
          }

          console.log(form)

          const termsResponse = await api.post(
            `/patients/${userId}/consent/sign/`,
            form,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          console.log("Terms enviados com sucesso:", termsResponse.data);

          setPatientData({});
          setGeneralHealthData({});
          setImages([]);

          updatePatientId(userId.toString());

          // router.push("/(app)/(patient)/patient/[id]")


        }


      }
      

    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log('STATUS:', error.response?.status);
        console.log('HEADERS:', error.response?.headers);
        console.log('DATA:', JSON.stringify(error.response?.data, null, 2));
      } 
    }
  }


  /////// PUT ///////

  //update patient data
  const updatePatientData = async (data: any, id: string | string[]) => {
    try {
      const response = await api.patch(`/patients/${id}/`, data);

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


  return {
    patients, 
    setPatients, 
    page, 
    setPage, 
    hasMore, 
    setHasMore, 
    isLoading, 
    loadPatientsSearch,
    loadPatients,
    checkIfPatientExists,
    patient,
    loadPatientById,
    loadAllPatients,
    patientsCount,
    chronicDiseasesList,
    loadChronicDiseases,
    loadMedicines,
    medicinesDataList,
    allergiesDataList,
    loadAllergies,
    sendRegisterPatient,
    updatePatientData
  };
}