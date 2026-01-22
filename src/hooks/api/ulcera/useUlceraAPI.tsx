import { useRegisterLesionUlceraForm } from "@/hooks/Ulcera/useRegisterLesionUlceraForm";
import { useLesionId } from "@/hooks/useLesionId";
import { api } from "@/services/api";
import axios from "axios";
import { router } from "expo-router";
import { useState } from "react";


export function useUlceraAPI() {

  const { registerLesionUlceraData, setRegisterLesionUlceraData, setImagesUlcera } = useRegisterLesionUlceraForm();
  const { lesionId, updateLesionId } = useLesionId();

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

      console.log("score enviado com sucesso:", scoreResponse.data);

      setResvechScore(scoreResponse.data);

    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log('STATUS:', error.response?.status);
        console.log('HEADERS:', error.response?.headers);
        console.log('DATA:', JSON.stringify(error.response?.data, null, 2));
      } 
    }
  }

  ///// REGISTER /////

  const sendRegisterLesion = async (patientId: string | null, lesionType: string | null) => {
    //console.log(registerLesionData)

    if(lesionId){
      try{
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


  return {
    sendRegisterLesion,
    getScore,
    resvechScore
  };
}