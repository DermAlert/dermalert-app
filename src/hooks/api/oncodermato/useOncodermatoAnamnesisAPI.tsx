import { useCancerResearchForm } from "@/hooks/Oncodermato/useCancerResearchForm";
import { useFamilyHistoryForm } from "@/hooks/Oncodermato/useFamilyHistoryForm";
import { usePhototypeAssessmentForm } from "@/hooks/Oncodermato/usePhototypeAssessmentForm";
import { useRiskProtectiveFactorsForm } from "@/hooks/Oncodermato/useRiskProtectiveFactorsForm";
import { api } from "@/services/api";
import { CancerResearchProps, PersonalFamilyHistoryProps, PhototypeAssessmentProps, RiskProtectiveFactorsProps } from "@/types/forms";
import axios from "axios";
import { useState } from "react";


export function useOncodermatoAnamnesisAPI() {
  // phototype assessment
  const [phototype, setPhototype] = useState<PhototypeAssessmentProps>();
  const [phototypeAssessmentScore, setPhototypeAssessmentScore] = useState<{ phototype?: string; score?: number } | null>(null);
  const { phototypeAssessmentData, setPhototypeAssessmentData, updatePhototypeAssessmentData } = usePhototypeAssessmentForm();

  // personal and family history
  const [personalFamilyHistory, setPersonalFamilyHistory] = useState<PersonalFamilyHistoryProps>();
  const { familyHistoryData, setFamilyHistoryData  } = useFamilyHistoryForm();

  // risk and protective factors
  const [riskProtectiveFactors, setRiskProtectiveFactors] = useState<RiskProtectiveFactorsProps>();
  const { riskProtectiveFactorsData, setRiskProtectiveFactorsData } = useRiskProtectiveFactorsForm();

  // cancer research
  const [cancerResearch, setCancerResearch] = useState<CancerResearchProps>();
  const { cancerResearchData, setCancerResearchData } = useCancerResearchForm();  


  
  
  ////// GET //////
  
  // load phototype assessment by patient id
  async function loadPhototype(id: string | null) {
    try {
      const { data } = await api.get(`/patients/${id}/forms/phototype/`);

      setPhototype(data);

    } catch (error) {
      console.log(error);
    } 
  }

  // get score for phototype
  const getScore = async (id: string | null) => {
    console.log(id);

    try {
      // Envia Avaliação de Fototipo

      console.log("Enviando phototypeAssessmentData");

      const phototypeAssessmentResponse = await api.post(
        `/patients/${id}/forms/phototype/calculate/`,
        {
          "skin_color": phototypeAssessmentData.skin_color,
          "eyes_color": phototypeAssessmentData.eyes_color,
          "hair_color": phototypeAssessmentData.hair_color,
          "freckles": phototypeAssessmentData.freckles,
          "sun_exposed": phototypeAssessmentData.sun_exposed,
          "tanned_skin": phototypeAssessmentData.tanned_skin,
          "sun_sensitive_skin": phototypeAssessmentData.sun_sensitive_skin
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("phototypeAssessmentData enviado com sucesso:", phototypeAssessmentResponse.data);

      setPhototypeAssessmentScore(phototypeAssessmentResponse.data);

    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log('STATUS:', error.response?.status);
        console.log('HEADERS:', error.response?.headers);
        //console.log('DATA:', JSON.stringify(error.response?.data, null, 2));
      } 
    }
  }

  // load personal and family history by patient id
  async function loadPersonalFamilyHistory(id: string | null) {
    try {
      const { data } = await api.get(`/patients/${id}/forms/family-history/`);

      setPersonalFamilyHistory(data);

    } catch (error) {
      console.log(error);
    }  
  }
  

  // load risk and protective factors by patient id
  async function loadRiskProtectiveFactors(id: string | null) {
    try {
      const { data } = await api.get(`/patients/${id}/forms/risk-protective-factors/`);

      setRiskProtectiveFactors(data);

    } catch (error) {
      console.log(error);
    } 
  }

  // load cancer research by patient id
  async function loadCancerResearch(id: string | null) {
    try {
      const { data } = await api.get(`/patients/${id}/forms/cancer-research/`);

      setCancerResearch(data);

    } catch (error) {
      console.log(error);
    } 
  }


  ///// POST /////

  // send anamnesis oncodermato personal and family history
  const sendAnamnesisOncodermatoFamilyHistory = async (patientId: string | null) => {
    console.log(patientId);

    try {
      // 1. Envia Histórico Familiar e Pessoal de Câncer de Pele
      const formattedfamilyHistory = familyHistoryData.family_history && familyHistoryData.family_history.length > 0 ? familyHistoryData.family_history.map((d) => ({ name: d })) : [];
      
      const formattedfamilyHistoryTypes = familyHistoryData.family_history_types && familyHistoryData.family_history_types.length > 0 ? familyHistoryData.family_history_types.map((d) => ({ name: d })) : [];
      
      const formattedCancerType = familyHistoryData.patient_cancer_type && familyHistoryData.patient_cancer_type.length > 0 ? familyHistoryData.patient_cancer_type.map((d) => ({ name: d })) : [];
      
      const formattedInjuriesTreatment = familyHistoryData.injuries_treatment && familyHistoryData.injuries_treatment.length > 0 ? familyHistoryData.injuries_treatment.map((d) => ({ name: d })) : [];

      console.log("Enviando familyHistoryData com os seguintes dados:");
      // console.log({
      //   "family_history": formattedfamilyHistory,
      //   "family_history_types": formattedfamilyHistoryTypes,
      //   "patient_cancer_type": formattedCancerType,
      //   "removed_injuries": familyHistoryData.removed_injuries,
      //   "injuries_treatment": formattedInjuriesTreatment
      // });

      const familyHistoryResponse = await api.post(
        `/patients/${patientId}/forms/family-history/`,
        {
          "family_history": formattedfamilyHistory,
          "family_history_types": formattedfamilyHistoryTypes,
          "patient_cancer_type": formattedCancerType,
          "removed_injuries": familyHistoryData.removed_injuries,
          "injuries_treatment": formattedInjuriesTreatment
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("familyHistoryData enviado com sucesso:", familyHistoryResponse.data);
      setFamilyHistoryData({});

    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log('STATUS:', error.response?.status);
        console.log('HEADERS:', error.response?.headers);
        //console.log('DATA:', JSON.stringify(error.response?.data, null, 2));
      } 
    }

  }

  // send anamnesis oncodermato phototype assessment
  const sendAnamnesisOncodermatoPhototype = async (patientId: string | null) => {
    console.log(patientId);

    try {
      // 2. Envia Avaliação de Fototipo

      console.log("Enviando phototypeAssessmentData com os seguintes dados:");
      // console.log({
      //   "skin_color": phototypeAssessmentData.skin_color,
      //   "eyes_color": phototypeAssessmentData.eyes_color,
      //   "hair_color": phototypeAssessmentData.hair_color,
      //   "freckles": phototypeAssessmentData.freckles,
      //   "sun_exposed": phototypeAssessmentData.sun_exposed,
      //   "tanned_skin": phototypeAssessmentData.tanned_skin,
      //   "sun_sensitive_skin": phototypeAssessmentData.sun_sensitive_skin
      // });

      const phototypeAssessmentResponse = await api.post(
        `/patients/${patientId}/forms/phototype/`,
        {
          "skin_color": phototypeAssessmentData.skin_color,
          "eyes_color": phototypeAssessmentData.eyes_color,
          "hair_color": phototypeAssessmentData.hair_color,
          "freckles": phototypeAssessmentData.freckles,
          "sun_exposed": phototypeAssessmentData.sun_exposed,
          "tanned_skin": phototypeAssessmentData.tanned_skin,
          "sun_sensitive_skin": phototypeAssessmentData.sun_sensitive_skin
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("phototypeAssessmentData enviado com sucesso:", phototypeAssessmentResponse.data);

      setPhototypeAssessmentData({});
      
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log('STATUS:', error.response?.status);
        console.log('HEADERS:', error.response?.headers);
        //console.log('DATA:', JSON.stringify(error.response?.data, null, 2));
      } 
    }

  }

  // send anamnesis oncodermato risk protective factors
  const sendAnamnesisOncodermatoRiskProtectiveFactors = async (patientId: string | null) => {
    console.log(patientId);

    try {
      //3. Envia Fatores de Risco e Proteção para Câncer de Pele

      console.log("Enviando riskProtectiveFactorsData com os seguintes dados:");
      // console.log({
      //   "sun_exposure_period": riskProtectiveFactorsData.sun_exposure_period,
      //   "sun_burn": riskProtectiveFactorsData.sun_burn,
      //   "uv_protection": riskProtectiveFactorsData.uv_protection,
      //   "hat_use": riskProtectiveFactorsData.hat_use,
      //   "artifitial_tan": riskProtectiveFactorsData.artifitial_tan,
      //   "checkups_frequency": riskProtectiveFactorsData.checkups_frequency,
      //   "cancer_campaigns": riskProtectiveFactorsData.cancer_campaigns
      // });

      const riskProtectiveFactorsResponse = await api.post(
        `/patients/${patientId}/forms/risk-protective-factors/`,
        {
          "sun_exposure_period": riskProtectiveFactorsData.sun_exposure_period,
          "sun_burn": riskProtectiveFactorsData.sun_burn,
          "uv_protection": riskProtectiveFactorsData.uv_protection,
          "hat_use": riskProtectiveFactorsData.hat_use,
          "artifitial_tan": riskProtectiveFactorsData.artifitial_tan,
          "checkups_frequency": riskProtectiveFactorsData.checkups_frequency,
          "cancer_campaigns": riskProtectiveFactorsData.cancer_campaigns
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("riskProtectiveFactorsData enviado com sucesso:", riskProtectiveFactorsResponse.data);

      setRiskProtectiveFactorsData({});
      
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log('STATUS:', error.response?.status);
        console.log('HEADERS:', error.response?.headers);
        //console.log('DATA:', JSON.stringify(error.response?.data, null, 2));
      } 
    }

  }

  // send anamnesis oncodermato cancer research
  const sendAnamnesisOncodermatoCancerResearch = async (patientId: string | null) => {
    console.log(patientId);

    try {
      //4. Envia Investigação de Câncer de Pele e Lesões Suspeitas

      console.log("Enviando cancerResearchData com os seguintes dados:");
      // console.log({
      //   "suspicious_moles": cancerResearchData.suspicious_moles,
      //   "bleed_itch": cancerResearchData.bleed_itch,
      //   "how_long": cancerResearchData.how_long,
      //   "lesion_aspect": cancerResearchData.lesion_aspect,
      //   "diagnosis": cancerResearchData.diagnosis
      // });

      const cancerResearchResponse = await api.post(
        `/patients/${patientId}/forms/cancer-research/`,
        {
          "suspicious_moles": cancerResearchData.suspicious_moles,
          "bleed_itch": cancerResearchData.bleed_itch,
          "how_long": cancerResearchData.how_long,
          "lesion_aspect": cancerResearchData.lesion_aspect,
          "diagnosis": cancerResearchData.diagnosis
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("cancerResearchData enviado com sucesso:", cancerResearchResponse.data);

      setCancerResearchData({});
      // router.push("/(app)/(patient)/register-lesao/oncodermato/anamnesis/success")
      
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log('STATUS:', error.response?.status);
        console.log('HEADERS:', error.response?.headers);
        //console.log('DATA:', JSON.stringify(error.response?.data, null, 2));
      } 
    }

  }




  ////// PUT ///////

  // update anamnesis oncodermato personal and family history
  const updateAnamnesisOncodermatoFamilyHistory = async (id: string | null) => {
    console.log(id);

    try {
      // 1. Atualizar historico familiar e pessoal

      const responseResult = await api.get(`/patients/${id}/forms/family-history/`);

      const dataId = responseResult.data.id;

      if(dataId){

        // 1. Atualiza Histórico Familiar e Pessoal de Câncer de Pele
        const formattedfamilyHistory = familyHistoryData.family_history && familyHistoryData.family_history.length > 0 ? familyHistoryData.family_history.map((d) => ({ name: d })) : [];
        
        const formattedfamilyHistoryTypes = familyHistoryData.family_history_types && familyHistoryData.family_history_types.length > 0 ? familyHistoryData.family_history_types.map((d) => ({ name: d })) : [];
        
        const formattedCancerType = familyHistoryData.patient_cancer_type && familyHistoryData.patient_cancer_type.length > 0 ? familyHistoryData.patient_cancer_type.map((d) => ({ name: d })) : [];
        
        const formattedInjuriesTreatment = familyHistoryData.injuries_treatment && familyHistoryData.injuries_treatment.length > 0 ? familyHistoryData.injuries_treatment.map((d) => ({ name: d })) : [];

        console.log("Atualizando familyHistoryData com os seguintes dados:");
        // console.log({
        //   "family_history": formattedfamilyHistory,
        //   "family_history_types": formattedfamilyHistoryTypes,
        //   "patient_cancer_type": formattedCancerType,
        //   "removed_injuries": familyHistoryData.removed_injuries,
        //   "injuries_treatment": formattedInjuriesTreatment
        // });

        const familyHistoryResponse = await api.put(
          `/patients/${id}/forms/family-history/${dataId}/`,
          {
            "family_history": formattedfamilyHistory,
            "family_history_types": formattedfamilyHistoryTypes,
            "patient_cancer_type": formattedCancerType,
            "removed_injuries": familyHistoryData.removed_injuries,
            "injuries_treatment": formattedInjuriesTreatment
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log("familyHistoryData atualizado:", familyHistoryResponse.data);

        setFamilyHistoryData({});

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

  // update anamnesis oncodermato phototype assessment
  const updateAnamnesisOncodermatoPhototype = async (id: string | null) => {
    console.log(id);

    try {
      // 1. Atualizar Histórico clinico geral

      const responseResult = await api.get(`/patients/${id}/forms/phototype/`);

      const dataId = responseResult.data.id;

      if(dataId){

        // 2. Atualiza Avaliação de Fototipo

        console.log("Atualizando phototypeAssessmentData com os seguintes dados:");
        // console.log({
        //   "skin_color": phototypeAssessmentData.skin_color,
        //   "eyes_color": phototypeAssessmentData.eyes_color,
        //   "hair_color": phototypeAssessmentData.hair_color,
        //   "freckles": phototypeAssessmentData.freckles,
        //   "sun_exposed": phototypeAssessmentData.sun_exposed,
        //   "tanned_skin": phototypeAssessmentData.tanned_skin,
        //   "sun_sensitive_skin": phototypeAssessmentData.sun_sensitive_skin
        // });

        const phototypeAssessmentResponse = await api.put(
          `/patients/${id}/forms/phototype/${dataId}/`,
          {
            "skin_color": phototypeAssessmentData.skin_color,
            "eyes_color": phototypeAssessmentData.eyes_color,
            "hair_color": phototypeAssessmentData.hair_color,
            "freckles": phototypeAssessmentData.freckles,
            "sun_exposed": phototypeAssessmentData.sun_exposed,
            "tanned_skin": phototypeAssessmentData.tanned_skin,
            "sun_sensitive_skin": phototypeAssessmentData.sun_sensitive_skin
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log("phototypeAssessmentData atualizado:", phototypeAssessmentResponse.data);

        setPhototypeAssessmentData({});
        // setLesionType(null)
       
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

  // update anamnesis oncodermato risk protective factors
  const updateAnamnesisOncodermatoRiskProtectiveFactor = async (id: string | null) => {
    console.log(id);

    try {
      // 1. Atualizar Histórico clinico geral

      const responseResult = await api.get(`/patients/${id}/forms/risk-protective-factors/`);

      const dataId = responseResult.data.id;

      if(dataId){

        // 2. Atualiza Avaliação de Fototipo

        console.log("Atualizando riskProtectiveFactorsData com os seguintes dados:");
        // console.log({
          // "sun_exposure_period": riskProtectiveFactorsData.sun_exposure_period,
          // "sun_burn": riskProtectiveFactorsData.sun_burn,
          // "uv_protection": riskProtectiveFactorsData.uv_protection,
          // "hat_use": riskProtectiveFactorsData.hat_use,
          // "artifitial_tan": riskProtectiveFactorsData.artifitial_tan,
          // "checkups_frequency": riskProtectiveFactorsData.checkups_frequency,
          // "cancer_campaigns": riskProtectiveFactorsData.cancer_campaigns
        // });

        const phototypeAssessmentResponse = await api.put(
          `/patients/${id}/forms/risk-protective-factors/${dataId}/`,
          {
            "sun_exposure_period": riskProtectiveFactorsData.sun_exposure_period,
            "sun_burn": riskProtectiveFactorsData.sun_burn,
            "uv_protection": riskProtectiveFactorsData.uv_protection,
            "hat_use": riskProtectiveFactorsData.hat_use,
            "artifitial_tan": riskProtectiveFactorsData.artifitial_tan,
            "checkups_frequency": riskProtectiveFactorsData.checkups_frequency,
            "cancer_campaigns": riskProtectiveFactorsData.cancer_campaigns
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log("riskProtectiveFactorsData atualizado:", phototypeAssessmentResponse.data);

        setRiskProtectiveFactorsData({});
        // setLesionType(null)
       

        // router.push('/(app)/(patient)/lesao/anamnesis/oncodermato/riskProtectiveFactors');
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

  // update anamnesis oncodermato cancer research
  const updateAnamnesisOncodermatoCancerResearch = async (id: string | null) => {
    console.log(id);

    try {
      // 1. Atualiza Investigação de Câncer de Pele e Lesões Suspeitas

      const responseResult = await api.get(`/patients/${id}/forms/cancer-research/`);

      const dataId = responseResult.data.id;

      if(dataId){

        console.log("Atualizando cancerResearchData com os seguintes dados:");
        // console.log({
        //   "suspicious_moles": cancerResearchData.suspicious_moles,
        //   "bleed_itch": cancerResearchData.bleed_itch,
        //   "how_long": cancerResearchData.how_long,
        //   "lesion_aspect": cancerResearchData.lesion_aspect,
        //   "diagnosis": cancerResearchData.diagnosis
        // });

        const cancerResearchResponse = await api.put(
          `/patients/${id}/forms/cancer-research/${dataId}/`,
          {
            "suspicious_moles": cancerResearchData.suspicious_moles,
            "bleed_itch": cancerResearchData.bleed_itch,
            "how_long": cancerResearchData.how_long,
            "lesion_aspect": cancerResearchData.lesion_aspect,
            "diagnosis": cancerResearchData.diagnosis
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log("cancerResearchData atualizado", cancerResearchResponse.data);

        setCancerResearchData({});

        // setLesionType(null)
        // router.push('/(app)/(patient)/lesao/anamnesis/oncodermato/cancerResearch');
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
    phototype,
    loadPhototype,
    loadPersonalFamilyHistory,
    personalFamilyHistory,
    loadRiskProtectiveFactors,
    riskProtectiveFactors,
    loadCancerResearch,
    cancerResearch,
    updateAnamnesisOncodermatoFamilyHistory,
    getScore,
    phototypeAssessmentScore,
    updateAnamnesisOncodermatoPhototype,
    updateAnamnesisOncodermatoRiskProtectiveFactor,
    updateAnamnesisOncodermatoCancerResearch,
    sendAnamnesisOncodermatoFamilyHistory,
    sendAnamnesisOncodermatoPhototype,
    sendAnamnesisOncodermatoRiskProtectiveFactors,
    sendAnamnesisOncodermatoCancerResearch
  };
}