import Header from '@/components/Header';
import { Loading } from '@/components/Loading';
import UnidadeCard from "@/components/UnidadeCard";
import { useAuth } from '@/contexts/AuthContext';
import { useUserAPI } from '@/hooks/api/useUserAPI';
import { useLoginId } from '@/hooks/useLoginId';
import { router, useFocusEffect } from 'expo-router';
import { EnvelopeSimpleIcon, IdentificationCardIcon, KeyIcon, PencilSimpleLineIcon, SignOutIcon, UserIcon } from 'phosphor-react-native';
import { useCallback, useState } from 'react';
import { BackHandler, FlatList, Text, TouchableOpacity, View } from 'react-native';

export default function MeusDados() {
    const [isLoading, setIsLoading] = useState(false);
  

  const { loginId } = useLoginId();
  const { user, loadUserById } = useUserAPI();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/(auth)");
  }

  useFocusEffect(
    useCallback(() => {
      const loginIdData = loginId?.user.id;
      if (!loginIdData) return;
  
      (async () => {
        setIsLoading(true)
        await loadUserById(loginIdData.toString());
        setIsLoading(false)
      })();
    }, [loginId])
  );

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        router.back()
        return true;
      };
  
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
  
      return () => subscription.remove();
    }, [])
  );

  if(isLoading){
    return (
      <View className="flex-1 bg-white p-safe justify-center items-center">
        <Loading />
      </View>
    )
  }

  return (
    <View className="flex-1 bg-white p-safe relative">

      <Header icon="back" title="Meus dados" 
        onPress={()=> 
          loginId?.user.permission_roles[0] === "supervisor" ? router.push('/(app)/(supervisor)/supervisor') : router.push('/(app)/home')
        } 
      />

      <View className="flex-1">
        <Text allowFontScaling={false} className="text-lg mb-4 font-medium px-4 mt-6 text-neutral-900">Dados pessoais</Text>

        <View className="border-b border-neutral-300 flex-row justify-start px-4 py-3 items-center gap-4">
          <UserIcon size={24} color="#6775B4" />
          <View>
            <Text allowFontScaling={false} className='text-xs font-semibold text-neutral-600'>Nome completo</Text>
            <Text allowFontScaling={false} className='text-base text-neutral-900'>{user?.name}</Text>
          </View>
        </View>
        
        <View className="border-b border-neutral-300 flex-row justify-start px-4 py-3 items-center gap-4">
          <IdentificationCardIcon size={24} color="#6775B4" />
          <View>
            <Text allowFontScaling={false} className='text-xs text-neutral-600 font-semibold'>CPF</Text>
            <Text allowFontScaling={false} className='text-base text-neutral-900'>{user?.cpf}</Text>
          </View>
        </View>

        <View className="border-b border-neutral-300 flex-row justify-between px-4 py-3 items-center gap-4">
          <EnvelopeSimpleIcon size={24} color="#6775B4" />
          <View className='flex-1'>
            <Text allowFontScaling={false} className='text-xs text-neutral-600 font-semibold'>E-mail</Text>
            <Text allowFontScaling={false} className='text-base text-neutral-900'>{user?.email}</Text>
          </View>
          <TouchableOpacity 
            onPress={()=> router.push("/(app)/edit-email")}
            className="h-10 w-10 justify-center items-center"
          >
            <PencilSimpleLineIcon size={24} color="#4052A1" />
          </TouchableOpacity>
        </View>

        <View className="border-b border-neutral-300 flex-row justify-between px-4 py-3 items-center gap-5">
          <KeyIcon size={24} color="#6775B4" />
          <View className='flex-1'>
            <Text allowFontScaling={false} className='text-xs text-neutral-600 font-semibold'>Senha</Text>
            <Text allowFontScaling={false} className='text-base text-neutral-900'>Alterar senha</Text>
          </View>
          <TouchableOpacity 
            onPress={()=> router.push("/(app)/edit-password")} 
            className="h-10 w-10 justify-center items-center"
          >
            <PencilSimpleLineIcon size={24} color="#4052A1" />
          </TouchableOpacity>
        </View>

        <Text allowFontScaling={false} className="text-lg mb-4 font-medium px-4 mt-8 text-neutral-900">Unidades</Text>

        <View>
          <FlatList
            data={loginId?.user.health_unit_ids ?? []}
            keyExtractor={item => item.toString()}
            renderItem={({item}) => <UnidadeCard unitId={item} activeOpacity={1} close={()=> {}} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              marginBottom: 0,
            }}
          />
        </View>
        
        
        
        <TouchableOpacity 
          className="px-5 w-full justify-start flex-row my-7 items-center gap-2"
          onPress={handleLogout}
        >
          <SignOutIcon size={24} color="#C10007" />
          <Text allowFontScaling={false} className="text-base font-semibold text-danger-700">Logout</Text>
        </TouchableOpacity>
        
      </View>

      
      


    </View>
  );
}
