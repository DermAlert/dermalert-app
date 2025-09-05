import Button from "@/components/Button";
import { EmptyPatients } from "@/components/EmptyPatients";
import HeaderHome from "@/components/HeaderHome";
import { Loading } from "@/components/Loading";
import PatientCard from "@/components/PatientCard";
import PatientSearch from "@/components/PatientSearch";
import { TitleText } from "@/components/TitleText";
import { api } from "@/services/api";
import { PatientProps } from "@/types/forms";
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router";
import { MagnifyingGlassIcon, PlusIcon } from 'phosphor-react-native';
import { useCallback, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  // const { loggedIn } = useLocalSearchParams();

  // if (!loggedIn) {
  //   return <Redirect href="/(auth)/login" />;
  // }

  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [patients, setPatients] = useState<PatientProps[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);


  // const PATIENTS = [
  //   {
  //     id: '1',
  //     name: 'João da Silva',
  //     CPF: '123.456.789-12'
  //   },
  //   {
  //     id: '2',
  //     name: 'Maria Oliveira',
  //     CPF: '987.654.321-00'
  //   },
  //   {
  //     id: '3',
  //     name: 'Carlos Pereira',
  //     CPF: '456.789.123-45'
  //   },
  //   {
  //     id: '4',
  //     name: 'Ana Costa',
  //     CPF: '321.654.987-65'
  //   },
  //   {
  //     id: '5',
  //     name: 'Fernanda Souza',
  //     CPF: '789.123.456-78'
  //   },
  //   {
  //     id: '6',
  //     name: 'Pedro Martins',
  //     CPF: '111.222.333-44'
  //   },
  //   {
  //     id: '7',
  //     name: 'Luciana Ribeiro',
  //     CPF: '555.666.777-88'
  //   },
  //   {
  //     id: '8',
  //     name: 'Bruno Lima',
  //     CPF: '999.888.777-66'
  //   },
  //   {
  //     id: '9',
  //     name: 'Camila Fernandes',
  //     CPF: '444.555.666-77'
  //   },
  //   {
  //     id: '10',
  //     name: 'Rodrigo Alves',
  //     CPF: '222.333.444-55'
  //   },
  //   {
  //     id: '11',
  //     name: 'Juliana Duarte',
  //     CPF: '666.777.888-99'
  //   },
  //   {
  //     id: '12',
  //     name: 'Eduardo Rocha',
  //     CPF: '333.444.555-11'
  //   },
  //   {
  //     id: '13',
  //     name: 'Patrícia Mendes',
  //     CPF: '888.999.000-22'
  //   },
  //   {
  //     id: '14',
  //     name: 'André Barros',
  //     CPF: '777.666.555-33'
  //   },
  //   {
  //     id: '15',
  //     name: 'Renata Nogueira',
  //     CPF: '000.111.222-34'
  //   }
  // ];



  async function loadPatients() {

    
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const { data } = await api.get(`/patients/?page=${page}`);

      if (data.results) {
        const newPatients = data.results;
        setPatients(prev => [...prev, ...newPatients]);
        //console.log(data.next);
      }

      if(data.next){
        setPage(prev => prev + 1);
      } else {
        setHasMore(false);
        //console.log("has more false");
      }

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadPatients()
    },[])
  )

  const renderPatient = useCallback(({ item }: { item: PatientProps }) => (
    <PatientCard
      name={item.user?.name || ''}
      cpf={item.user?.cpf || ''}
      id={item.user?.id?.toString() || ''}
    />
  ), []);



  return (
    <View className="flex-1 bg-primary-50 p-safe relative">

      <PatientSearch modalVisible={ modalVisible} setModalVisible={setModalVisible} />

      <HeaderHome />

      <View className="flex-1 pt-6 pr-6 pl-6 pb-0">
        <TitleText title="Pacientes" className="mb-[18]" />
        <View className="mb-[18]">
          <TouchableOpacity
            activeOpacity={1} 
            className="bg-white border border-neutral-300 rounded-lg flex-row justify-between py-3 px-4 items-center" 
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text className="text-neutral-400 text-sm">Buscar paciente</Text> 
            <MagnifyingGlassIcon size={22} color="#7D83A0" />
          </TouchableOpacity>
        </View>

        <View className="flex-1">
          <FlatList
            data={patients}
            keyExtractor={item => item.user?.id?.toString() || ''}
            renderItem={renderPatient}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 70,
              gap: 14
            }}
            onEndReached={()=> {
              if (!isLoading && hasMore) {
                loadPatients();
              } 
            }}
            onEndReachedThreshold={0.3}
            ListFooterComponent={() => isLoading ? <Loading /> : null}
            initialNumToRender={7}
            maxToRenderPerBatch={7}
            windowSize={5}
            ListEmptyComponent={() => !isLoading && <EmptyPatients title="Nenhum paciente encontrado" description="Não há nenhum paciente cadastrado no momento. Cadaste um novo paciente no botão abaixo." />}
          />
          <LinearGradient
            colors={['rgba(255,255,255,0)', '#F5F6FA']}
            className="absolute bottom-0 left-0 right-0 h-[20]"
            pointerEvents="none"
          />
        </View>

      </View>

      <View className="absolute bottom-0 m-auto w-full justify-center items-center mb-12 z-10">
        <Button 
          title="Cadastrar paciente" 
          iconLeft 
          icon={(<PlusIcon size={18} color="white" weight="bold" />)} 
          full={false}
          onPress={() => router.push('/(app)/register-patient/step1')}
        />
      </View>

    </View>
  );
}
