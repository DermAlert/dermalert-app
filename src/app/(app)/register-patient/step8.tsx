import Button from "@/components/Button";
import Header from "@/components/Header";
import ModalAddImage from "@/components/ModalAddImage";
import ModalAlert from "@/components/ModalAlert";
import ProgressBar from "@/components/ProgressBar";
import { usePatientForm } from "@/hooks/usePatientForm";
import { AntDesign, Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

export default function RegisterPatientStep8() {
  const [modalAlert, setModalAlert] = useState(false);
  const [modalAddImage, setModalAddImage] = useState(false);
  const { setPatientData } = usePatientForm();
  
  const handleCancel = () => {
    setPatientData({});
    setModalAlert(!modalAlert);
    router.push('/(app)/home');
  }

  const inputFocus = useRef<TextInput>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputFocus.current?.focus();
    }, 300);
  
    return () => clearTimeout(timeout);
  }, []);

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

      <ModalAddImage modalAddImage={modalAddImage} setModalAddImage={setModalAddImage} />

      <Header title="Cadastrar paciente" onPress={() => setModalAlert(!modalAlert)} />

      <View className="px-6 w-full justify-start flex-1">

        <ProgressBar step={8} totalSteps={9} />

        <Text className="text-2xl font-semibold mt-6">Termo de consentimento</Text>

        <Text className="text-base text-gray-500 mt-4">Inclua uma ou mais imagens do termo de consentimento.</Text>
        
        <View className="flex-row flex-wrap gap-4 mt-8">
          <TouchableOpacity 
            className="w-[30%] h-[105] border border-gray-300 rounded-lg justify-center items-center overflow-hidden bg-gray-300 relative"
            onPress={()=> router.push({pathname: "/(app)/(patient)/termoConsentimento/details", params: { deletar: 'true' }})}
          >
            <Image 
              source={{ uri: "https://thestartlaw.com/wp-content/uploads/2022/10/TERMOS_DE_USO.png" }}
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
              source={{ uri: "https://vivaocondominio.com.br/wp-content/uploads/2022/05/Termo-de-responsabilidade.jpg" }}
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
              source={{ uri: "https://www.administrefacil.com.br/images/modelos/400x500/1468-83ca0590a2a926a0a605713b1f046071.gif" }}
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
      
      </View>

      <View className="gap-4 mt-6 px-6 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<AntDesign name="arrowleft" size={14} color="#1E1E1E" />)} 
          onPress={()=> router.push("/(app)/register-patient/step7")} 
          style={{ flexGrow: 1, width: '47%' }}
        />
        <Button title="Próximo" 
          iconRight 
          icon={(<AntDesign name="arrowright" size={14} color="white" />)} 
          onPress={()=> router.push("/(app)/register-patient/step9")} 
          style={{ flexGrow: 1, width: '47%' }}
        />
      </View>

    </Animated.View>
  );
}
