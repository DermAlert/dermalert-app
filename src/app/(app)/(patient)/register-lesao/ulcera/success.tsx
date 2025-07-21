import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export default function RegisterLesaoUlceraSuccess() {

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/(app)/(patient)/lesao/[id]');
    }, 1200);
  
    return () => clearTimeout(timeout);
  }, []);


  return (
    <Animated.View 
      entering={FadeIn} 
      exiting={FadeOut} 
      className="flex-1 bg-white p-safe justify-center items-center"
    >

      <View className="px-6 w-full justify-center flex-1">

      <Feather name="check-circle" size={40} color="#1E1E1E" />

      <Text className="mb-4 text-2xl font-semibold mt-8">Lesão registrada</Text>

      <Text className="text-base text-gray-500">A lesão foi registrada com sucesso.</Text>


      </View>

      
      
    </Animated.View>
  );
}
