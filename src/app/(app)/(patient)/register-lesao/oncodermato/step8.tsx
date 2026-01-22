import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import ProgressBar from "@/components/ProgressBar";
import { SummaryQuestion } from "@/components/SummaryQuestion";
import { TitleText } from "@/components/TitleText";
import { useOncodermatoAPI } from "@/hooks/api/oncodermato/useOncodermatoAPI";
import { useRegisterLesionForm } from "@/hooks/Oncodermato/useRegisterLesionForm";
import { useLesionId } from "@/hooks/useLesionId";
import { useLesionType } from "@/hooks/useLesionType";
import { usePatientId } from "@/hooks/usePatientId";
import { router } from "expo-router";
import { ArrowLeftIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function RegisterLesaoOncodermatoStep8() {
  const { patientId, } = usePatientId();
  const { lesionId, setLesionId } = useLesionId();
  const [isLoading, setIsLoading] = useState(false);

  const { registerLesionData, setRegisterLesionData, setImages } = useRegisterLesionForm();

  const { lesionType, setLesionType } = useLesionType();
  const { sendRegisterLesion } = useOncodermatoAPI();

  const handleNext = async () => {
    setIsLoading(true);
    await sendRegisterLesion(patientId, lesionType);
  }
  
  
  const handleCancel = () => {
    setRegisterLesionData({});
    setImages([]);
    setLesionType(null)
    setLesionId(null);
    router.push('/(app)/(patient)/register-lesao/select');
  }


  useEffect(() => {
    console.log(registerLesionData)
    console.log(lesionId)
    console.log(lesionType)
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

      <Header title="Registrar lesão" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={8} totalSteps={8} />

        <TitleText title="Resumo" style={{marginTop: 8}} />
        
        <View className="gap-8 my-8">
          <View>
            <Text allowFontScaling={false} className="font-bold text-neutral-900 text-base mb-2">A - Assimetria</Text>
            <SummaryQuestion question="A lesão apresenta simetria entre suas metades?">
              {
                registerLesionData.asymmetry === 'symmetric'? 'Sim, a lesão é simétrica (forma uniforme)' :
                registerLesionData.asymmetry === 'asymmetric'? 'Não, a lesão é assimétrica (uma metade é diferente da outra)' :
                'Não informado'
              }
            </SummaryQuestion>
          </View>

          <View>
            <Text allowFontScaling={false} className="font-bold text-neutral-900 text-base mb-2">B - Bordas</Text>
            <SummaryQuestion question="Como são as bordas da lesão?">
              {
                registerLesionData.border === 'regular_well_defined'? 'Regulares e bem definidas' :
                registerLesionData.border === 'irregular_poorly_defined'? 'Irregulares, mal definidas, com contornos serrilhados ou borrados' :
                'Não informado'
              }
            </SummaryQuestion>
          </View>

          <View>
            <Text allowFontScaling={false} className="font-bold text-neutral-900 text-base mb-2">C - Cor</Text>
            <SummaryQuestion question="A lesão apresenta variação de cor?">
              {
                registerLesionData.color_variation === 'single_color'? 'Uma única cor (ex: castanho claro ou escuro)' :
                registerLesionData.color_variation === 'three_or_more_colors'? 'Três ou mais cores (ex: marrom, preto, vermelho, branco, azul)' :
                'Não informado'
              }
            </SummaryQuestion>
          </View>

          <View>
            <Text allowFontScaling={false} className="font-bold text-neutral-900 text-base mb-2">D - Diâmetro</Text>
            <SummaryQuestion question="Qual o tamanho aproximado da lesão?">
              {
                registerLesionData.diameter === 'under_6mm'? 'Menor que 6 mm (menor que uma borracha de lápis)' :
                registerLesionData.diameter === 'over_or_equal_6mm'? 'Maior ou igual a 6 mm.' :
                'Não informado'
              }
            </SummaryQuestion>
          </View>

          <View>
            <Text allowFontScaling={false} className="font-bold text-neutral-900 text-base mb-2">E - Evolução</Text>
            <SummaryQuestion question="A lesão mudou ao longo do tempo?">
              {
                registerLesionData.evolution === 'no_changes'? 'Não houve mudanças perceptíveis nos últimos meses' :
                registerLesionData.evolution === 'recent_changes'? 'Houve mudança de forma, tamanho, cor, coceira ou sangramento recentemente' :
                'Não informado'
              }
            </SummaryQuestion>
          </View>
          
        </View>
      </ScrollView>

      <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/step7')} 
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
