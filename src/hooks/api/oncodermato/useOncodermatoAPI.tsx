import { useRegisterLesionForm } from "@/hooks/Oncodermato/useRegisterLesionForm";
import { useLesionId } from "@/hooks/useLesionId";
import { api } from "@/services/api";
import axios from "axios";
import { router } from "expo-router";


export function useOncodermatoAPI() {

  const { registerLesionData, setRegisterLesionData, setImages } = useRegisterLesionForm();
  const { lesionId, updateLesionId } = useLesionId();

  ///// REGISTER /////

  const sendRegisterLesion = async (patientId: string | null, lesionType: string | null) => {
      //console.log(registerLesionData)

      if(lesionId){
        try{
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


  return {
    sendRegisterLesion
  };
}