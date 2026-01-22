import Button from "@/components/Button";
import { EmptyPatients } from "@/components/EmptyPatients";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import PatientCard from "@/components/PatientCard";
import PatientSearch from "@/components/PatientSearch";
import { usePatientAPI } from "@/hooks/api/usePatientAPI";
import { PatientProps } from "@/types/forms";
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router";
import { MagnifyingGlassIcon, PlusIcon } from 'phosphor-react-native';
import { useCallback, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

export default function Profissionais() {
  // const { loggedIn } = useLocalSearchParams();

  // if (!loggedIn) {
  //   return <Redirect href="/(auth)/login" />;
  // }

  const [modalVisible, setModalVisible] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [patients, setPatients] = useState<PatientProps[]>([]);
  // const [page, setPage] = useState(1);
  // const [hasMore, setHasMore] = useState(true);

  // const { loginId } = useLoginId();
  const { hasMore, loadPatients, patients, isLoading} = usePatientAPI();



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
      profissional
    />
  ), []);


  if(isLoading){
    return (
      <View className="flex-1 bg-white p-safe justify-center items-center">
        <Loading />
      </View>
    )
  }



  return (
    <View className="flex-1 bg-primary-50 p-safe relative">

      <PatientSearch profissional modalVisible={ modalVisible} setModalVisible={setModalVisible} />

      <Header icon="back" title="Profissionais da saúde" onPress={()=> router.push('/(app)/(supervisor)/supervisor')} />

      

      <View className="flex-1 pt-6 pr-6 pl-6 pb-0">
        <View className="mb-[18]">
          <TouchableOpacity
            activeOpacity={1} 
            className="bg-white border border-neutral-300 rounded-lg flex-row justify-between py-3 px-4 items-center" 
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text allowFontScaling={false} className="text-neutral-400 text-sm">Buscar profissional</Text> 
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
            ListEmptyComponent={() => !isLoading && <EmptyPatients title="Nenhum profissional encontrado" description="Não há nenhum profissional cadastrado no momento. Cadaste um novo profissional no botão abaixo." />}
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
          title="Cadastrar profissional" 
          iconLeft 
          icon={(<PlusIcon size={18} color="white" weight="bold" />)} 
          full={false}
          onPress={() => router.push('/(app)/(profissional)/register-profissional/step1')}
        />
      </View>

    </View>
  );
}
