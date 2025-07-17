import Header from "@/components/Header";
import ModalAlert from "@/components/ModalAlert";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

export default function RegisterLesaoSelect() {
  const [modalAlert, setModalAlert] = useState(false);

  const handleCancel = () => {
    setModalAlert(!modalAlert);
    router.push('/(app)/(patient)/patient/[id]');
  }

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white p-safe justify-start items-center"
    >
      <ModalAlert 
        modalAlert={modalAlert} 
        setModalAlert={setModalAlert} 
        description="Ao cancelar o registro de lesão, todos os dados preenchidos até aqui serão perdidos."
        title="Deseja cancelar o registro?"
        handleCancel={handleCancel}
        btnNoText="Não, continuar"
        btnYesText="Sim, cancelar"
      />

      <Header title="Registrar lesão" onPress={() => setModalAlert(!modalAlert)} />

      <View className="px-6 w-full justify-center flex-1 gap-8">


        <TouchableOpacity 
          activeOpacity={0.7} 
          className="flex-row items-center justify-between border border-gray-300 rounded-lg px-4 py-4 bg-white"
          //onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/steps')}
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/step1')}
        >
          <Feather name="crosshair" size={24} color="#1E1E1E" />
          <View className="flex-1 px-4 py-1">
            <Text className="text-base">Oncodermato</Text>
            <Text className="text-sm">Registrar lesão oncodermato</Text>
          </View>
        </TouchableOpacity>


        <TouchableOpacity 
          activeOpacity={0.7} 
          className="flex-row items-center justify-between border border-gray-300 rounded-lg px-4 py-4 bg-white"
        >
          <Feather name="crosshair" size={24} color="#1E1E1E" />
          <View className="flex-1 px-4 py-1">
            <Text className="text-base">Úlcera venosa</Text>
            <Text className="text-sm">Registrar lesão úlcera venosa</Text>
          </View>
        </TouchableOpacity>


      </View>


    </Animated.View>
  );
}
