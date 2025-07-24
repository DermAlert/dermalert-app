import AddPhotoButton from "@/components/AddPhotoButton";
import Button from "@/components/Button";
import Header from "@/components/Header";
import ModalAddImage from "@/components/ModalAddImage";
import PhotoCard from "@/components/PhotoCard";
import ProgressBar from "@/components/ProgressBar";
import { useRegisterLesionForm } from "@/hooks/Oncodermato/useRegisterLesionForm";
import { LesaoOncodermatoProps } from "@/types/forms";
import { AntDesign, Feather } from '@expo/vector-icons';
import { router } from "expo-router";
import { useState } from "react";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function RegisterLesaoOncodermatoStep2() {
  const [modalAddImage, setModalAddImage] = useState(false);

  const { setRegisterLesionData, updateRegisterLesionData, images, setImages } = useRegisterLesionForm();
  
  const handleNext = (data: LesaoOncodermatoProps) => {
    if (data.lesion_images && data.lesion_images.length > 0 || images.length > 0) {
      console.log(data);
      updateRegisterLesionData(data);
      router.push('/(app)/(patient)/register-lesao/oncodermato/step3');
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setRegisterLesionData({});
    setImages([]);
    router.push('/(app)/(patient)/register-lesao/select');
  }

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <ModalAddImage 
        modalAddImage={modalAddImage}
        setModalAddImage={setModalAddImage} 
        images={images}
        setImages={setImages}
      />

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

          {images.map(item => (
            <PhotoCard key={item} image={item} isDeletable isOncodermato />
          ))}

          <AddPhotoButton onPress={()=> setModalAddImage(true)} /> 

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
        <Button 
          title="Próximo" 
          iconRight 
          icon={<AntDesign name="arrowright" size={14} color={`${images.length > 0 ? 'white' : '#B3B3B3'}`} />} 
          style={{ flexGrow: 1, width: '47%' }} 
          onPress={()=> handleNext({ lesion_images: images })} 
          activeOpacity={images.length > 0 ? 0.2 : 1}
          disabled={images.length > 0}
        />
      </View>
    </Animated.View>
  );
}
