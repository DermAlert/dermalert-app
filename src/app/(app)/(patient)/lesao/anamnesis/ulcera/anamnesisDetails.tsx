import Header from "@/components/Header";
import { router } from "expo-router";
import { CaretRightIcon, ListDashesIcon } from "phosphor-react-native";
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

export default function UlceraAnamnesisDetails() {

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-primary-50 p-safe justify-start items-center"
    >
      <Header title="Anamnese Úlcera Venosa" icon="back" onPress={() => router.push("/(app)/(patient)/patient/[id]")} />

      <View className="px-5 py-6 w-full justify-start flex-1 gap-[10]">


        <TouchableOpacity 
          activeOpacity={0.7} 
          className="flex-row items-center justify-between rounded-lg px-4 py-6 shadow-sm shadow-neutral-900 bg-white gap-4"
          onPress={()=> router.push('/(app)/(patient)/lesao/anamnesis/ulcera/healthHistory')}
        >
          <View className={`justify-center items-center rounded-lg h-10 w-10 bg-primary-200`}>
            <ListDashesIcon size={24} color="#6775B4" />
          </View>
          <View className="flex-1">
            <Text allowFontScaling={false} className="text-base text-neutral-900">Histórico clínico geral</Text>
          </View>          
          <CaretRightIcon size={18} color="#7D83A0" weight="bold" />
        </TouchableOpacity>


        <TouchableOpacity 
          activeOpacity={0.7} 
          className="flex-row items-center justify-between rounded-lg px-4 py-6 shadow-sm shadow-neutral-900 bg-white gap-4"
          onPress={()=> router.push('/(app)/(patient)/lesao/anamnesis/ulcera/riskLifestyle')}
        >
          <View className={`justify-center items-center rounded-lg h-10 w-10 bg-primary-200`}>
            <ListDashesIcon size={24} color="#6775B4" />
          </View>
          <View className="flex-1">
            <Text allowFontScaling={false} className="text-base text-neutral-900">Fatores de risco e estilo de vida</Text>
          </View>          
          <CaretRightIcon size={18} color="#7D83A0" weight="bold" />
        </TouchableOpacity>


        <TouchableOpacity 
          activeOpacity={0.7} 
          className="flex-row items-center justify-between rounded-lg px-4 py-6 shadow-sm shadow-neutral-900 bg-white gap-4"
          onPress={()=> router.push('/(app)/(patient)/lesao/anamnesis/ulcera/familyHistory')}
        >
          <View className={`justify-center items-center rounded-lg h-10 w-10 bg-primary-200`}>
            <ListDashesIcon size={24} color="#6775B4" />
          </View>
          <View className="flex-1">
            <Text allowFontScaling={false} className="text-base text-neutral-900">Histórico familiar</Text>
          </View>          
          <CaretRightIcon size={18} color="#7D83A0" weight="bold" />
        </TouchableOpacity>


        <TouchableOpacity 
          activeOpacity={0.7} 
          className="flex-row items-center justify-between rounded-lg px-4 py-6 shadow-sm shadow-neutral-900 bg-white gap-4"
          onPress={()=> router.push('/(app)/(patient)/lesao/anamnesis/ulcera/ulcerInfo')}
        >
          <View className={`justify-center items-center rounded-lg h-10 w-10 bg-primary-200`}>
            <ListDashesIcon size={24} color="#6775B4" />
          </View>
          <View className="flex-1">
            <Text allowFontScaling={false} className="text-base text-neutral-900">Informações sobre a úlcera atual</Text>
          </View>          
          <CaretRightIcon size={18} color="#7D83A0" weight="bold" />
        </TouchableOpacity>

        <TouchableOpacity 
          activeOpacity={0.7} 
          className="flex-row items-center justify-between rounded-lg px-4 py-6 shadow-sm shadow-neutral-900 bg-white gap-4"
          onPress={()=> router.push('/(app)/(patient)/lesao/anamnesis/ulcera/careSupport')}
        >
          <View className={`justify-center items-center rounded-lg h-10 w-10 bg-primary-200`}>
            <ListDashesIcon size={24} color="#6775B4" />
          </View>
          <View className="flex-1">
            <Text allowFontScaling={false} className="text-base text-neutral-900">Acesso a cuidados e suporte</Text>
          </View>          
          <CaretRightIcon size={18} color="#7D83A0" weight="bold" />
        </TouchableOpacity>


      </View>


    </Animated.View>
  );
}
