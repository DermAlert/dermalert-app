import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import ProgressBar from "@/components/ProgressBar";
import { SummaryQuestion } from "@/components/SummaryQuestion";
import { TitleText } from "@/components/TitleText";
import { useRegisterLesionForm } from "@/hooks/Oncodermato/useRegisterLesionForm";
import { useLesionId } from "@/hooks/useLesionId";
import { useLesionType } from "@/hooks/useLesionType";
import { usePatientId } from "@/hooks/usePatientId";
import { api } from "@/services/api";
import axios from "axios";
import { router } from "expo-router";
import { ArrowLeftIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function RegisterLesaoOncodermatoStep8() {
  const [notEmpty, setNotEmpty] = useState(false);
  const { patientId, } = usePatientId();
  const { lesionId, updateLesionId, setLesionId } = useLesionId();
  const [isLoading, setIsLoading] = useState(false);

  const { registerLesionData, setRegisterLesionData, setImages } = useRegisterLesionForm();

  const { lesionType, setLesionType } = useLesionType();
  

  // const handleNext = () => {
  //   router.push('/(app)/(patient)/register-lesao/oncodermato/success')
  // }

  const handleNext = async () => {
      //console.log(registerLesionData)

      if(lesionId){
        try{
          setIsLoading(true)
          console.log("Enviando registerLesionData");
          // console.log({
          //   "asymmetry": registerLesionData.asymmetry,
          //   "border": registerLesionData.border,
          //   "color_variation": registerLesionData.color_variation,
          //   "diameter": registerLesionData.diameter,
          //   "evolution": registerLesionData.evolution
          // });
          // console.log(`/patients/${patientId}/skin-conditions/${userLesionId}/cancer/`)
  
          // 3. Envia registerLesionData para a rota com userLesionId
          const registerLesionResponse = await api.post(
            `/patients/${patientId}/skin-conditions/${lesionId}/cancer/`,
            {
              "asymmetry": registerLesionData.asymmetry,
              "border": registerLesionData.border,
              "color_variation": registerLesionData.color_variation,
              "diameter": registerLesionData.diameter,
              "evolution": registerLesionData.evolution
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
  
          console.log("registerLesionResponse enviado com sucesso:", registerLesionResponse.data);

          // // 4. Pega o ID do registro da lesao (cancer_pk) da resposta
          const lesionRegisteredId = registerLesionResponse.data?.id;
    
          console.log("cancer_pk retornado:", lesionRegisteredId);
    
          if (!lesionRegisteredId) {
            console.error("cancer_pk não encontrada na resposta");
            return;
          }

          if (lesionRegisteredId){ 

          if (registerLesionData.lesion_images && registerLesionData.lesion_images.length > 0) {

            for (const image of registerLesionData.lesion_images) {

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

            const imageResponse = await api.post(`/patients/${patientId}/skin-conditions/${lesionId}/cancer/${lesionRegisteredId}/images/`,
              form,
              {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
              }
              );

            console.log("Image uploaded successfully:", imageResponse.data);

          
            }

            setRegisterLesionData({});
            setImages([]);
            //setLesionType(null)
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
          const locationData = `${registerLesionData.lesion_local?.body_part}.${registerLesionData.lesion_local?.location}`;
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
    
            console.log("Enviando registerLesionData");
            // console.log({
            //   "asymmetry": registerLesionData.asymmetry,
            //   "border": registerLesionData.border,
            //   "color_variation": registerLesionData.color_variation,
            //   "diameter": registerLesionData.diameter,
            //   "evolution": registerLesionData.evolution
            // });
            // console.log(`/patients/${patientId}/skin-conditions/${userLesionId}/cancer/`)
    
            // 3. Envia registerLesionData para a rota com userLesionId
            const registerLesionResponse = await api.post(
              `/patients/${patientId}/skin-conditions/${userLesionId}/cancer/`,
              {
                "asymmetry": registerLesionData.asymmetry,
                "border": registerLesionData.border,
                "color_variation": registerLesionData.color_variation,
                "diameter": registerLesionData.diameter,
                "evolution": registerLesionData.evolution
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
    
            console.log("registerLesionResponse enviado com sucesso:", registerLesionResponse.data);
  
            // // 4. Pega o ID do registro da lesao (cancer_pk) da resposta
            const lesionRegisteredId = registerLesionResponse.data?.id;
      
            console.log("cancer_pk retornado:", lesionRegisteredId);
      
            if (!lesionRegisteredId) {
              console.error("cancer_pk não encontrada na resposta");
              return;
            }
  
            if (lesionRegisteredId){ 
  
            if (registerLesionData.lesion_images && registerLesionData.lesion_images.length > 0) {
  
              for (const image of registerLesionData.lesion_images) {
  
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
  
              const imageResponse = await api.post(`/patients/${patientId}/skin-conditions/${userLesionId}/cancer/${lesionRegisteredId}/images/`,
                form,
                {
                  headers: {
                  'Content-Type': 'multipart/form-data',
                  },
                }
                );
  
              console.log("Image uploaded successfully:", imageResponse.data);
  
            
              }
  
              setRegisterLesionData({});
              setImages([]);
              //setLesionType(null)
      
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
            <Text className="font-bold text-neutral-900 text-base mb-2">A - Assimetria</Text>
            <SummaryQuestion question="A lesão apresenta simetria entre suas metades?">
              {
                registerLesionData.asymmetry === 'symmetric'? 'Sim, a lesão é simétrica (forma uniforme)' :
                registerLesionData.asymmetry === 'asymmetric'? 'Não, a lesão é assimétrica (uma metade é diferente da outra)' :
                'Não informado'
              }
            </SummaryQuestion>
          </View>

          <View>
            <Text className="font-bold text-neutral-900 text-base mb-2">B - Bordas</Text>
            <SummaryQuestion question="Como são as bordas da lesão?">
              {
                registerLesionData.border === 'regular_well_defined'? 'Regulares e bem definidas' :
                registerLesionData.border === 'irregular_poorly_defined'? 'Irregulares, mal definidas, com contornos serrilhados ou borrados' :
                'Não informado'
              }
            </SummaryQuestion>
          </View>

          <View>
            <Text className="font-bold text-neutral-900 text-base mb-2">C - Cor</Text>
            <SummaryQuestion question="A lesão apresenta variação de cor?">
              {
                registerLesionData.color_variation === 'single_color'? 'Uma única cor (ex: castanho claro ou escuro)' :
                registerLesionData.color_variation === 'three_or_more_colors'? 'Três ou mais cores (ex: marrom, preto, vermelho, branco, azul)' :
                'Não informado'
              }
            </SummaryQuestion>
          </View>

          <View>
            <Text className="font-bold text-neutral-900 text-base mb-2">D - Diâmetro</Text>
            <SummaryQuestion question="Qual o tamanho aproximado da lesão?">
              {
                registerLesionData.diameter === 'under_6mm'? 'Menor que 6 mm (menor que uma borracha de lápis)' :
                registerLesionData.diameter === 'over_or_equal_6mm'? 'Maior ou igual a 6 mm.' :
                'Não informado'
              }
            </SummaryQuestion>
          </View>

          <View>
            <Text className="font-bold text-neutral-900 text-base mb-2">E - Evolução</Text>
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
