import Input from '@/components/Input';
import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/build/EvilIcons';
import Feather from '@expo/vector-icons/Feather';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PatientCard from './PatientCard';

type Props ={
  modalVisible: boolean,
  setModalVisible: (modalVisible: boolean) => void,
  patientList: { id: string; name: string; CPF: string }[];
}

export default function PatientSearch({ modalVisible, setModalVisible, patientList }: Props) {
  const [filteredList, setFilteredList] = useState(patientList);
  const [searchText, setSearchText] = useState("");

  const searchInputRef = useRef<TextInput>(null);

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered = patientList.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase()) || item.CPF.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredList(filtered);
  };

  const {
      control,
      handleSubmit,
      reset,
    } = useForm()

  useEffect(() => {
    if (modalVisible) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 300); // Espera a animação do modal abrir (ajuste se quiser)
  
      return () => clearTimeout(timer);
    }
  }, [modalVisible]);
  

  return (
    <Modal
      animationType="slide"
      presentationStyle="pageSheet"
      visible={modalVisible}
      transparent={false}
      backdropColor="white"
      statusBarTranslucent={false}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View className="flex-1 justify-center items-center bg-white w-full p-0 m-0">

        <View className="flex-row w-full h-16 px-6 items-center justify-start border-b border-gray-300">
          <TouchableOpacity activeOpacity={0.7} className="bg-white justify-center items-center mr-6" onPress={() => {
        setModalVisible(!modalVisible);
      }}>
            <AntDesign name="arrowleft" size={18} color="#1D1B20" />
          </TouchableOpacity>
          <View className='flex-1'>
            <Input ref={searchInputRef} 
              formProps={{
                control,
                name: "patient",
              }}
              inputProps={{
                placeholder: "Buscar paciente",
                returnKeyType: "send",
                onChangeText: (text) => handleSearch(text),
                value: searchText,
              }}
              icon={<EvilIcons name="search" size={20} color="#1D1B20" />} 
              
              
            />
          </View>
        </View>

        <View className="flex-1 w-full px-4 mt-6">
          <FlatList
            data={filteredList}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <PatientCard name={item.name} cpf={item.CPF} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              marginBottom: 0,
              gap: 10,
            }}
            ListEmptyComponent={(
              <View className="px-8 mt-12">
                <Feather name="inbox" size={40} color="#1E1E1E" />
                <Text className='font-semibold text-md mt-8 mb-4 text-gray-800'>Nenhum paciente encontrado</Text>
                <Text className='text-md text-gray-500'>Nenhum paciente foi encontrado. Tente buscar pelo nome ou CPF do paciente.</Text>
              </View>
            )}
          />
        </View>
            
        
      </View>
    </Modal>
    
  );
}
