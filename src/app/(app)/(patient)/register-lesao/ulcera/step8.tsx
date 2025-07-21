import Button from "@/components/Button";
import CheckButton from "@/components/CheckButton";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
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

export default function RegisterLesaoUlceraStep8() {
  const [notEmpty, setNotEmpty] = useState(false);

  const { registerLesionUlceraData, setRegisterLesionUlceraData, updateRegisterLesionUlceraData } = useRegisterLesionUlceraForm();
  
  

  // formulario
  const { control, handleSubmit } = useForm<LesaoUlceraProps>();
  const lesionLocalValue = useWatch({ control, name: "inflamacao" });


  

  const handleNext = (data: LesaoUlceraProps) => {
    if (data.inflamacao && data.inflamacao.length > 0 && notEmpty) {
      console.log(data);
      updateRegisterLesionUlceraData(data);
      router.push('/(app)/(patient)/register-lesao/ulcera/step9');
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
        <ProgressBar step={8} totalSteps={9} />

        <Text className="text-2xl font-semibold mt-6">RESVECH</Text>
        <Text className="text-base text-gray-600 mt-4">Infecção/Inflamação</Text>
        <Text className="text-base text-gray-600 mb-8">(0-14 pontos)</Text>


        <Controller
          control={control}
          render={({ field: { onChange, value = [] } }) => (
            <View className="gap-3">

              {["Dor aumentada", "Eritema perilesional", "Edema perilesional", "Calor / pele quente", "Exsudato aumentado", "Exsudato purulento", "Tecido friável ou facilmente sangrante", "Ferida estagnada, sem melhora de cicatrização", "Tecido compatível com biofilme", "Odor", "Hipergranulação", "Aumento do tamanho da ferida", "Lesões satélite", "Leito de ferida com aspecto acinzentado"].map(item => (
                <CheckButton
                  key={item}
                  label={item}
                  value={item} 
                  checked={value.includes(item)}
                  onPress={() => {

                    if (value.includes(item)) {
                      onChange(value.filter(v => v !== item));
                    } else {
                      onChange([...value, item]);
                      setNotEmpty(true);
                    }
                  }}
                />
              ))}
            </View>
          )}
          name="inflamacao"
        /> 

      </ScrollView>

      <View className="gap-4 mt-6 px-6 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<AntDesign name="arrowleft" size={14} color="#1E1E1E" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/ulcera/step7')} 
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
