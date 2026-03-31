import Button from "@/components/Button";
import { EmptyPatients } from "@/components/EmptyPatients";
import Header from "@/components/Header";
import HeaderHome from "@/components/HeaderHome";
import { Loading } from "@/components/Loading";
import PatientCard from "@/components/PatientCard";
import PatientSearch from "@/components/PatientSearch";
import { TitleText } from "@/components/TitleText";
import { useAuth } from "@/contexts/AuthContext";
import { usePatientAPI } from "@/hooks/api/usePatientAPI";
import { useHealthCenterId } from "@/hooks/useHealthCenterId";
import { useLoginId } from "@/hooks/useLoginId";
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
  // const [page, setPage] = useState(1);

  const { loginId } = useLoginId();
  const { loadingAuth } = useAuth();
  const { healthCenterId } = useHealthCenterId();

  const { hasMore, loadPatients, patients, isLoading, loadPatientsByHealthUnity} = usePatientAPI();



  useFocusEffect(
    useCallback(() => {
      if(loginId?.user.permission_roles[0] === "supervisor"){
        console.log('pacientes da unidade:', healthCenterId);
        if (!healthCenterId) return;
        loadPatientsByHealthUnity(healthCenterId.toString());
      } else {
        console.log("todos os pacientes")
        loadPatients();
      }
      
    },[])
  )

  const renderPatient = useCallback(({ item }: { item: PatientProps }) => (
    <PatientCard
      name={item.user?.name || ''}
      cpf={item.user?.cpf || ''}
      id={item.user?.id?.toString() || ''}
    />
  ), []);

if(loadingAuth){
  return (
    <View className="flex-1 p-safe justify-center items-center">
      <Loading />
    </View>
  )
}

  return (
    <View className="flex-1 bg-primary-50 p-safe relative">

      <PatientSearch modalVisible={ modalVisible} setModalVisible={setModalVisible} />

      {loginId?.user.permission_roles[0] === "supervisor" ? (
        <Header icon="back" title="Pacientes" onPress={()=> router.push('/(app)/(supervisor)/supervisor')} />
      ) : (
        <HeaderHome />
      )}

      

      <View className="flex-1 pt-6 pr-6 pl-6 pb-0">

        {loginId?.user.permission_roles[0] !== "supervisor" && (
          <TitleText title="Pacientes" className="mb-[18]" />
        )}


        <View className="mb-[18]">
          <TouchableOpacity
            activeOpacity={1} 
            className="bg-white border border-neutral-300 rounded-lg flex-row justify-between py-3 px-4 items-center" 
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text allowFontScaling={false} className="text-neutral-400 text-sm">Buscar paciente</Text> 
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
                loadPatientsByHealthUnity(healthCenterId?.toString() || null);
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
