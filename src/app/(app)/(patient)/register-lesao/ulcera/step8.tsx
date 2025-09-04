import Button from "@/components/Button";
import CheckButton from "@/components/CheckButton";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import { TitleText } from "@/components/TitleText";
import { useRegisterLesionUlceraForm } from "@/hooks/Ulcera/useRegisterLesionUlceraForm";
import { LesaoUlceraProps } from "@/types/forms";
import { router } from "expo-router";
import { ArrowLeftIcon, ArrowRightIcon } from "phosphor-react-native";
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
  const { control, handleSubmit } = useForm<LesaoUlceraProps>(
    {
      defaultValues: {
        inflamacao: registerLesionUlceraData.inflamacao
      }
    }
  );
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

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={8} totalSteps={9} />

        <TitleText title="RESVECH" description="Infecção/Inflamação"/>
        <Text className="text-sm text-neutral-700 mb-6">(0-14 pontos)</Text>


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

      <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/ulcera/step7')} 
          style={{ flexGrow: 1, width: '47%' }}
        />
        <Button 
          title="Próximo"
          iconRight 
          icon={<ArrowRightIcon size={24} color={`${notEmpty ? 'white' : '#B3B3B3'}`} />} 
          style={{ flexGrow: 1, width: '47%' }} 
          onPress={handleSubmit(handleNext)} 
          activeOpacity={notEmpty ? 0.2 : 1}
          disabled={notEmpty}
        />
      </View>
    </Animated.View>
  );
}
