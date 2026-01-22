import Header from "@/components/Header";
import HelpBox from "@/components/HelpBox";
import { TitleText } from "@/components/TitleText";
import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { BackHandler, View } from 'react-native';

export default function Help() {

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

  return (
    <View className="flex-1 bg-primary-50 p-safe relative">

      <Header title="Ajuda" icon="back" onPress={()=> router.back()} />

      <View className="p-8 w-full justify-start flex-1">

        <TitleText title="Precisa de ajuda?" description="Aqui você encontra tutoriais e perguntas frequentes relacionadas ao Dermalert." />


        <View className="flex-row flex-wrap gap-4 mt-10">
          <HelpBox title="Tutorial" description="Entenda como o Dermalert funciona" iconName="BookOpenTextIcon" />

          <HelpBox title="FAQ" description="Perguntas frequentes" iconName="SealQuestionIcon" />

          <HelpBox title="Curso" description="Acompanhe e assista às aulas" iconName="PlayCircleIcon" />

        </View>

        
      </View>

    </View>
  );
}
