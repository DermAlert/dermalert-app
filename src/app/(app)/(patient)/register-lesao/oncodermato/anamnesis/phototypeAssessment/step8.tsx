import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import ProgressBar from "@/components/ProgressBar";
import { SummaryQuestion } from "@/components/SummaryQuestion";
import { TitleText } from "@/components/TitleText";
import { useOncodermatoAnamnesisAPI } from "@/hooks/api/oncodermato/useOncodermatoAnamnesisAPI";
import { usePhototypeAssessmentForm } from "@/hooks/Oncodermato/usePhototypeAssessmentForm";
import { useLesionType } from "@/hooks/useLesionType";
import { usePatientId } from "@/hooks/usePatientId";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { ArrowLeftIcon, ChartBarIcon, MedalIcon } from "phosphor-react-native";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function PhototypeAssessmentStep8() {
  
  const { phototypeAssessmentData, setPhototypeAssessmentData } = usePhototypeAssessmentForm();
  const [isLoading, setIsLoading] = useState(false);
  const { setLesionType } = useLesionType();

  const { patientId } = usePatientId();
    const { phototypeAssessmentScore, getScore } = useOncodermatoAnamnesisAPI();
  

  const handleNext = () => {
    router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/steps');
  }

  const handleCancel = () => {
    setPhototypeAssessmentData({});
    setLesionType(null)
    router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/steps');
  }

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setIsLoading(true);
        await getScore(patientId);
        setIsLoading(false);
      })();
    }, [patientId])
  );

  useEffect(() => {
    console.log(phototypeAssessmentData)
  }, []);

  if(isLoading){
    return (
      <View className="flex-1 bg-white p-safe justify-center items-center">
        <Loading />
      </View>
    )
  }

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Avaliação de Fototipo" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={8} totalSteps={8} />

        <View className="flex-row gap-[10] mt-2 mb-8 justify-between">

          <View 
            className="w-[49%] p-6 bg-primary-50 rounded-xl justify-start items-start"
            style={{ minHeight: 155 }}
          >
            <View className="w-12 h-12 bg-primary-200 rounded-lg justify-center items-center">
              <ChartBarIcon size={30} color="#4052A1" />
            </View>
      
            <Text allowFontScaling={false} className="font-normal text-sm text-neutral-700 mt-4">Classificação do Fototipo</Text>
            <Text allowFontScaling={false} className="text-neutral-900 text-lg font-medium">Fototipo {phototypeAssessmentScore?.phototype}</Text>
          </View>

          <View 
            className="w-[49%] p-6 bg-primary-50 rounded-xl justify-start items-start"
            style={{ minHeight: 155 }}
          >
            <View className="w-12 h-12 bg-primary-200 rounded-lg justify-center items-center">
              <MedalIcon size={30} color="#4052A1" />
            </View>
      
            <Text allowFontScaling={false} className="font-normal text-sm text-neutral-700 mt-4">Pontuação total</Text>
            <Text allowFontScaling={false} className="text-neutral-900 text-lg font-medium">{phototypeAssessmentScore?.score}</Text>
          </View>

        </View>

        

        <TitleText title="Resumo" />

        <View className='gap-8 my-8'>

          <SummaryQuestion question="Qual é a cor natural da pele do paciente?">
            {
              phototypeAssessmentData.skin_color === 'milky_white'? 'Branca leitosa' :
              phototypeAssessmentData.skin_color === 'white'? 'Branca' :
              phototypeAssessmentData.skin_color === 'white_to_beige_golden'? 'Branca a bege, com base dourada' :
              phototypeAssessmentData.skin_color === 'beige'? 'Bege' :
              phototypeAssessmentData.skin_color === 'light_brown'? 'Castanha clara' :
              phototypeAssessmentData.skin_color === 'dark_brown'? 'Castanha escura' :
              phototypeAssessmentData.skin_color === 'black'? 'Negra' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="Qual é a cor dos olhos do paciente?">
            {
              phototypeAssessmentData.eyes_color === 'light_blue_gray_green'? 'Azul claro, cinza, verde' :
              phototypeAssessmentData.eyes_color === 'blue_gray_green'? 'Azul, cinza ou verde' :
              phototypeAssessmentData.eyes_color === 'blue'? 'Azul' :
              phototypeAssessmentData.eyes_color === 'light_brown'? 'Castanho claro' :
              phototypeAssessmentData.eyes_color === 'dark_brown'? 'Castanho escuro' :              
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="Qual é a cor natural do cabelo do paciente?">
            {
              phototypeAssessmentData.hair_color === 'red_light_blond'? 'Ruivo, loiro claro' :           
              phototypeAssessmentData.hair_color === 'blond_light_brown'? 'Loiro, castanho claro' :           
              phototypeAssessmentData.hair_color === 'brown'? 'Castanho' :           
              phototypeAssessmentData.hair_color === 'dark_brown'? 'Castanho escuro' :           
              phototypeAssessmentData.hair_color === 'black'? 'Preto' :           
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="Quantas sardas o paciente tem em áreas não expostas?">
            {
              phototypeAssessmentData.freckles === 'many'? 'Muitas' :             
              phototypeAssessmentData.freckles === 'some'? 'Algumas' :             
              phototypeAssessmentData.freckles === 'few'? 'Poucas' :             
              phototypeAssessmentData.freckles === 'none'? 'Nenhuma' :             
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="Como a pele do paciente reage quando fica muito tempo exposta ao sol?">
            {
              phototypeAssessmentData.sun_exposed === 'always_burns_peels_painful'? 'Fica vermelha, dolorida, descasca' :            
              phototypeAssessmentData.sun_exposed === 'burns_peels_a_little'? 'Fica vermelha, descasca um pouco' :            
              phototypeAssessmentData.sun_exposed === 'burns_no_peel'? 'Fica vermelha, mas não descasca' :            
              phototypeAssessmentData.sun_exposed === 'seldom_or_not_red'? 'Fica levemente ou nada vermelha' :            
              phototypeAssessmentData.sun_exposed === 'never_red'? 'Nunca fica vermelha' :            
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="A pele do paciente bronzeia?">
            {
              phototypeAssessmentData.tanned_skin === 'never_always_burns'? 'Nunca, sempre queima' :
              phototypeAssessmentData.tanned_skin === 'sometimes'? 'Às vezes' :
              phototypeAssessmentData.tanned_skin === 'often'? 'Frequentemente' :
              phototypeAssessmentData.tanned_skin === 'always'? 'Sempre' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="Quão sensível é a face do paciente ao sol?">
            {
              phototypeAssessmentData.sun_sensitive_skin === 'very_sensitive'? 'Muito sensível' :
              phototypeAssessmentData.sun_sensitive_skin === 'sensitive'? 'Sensível' :
              phototypeAssessmentData.sun_sensitive_skin === 'normal'? 'Normal' :
              phototypeAssessmentData.sun_sensitive_skin === 'resistant'? 'Resistente' :
              phototypeAssessmentData.sun_sensitive_skin === 'very_resistant_never_burns'? 'Muito resistente, nunca queima' :
              'Não informado'
            }
          </SummaryQuestion>

        </View>

      </ScrollView>

      <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step7')} 
          style={{ flexGrow: 1, width: '47%' }}
        />
        <Button title="Salvar" 
            onPress={handleNext}
            style={{ flexGrow: 1, width: '47%' }}
          />
      </View>
    </Animated.View>
  );
}
