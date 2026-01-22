import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import ProgressBar from "@/components/ProgressBar";
import { SummaryQuestion } from "@/components/SummaryQuestion";
import { TitleText } from "@/components/TitleText";
import { useUlceraAPI } from "@/hooks/api/ulcera/useUlceraAPI";
import { useRegisterLesionUlceraForm } from "@/hooks/Ulcera/useRegisterLesionUlceraForm";
import { useLesionId } from "@/hooks/useLesionId";
import { useLesionType } from "@/hooks/useLesionType";
import { usePatientId } from "@/hooks/usePatientId";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { ArrowLeftIcon, MedalIcon } from "phosphor-react-native";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function RegisterLesaoUlceraStep9() {
  const { patientId, } = usePatientId();
  const { lesionId, updateLesionId, setLesionId } = useLesionId();
  const [isLoading, setIsLoading] = useState(false);

  const { registerLesionUlceraData, setRegisterLesionUlceraData, setImagesUlcera } = useRegisterLesionUlceraForm();

  const { lesionType, setLesionType } = useLesionType();
  const { sendRegisterLesion, getScore, resvechScore } = useUlceraAPI();


  const handleNext = async () => {
    setIsLoading(true);
    await sendRegisterLesion(patientId, lesionType);
  }

  const handleCancel = () => {
    setRegisterLesionUlceraData({});
    setImagesUlcera([]);
    setLesionType(null)
    setLesionId(null);
    router.push('/(app)/(patient)/register-lesao/select');
  }

  useFocusEffect(
    useCallback(() => {
      getScore()
    },[])
  )

  useEffect(() => {
    console.log(registerLesionUlceraData)
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
        <ProgressBar step={9} totalSteps={9} />

        <TitleText title="RESVECH" />

        <View className="p-6 rounded-xl bg-primary-50 flex-row gap-4 mt-8">
          <View className="w-12 h-12 bg-primary-200 rounded-lg justify-center items-center">
            <MedalIcon size={30} color="#4052A1" />
          </View>

          <View>
            <Text allowFontScaling={false} className="text-sm text-neutral-700">Pontuação total</Text>
            <Text allowFontScaling={false} className="text-lg font-medium text-neutral-900">{resvechScore?.total_score}</Text>
          </View>

        </View>
        
        <View className="gap-8 mt-8 mb-4">
          <View>
            <SummaryQuestion question="Dimensão da lesão">
              {
                registerLesionUlceraData.lesion_dimension === '0'? 'Área = 0m²' :
                registerLesionUlceraData.lesion_dimension === '3'? 'Área < 4cm²' :
                registerLesionUlceraData.lesion_dimension === '4'? 'Área = entre 4cm² e 16cm²' :
                registerLesionUlceraData.lesion_dimension === '16'? 'Área = entre 16cm² e 36cm²' :
                registerLesionUlceraData.lesion_dimension === '36'? 'Área = entre 36cm² e 64cm²' :
                registerLesionUlceraData.lesion_dimension === '64'? 'Área = entre 64cm² e 100cm²' :
                registerLesionUlceraData.lesion_dimension === '101'? 'Área > 100cm²' :
                'Não informado'
              }
            </SummaryQuestion>
            <View className="py-[6px] px-2 rounded-lg bg-success-100 self-start mt-2">
              <Text allowFontScaling={false} className="text-success-700 font-semibold text-xs">+ {resvechScore?.breakdown?.lesion_dimension_points} pontos</Text>
            </View>
          </View>

          <View>
            <SummaryQuestion question="Profundidade do tecido atingido">
              {
                registerLesionUlceraData.depth_of_tissue_injury === 'intact_skin'? 'Pele intacta regenerada ou cicatrizada' :
                registerLesionUlceraData.depth_of_tissue_injury === 'epidermis_dermis'? 'Atingimento de epiderme e derme' :
                registerLesionUlceraData.depth_of_tissue_injury === 'hypodermis_subcutaneous'? 'Atingimento de tela subcutânea ou tecido adiposo sem atingir a fáscia muscular' :
                registerLesionUlceraData.depth_of_tissue_injury === 'muscle_tissue'? 'Atingimento muscular' :
                registerLesionUlceraData.depth_of_tissue_injury === 'bone_tissue'? 'Atingimento ósseo e/ou tecidos anexos (tendões, ligamentos, cápsula articular) ou necrose negra, não permitindo visualização de tecidos subjacentes' :
                'Não informado'
              }
            </SummaryQuestion>
            <View className="py-[6px] px-2 rounded-lg bg-success-100 self-start mt-2">
              <Text allowFontScaling={false} className="text-success-700 font-semibold text-xs">+ {resvechScore?.breakdown?.depth_points} pontos</Text>
            </View>
          </View>

          <View>
            <SummaryQuestion question="Bordos">
              {
                registerLesionUlceraData.wound_edges === 'no_edges'? 'Ausência de bordos e ferida' :
                registerLesionUlceraData.wound_edges === 'diffuse'? 'Difusos' :
                registerLesionUlceraData.wound_edges === 'well_defined'? 'Delimitados' :
                registerLesionUlceraData.wound_edges === 'damaged'? 'Lesados' :
                registerLesionUlceraData.wound_edges === 'thickened'? 'Espessos ("envelhecimento", "evertidos"' :
                'Não informado'
              }
            </SummaryQuestion>
            <View className="py-[6px] px-2 rounded-lg bg-success-100 self-start mt-2">
              <Text allowFontScaling={false} className="text-success-700 font-semibold text-xs">+ {resvechScore?.breakdown?.edges_points} pontos</Text>
            </View>
          </View>

          <View>
            <SummaryQuestion question="Tipo de tecido presente no leito da ferida">
              {
                registerLesionUlceraData.wound_bed_tissue === 'regenerated_scarred'? 'Tecido regenerado/cicatrizado' :
                registerLesionUlceraData.wound_bed_tissue === 'epithelialization'? 'Tecido epitelial' :
                registerLesionUlceraData.wound_bed_tissue === 'granulation'? 'Tecido de granulação' :
                registerLesionUlceraData.wound_bed_tissue === 'devitalized_fibrinous'? 'Tecido desvitalizado e/ou fibrinoso' :
                registerLesionUlceraData.wound_bed_tissue === 'necrotic'? 'Tecido necrótico (necrose seca ou úmida)' :
                'Não informado'
              }
            </SummaryQuestion>
            <View className="py-[6px] px-2 rounded-lg bg-success-100 self-start mt-2">
              <Text allowFontScaling={false} className="text-success-700 font-semibold text-xs">+ {resvechScore?.breakdown?.bed_tissue_points} pontos</Text>
            </View>
          </View>

          <View>
            <SummaryQuestion question="Exsudato">
            {
              registerLesionUlceraData.exudate_type === 'dry'? 'Seco' :
              registerLesionUlceraData.exudate_type === 'moist'? 'Úmido' :
              registerLesionUlceraData.exudate_type === 'wet'? 'Molhado' :
              registerLesionUlceraData.exudate_type === 'saturated'? 'Saturado ou elevado' :
              registerLesionUlceraData.exudate_type === 'leakage'? 'Com fuga de exsudato' :
              'Não informado'
            }
            </SummaryQuestion>
            <View className="py-[6px] px-2 rounded-lg bg-success-100 self-start mt-2">
              <Text allowFontScaling={false} className="text-success-700 font-semibold text-xs">+ {resvechScore?.breakdown?.exudate_points} pontos</Text>
            </View>
          </View>

          <View>
            <SummaryQuestion question="Infecção/Inflamação">
            { registerLesionUlceraData?.inflamacao && registerLesionUlceraData?.inflamacao?.map((item: string | { name: string }) => typeof item === 'string' ? item : item.name).join(', ')}
            </SummaryQuestion>
            <View className="py-[6px] px-2 rounded-lg bg-success-100 self-start mt-2">
              <Text allowFontScaling={false} className="text-success-700 font-semibold text-xs">+ {resvechScore?.breakdown?.infection_flags_points} pontos</Text>
            </View>
          </View>
        </View>


      </ScrollView>

      <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)}
          onPress={()=> router.push("/(app)/(patient)/register-lesao/ulcera/step8")} 
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
