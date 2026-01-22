import { api } from "@/services/api";
import { GeneralHealthProps, TermsImagesProps } from "@/types/forms";
import axios from "axios";
import { useState } from "react";


export function usePatientDataById() {

   // General Health
  const [hasGeneralHealth, setHasGeneralHealth] = useState(false);
  const [generalHealth, setGeneralHealth] = useState<GeneralHealthProps>();
  
  // Terms
  const [hasTerms, setHasTerms] = useState(false);
  const [photos, setPhotos] = useState<TermsImagesProps[]>([]);

  // Oncodermato Anamnesis
  const [hasOncodermatoAnamnesis, setHasOncodermatoAnamnesis] = useState(false);

  // Ulcera Anamnesis
  const [hasUlceraAnamnesis, setHasUlceraAnamnesis] = useState(false);

 
  // Function to check if General Health form exists
  async function checkGeneralHealth(id: string | null) {
    try {
      const response = await api.get(`/patients/${id}/forms/general-health/`);

      if(response.data){
        setHasGeneralHealth(true)
      }
    } catch (error) {
      setHasGeneralHealth(false)
    }
  }
  // Function to load General Health form by ID
  async function loadGeneralHealthById(id: string | null) {
    try {
      const { data } = await api.get(`/patients/${id}/forms/general-health/`);

      setGeneralHealth(data);

    } catch (error) {
      console.log(error);
    } 
  }


  // Function to check if Terms exist
  async function checkTermsById(id: string | null) {
    try {
      const response = await api.get(`/patients/${id}/consent/signed-terms/`);
      const hasAnySigned = response.data.some((term: any) => term.has_signed);

      if(hasAnySigned){
        setHasTerms(true)
      }

    } catch (error) {
      console.log("erro termos")
      setHasTerms(false)
    }
  }
  // Function to load Terms by ID
  async function loadTermsById(id: string | null) {
    try {
      const termsResponse = await api.get(`/patients/${id}/consent/signed-terms/`);


      const firstTerm = Array.isArray(termsResponse.data) && termsResponse.data.length > 0 
        ? termsResponse.data[0] 
        : null;

      if (firstTerm?.images?.length) {
        setPhotos(
          firstTerm.images.map((img: TermsImagesProps) => ({
            ...img,
            image: img.image.replace("localhost", "192.168.15.82"),
            // image: img.image,
          }))
        );
      } else {
        setPhotos([]); // garante array vazio quando não tem imagens
      }
      //console.log(photos);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('AXIOS ERROR', error.message);
        console.log('CONFIG', error.config?.url);
      } else {
        console.log('UNKNOWN ERROR', error);
      }
    }
  }


  // Function to check if Oncodermato Anamnesis exists
  async function checkOncodermatoAnamnesisById(id: string | null) {
    try {
      const response = await api.get(`/patients/${id}/forms/family-history/`);

      if(response.data){
        setHasOncodermatoAnamnesis(true)
      }
    } catch (error) {
      setHasOncodermatoAnamnesis(false)
    }
  }


  // Function to check if Ulcera Anamnesis exists
  async function checkUlceraAnamnesisById(id: string | null) {
    try {
      const response = await api.get(`/patients/${id}/forms/clinical-history/`);

      if(response.data){
        setHasUlceraAnamnesis(true)
      }

    } catch (error) {
      setHasUlceraAnamnesis(false)
    }
  }

  return {
    hasGeneralHealth,
    checkGeneralHealth,
    hasTerms,
    checkTermsById,
    hasOncodermatoAnamnesis,
    checkOncodermatoAnamnesisById,
    hasUlceraAnamnesis,
    checkUlceraAnamnesisById,
    loadGeneralHealthById,
    generalHealth,
    loadTermsById,
    photos
  };
}