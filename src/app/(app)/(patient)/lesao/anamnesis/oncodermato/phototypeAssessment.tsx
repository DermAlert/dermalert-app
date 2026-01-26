import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import { SummaryQuestion } from "@/components/SummaryQuestion";
import { TitleText } from "@/components/TitleText";
import { useOncodermatoAnamnesisAPI } from "@/hooks/api/oncodermato/useOncodermatoAnamnesisAPI";
import { usePatientId } from "@/hooks/usePatientId";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { ChartBarIcon, MedalIcon, PencilSimpleLineIcon } from "phosphor-react-native";
import { useCallback, useState } from "react";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function PhototypeAssessmentDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const { patientId } = usePatientId();
  const { phototype, loadPhototype } = useOncodermatoAnamnesisAPI()


  useFocusEffect(
    useCallback(() => {
      const timeout = setTimeout(() => {
        loadPhototype(patientId);
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timeout);

    }, [patientId])
  );


  const handleCancel = () => {
    router.push("/(app)/(patient)/lesao/anamnesis/oncodermato/anamnesisDetails");
  }

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

      <Header title="Avaliação de Fototipo" icon="back" onPress={handleCancel} />

      <ScrollView className="px-8 my-6 w-full flex-1">

      <View className="flex-row gap-[10] mt-2 mb-8 justify-between">

      <View 
        className="w-[49%] p-6 bg-primary-50 rounded-xl justify-start items-start"
        style={{ minHeight: 155 }}
      >
        <View className="w-12 h-12 bg-primary-200 rounded-lg justify-center items-center">
          <ChartBarIcon size={30} color="#4052A1" />
        </View>

        <Text allowFontScaling={false} className="font-normal text-sm text-neutral-700 mt-4">Classificação do Fototipo</Text>
        <Text allowFontScaling={false} className="text-neutral-900 text-lg font-medium">Fototipo {phototype?.phototype}</Text>
      </View>

      <View 
        className="w-[49%] p-6 bg-primary-50 rounded-xl justify-start items-start"
        style={{ minHeight: 155 }}
      >
        <View className="w-12 h-12 bg-primary-200 rounded-lg justify-center items-center">
          <MedalIcon size={30} color="#4052A1" />
        </View>

        <Text allowFontScaling={false} className="font-normal text-sm text-neutral-700 mt-4">Pontuação total</Text>
        <Text allowFontScaling={false} className="text-neutral-900 text-lg font-medium">{phototype?.score}</Text>
      </View>

      </View>

        <TitleText title="Resumo" />
        
        <View className="gap-8 mt-8">

          <SummaryQuestion question="Qual é a cor natural da pele do paciente?">
            {
              phototype?.skin_color === 'milky_white'? 'Branca leitosa' :
              phototype?.skin_color === 'white'? 'Branca' :
              phototype?.skin_color === 'white_to_beige_golden'? 'Branca a bege, com base dourada' :
              phototype?.skin_color === 'beige'? 'Bege' :
              phototype?.skin_color === 'light_brown'? 'Castanha clara' :
              phototype?.skin_color === 'dark_brown'? 'Castanha escura' :
              phototype?.skin_color === 'black'? 'Negra' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="Qual é a cor dos olhos do paciente?">
            {
              phototype?.eyes_color === 'light_blue_gray_green'? 'Azul claro, cinza, verde' :
              phototype?.eyes_color === 'blue_gray_green'? 'Azul, cinza ou verde' :
              phototype?.eyes_color === 'blue'? 'Azul' :
              phototype?.eyes_color === 'light_brown'? 'Castanho claro' :
              phototype?.eyes_color === 'dark_brown'? 'Castanho escuro' :              
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="Qual é a cor natural do cabelo do paciente?">
            {
              phototype?.hair_color === 'red_light_blond'? 'Ruivo, loiro claro' :           
              phototype?.hair_color === 'blond_light_brown'? 'Loiro, castanho claro' :           
              phototype?.hair_color === 'brown'? 'Castanho' :           
              phototype?.hair_color === 'dark_brown'? 'Castanho escuro' :           
              phototype?.hair_color === 'black'? 'Preto' :           
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="Quantas sardas o paciente tem em áreas não expostas?">
            {
              phototype?.freckles === 'many'? 'Muitas' :             
              phototype?.freckles === 'some'? 'Algumas' :             
              phototype?.freckles === 'few'? 'Poucas' :             
              phototype?.freckles === 'none'? 'Nenhuma' :             
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="Como a pele do paciente reage quando fica muito tempo exposta ao sol?">
            {
              phototype?.sun_exposed === 'always_burns_peels_painful'? 'Fica vermelha, dolorida, descasca' :            
              phototype?.sun_exposed === 'burns_peels_a_little'? 'Fica vermelha, descasca um pouco' :            
              phototype?.sun_exposed === 'burns_no_peel'? 'Fica vermelha, mas não descasca' :            
              phototype?.sun_exposed === 'seldom_or_not_red'? 'Fica levemente ou nada vermelha' :            
              phototype?.sun_exposed === 'never_red'? 'Nunca fica vermelha' :            
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="A pele do paciente bronzeia?">
            {
              phototype?.tanned_skin === 'never_always_burns'? 'Nunca, sempre queima' :
              phototype?.tanned_skin === 'sometimes'? 'Às vezes' :
              phototype?.tanned_skin === 'often'? 'Frequentemente' :
              phototype?.tanned_skin === 'always'? 'Sempre' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="Quão sensível é a face do paciente ao sol?">
            {
              phototype?.sun_sensitive_skin === 'very_sensitive'? 'Muito sensível' :
              phototype?.sun_sensitive_skin === 'sensitive'? 'Sensível' :
              phototype?.sun_sensitive_skin === 'normal'? 'Normal' :
              phototype?.sun_sensitive_skin === 'resistant'? 'Resistente' :
              phototype?.sun_sensitive_skin === 'very_resistant_never_burns'? 'Muito resistente, nunca queima' :
              'Não informado'
            }
          </SummaryQuestion>
        </View>
        

        <Button 
          title="Editar" 
          secondary 
          style={{ marginTop: 24, alignSelf: "flex-start"}} 
          full={false} iconLeft 
          icon={<PencilSimpleLineIcon size={24} color="#4052A1" />} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/edit/step1')}
        />
      </ScrollView>
    </Animated.View>
  );
}
