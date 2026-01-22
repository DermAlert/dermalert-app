import { useUlceraCareSupportForm } from "@/hooks/Ulcera/useUlceraCareSupportForm";
import { useUlceraFamilyHistoryForm } from "@/hooks/Ulcera/useUlceraFamilyHistoryForm";
import { useUlceraHealthHistoryForm } from "@/hooks/Ulcera/useUlceraHealthHistoryForm";
import { useUlceraRiskLifestyleForm } from "@/hooks/Ulcera/useUlceraRiskLifestyleForm";
import { useUlceraUlcerInfoForm } from "@/hooks/Ulcera/useUlceraUlcerInfoForm";
import { api } from "@/services/api";
import { UlceraCareSupportProps, UlceraFamilyHistoryProps, UlceraHealthHistoryProps, UlceraRiskLifestyleProps, UlceraUlcerInfoProps } from "@/types/forms";
import axios from "axios";
import { useState } from "react";


export function useUlceraAnamnesisAPI() {
  // health history
  const [healthHistory, setHealthHistory] = useState<UlceraHealthHistoryProps>();
  const { ulceraHealthHistoryData, setUlceraHealthHistoryData, updateUlceraHealthHistoryData } = useUlceraHealthHistoryForm();
  
  // risk lifestyle
  const [riskLifestyle, setRiskLifestyle] = useState<UlceraRiskLifestyleProps>();
  const { ulceraRiskLifestyleData, setUlceraRiskLifestyleData } = useUlceraRiskLifestyleForm();
  
  //family history
  const [familyHistory, setFamilyHistory] = useState<UlceraFamilyHistoryProps>();
  const { ulceraFamilyHistoryData, setUlceraFamilyHistoryData } = useUlceraFamilyHistoryForm();

  // ulcer info
  const [ulcerInfo, setUlcerInfo] = useState<UlceraUlcerInfoProps>();
  const { ulceraUlcerInfoData, setUlceraUlcerInfoData } = useUlceraUlcerInfoForm();
  

  // care support
  const [careSupport, setCareSupport] = useState<UlceraCareSupportProps>();
  const { ulceraCareSupportData, setUlceraCareSupportData, updateUlceraCareSupportData } = useUlceraCareSupportForm();



  
  
  ////// GET //////
  
  //load health history
  async function loadHealthHistory(id: string | null) {
    try {
      const { data } = await api.get(`/patients/${id}/forms/clinical-history/`);

      setHealthHistory(data);
    } catch (error) {
      console.log(error);
    } 
  }

  //load risk lifestyle
  async function loadRiskLifestyle(id: string | null) {
    try {
      const { data } = await api.get(`/patients/${id}/forms/lifestyle-risk/`);
      setRiskLifestyle(data);

    } catch (error) {
      console.log(error);
    } 
  }

  // load family history
  async function loadFamilyHistory(id: string | null) {
    try {
      const { data } = await api.get(`/patients/${id}/forms/family-vascular-history/`);

      setFamilyHistory(data);

    } catch (error) {
      console.log(error);
    } 
  }

  // load ulcer info
  async function loadUlcerInfo(id: string | null) {
    try {
      const { data } = await api.get(`/patients/${id}/forms/current-ulcer-info/`);
      setUlcerInfo(data);

    } catch (error) {
      console.log(error);
    } 
  }

  // load care support
  async function loadCareSupport(id: string | null) {
    try {
      const { data } = await api.get(`/patients/${id}/forms/care-access-support/`);
      setCareSupport(data);

    } catch (error) {
      console.log(error);
    } 
  }


  ////// POST ///////

  // send anamnesis ulcera health history
  const sendAnamnesisUlceraHealthHistory = async (patientId: string | null) => {
    try {
      // 1. Envia Histórico clinico geral

      console.log("Enviando ulceraHealthHistoryData com os seguintes dados:");
      // console.log({
      //   "hypertension": ulceraHealthHistoryData.hypertension,
      //   "diabetes": ulceraHealthHistoryData.diabetes,
      //   "deep_vein_thrombosis": ulceraHealthHistoryData.deep_vein_thrombosis,
      //   "chronic_venous_insufficiency": ulceraHealthHistoryData.chronic_venous_insufficiency,
      //   "compression_stockings_use": ulceraHealthHistoryData.compression_stockings_use,
      // });

      const ulceraHealthHistoryResponse = await api.post(
        `/patients/${patientId}/forms/clinical-history/`,
        {
          "hypertension": ulceraHealthHistoryData.hypertension,
          "diabetes": ulceraHealthHistoryData.diabetes,
          "deep_vein_thrombosis": ulceraHealthHistoryData.deep_vein_thrombosis,
          "chronic_venous_insufficiency": ulceraHealthHistoryData.chronic_venous_insufficiency,
          "compression_stockings_use": ulceraHealthHistoryData.compression_stockings_use,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("ulceraHealthHistoryData enviado com sucesso:", ulceraHealthHistoryResponse.data);

      setUlceraHealthHistoryData({});

    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log('STATUS:', error.response?.status);
        console.log('HEADERS:', error.response?.headers);
        console.log('DATA:', JSON.stringify(error.response?.data, null, 2));
      } 
    }
    
  }

  // send anamnesis ulcera risk lifestyle
  const sendAnamnesisUlceraRiskLifestyle = async (patientId: string | null) => {
    try {
      // 2. Envia Fatores de risco e estilo de vida

      console.log("Enviando ulceraRiskLifestyleData com os seguintes dados:");
      // console.log({
      //   "long_periods_posture": ulceraRiskLifestyleData.long_periods_posture,
      //   "leg_foot_trauma": ulceraRiskLifestyleData.leg_foot_trauma,
      //   "smoking": ulceraRiskLifestyleData.smoking,
      //   "physical_activity": ulceraRiskLifestyleData.physical_activity,
      // });

      const ulceraRiskLifestyleResponse = await api.post(
        `/patients/${patientId}/forms/lifestyle-risk/`,
        {
          "long_periods_posture": ulceraRiskLifestyleData.long_periods_posture,
        "leg_foot_trauma": ulceraRiskLifestyleData.leg_foot_trauma,
        "smoking": ulceraRiskLifestyleData.smoking,
        "physical_activity": ulceraRiskLifestyleData.physical_activity,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("ulceraRiskLifestyleData enviado com sucesso:", ulceraRiskLifestyleResponse.data);

      setUlceraRiskLifestyleData({});
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log('STATUS:', error.response?.status);
        console.log('HEADERS:', error.response?.headers);
        console.log('DATA:', JSON.stringify(error.response?.data, null, 2));
      } 
    }
    
  }

  // send anamnesis ulcera family history
  const sendAnamnesisUlceraFamilyHistory = async (patientId: string | null) => {
    try {
      // 3. Envia Historico familiar

      console.log("Enviando ulceraFamilyHistoryData com os seguintes dados:");
      // console.log({
      //   "family_leg_ulcers": ulceraFamilyHistoryData.family_leg_ulcers,
      //   "family_varicose_or_circulatory": ulceraFamilyHistoryData.family_varicose_or_circulatory
      // });

      const ulceraFamilyHistoryResponse = await api.post(
        `/patients/${patientId}/forms/family-vascular-history/`,
        {
          "family_leg_ulcers": ulceraFamilyHistoryData.family_leg_ulcers,
          "family_varicose_or_circulatory": ulceraFamilyHistoryData.family_varicose_or_circulatory
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("ulceraFamilyHistoryData enviado com sucesso:", ulceraFamilyHistoryResponse.data);

      setUlceraFamilyHistoryData({});
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log('STATUS:', error.response?.status);
        console.log('HEADERS:', error.response?.headers);
        console.log('DATA:', JSON.stringify(error.response?.data, null, 2));
      } 
    }
    
  }

  // send anamnesis ulcera ulcer info
  const sendAnamnesisUlceraUlcerInfo = async (patientId: string | null) => {
    try{
      // 4. Envia Informações sobre a ulcera atual

      console.log("Enviando ulceraUlcerInfoData com os seguintes dados:");
      // console.log({
      //   "how_long": ulceraUlcerInfoData.how_long,
      //   "treated_elsewhere": ulceraUlcerInfoData.treated_elsewhere,
      //   "used_antibiotics": ulceraUlcerInfoData.used_antibiotics,
      // });

      const ulceraUlcerInfoResponse = await api.post(
        `/patients/${patientId}/forms/current-ulcer-info/`,
        {
          "how_long": ulceraUlcerInfoData.how_long,
          "treated_elsewhere": ulceraUlcerInfoData.treated_elsewhere,
          "used_antibiotics": ulceraUlcerInfoData.used_antibiotics,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("ulceraUlcerInfoData enviado com sucesso:", ulceraUlcerInfoResponse.data);

      setUlceraUlcerInfoData({});
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log('STATUS:', error.response?.status);
        console.log('HEADERS:', error.response?.headers);
        console.log('DATA:', JSON.stringify(error.response?.data, null, 2));
      } 
    }
    
  }

  // send anamnesis ulcera care support
  const sendAnamnesisUlceraCareSupport = async (patientId: string | null) => {
    try {
      // 5. Envia Acesso a cuidados e suporte

      console.log("Enviando ulceraCareSupportData com os seguintes dados:");
      // console.log({
      //   "has_dressings_available": ulceraCareSupportData.has_dressings_available,
      //   "has_help_at_home": ulceraCareSupportData.has_help_at_home
      // });

      const ulceraCareSupportResponse = await api.post(
        `/patients/${patientId}/forms/care-access-support/`,
        {
          "has_dressings_available": ulceraCareSupportData.has_dressings_available,
          "has_help_at_home": ulceraCareSupportData.has_help_at_home
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("ulceraCareSupportData enviado com sucesso:", ulceraCareSupportResponse.data);

      setUlceraCareSupportData({});
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log('STATUS:', error.response?.status);
        console.log('HEADERS:', error.response?.headers);
        console.log('DATA:', JSON.stringify(error.response?.data, null, 2));
      } 
    }
    
  }


  


  ////// PUT ///////

  // update health history
  const updateAnamnesisUlceraHealthHistory = async (id: string | null) => {
    console.log(id);

    try {
      // 1. Atualizar Histórico clinico geral

      const responseResult = await api.get(`/patients/${id}/forms/clinical-history/`);

      const dataId = responseResult.data.id;

      if(dataId){

        console.log("Enviando ulceraHealthHistoryData com os seguintes dados:");
        // console.log({
        //   "hypertension": ulceraHealthHistoryData.hypertension,
        //   "diabetes": ulceraHealthHistoryData.diabetes,
        //   "deep_vein_thrombosis": ulceraHealthHistoryData.deep_vein_thrombosis,
        //   "chronic_venous_insufficiency": ulceraHealthHistoryData.chronic_venous_insufficiency,
        //   "compression_stockings_use": ulceraHealthHistoryData.compression_stockings_use,
        // });

        const ulceraHealthHistoryResponse = await api.put(
          `/patients/${id}/forms/clinical-history/${dataId}/`,
          {
            "hypertension": ulceraHealthHistoryData.hypertension,
            "diabetes": ulceraHealthHistoryData.diabetes,
            "deep_vein_thrombosis": ulceraHealthHistoryData.deep_vein_thrombosis,
            "chronic_venous_insufficiency": ulceraHealthHistoryData.chronic_venous_insufficiency,
            "compression_stockings_use": ulceraHealthHistoryData.compression_stockings_use,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log("ulceraHealthHistoryData atualizado com sucesso:", ulceraHealthHistoryResponse.data);

        setUlceraHealthHistoryData({});

        // router.push('/(app)/(patient)/lesao/anamnesis/ulcera/healthHistory');
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

  // update risk lifestyle
  const updateAnamnesisUlceraRiskLifestyle = async (id: string | null) => {
    console.log(id);

    try {
      // 1. Atualizar Fatores de risco e estilo de vida

      const responseResult = await api.get(`/patients/${id}/forms/lifestyle-risk/`);

      const dataId = responseResult.data.id;

      if(dataId){

        console.log("Enviando ulceraRiskLifestyleData com os seguintes dados:");
        // console.log({
            // "long_periods_posture": ulceraRiskLifestyleData.long_periods_posture,
            // "leg_foot_trauma": ulceraRiskLifestyleData.leg_foot_trauma,
            // "smoking": ulceraRiskLifestyleData.smoking,
            // "physical_activity": ulceraRiskLifestyleData.physical_activity,
        // });

        const ulceraHealthHistoryResponse = await api.put(
          `/patients/${id}/forms/lifestyle-risk/${dataId}/`,
          {
            "long_periods_posture": ulceraRiskLifestyleData.long_periods_posture,
            "leg_foot_trauma": ulceraRiskLifestyleData.leg_foot_trauma,
            "smoking": ulceraRiskLifestyleData.smoking,
            "physical_activity": ulceraRiskLifestyleData.physical_activity,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log("ulceraRiskLifestyleData atualizado com sucesso:", ulceraHealthHistoryResponse.data);

        setUlceraRiskLifestyleData({});

        // router.push('/(app)/(patient)/lesao/anamnesis/ulcera/riskLifestyle');
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

  // update family history
  const updateAnamnesisUlceraFamilyHistory = async (id: string | null) => {
    console.log(id);

    try {
      // 1. Atualizar Histórico clinico geral

      const responseResult = await api.get(`/patients/${id}/forms/family-vascular-history/`);

      const dataId = responseResult.data.id;

      if(dataId){

        console.log("Enviando ulceraFamilyHistoryData com os seguintes dados:");
        // console.log({
          // "family_leg_ulcers": ulceraFamilyHistoryData.family_leg_ulcers,
          // "family_varicose_or_circulatory": ulceraFamilyHistoryData.family_varicose_or_circulatory
        // });

        const ulceraFamilyHistoryDataResponse = await api.put(
          `/patients/${id}/forms/family-vascular-history/${dataId}/`,
          {
            "family_leg_ulcers": ulceraFamilyHistoryData.family_leg_ulcers,
            "family_varicose_or_circulatory": ulceraFamilyHistoryData.family_varicose_or_circulatory
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log("ulceraFamilyHistoryData atualizado com sucesso:", ulceraFamilyHistoryDataResponse.data);

        setUlceraFamilyHistoryData({});

        // router.push('/(app)/(patient)/lesao/anamnesis/ulcera/familyHistory');
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

  // update ulcer info
  const updateAnamnesisUlceraUlcerInfo = async (id: string | null) => {
    console.log(id);

    try {
      // 1. Atualizar Info ulcera

      const responseResult = await api.get(`/patients/${id}/forms/current-ulcer-info/`);

      const dataId = responseResult.data.id;

      if(dataId){

        console.log("Enviando ulceraUlcerInfoData com os seguintes dados:");
        // console.log({
          // "how_long": ulceraUlcerInfoData.how_long,
          // "treated_elsewhere": ulceraUlcerInfoData.treated_elsewhere,
          // "used_antibiotics": ulceraUlcerInfoData.used_antibiotics,
        // });

        const ulceraUlcerInfoResponse = await api.put(
          `/patients/${id}/forms/current-ulcer-info/${dataId}/`,
          {
            "how_long": ulceraUlcerInfoData.how_long,
            "treated_elsewhere": ulceraUlcerInfoData.treated_elsewhere,
            "used_antibiotics": ulceraUlcerInfoData.used_antibiotics,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log("ulceraUlcerInfoData atualizado com sucesso:", ulceraUlcerInfoResponse.data);

        setUlceraUlcerInfoData({});

        // router.push('/(app)/(patient)/lesao/anamnesis/ulcera/ulcerInfo');
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

  //update care support
  const updateAnamnesisUlceraCareSupport = async (id: string | null) => {
    console.log(id);

    try {
      // 1. Atualizar cuidados e suporte

      const responseResult = await api.get(`/patients/${id}/forms/care-access-support/`);

      const dataId = responseResult.data.id;

      if(dataId){

        console.log("Enviando ulceraCareSupportData com os seguintes dados:");
        // console.log({
            // "has_dressings_available": ulceraCareSupportData.has_dressings_available,
            // "has_help_at_home": ulceraCareSupportData.has_help_at_home
        // });

        const ulceraCareSupportResponse = await api.put(
          `/patients/${id}/forms/care-access-support/${dataId}/`,
          {
            "has_dressings_available": ulceraCareSupportData.has_dressings_available,
            "has_help_at_home": ulceraCareSupportData.has_help_at_home
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log("ulceraCareSupportData atualizado com sucesso:", ulceraCareSupportResponse.data);

        setUlceraCareSupportData({});

        // router.push('/(app)/(patient)/lesao/anamnesis/ulcera/careSupport');
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
  


  return {
    healthHistory,
    loadHealthHistory,
    riskLifestyle,
    loadRiskLifestyle,
    familyHistory,
    loadFamilyHistory,
    ulcerInfo,
    loadUlcerInfo,
    careSupport,
    loadCareSupport,
    updateAnamnesisUlceraHealthHistory,
    updateAnamnesisUlceraRiskLifestyle,
    updateAnamnesisUlceraFamilyHistory,
    updateAnamnesisUlceraUlcerInfo,
    updateAnamnesisUlceraCareSupport,
    sendAnamnesisUlceraCareSupport,
    sendAnamnesisUlceraFamilyHistory,
    sendAnamnesisUlceraHealthHistory,
    sendAnamnesisUlceraRiskLifestyle,
    sendAnamnesisUlceraUlcerInfo
  };
}