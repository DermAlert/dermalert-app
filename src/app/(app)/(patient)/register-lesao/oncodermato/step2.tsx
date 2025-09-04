import AddPhotoButton from "@/components/AddPhotoButton";
import Button from "@/components/Button";
import Header from "@/components/Header";
import ModalAddImage from "@/components/ModalAddImage";
import PhotoCard from "@/components/PhotoCard";
import ProgressBar from "@/components/ProgressBar";
import { TitleText } from "@/components/TitleText";
import { useRegisterLesionForm } from "@/hooks/Oncodermato/useRegisterLesionForm";
import { useLesionId } from "@/hooks/useLesionId";
import { useLesionType } from "@/hooks/useLesionType";
import { LesaoOncodermatoProps } from "@/types/forms";
import { router } from "expo-router";
import { ArrowLeftIcon, ArrowRightIcon, InfoIcon } from "phosphor-react-native";
import { useState } from "react";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function RegisterLesaoOncodermatoStep2() {
  const [modalAddImage, setModalAddImage] = useState(false);

  const { setRegisterLesionData, updateRegisterLesionData, images, setImages } = useRegisterLesionForm();

  const { lesionId } = useLesionId();
  const { lesionType, setLesionType } = useLesionType();
  
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
    if(lesionId !== null){
      router.push({pathname: '/(app)/(patient)/lesao/[id]', params: { id: lesionId, type: lesionType }});
    } else {
      setLesionType(null)
      router.push('/(app)/(patient)/register-lesao/select');
    }
    
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

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={2} totalSteps={8} />

        <TitleText title="Coleta de imagem da lesão" description="Colete uma ou mais imagens da lesão. Verifique se as imagens estão nítidas, bem iluminadas e mostram a ferida com clareza." style={{marginTop: 16}} />

        <View className="flex-row items-start justify-start mt-8 gap-3 rounded-2xl p-3 bg-information-100">
          <InfoIcon size={24} color="#0084D1" />
          <View>
            <Text className="text-information-800 font-semibold text-base">Como coletar imagens?</Text>
            <Text className="text-information-800 text-sm">Saiba como utilizar o dermatoscopio</Text>
          </View>
        </View>

        <View className="flex-row flex-wrap gap-4 mt-8">

          {images.map(item => (
            <PhotoCard key={item} image={item} isDeletable isOncodermato />
          ))}

          <AddPhotoButton onPress={()=> setModalAddImage(true)} />  
  
        </View>

      </ScrollView>

      { lesionId !== null ? 
        (
          <View className="px-8 w-full justify-start mb-4">
            <Button 
              title="Próximo" 
              iconRight 
              icon={<ArrowRightIcon size={24} color={`${images.length > 0 ? 'white' : '#D4D6DF'}`} />} 
              onPress={()=> handleNext({ lesion_images: images })}
              activeOpacity={images.length > 0 ? 0.2 : 1}
              disabled={images.length > 0}
            />
          </View>
          
        )
        :
        (
          <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
            <Button title="Voltar" 
              iconLeft 
              secondary 
              icon={(<ArrowLeftIcon size={24} color="#4052A1" />)} 
              onPress={()=> router.push("/(app)/(patient)/register-lesao/oncodermato/step1")} 
              style={{ flexGrow: 1, width: '47%' }}
            />
            <Button 
              title="Próximo" 
              iconRight 
              icon={<ArrowRightIcon size={24} color={`${images.length > 0 ? 'white' : '#B3B3B3'}`} />}
              style={{ flexGrow: 1, width: '47%' }} 
              onPress={()=> handleNext({ lesion_images: images })} 
              activeOpacity={images.length > 0 ? 0.2 : 1}
              disabled={images.length > 0}
            />
          </View>
        )
      }
    </Animated.View>
  );
}
