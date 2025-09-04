import Header from "@/components/Header";
import ModalAlert from "@/components/ModalAlert";
import { useLesionType } from "@/hooks/useLesionType";
import { usePatientId } from "@/hooks/usePatientId";
import { api } from "@/services/api";
import { router, useFocusEffect } from "expo-router";
import { CaretRightIcon, DiceFiveIcon } from "phosphor-react-native";
import { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

export default function RegisterLesaoSelect() {
  const [modalAlert, setModalAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasOncodermatoAnamnesis, setHasOncodermatoAnamnesis] = useState(false);
  const [hasUlceraAnamnesis, setHasUlceraAnamnesis] = useState(false);

  const { patientId } = usePatientId();
  const { lesionType, updateLesionType } = useLesionType();

  async function checkOncodermatoAnamnesisById() {
      try {
        setIsLoading(true)
        const response = await api.get(`/patients/${patientId}/forms/family-history/`);
        //console.log(response.data);

        if(response.data){
          setHasOncodermatoAnamnesis(true)
        }
  
        setIsLoading(false)
      } catch (error) {
        setHasOncodermatoAnamnesis(false)
        setIsLoading(false);
        // if (axios.isAxiosError(error)) {
        //   console.log('AXIOS ERROR', error.message);
        //   console.log('CONFIG', error.config?.url);
        // } else {
        //   console.log('UNKNOWN ERROR', error);
        // }
      }
    }

  async function checkUlceraAnamnesisById() {
      try {
        setIsLoading(true)
        const response = await api.get(`/patients/${patientId}/forms/clinical-history/`);
        //console.log(response.data);

        if(response.data){
          setHasUlceraAnamnesis(true)
        }
  
        setIsLoading(false)
      } catch (error) {
        setHasUlceraAnamnesis(false)
        setIsLoading(false);
      }
    }

  const handleCancel = () => {
    setModalAlert(!modalAlert);
    router.push('/(app)/(patient)/patient/[id]');
  }

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await checkOncodermatoAnamnesisById();
        await checkUlceraAnamnesisById();
      })();
    }, [patientId])
  );

  useEffect(() => {
    console.log('Lesion Type:', lesionType);
  }, []);
  
  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white p-safe justify-start items-center"
    >
      <ModalAlert 
        modalAlert={modalAlert} 
        setModalAlert={setModalAlert} 
        description="Ao cancelar o registro de lesão, todos os dados preenchidos até aqui serão perdidos."
        title="Deseja cancelar o registro?"
        handleCancel={handleCancel}
        btnNoText="Não, continuar"
        btnYesText="Sim, cancelar"
      />

      <Header title="Registrar lesão" onPress={() => setModalAlert(!modalAlert)} />

      <View className="px-8 py-6 w-full justify-start flex-1">

        <Text className="text-base text-neutral-900 mb-8">Escolha o tipo de lesão que deseja registrar</Text>

        <View className="gap-3">
          <TouchableOpacity 
            activeOpacity={0.7} 
            className="flex-row items-center justify-between rounded-lg px-4 py-6 gap-4 bg-primary-100"
            onPress={()=> {
              if (hasOncodermatoAnamnesis) {
                router.push('/(app)/(patient)/register-lesao/oncodermato/step1');
                updateLesionType("cancer");
              } else {
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/steps');
                updateLesionType("cancer");
              }
            }}
            //onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/step1')}
          >
            <View className="bg-white h-[48] w-[48] justify-center items-center rounded-lg">
              <DiceFiveIcon size={24} color="#FF765E" />
            </View>
            
            <View className="flex-1">
              <Text className="text-base text-neutral-900 font-semibold">Oncodermato</Text>
              <Text className="text-sm text-neutral-700">Registrar lesão oncodermato</Text>
            </View>

            <CaretRightIcon size={20} color="#7D83A0" />
          </TouchableOpacity>


          <TouchableOpacity 
            activeOpacity={0.7} 
            className="flex-row items-center justify-between rounded-lg px-4 py-6 gap-4 bg-primary-100"
            onPress={()=> {
              if(hasUlceraAnamnesis){
                router.push('/(app)/(patient)/register-lesao/ulcera/step1')
                updateLesionType("wound");
              } else {
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/steps')
                updateLesionType("wound");
              }
            }}
            // onPress={()=> router.push('/(app)/(patient)/register-lesao/ulcera/step1')}

          >
            <View className="bg-white h-[48] w-[48] justify-center items-center rounded-lg">
              <DiceFiveIcon size={24} color="#6775B4" />
            </View>
            <View className="flex-1">
              <Text className="text-base text-neutral-900 font-semibold">Úlcera venosa</Text>
              <Text className="text-sm text-neutral-700">Registrar lesão úlcera venosa</Text>
            </View>

            <CaretRightIcon size={20} color="#7D83A0" />
          </TouchableOpacity>
        </View>

        


      </View>


    </Animated.View>
  );
}
