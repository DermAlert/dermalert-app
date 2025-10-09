import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import ProgressBar from "@/components/ProgressBar";
import { SummaryQuestion } from "@/components/SummaryQuestion";
import { TitleText } from "@/components/TitleText";
import { useRegisterLesionUlceraForm } from "@/hooks/Ulcera/useRegisterLesionUlceraForm";
import { useLesionId } from "@/hooks/useLesionId";
import { useLesionType } from "@/hooks/useLesionType";
import { usePatientId } from "@/hooks/usePatientId";
import { api } from "@/services/api";
import axios from "axios";
import { router } from "expo-router";
import { ArrowLeftIcon, MedalIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function RegisterLesaoUlceraStep9() {
  const { patientId, } = usePatientId();
  const { lesionId, updateLesionId, setLesionId } = useLesionId();
  const [isLoading, setIsLoading] = useState(false);
  const [resvechScore, setResvechScore] = useState<{ 
    total_score?: number,
    breakdown?: {
      lesion_dimension_points?: number,
      depth_points?: number,
      edges_points?: number,
      bed_tissue_points?: number,
      exudate_points?: number,
      infection_flags_points?: number
    },
    dimension_area_cm2?: number
   } | null>(null)

  const { registerLesionUlceraData, setRegisterLesionUlceraData, setImagesUlcera } = useRegisterLesionUlceraForm();

  const { lesionType, setLesionType } = useLesionType();
  
  // const handleNext = () => {
  //   router.push('/(app)/(patient)/register-lesao/ulcera/success');
  // }

  function calcularLadoEmMM(areaCm2: number) {
    // calcula o lado em centímetros (assumindo um quadrado)
    const ladoCm = Math.sqrt(areaCm2);
  
    // converte para milímetros
    const ladoMm = ladoCm * 10;
  
    return ladoMm;
  }

  const getScore = async () => {
    //console.log(patientId);

    try {
      setIsLoading(true);

      // Envia Avaliação de Fototipo

      console.log("Enviando dados pro calculo");

      const dimensionToNumber = registerLesionUlceraData.lesion_dimension === '0'? 0 :
                                  registerLesionUlceraData.lesion_dimension === '3'? 3 :
                                  registerLesionUlceraData.lesion_dimension === '4'? 4 :
                                  registerLesionUlceraData.lesion_dimension === '16'? 16 :
                                  registerLesionUlceraData.lesion_dimension === '36'? 36 :
                                  registerLesionUlceraData.lesion_dimension === '64'? 64 :
                                  registerLesionUlceraData.lesion_dimension === '101'? 101 : 0;

        const dimensionValue = calcularLadoEmMM(dimensionToNumber)
        //console.log(Math.round(dimensionValue))

      const scoreResponse = await api.post(
        `/wounds/calculate/`,
        {
          "height_mm": Math.round(dimensionValue),
            "width_mm": Math.round(dimensionValue),
            "wound_edges": registerLesionUlceraData.wound_edges,
            "wound_bed_tissue": registerLesionUlceraData.wound_bed_tissue,
            "depth_of_tissue_injury": registerLesionUlceraData.depth_of_tissue_injury,
            "exudate_type": registerLesionUlceraData.exudate_type,
            "increased_pain": registerLesionUlceraData.inflamacao?.includes("Dor aumentada") || false,
            "perilesional_erythema": registerLesionUlceraData.inflamacao?.includes("Eritema perilesional") || false,
            "perilesional_edema": registerLesionUlceraData.inflamacao?.includes("Edema perilesional") || false,
            "heat_or_warm_skin": registerLesionUlceraData.inflamacao?.includes("Calor / pele quente") || false,
            "increased_exudate": registerLesionUlceraData.inflamacao?.includes("Exsudato aumentado") || false,
            "purulent_exudate": registerLesionUlceraData.inflamacao?.includes("Exsudato purulento") || false,
            "friable_tissue": registerLesionUlceraData.inflamacao?.includes("Tecido friável ou facilmente sangrante") || false,
            "stagnant_wound": registerLesionUlceraData.inflamacao?.includes("Ferida estagnada, sem melhora de cicatrização") || false,
            "biofilm_compatible_tissue": registerLesionUlceraData.inflamacao?.includes("Tecido compatível com biofilme") || false,
            "odor": registerLesionUlceraData.inflamacao?.includes("Odor") || false,
            "hypergranulation": registerLesionUlceraData.inflamacao?.includes("Hipergranulação") || false,
            "wound_size_increase": registerLesionUlceraData.inflamacao?.includes("Aumento do tamanho da ferida") || false,
            "satallite_lesions": registerLesionUlceraData.inflamacao?.includes("Lesões satélite") || false,
            "grayish_wound_bed": registerLesionUlceraData.inflamacao?.includes("Leito de ferida com aspecto acinzentado") || false 
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("phototypeAssessmentData enviado com sucesso:", scoreResponse.data);

      setResvechScore(scoreResponse.data);

      setIsLoading(false);

    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log('STATUS:', error.response?.status);
        console.log('HEADERS:', error.response?.headers);
        console.log('DATA:', JSON.stringify(error.response?.data, null, 2));
      } 
    }
  }

  const handleNext = async () => {
    //console.log(registerLesionData)

    if(lesionId){
      try{
        setIsLoading(true)
        console.log("Enviando registerLesionData");
        console.log("Enviando registerLesionUlceraData");

          const dimensionToNumber = registerLesionUlceraData.lesion_dimension === '0'? 0 :
                                    registerLesionUlceraData.lesion_dimension === '3'? 3 :
                                    registerLesionUlceraData.lesion_dimension === '4'? 4 :
                                    registerLesionUlceraData.lesion_dimension === '16'? 16 :
                                    registerLesionUlceraData.lesion_dimension === '36'? 36 :
                                    registerLesionUlceraData.lesion_dimension === '64'? 64 :
                                    registerLesionUlceraData.lesion_dimension === '101'? 101 : 0;

          const dimensionValue = calcularLadoEmMM(dimensionToNumber)
  
          //3. Envia registerLesionUlceraData para a rota com userLesionId
          const registerLesionResponse = await api.post(
            `/patients/${patientId}/skin-conditions/${lesionId}/wounds/`,
            {
              "height_mm": dimensionValue,
              "width_mm": dimensionValue,
              "wound_edges": registerLesionUlceraData.wound_edges,
              "wound_bed_tissue": registerLesionUlceraData.wound_bed_tissue,
              "depth_of_tissue_injury": registerLesionUlceraData.depth_of_tissue_injury,
              "exudate_type": registerLesionUlceraData.exudate_type,
              "increased_pain": registerLesionUlceraData.inflamacao?.includes("Dor aumentada") || false,
              "perilesional_erythema": registerLesionUlceraData.inflamacao?.includes("Eritema perilesional") || false,
              "perilesional_edema": registerLesionUlceraData.inflamacao?.includes("Edema perilesional") || false,
              "heat_or_warm_skin": registerLesionUlceraData.inflamacao?.includes("Calor / pele quente") || false,
              "increased_exudate": registerLesionUlceraData.inflamacao?.includes("Exsudato aumentado") || false,
              "purulent_exudate": registerLesionUlceraData.inflamacao?.includes("Exsudato purulento") || false,
              "friable_tissue": registerLesionUlceraData.inflamacao?.includes("Tecido friável ou facilmente sangrante") || false,
              "stagnant_wound": registerLesionUlceraData.inflamacao?.includes("Ferida estagnada, sem melhora de cicatrização") || false,
              "biofilm_compatible_tissue": registerLesionUlceraData.inflamacao?.includes("Tecido compatível com biofilme") || false,
              "odor": registerLesionUlceraData.inflamacao?.includes("Odor") || false,
              "hypergranulation": registerLesionUlceraData.inflamacao?.includes("Hipergranulação") || false,
              "wound_size_increase": registerLesionUlceraData.inflamacao?.includes("Aumento do tamanho da ferida") || false,
              "satallite_lesions": registerLesionUlceraData.inflamacao?.includes("Lesões satélite") || false,
              "grayish_wound_bed": registerLesionUlceraData.inflamacao?.includes("Leito de ferida com aspecto acinzentado") || false
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
  
          console.log("registerLesionUlceraData enviado com sucesso:", registerLesionResponse.data);

        // 4. Pega o ID do registro da lesao (wound_pk) da resposta
        const lesionRegisteredId = registerLesionResponse.data?.id;
        //const lesionRegisteredId = 1
 
       console.log("wound_pk retornado:", lesionRegisteredId);
 
       if (!lesionRegisteredId) {
         console.error("wound_pk não encontrada na resposta");
         return;
       }

       if (lesionRegisteredId){ 

       if (registerLesionUlceraData.lesion_images && registerLesionUlceraData.lesion_images.length > 0) {

         for (const image of registerLesionUlceraData.lesion_images) {

           // Extrai nome do arquivo (pega tudo depois da última /)
           const filename = image.split("/").pop() || "image.jpg";
           // Pega extensão e monta o tipo MIME
           const match = /\.(\w+)$/.exec(filename);
           const ext = match?.[1] || "jpg";
           const mimeType = `image/${ext}`;

           const file: any = {
             uri: image,
             type: mimeType,
             name: filename,
           };

         const form = new FormData();
         form.append("image", file);

         console.log("Enviando imagem");

         const imageResponse = await api.post(`/patients/${patientId}/skin-conditions/${lesionId}/wounds/${lesionRegisteredId}/images/`,
           form,
           {
             headers: {
             'Content-Type': 'multipart/form-data',
             },
           }
           );

         console.log("Image uploaded successfully:", imageResponse.data);

       
         }

         setRegisterLesionUlceraData({});
         setImagesUlcera([]);
 
         updateLesionId(lesionId.toString());
 
         router.push({pathname: '/(app)/(patient)/register-lesao/oncodermato/success', params: { id: lesionId, type: lesionType }})
       }
       
       }

      } catch(error){
        console.log(error);
        if (axios.isAxiosError(error)) {
          console.log('STATUS:', error.response?.status);
          console.log('HEADERS:', error.response?.headers);
          console.log('DATA:', JSON.stringify(error.response?.data, null, 2));
        } 
      }
    } else {
      try {
        setIsLoading(true)
  
        // 1. Envia skin-conditions
        const locationData = `${registerLesionUlceraData.lesion_local?.body_part}.${registerLesionUlceraData.lesion_local?.location}`;
        console.log("Enviando skin-conditions com os seguintes dados:");

        const skinConditionResponse = await api.post(
          `/patients/${patientId}/skin-conditions/`,
          {
            "location": locationData,
            "type": lesionType
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        console.log("skinCondition enviado com sucesso:", skinConditionResponse.data);
  
        // // 2. Pega o user ID da resposta
        const userLesionId = skinConditionResponse.data?.id;
  
        console.log("ID do usuário retornado:", userLesionId);
  
        if (!userLesionId) {
          console.error("ID da lesao não encontrada na resposta");
          return;
        }
  
        if (userLesionId){  
  
          console.log("Enviando registerLesionUlceraData");

          const dimensionToNumber = registerLesionUlceraData.lesion_dimension === '0'? 0 :
                                    registerLesionUlceraData.lesion_dimension === '3'? 3 :
                                    registerLesionUlceraData.lesion_dimension === '4'? 4 :
                                    registerLesionUlceraData.lesion_dimension === '16'? 16 :
                                    registerLesionUlceraData.lesion_dimension === '36'? 36 :
                                    registerLesionUlceraData.lesion_dimension === '64'? 64 :
                                    registerLesionUlceraData.lesion_dimension === '101'? 101 : 0;

          const dimensionValue = calcularLadoEmMM(dimensionToNumber)

          // console.log({
          //   "height_mm": dimensionValue,
          //   "width_mm": dimensionValue,
          //   "wound_edges": registerLesionUlceraData.wound_edges,
          //   "wound_bed_tissue": registerLesionUlceraData.wound_bed_tissue,
          //   "depth_of_tissue_injury": registerLesionUlceraData.depth_of_tissue_injury,
          //   "exudate_type": registerLesionUlceraData.exudate_type,
          //   "increased_pain": registerLesionUlceraData.inflamacao?.includes("Dor aumentada") || false,
          //   "perilesional_erythema": registerLesionUlceraData.inflamacao?.includes("Eritema perilesional") || false,
          //   "perilesional_edema": registerLesionUlceraData.inflamacao?.includes("Edema perilesional") || false,
          //   "heat_or_warm_skin": registerLesionUlceraData.inflamacao?.includes("Calor / pele quente") || false,
          //   "increased_exudate": registerLesionUlceraData.inflamacao?.includes("Exsudato aumentado") || false,
          //   "purulent_exudate": registerLesionUlceraData.inflamacao?.includes("Exsudato purulento") || false,
          //   "friable_tissue": registerLesionUlceraData.inflamacao?.includes("Tecido friável ou facilmente sangrante") || false,
          //   "stagnant_wound": registerLesionUlceraData.inflamacao?.includes("Ferida estagnada, sem melhora de cicatrização") || false,
          //   "biofilm_compatible_tissue": registerLesionUlceraData.inflamacao?.includes("Tecido compatível com biofilme") || false,
          //   "odor": registerLesionUlceraData.inflamacao?.includes("Odor") || false,
          //   "hypergranulation": registerLesionUlceraData.inflamacao?.includes("Hipergranulação") || false,
          //   "wound_size_increase": registerLesionUlceraData.inflamacao?.includes("Aumento do tamanho da ferida") || false,
          //   "satallite_lesions": registerLesionUlceraData.inflamacao?.includes("Lesões satélite") || false,
          //   "grayish_wound_bed": registerLesionUlceraData.inflamacao?.includes("Leito de ferida com aspecto acinzentado") || false  
          // });
          // console.log(`/patients/${patientId}/skin-conditions/${userLesionId}/wounds/`)
  
          //3. Envia registerLesionUlceraData para a rota com userLesionId
          const registerLesionResponse = await api.post(
            `/patients/${patientId}/skin-conditions/${userLesionId}/wounds/`,
            {
              "height_mm": dimensionValue,
              "width_mm": dimensionValue,
              "wound_edges": registerLesionUlceraData.wound_edges,
              "wound_bed_tissue": registerLesionUlceraData.wound_bed_tissue,
              "depth_of_tissue_injury": registerLesionUlceraData.depth_of_tissue_injury,
              "exudate_type": registerLesionUlceraData.exudate_type,
              "increased_pain": registerLesionUlceraData.inflamacao?.includes("Dor aumentada") || false,
              "perilesional_erythema": registerLesionUlceraData.inflamacao?.includes("Eritema perilesional") || false,
              "perilesional_edema": registerLesionUlceraData.inflamacao?.includes("Edema perilesional") || false,
              "heat_or_warm_skin": registerLesionUlceraData.inflamacao?.includes("Calor / pele quente") || false,
              "increased_exudate": registerLesionUlceraData.inflamacao?.includes("Exsudato aumentado") || false,
              "purulent_exudate": registerLesionUlceraData.inflamacao?.includes("Exsudato purulento") || false,
              "friable_tissue": registerLesionUlceraData.inflamacao?.includes("Tecido friável ou facilmente sangrante") || false,
              "stagnant_wound": registerLesionUlceraData.inflamacao?.includes("Ferida estagnada, sem melhora de cicatrização") || false,
              "biofilm_compatible_tissue": registerLesionUlceraData.inflamacao?.includes("Tecido compatível com biofilme") || false,
              "odor": registerLesionUlceraData.inflamacao?.includes("Odor") || false,
              "hypergranulation": registerLesionUlceraData.inflamacao?.includes("Hipergranulação") || false,
              "wound_size_increase": registerLesionUlceraData.inflamacao?.includes("Aumento do tamanho da ferida") || false,
              "satallite_lesions": registerLesionUlceraData.inflamacao?.includes("Lesões satélite") || false,
              "grayish_wound_bed": registerLesionUlceraData.inflamacao?.includes("Leito de ferida com aspecto acinzentado") || false
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
  
          console.log("registerLesionUlceraData enviado com sucesso:", registerLesionResponse.data);

          // // 4. Pega o ID do registro da lesao (wound_pk) da resposta
           const lesionRegisteredId = registerLesionResponse.data?.id;
           //const lesionRegisteredId = 1
    
          console.log("wound_pk retornado:", lesionRegisteredId);
    
          if (!lesionRegisteredId) {
            console.error("wound_pk não encontrada na resposta");
            return;
          }

          if (lesionRegisteredId){ 

          if (registerLesionUlceraData.lesion_images && registerLesionUlceraData.lesion_images.length > 0) {

            for (const image of registerLesionUlceraData.lesion_images) {

              // Extrai nome do arquivo (pega tudo depois da última /)
              const filename = image.split("/").pop() || "image.jpg";
              // Pega extensão e monta o tipo MIME
              const match = /\.(\w+)$/.exec(filename);
              const ext = match?.[1] || "jpg";
              const mimeType = `image/${ext}`;

              const file: any = {
                uri: image,
                type: mimeType,
                name: filename,
              };

            const form = new FormData();
            form.append("image", file);

            console.log("Enviando imagem");

            const imageResponse = await api.post(`/patients/${patientId}/skin-conditions/${userLesionId}/wounds/${lesionRegisteredId}/images/`,
              form,
              {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
              }
              );

            console.log("Image uploaded successfully:", imageResponse.data);

          
            }

            setRegisterLesionUlceraData({});
            setImagesUlcera([]);
    
            updateLesionId(userLesionId.toString());
    
            router.push({pathname: '/(app)/(patient)/register-lesao/oncodermato/success', params: { id: userLesionId, type: lesionType }})
          }
          
          }
        }
        
  
      } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
          console.log('STATUS:', error.response?.status);
          console.log('HEADERS:', error.response?.headers);
          console.log('DATA:', JSON.stringify(error.response?.data, null, 2));
        } 
      }
    }

    
  }

  const handleCancel = () => {
    setRegisterLesionUlceraData({});
    setImagesUlcera([]);
    setLesionType(null)
    setLesionId(null);
    router.push('/(app)/(patient)/register-lesao/select');
  }

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      getScore();
    }, 300);
  
    return () => {
      clearTimeout(timeout);
      setIsLoading(false);
    }

  }, [patientId]);

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
            <Text className="text-sm text-neutral-700">Pontuação total</Text>
            <Text className="text-lg font-medium text-neutral-900">{resvechScore?.total_score}</Text>
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
              <Text className="text-success-700 font-semibold text-xs">+ {resvechScore?.breakdown?.lesion_dimension_points} pontos</Text>
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
              <Text className="text-success-700 font-semibold text-xs">+ {resvechScore?.breakdown?.depth_points} pontos</Text>
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
              <Text className="text-success-700 font-semibold text-xs">+ {resvechScore?.breakdown?.edges_points} pontos</Text>
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
              <Text className="text-success-700 font-semibold text-xs">+ {resvechScore?.breakdown?.bed_tissue_points} pontos</Text>
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
              <Text className="text-success-700 font-semibold text-xs">+ {resvechScore?.breakdown?.exudate_points} pontos</Text>
            </View>
          </View>

          <View>
            <SummaryQuestion question="Infecção/Inflamação">
            { registerLesionUlceraData?.inflamacao && registerLesionUlceraData?.inflamacao?.map((item: string | { name: string }) => typeof item === 'string' ? item : item.name).join(', ')}
            </SummaryQuestion>
            <View className="py-[6px] px-2 rounded-lg bg-success-100 self-start mt-2">
              <Text className="text-success-700 font-semibold text-xs">+ {resvechScore?.breakdown?.infection_flags_points} pontos</Text>
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
