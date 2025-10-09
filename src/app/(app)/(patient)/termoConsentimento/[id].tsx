import Header from '@/components/Header';
import PhotoCard from '@/components/PhotoCard';
import { TitleText } from '@/components/TitleText';
import { usePatientId } from '@/hooks/usePatientId';
import { api } from '@/services/api';
import { TermsImagesProps } from '@/types/forms';
import axios from 'axios';
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function TermoConsentimentoDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState<TermsImagesProps[]>([]);

  const { id } = useLocalSearchParams();
  const { patientId } = usePatientId();

  async function loadTermsById() {
    try {
      setIsLoading(true)
      const termsResponse = await api.get(`/patients/${patientId}/consent/signed-terms/`);


      const firstTerm = Array.isArray(termsResponse.data) && termsResponse.data.length > 0 
        ? termsResponse.data[0] 
        : null;

      if (firstTerm?.images?.length) {
        setPhotos(
          firstTerm.images.map((img: TermsImagesProps) => ({
            ...img,
            image: img.image.replace("localhost", "192.168.15.82"),
            //image: img.image,
          }))
        );
      } else {
        setPhotos([]); // garante array vazio quando não tem imagens
      }
      //console.log(photos);

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error)) {
        console.log('AXIOS ERROR', error.message);
        console.log('CONFIG', error.config?.url);
      } else {
        console.log('UNKNOWN ERROR', error);
      }
    }
  }

  useEffect(() => {
    if (!patientId) return;

    setIsLoading(true);
    const timeout = setTimeout(() => {
      loadTermsById();
    }, 300);
  
    return () => {
      clearTimeout(timeout);
      setIsLoading(false);
    }

    
  }, [patientId]);

  return (
    <View className="flex-1 bg-white p-safe">

      <Header icon="back" title="" onPress={()=> router.push({pathname: "/(app)/(patient)/patient/[id]", params: {id: id.toString()}})} />

      <View className="py-6 px-8">
        <TitleText title="Termo de consentimento" description="Veja abaixo a(s) foto(s) do termo de consentimento. Toque para ampliar." />

        <View className="flex-row flex-wrap gap-4 mt-8">

          {photos.map((item)=> (
            <PhotoCard key={item.id} image={item.image} />
          ))}
          
        </View>
      </View>

    </View>
  );
}
