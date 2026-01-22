import { api } from "@/services/api";
import { LesionImagesProps, LesionOncoProps, LesionProps, LesionUlcerProps } from "@/types/forms";
import axios from "axios";
import { useState } from "react";


export function usePatientLesion() {

  const [lesion, setLesion] = useState<LesionProps>({} as LesionProps);
  const [patientLesion, setPatientLesion] = useState<Array<{id: number, location: string, type: string}>>([]);
  const [registro, setRegistro] = useState<LesionOncoProps[]>([]);

  // registro details
  const [registroOnco, seRegistroOnco] = useState<LesionOncoProps>({} as LesionOncoProps);
  const [registroUlcer, seRegistroUlcer] = useState<LesionUlcerProps>({} as LesionUlcerProps);
  const [photos, setPhotos] = useState<LesionImagesProps[]>([]);
  
 // load lesions by patient id
  async function loadLesionsByPatientId(id: string | null) {
    try {
      const lesionsResponse = await api.get(`/patients/${id}/skin-conditions/`);

      setPatientLesion(lesionsResponse.data);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('AXIOS ERROR', error.message);
        console.log('CONFIG', error.config?.url);
      } else {
        console.log('UNKNOWN ERROR', error);
      }
    }
  }

  // load lesion details by id
  async function loadLesionsById(id: string | null, type: string, lesionId: string | null) {
    try {
      const lesionsResponse = await api.get(`/patients/${id}/skin-conditions/${lesionId}`);

      setLesion(lesionsResponse.data);
      if(type === "cancer"){
        setRegistro(lesionsResponse.data.cancer_forms);
      } else {
        setRegistro(lesionsResponse.data.wounds);
      }
      //console.log(lesionsResponse.data);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('AXIOS ERROR', error.message);
        console.log('CONFIG', error.config?.url);
      } else {
        console.log('UNKNOWN ERROR', error);
      }
    }
  }

  // load register details by id
  async function loadLesionsRegisterById(type: string | string[], patientId: string | null, lesionId: string | null, registroId: string | string[]) {
    try {
      if(type === "cancer"){
        const lesionsResponse = await api.get(`/patients/${patientId}/skin-conditions/${lesionId}/cancer/${registroId}/`);

        seRegistroOnco(lesionsResponse.data);
        setPhotos(
          lesionsResponse.data.images.map((img: LesionImagesProps) => ({
            ...img,
            image: img.image.replace("localhost", "192.168.15.82"), // seu IP local
            // image: img.image,
          }))
        );
        console.log(lesionsResponse.data);
      } else {
        const lesionsResponse = await api.get(`/patients/${patientId}/skin-conditions/${lesionId}/wounds/${registroId}/`);

        seRegistroUlcer(lesionsResponse.data);
        setPhotos(
          lesionsResponse.data.images.map((img: LesionImagesProps) => ({
            ...img,
            image: img.image.replace("localhost", "192.168.15.82"), // seu IP local
            // image: img.image
          }))
        );
        console.log(lesionsResponse.data);
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('AXIOS ERROR', error.message);
        console.log('CONFIG', error.config?.url);
      } else {
        console.log('UNKNOWN ERROR', error);
      }
    }
  }


  return {
    lesion,
    patientLesion,
    loadLesionsByPatientId,
    registro,
    loadLesionsById,
    loadLesionsRegisterById,
    registroOnco,
    registroUlcer,
    photos
  };
}