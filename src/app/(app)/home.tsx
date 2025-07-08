import Button from "@/components/Button";
import HeaderHome from "@/components/HeaderHome";
import PatientCard from "@/components/PatientCard";
import PatientSearch from "@/components/PatientSearch";
import { EvilIcons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  // const { loggedIn } = useLocalSearchParams();

  // if (!loggedIn) {
  //   return <Redirect href="/(auth)/login" />;
  // }

  const [modalVisible, setModalVisible] = useState(false);


  return (
    <View className="flex-1 bg-white p-safe relative">

      <PatientSearch modalVisible={modalVisible} setModalVisible={setModalVisible} />

      <HeaderHome />

      <View className="flex-1 p-4 pb-0">
        <Text className="text-xl mb-4">Pacientes</Text>
        <View className="mb-4">
          <TouchableOpacity
            activeOpacity={1} 
            className="border border-gray-300 rounded-md flex-row justify-between px-4 py-2 items-center" 
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text className="text-gray-400 py-1">Buscar paciente</Text> 
            <EvilIcons name="search" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <View className="flex-1">
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
            keyExtractor={item => item.toString()}
            renderItem={({item}) => <PatientCard />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 70,
              gap: 10
            }}
          />
        </View>

      </View>

      <View className="absolute bottom-0 m-auto w-full justify-center items-center mb-12 z-10">
        <Button 
          title="Cadastrar paciente" 
          style={{ width: 194 }} 
          iconLeft 
          icon={(<Feather name="plus" size={14} color="white" />)} 
          onPress={() => router.push('/(app)/register-patient/step1')}
        />
      </View>

    </View>
  );
}
