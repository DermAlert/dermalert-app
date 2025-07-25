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

  const PATIENTS = [
    {
      id: '1',
      name: 'João da Silva',
      CPF: '123.456.789-12'
    },
    {
      id: '2',
      name: 'Maria Oliveira',
      CPF: '987.654.321-00'
    },
    {
      id: '3',
      name: 'Carlos Pereira',
      CPF: '456.789.123-45'
    },
    {
      id: '4',
      name: 'Ana Costa',
      CPF: '321.654.987-65'
    },
    {
      id: '5',
      name: 'Fernanda Souza',
      CPF: '789.123.456-78'
    },
    {
      id: '6',
      name: 'Pedro Martins',
      CPF: '111.222.333-44'
    },
    {
      id: '7',
      name: 'Luciana Ribeiro',
      CPF: '555.666.777-88'
    },
    {
      id: '8',
      name: 'Bruno Lima',
      CPF: '999.888.777-66'
    },
    {
      id: '9',
      name: 'Camila Fernandes',
      CPF: '444.555.666-77'
    },
    {
      id: '10',
      name: 'Rodrigo Alves',
      CPF: '222.333.444-55'
    },
    {
      id: '11',
      name: 'Juliana Duarte',
      CPF: '666.777.888-99'
    },
    {
      id: '12',
      name: 'Eduardo Rocha',
      CPF: '333.444.555-11'
    },
    {
      id: '13',
      name: 'Patrícia Mendes',
      CPF: '888.999.000-22'
    },
    {
      id: '14',
      name: 'André Barros',
      CPF: '777.666.555-33'
    },
    {
      id: '15',
      name: 'Renata Nogueira',
      CPF: '000.111.222-34'
    }
  ];


  return (
    <View className="flex-1 bg-white p-safe relative">

      <PatientSearch modalVisible={modalVisible} setModalVisible={setModalVisible} patientList={PATIENTS} />

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
            data={PATIENTS}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <PatientCard name={item.name} cpf={item.CPF} />}
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
