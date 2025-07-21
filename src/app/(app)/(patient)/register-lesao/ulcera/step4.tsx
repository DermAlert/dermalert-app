import Button from "@/components/Button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { useRegisterLesionUlceraForm } from "@/hooks/Ulcera/useRegisterLesionUlceraForm";
import { LesaoUlceraProps } from "@/types/forms";
import { AntDesign } from '@expo/vector-icons';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function RegisterLesaoUlceraStep4() {
  const [notEmpty, setNotEmpty] = useState(false);

  const { registerLesionUlceraData, setRegisterLesionUlceraData, updateRegisterLesionUlceraData } = useRegisterLesionUlceraForm();
  
  

  // formulario
  const { control, handleSubmit } = useForm<LesaoUlceraProps>();
  const lesionLocalValue = useWatch({ control, name: "depth" });


  

  const handleNext = (data: LesaoUlceraProps) => {
    if (data.depth && data.depth.length > 0 && notEmpty) {
      console.log(data);
      updateRegisterLesionUlceraData(data);
      router.push('/(app)/(patient)/register-lesao/ulcera/step5');
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setRegisterLesionUlceraData({});
    router.push('/(app)/(patient)/register-lesao/select');
  }

  useEffect(() => {
    const current = lesionLocalValue || [];
    const hasValue = current.length > 0;

    setNotEmpty(hasValue);
  }, [lesionLocalValue]);

  useEffect(() => {
    console.log(registerLesionUlceraData)
  }, []);

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Registrar lesão" onPress={handleCancel} />

      <ScrollView className="px-6 w-full flex-1">
        <ProgressBar step={4} totalSteps={9} />

        <Text className="text-2xl font-semibold mt-6">RESVECH</Text>
        <Text className="text-base text-gray-600 mt-4">Profundidade do tecido atingido</Text>
        <Text className="text-base text-gray-600 mb-8">(0-4 pontos)</Text>


        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Pele intacta regenerada ou cicatrizada" value="Pele intacta regenerada ou cicatrizada" checked={value === 'Pele intacta regenerada ou cicatrizada'} onPress={() => {
                const newValue = "Pele intacta regenerada ou cicatrizada";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ depth: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step5')
              }} />
              <RadioButton label="Atingimento de epiderme e derme" value="Atingimento de epiderme e derme" checked={value === 'Atingimento de epiderme e derme'} onPress={() => {
                const newValue = "Atingimento de epiderme e derme";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ depth: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step5')
              }} />
              <RadioButton label="Atingimento de tela subcutânea ou tecido adiposo sem atingir a fáscia muscular" value="Atingimento de tela subcutânea ou tecido adiposo sem atingir a fáscia muscular" checked={value === 'Atingimento de tela subcutânea ou tecido adiposo sem atingir a fáscia muscular'} onPress={() => {
                const newValue = "Atingimento de tela subcutânea ou tecido adiposo sem atingir a fáscia muscular";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ depth: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step5')
              }} />
              <RadioButton label="Atingimento muscular" value="Atingimento muscular" checked={value === 'Atingimento muscular'} onPress={() => {
                const newValue = "Atingimento muscular";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ depth: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step5')
              }} />
              <RadioButton label="Atingimento ósseo e/ou tecidos anexos (tendões, ligamentos, cápsula articular) ou necrose negra, não permitindo visualização de tecidos subjacentes" value="Atingimento ósseo e/ou tecidos anexos (tendões, ligamentos, cápsula articular) ou necrose negra, não permitindo visualização de tecidos subjacentes" checked={value === 'Atingimento ósseo e/ou tecidos anexos (tendões, ligamentos, cápsula articular) ou necrose negra, não permitindo visualização de tecidos subjacentes'} onPress={() => {
                const newValue = "Atingimento ósseo e/ou tecidos anexos (tendões, ligamentos, cápsula articular) ou necrose negra, não permitindo visualização de tecidos subjacentes";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ depth: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step5')
              }} />
            </View>
          )}
          name="depth"
        /> 

      </ScrollView>

      <View className="gap-4 mt-6 px-6 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<AntDesign name="arrowleft" size={14} color="#1E1E1E" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/ulcera/step3')} 
          style={{ flexGrow: 1, width: '47%' }}
        />
        <Button 
          title="Próximo" 
          iconRight 
          icon={<AntDesign name="arrowright" size={14} color={`${notEmpty ? 'white' : '#B3B3B3'}`} />} 
          style={{ flexGrow: 1, width: '47%' }} 
          onPress={handleSubmit(handleNext)} 
          activeOpacity={notEmpty ? 0.2 : 1}
          disabled={notEmpty}
        />
      </View>
    </Animated.View>
  );
}
