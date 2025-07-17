import Button from "@/components/Button";
import Header from "@/components/Header";
import ModalAddImage from "@/components/ModalAddImage";
import ProgressBar from "@/components/ProgressBar";
import { LesaoOncodermatoProps } from "@/types/forms";
import { AntDesign, Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function RegisterLesaoOncodermatoStep2() {
  const [notEmpty, setNotEmpty] = useState(false);
  const [modalAddImage, setModalAddImage] = useState(false);
  
  

  // formulario
  const { control, handleSubmit } = useForm<LesaoOncodermatoProps>();
  const lesionLocalValue = useWatch({ control, name: "lesion_images" });


  

  const handleNext = (data: LesaoOncodermatoProps) => {
    router.push('/(app)/(patient)/register-lesao/oncodermato/step3');
  }

  const handleCancel = () => {
    //setRiskProtectiveFactorsData({});
    router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/steps');
  }

  useEffect(() => {
    const current = lesionLocalValue || [];
    const hasValue = current.length > 0;

    setNotEmpty(hasValue);
  }, [lesionLocalValue]);

  // useEffect(() => {
  //   console.log(riskProtectiveFactorsData)
  // }, []);

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <ModalAddImage modalAddImage={modalAddImage} setModalAddImage={setModalAddImage} />

      <Header title="Registrar lesão" onPress={handleCancel} />

      <ScrollView className="px-6 w-full flex-1">
        <ProgressBar step={2} totalSteps={8} />

        <Text className="text-2xl font-semibold mt-6">Coleta de imagem da lesão</Text>

        <Text className="text-base text-gray-500 mt-4">Colete uma ou mais imagens da lesão. Verifique se as imagens estão nítidas, bem iluminadas e mostram a ferida com clareza.</Text>

        <View className="flex-row items-start justify-start mt-4 border gap-3 border-gray-800 rounded-lg p-4">
          <Feather name="info" size={20} color="#1E1E1E" />
          <View>
            <Text className="text-lg text-gray-800 font-semibold">Como coletar imagens?</Text>
            <Text className="text-gray-800">Saiba como utilizar o dermatoscopio</Text>
          </View>
        </View>

        <View className="flex-row flex-wrap gap-4 mt-8">
          <TouchableOpacity 
            className="w-[30%] h-[105] border border-gray-300 rounded-lg justify-center items-center overflow-hidden bg-gray-300 relative"
            onPress={()=> router.push({pathname: "/(app)/(patient)/termoConsentimento/details", params: { deletar: 'true' }})}
          >
            <Image 
              source={{ uri: "https://clinicapatriciaholderbaum.com.br/wp-content/uploads/2021/08/lpele5.jpg" }}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
              contentPosition="top"
            />
            <View className="bg-gray-600 absolute bottom-4 w-[73] h-[24] rounded-md justify-center items-center">
              <Text className="text-white text-sm">Visualizar</Text>
            </View>
          </TouchableOpacity>


          <TouchableOpacity 
            className="w-[30%] h-[105] border border-gray-300 rounded-lg justify-center items-center overflow-hidden bg-gray-300 relative"
            onPress={()=> router.push({pathname: "/(app)/(patient)/termoConsentimento/details", params: { deletar: 'true' }})}
          >
            <Image 
              source={{ uri: "https://vidasaudavel.einstein.br/wp-content/uploads/2023/05/lesoes-cancer-de-pele-1024x683.jpeg" }}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
              contentPosition="top"
            />
            <View className="bg-gray-600 absolute bottom-4 w-[73] h-[24] rounded-md justify-center items-center">
              <Text className="text-white text-sm">Visualizar</Text>
            </View>
          </TouchableOpacity>


          <TouchableOpacity 
            className="w-[30%] h-[105] border border-gray-300 rounded-lg justify-center items-center overflow-hidden bg-gray-300 relative"
            onPress={()=> router.push({pathname: "/(app)/(patient)/termoConsentimento/details", params: { deletar: 'true' }})}
          >
            <Image 
              source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTduWHzES3MMxtVG4dGsF-InE49KXNT6TMor_cR0CRpN-pCmwCbiASIhH6tco310wdXScc&usqp=CAU" }}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
              contentPosition="top"
            />
            <View className="bg-gray-600 absolute bottom-4 w-[73] h-[24] rounded-md justify-center items-center">
              <Text className="text-white text-sm antialiased">Visualizar</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-[30%] h-[105] border border-gray-300 rounded-lg justify-center items-center overflow-hidden bg-white relative"
            onPress={()=> setModalAddImage(!modalAddImage)}
          >
            <Feather name="camera" size={22} color="#757575" />
            <Text className="text-sm mt-3 text-center leading-4">Adicionar imagem</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>


      <View className="gap-4 mt-6 px-6 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<AntDesign name="arrowleft" size={14} color="#1E1E1E" />)} 
          onPress={()=> router.push("/(app)/(patient)/register-lesao/oncodermato/step1")} 
          style={{ flexGrow: 1, width: '47%' }}
        />
        <Button title="Próximo" 
          iconRight 
          icon={<AntDesign name="arrowright" size={14} color='#B3B3B3'/>} 
          onPress={handleSubmit(handleNext)} 
          style={{ flexGrow: 1, width: '47%' }}
        />
      </View>
    </Animated.View>
  );
}
