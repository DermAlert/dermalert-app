import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import PhotoCard from "@/components/PhotoCard";
import { SummaryQuestion } from "@/components/SummaryQuestion";
import { TitleText } from "@/components/TitleText";
import { useLesionId } from "@/hooks/useLesionId";
import { usePatientId } from "@/hooks/usePatientId";
import { api } from "@/services/api";
import { LesionImagesProps, LesionOncoProps, LesionUlcerProps } from "@/types/forms";
import { formatDateFromApi } from "@/utils/formatDate";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { MedalIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';


export default function LesaoRegistroDetail() {
  const [isLoading, setIsLoading] = useState(false);
  const [registroOnco, seRegistroOnco] = useState<LesionOncoProps>({} as LesionOncoProps);
  const [registroUlcer, seRegistroUlcer] = useState<LesionUlcerProps>({} as LesionUlcerProps);
  const [photos, setPhotos] = useState<LesionImagesProps[]>([]);

  const { type, registroId } = useLocalSearchParams();
  
  const { patientId } = usePatientId();
  const { setLesionId, lesionId } = useLesionId();

  async function loadLesionsById() {
    try {
      setIsLoading(true)
      if(type === "cancer"){
        const lesionsResponse = await api.get(`/patients/${patientId}/skin-conditions/${lesionId}/cancer/${registroId}/`);

        seRegistroOnco(lesionsResponse.data);
        setPhotos(
          lesionsResponse.data.images.map((img: LesionImagesProps) => ({
            ...img,
            // image: img.image.replace("localhost", "192.168.15.82"), // seu IP local
            image: img.image,
          }))
        );
        console.log(lesionsResponse.data);
      } else {
        const lesionsResponse = await api.get(`/patients/${patientId}/skin-conditions/${lesionId}/wounds/${registroId}/`);

        seRegistroUlcer(lesionsResponse.data);
        setPhotos(
          lesionsResponse.data.images.map((img: LesionImagesProps) => ({
            ...img,
            // image: img.image.replace("localhost", "192.168.15.82"), // seu IP local
            image: img.image
          }))
        );
        console.log(lesionsResponse.data);
      }

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
  
  // useFocusEffect(
  //   useCallback(() => {
  //     (async () => {
  //       await loadLesionsById();
  //     })();
  //   }, [patientId])
  // );

  const inflamationItems = {
    increased_pain: "Dor aumentada",
    perilesional_erythema: "Eritema perilesional",
    perilesional_edema: "Edema perilesional",
    heat_or_warm_skin: "Calor / pele quente",
    increased_exudate: "Exsudato aumentado",
    purulent_exudate: "Exsudato purulento",
    friable_tissue: "Tecido friável ou facilmente sangrante",
    stagnant_wound: "Ferida estagnada, sem melhora de cicatrização",
    biofilm_compatible_tissue: "Tecido compatível com biofilme",
    odor: "Odor",
    hypergranulation: "Hipergranulação",
    wound_size_increase: "Aumento do tamanho da ferida",
    satallite_lesions: "Lesões satélite",
    grayish_wound_bed: "Leito de ferida com aspecto acinzentado",
  };

  const inflamationGroup = Object.keys(registroUlcer)
        .filter((key) => registroUlcer[key as keyof LesionUlcerProps] === true)
        .map(key => inflamationItems[key as keyof typeof inflamationItems]);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      loadLesionsById();
    }, 300);
  
    return () => {
      clearTimeout(timeout);
      setIsLoading(false);
    }

    
  }, [patientId]);
  
  const handleCancel = () => {
    router.back();
  }

  useEffect(()=> {
    //console.log(photos.map(item=> item.image))
    console.log(photos)
  }, [photos])

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
 
      <Header icon="back" title={type === 'cancer' ? `Registro de ${formatDateFromApi(registroOnco.created_at)}` : `Registro de ${formatDateFromApi(registroUlcer.created_at)}`} onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">

        <TitleText title="Imagens capturadas" style={{ marginTop: 16}} /> 


        <View className="flex-row flex-wrap gap-4 mt-8">

          {photos.map((item)=> (
            <PhotoCard key={item.id} image={item.image} />
          )) }
        </View>

        {type === "cancer" ? (
          <View className="mt-10 gap-8 pb-10">
            <TitleText title="Questionário ABCDE" />

            <View>
              <Text className="font-bold text-neutral-900 text-base mb-2">A - Assimetria</Text>
              <SummaryQuestion question="A lesão apresenta simetria entre suas metades?">
                {
                  registroOnco.asymmetry === 'symmetric'? 'Sim, a lesão é simétrica (forma uniforme)' :
                  registroOnco.asymmetry === 'asymmetric'? 'Não, a lesão é assimétrica (uma metade é diferente da outra)' :
                  'Não informado'
                }
              </SummaryQuestion>
            </View>

            <View>
              <Text className="font-bold text-neutral-900 text-base mb-2">B - Bordas</Text>
              <SummaryQuestion question="Como são as bordas da lesão?">
                {
                  registroOnco.border === 'regular_well_defined'? 'Regulares e bem definidas' :
                  registroOnco.border === 'irregular_poorly_defined'? 'Irregulares, mal definidas, com contornos serrilhados ou borrados' :
                  'Não informado'
                }
              </SummaryQuestion>
            </View>

            <View>
              <Text className="font-bold text-neutral-900 text-base mb-2">C - Cor</Text>
              <SummaryQuestion question="A lesão apresenta variação de cor?">
                {
                  registroOnco.color_variation === 'single_color'? 'Uma única cor (ex: castanho claro ou escuro)' :
                  registroOnco.color_variation === 'three_or_more_colors'? 'Três ou mais cores (ex: marrom, preto, vermelho, branco, azul)' :
                  'Não informado'
                }
              </SummaryQuestion>
            </View>

            <View>
              <Text className="font-bold text-neutral-900 text-base mb-2">D - Diâmetro</Text>
              <SummaryQuestion question="Qual o tamanho aproximado da lesão?">
                {
                  registroOnco.diameter === 'under_6mm'? 'Menor que 6 mm (menor que uma borracha de lápis)' :
                  registroOnco.diameter === 'over_or_equal_6mm'? 'Maior ou igual a 6 mm.' :
                  'Não informado'
                }
              </SummaryQuestion>
            </View>

            <View>
              <Text className="font-bold text-neutral-900 text-base mb-2">E - Evolução</Text>
              <SummaryQuestion question="A lesão mudou ao longo do tempo?">
                {
                  registroOnco.evolution === 'no_changes'? 'Não houve mudanças perceptíveis nos últimos meses' :
                  registroOnco.evolution === 'recent_changes'? 'Houve mudança de forma, tamanho, cor, coceira ou sangramento recentemente' :
                  'Não informado'
                }
              </SummaryQuestion>
            </View>

          </View>
        ) : (
          <View className="mt-8 gap-8 pb-10">
            <TitleText title="RESVECH" />

            <View className="p-6 rounded-xl bg-primary-50 flex-row gap-4">
              <View className="w-12 h-12 bg-primary-200 rounded-lg justify-center items-center">
                <MedalIcon size={30} color="#4052A1" />
              </View>

              <View>
                <Text className="text-sm text-neutral-700">Pontuação total</Text>
                <Text className="text-lg font-medium text-neutral-900">{registroUlcer?.total_score}</Text>
              </View>

            </View>

            <View>
              <SummaryQuestion question="Dimensão da lesão">
                Área = entre 16cm² e 36cm²
              </SummaryQuestion>
            </View>

            <View>
              <SummaryQuestion question="Profundidade do tecido atingido">
                {
                  registroUlcer.depth_of_tissue_injury === 'intact_skin'? 'Pele intacta regenerada ou cicatrizada' :
                  registroUlcer.depth_of_tissue_injury === 'epidermis_dermis'? 'Atingimento de epiderme e derme' :
                  registroUlcer.depth_of_tissue_injury === 'hypodermis_subcutaneous'? 'Atingimento de tela subcutânea ou tecido adiposo sem atingir a fáscia muscular' :
                  registroUlcer.depth_of_tissue_injury === 'muscle_tissue'? 'Atingimento muscular' :
                  registroUlcer.depth_of_tissue_injury === 'bone_tissue'? 'Atingimento ósseo e/ou tecidos anexos (tendões, ligamentos, cápsula articular) ou necrose negra, não permitindo visualização de tecidos subjacentes' :
                  'Não informado'
                }
              </SummaryQuestion>
            </View>

            <View>
              <SummaryQuestion question="Bordos">
                {
                  registroUlcer.wound_edges === 'no_edges'? 'Ausência de bordos e ferida' :
                  registroUlcer.wound_edges === 'diffuse'? 'Difusos' :
                  registroUlcer.wound_edges === 'well_defined'? 'Delimitados' :
                  registroUlcer.wound_edges === 'damaged'? 'Lesados' :
                  registroUlcer.wound_edges === 'thickened'? 'Espessos ("envelhecimento", "evertidos"' :
                  'Não informado'
                }
              </SummaryQuestion>
            </View>

            <View>
              <SummaryQuestion question="Tipo de tecido presente no leito da ferida">
                {
                  registroUlcer.wound_bed_tissue === 'regenerated_scarred'? 'Tecido regenerado/cicatrizado' :
                  registroUlcer.wound_bed_tissue === 'epithelialization'? 'Tecido epitelial' :
                  registroUlcer.wound_bed_tissue === 'granulation'? 'Tecido de granulação' :
                  registroUlcer.wound_bed_tissue === 'devitalized_fibrinous'? 'Tecido desvitalizado e/ou fibrinoso' :
                  registroUlcer.wound_bed_tissue === 'necrotic'? 'Tecido necrótico (necrose seca ou úmida)' :
                  'Não informado'
                }
              </SummaryQuestion>
            </View>

            <View>
              <SummaryQuestion question="Exsudato">
              {
                registroUlcer.exudate_type === 'dry'? 'Seco' :
                registroUlcer.exudate_type === 'moist'? 'Úmido' :
                registroUlcer.exudate_type === 'wet'? 'Molhado' :
                registroUlcer.exudate_type === 'saturated'? 'Saturado ou elevado' :
                registroUlcer.exudate_type === 'leakage'? 'Com fuga de exsudato' :
                'Não informado'
              }
              </SummaryQuestion>
            </View>

            <View>
              <SummaryQuestion question="Infecção/Inflamação">
              { inflamationGroup && inflamationGroup.join(', ')}
              </SummaryQuestion>
            </View>


          </View>
        )}

      </ScrollView>
    </Animated.View>
  );
}
