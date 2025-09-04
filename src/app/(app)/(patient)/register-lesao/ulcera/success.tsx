import Icon from '@/components/Icon';
import { TitleText } from '@/components/TitleText';
import { useLesionId } from '@/hooks/useLesionId';
import { useLesionType } from '@/hooks/useLesionType';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export default function RegisterLesaoUlceraSuccess() {
  const { setLesionType } = useLesionType();
  
  const { lesionId, updateLesionId } = useLesionId();

  const { type, id } = useLocalSearchParams();


  useEffect(() => {
    const timeout = setTimeout(() => {
      setLesionType(null)
      updateLesionId(typeof id === 'string' ? id : null);
      if (lesionId) {
        router.push({pathname: '/(app)/(patient)/lesao/[id]', params: { id: lesionId, type: type }});
      }
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

        <TitleText title="Lesão registrada" description="A lesão foi registrada com sucesso." />
        
      </View> 

      
      
    </Animated.View>
  );
}
