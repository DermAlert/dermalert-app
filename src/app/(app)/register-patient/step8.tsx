import AddPhotoButton from "@/components/AddPhotoButton";
import Button from "@/components/Button";
import Header from "@/components/Header";
import ModalAddImage from "@/components/ModalAddImage";
import ModalAlert from "@/components/ModalAlert";
import PhotoCard from "@/components/PhotoCard";
import ProgressBar from "@/components/ProgressBar";
import { TitleText } from "@/components/TitleText";
import { usePatientForm } from "@/hooks/usePatientForm";
import { PatientProps } from "@/types/forms";
import { router } from "expo-router";
import { ArrowLeftIcon, ArrowRightIcon } from "phosphor-react-native";
import { useState } from "react";
import { ScrollView, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

export default function RegisterPatientStep8() {
  const [modalAlert, setModalAlert] = useState(false);
  const [modalAddImage, setModalAddImage] = useState(false);

  const { setPatientData, updatePatientData, images, setImages } = usePatientForm();

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
    setImages([]);
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

      <View className="px-8 pb-6 w-full justify-start flex-1 gap-6">

        <ProgressBar step={8} totalSteps={9} />

        <ScrollView className="flex-1">

          <TitleText title="Termo de consentimento" description="Inclua uma ou mais imagens do termo de consentimento." />

          <View className="flex-row flex-wrap gap-4 mt-8">

            {images.map(item => (
              <PhotoCard key={item} image={item} isDeletable isPatient />
            ))}

            <AddPhotoButton onPress={()=> setModalAddImage(true)} />  
    
          </View>

        </ScrollView>

        <View className="gap-4 w-full justify-start flex-row">
          <Button title="Voltar" 
            iconLeft 
            secondary 
            icon={(<ArrowLeftIcon size={24} color="#4052A1" />)} 
            onPress={()=> router.push("/(app)/register-patient/step7")} 
            style={{ flexGrow: 1, width: '47%' }}
          />
          <Button 
            title="Próximo" 
            iconRight 
            icon={<ArrowRightIcon size={24} color={`${images.length > 0 ? 'white' : '#D4D6DF'}`} />} 
            style={{ flexGrow: 1, width: '47%' }} 
            onPress={()=> handleNext({ terms_photos: images })} 
            activeOpacity={images.length > 0 ? 0.2 : 1}
            disabled={images.length > 0}
          />
        </View>
      
      </View>

      

    </Animated.View>
  );
}
