import Header from '@/components/Header';
import Icon from '@/components/Icon';
import { Loading } from '@/components/Loading';
import { SummaryQuestion } from '@/components/SummaryQuestion';
import { TitleText } from '@/components/TitleText';
import { usePatientDataById } from '@/hooks/api/usePatientDataById';
import { usePatientId } from '@/hooks/usePatientId';
import { useFocusEffect } from '@react-navigation/native';
import { router } from "expo-router";
import { useCallback, useState } from 'react';
import { View } from 'react-native';

export default function GeneralHealth() {
  const [isLoading, setIsLoading] = useState(false);

  const { patientId } = usePatientId();


  const { loadGeneralHealthById, generalHealth } = usePatientDataById();


  useFocusEffect(
    useCallback(() => {
      (async () => {
        setIsLoading(true)
        await loadGeneralHealthById(patientId)
        setIsLoading(false)
      })();
    },[])
  )

  if(isLoading){
    return (
      <View className="flex-1 bg-white p-safe justify-center items-center">
        <Loading />
      </View>
    )
  }

  return (
    <View className="flex-1 bg-white p-safe relative">

      <Header icon="back" title="" onPress={()=> router.back()} />

      <View className="p-8 gap-8">

        <Icon iconName="ClipboardTextIcon" />

        <TitleText title="Antecedentes clínicos" />

        <View className='gap-8'>

          <SummaryQuestion question="O paciente tem histórico de doenças crônicas?">
            { generalHealth?.chronic_diseases && generalHealth?.chronic_diseases.length > 0 ? generalHealth?.chronic_diseases?.map((item: string | { name: string }) => typeof item === 'string' ? item : item.name).join(', ') : 'Não'}
          </SummaryQuestion>
          
          <SummaryQuestion question="O paciente faz uso regular de medicamentos?">
            { generalHealth?.medicines && generalHealth?.medicines.length > 0 ? generalHealth?.medicines?.map((item: string | { name: string }) => typeof item === 'string' ? item : item.name).join(', ') : 'Não'}
          </SummaryQuestion>

          <SummaryQuestion question="O paciente possui alergias?">
            { generalHealth?.allergies && generalHealth?.allergies.length > 0 ? generalHealth?.allergies?.map((item: string | { name: string }) => typeof item === 'string' ? item : item.name).join(', ') : 'Não'} 
          </SummaryQuestion>

          <SummaryQuestion question="O paciente já passou por cirurgias?">
            {generalHealth?.surgeries}
          </SummaryQuestion>

          <SummaryQuestion question="O paciente pratica atividade física regularmente?">
            {
              generalHealth?.physical_activity_frequency === 'daily'? 'Diariamente' :
              generalHealth?.physical_activity_frequency === '3-5 times a week'? '3-5 vezes por semana' :
              generalHealth?.physical_activity_frequency === '1-2 times a week'? '1-2 vezes por semana' :
              generalHealth?.physical_activity_frequency === 'occasionally'? 'Ocasionalmente' :
              generalHealth?.physical_activity_frequency === 'never'? 'Não' :
              'Não informado'
            }
          </SummaryQuestion>

        </View>

        

        

      </View>

      


    </View>
  );
}
