import Icon from '@/components/Icon';
import { TitleText } from '@/components/TitleText';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export default function OncodermatoSuccess() {

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/(app)/(patient)/register-lesao/oncodermato/step1');
    }, 1200);
  
    return () => clearTimeout(timeout);
  }, []);


  return (
    <Animated.View 
      entering={FadeIn} 
      exiting={FadeOut} 
      className="flex-1 bg-white p-safe justify-center items-center"
    >

      <View className="px-8 w-full justify-start flex-1 gap-10">
      
        <Icon iconName="CheckCircleIcon" style={{marginTop: 96}} />

        <TitleText title="Anamnese Oncodermato registrada com sucesso!" description="A anamnese do paciente foi registrada com sucesso." />
        
      </View> 

      
      
    </Animated.View>
  );
}
