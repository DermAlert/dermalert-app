import AddPhotoButton from "@/components/AddPhotoButton";
import Button from "@/components/Button";
import Header from "@/components/Header";
import ModalAddImage from "@/components/ModalAddImage";
import ModalAlert from "@/components/ModalAlert";
import PhotoCard from "@/components/PhotoCard";
import ProgressBar from "@/components/ProgressBar";
import { usePatientForm } from "@/hooks/usePatientForm";
import { PatientProps } from "@/types/forms";
import { AntDesign } from '@expo/vector-icons';
import { router } from "expo-router";
import { useState } from "react";
import { Text, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

export default function RegisterPatientStep8() {
  const [modalAlert, setModalAlert] = useState(false);
  const [modalAddImage, setModalAddImage] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const { setPatientData, updatePatientData } = usePatientForm();

  const handleNext = (data: PatientProps) => {
      if (data.terms_photos && data.terms_photos.length > 0 || images.length > 0) {
        console.log(data);
        updatePatientData(data);
        router.push('/(app)/register-patient/step9');
      } else {
        return;
      }
    }
  
  const handleCancel = () => {
    setPatientData({});
    setModalAlert(!modalAlert);
    router.push('/(app)/home');
  }

  // useEffect(() => {
  //     console.log("images", images.length)
  //   }, [images]);

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white p-safe justify-start items-center"
    >
      <ModalAlert 
        modalAlert={modalAlert} 
        setModalAlert={setModalAlert} 
        description="Ao cancelar o cadastro do paciente, todos os dados preenchidos até aqui serão perdidos."
        title="Deseja cancelar o cadastro?"
        handleCancel={handleCancel}
        btnNoText="Não, continuar"
        btnYesText="Sim, cancelar"
      />

      <ModalAddImage 
        modalAddImage={modalAddImage} 
        setModalAddImage={setModalAddImage} 
        images={images}
        setImages={setImages}
      />

      <Header title="Cadastrar paciente" onPress={() => setModalAlert(!modalAlert)} />

      <View className="px-6 w-full justify-start flex-1">

        <ProgressBar step={8} totalSteps={9} />

        <Text className="text-2xl font-semibold mt-6">Termo de consentimento</Text>

        <Text className="text-base text-gray-500 mt-4">Inclua uma ou mais imagens do termo de consentimento.</Text>
        
        <View className="flex-row flex-wrap gap-4 mt-8">

          {images.map(item => (
            <PhotoCard key={item} image={item} />
          ))}

          <AddPhotoButton onPress={()=> setModalAddImage(true)} />  
  
        </View>
      
      </View>

      <View className="gap-4 mt-6 px-6 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<AntDesign name="arrowleft" size={14} color="#1E1E1E" />)} 
          onPress={()=> router.push("/(app)/register-patient/step7")} 
          style={{ flexGrow: 1, width: '47%' }}
        />
        <Button 
          title="Próximo" 
          iconRight 
          icon={<AntDesign name="arrowright" size={14} color={`${images.length > 0 ? 'white' : '#B3B3B3'}`} />} 
          style={{ flexGrow: 1, width: '47%' }} 
          onPress={()=> handleNext({ terms_photos: images })} 
          activeOpacity={images.length > 0 ? 0.2 : 1}
          disabled={images.length > 0}
        />
      </View>

    </Animated.View>
  );
}
