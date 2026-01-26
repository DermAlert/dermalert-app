import Header from '@/components/Header';
import PhotoCard from '@/components/PhotoCard';
import { TitleText } from '@/components/TitleText';
import { usePatientDataById } from '@/hooks/api/usePatientDataById';
import { usePatientId } from '@/hooks/usePatientId';
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function TermoConsentimentoDetails() {
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useLocalSearchParams();
  const { patientId } = usePatientId();

  const { photos, loadTermsById} = usePatientDataById();


  useEffect(() => {
    if (!patientId) return;

    const timeout = setTimeout(() => {
      loadTermsById(patientId);
    }, 300);
  
    return () => {
      clearTimeout(timeout);
      setIsLoading(false);
    }

    
  }, [patientId])

  useEffect(() => {
    console.log('TERMO PHOTOS', photos);
  }, [photos]);

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
