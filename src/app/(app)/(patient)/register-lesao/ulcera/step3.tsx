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

export default function RegisterLesaoUlceraStep3() {
  const [notEmpty, setNotEmpty] = useState(false);

  const { registerLesionUlceraData, setRegisterLesionUlceraData, updateRegisterLesionUlceraData } = useRegisterLesionUlceraForm();
  
  

  // formulario
  const { control, handleSubmit } = useForm<LesaoUlceraProps>();
  const lesionLocalValue = useWatch({ control, name: "lesion_dimension" });


  

  const handleNext = (data: LesaoUlceraProps) => {
    if (data.lesion_dimension && data.lesion_dimension.length > 0 && notEmpty) {
      console.log(data);
      updateRegisterLesionUlceraData(data);
      router.push('/(app)/(patient)/register-lesao/ulcera/step4');
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
        <ProgressBar step={3} totalSteps={9} />

        <Text className="text-2xl font-semibold mt-6">RESVECH</Text>
        <Text className="text-base text-gray-600 mt-4">Dimensão da lesão</Text>
        <Text className="text-base text-gray-600 mb-8">(0-6 pontos)</Text>


        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Área = 0m2" value="Área = 0m2" checked={value === 'Área = 0m2'} onPress={() => {
                const newValue = "Área = 0m2";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ lesion_dimension: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step4')
              }} />
              <RadioButton label="Área < 4cm²" value="Área < 4cm²" checked={value === 'Área < 4cm²'} onPress={() => {
                const newValue = "Área < 4cm²";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ lesion_dimension: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step4')
              }} />
              <RadioButton label="Área = entre 4cm² e 16cm²" value="Área = entre 4cm² e 16cm²" checked={value === 'Área = entre 4cm² e 16cm²'} onPress={() => {
                const newValue = "Área = entre 4cm² e 16cm²";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ lesion_dimension: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step4')
              }} />
              <RadioButton label="Área = entre 16cm² e 36cm²" value="Área = entre 16cm² e 36cm²" checked={value === 'Área = entre 16cm² e 36cm²'} onPress={() => {
                const newValue = "Área = entre 16cm² e 36cm²";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ lesion_dimension: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step4')
              }} />
              <RadioButton label="Área = entre 36cm² e 64cm²" value="Área = entre 36cm² e 64cm²" checked={value === 'Área = entre 36cm² e 64cm²'} onPress={() => {
                const newValue = "Área = entre 36cm² e 64cm²";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ lesion_dimension: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step4')
              }} />
              <RadioButton label="Área = entre 64cm² e 100cm²" value="Área = entre 64cm² e 100cm²" checked={value === 'Área = entre 64cm² e 100cm²'} onPress={() => {
                const newValue = "Área = entre 64cm² e 100cm²";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ lesion_dimension: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step4')
              }} />
              <RadioButton label="Área > 100cm²" value="Área > 100cm²" checked={value === 'Área > 100cm²'} onPress={() => {
                const newValue = "Área > 100cm²";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ lesion_dimension: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step4')
              }} />
            </View>
          )}
          name="lesion_dimension"
        /> 

      </ScrollView>

      <View className="gap-4 mt-6 px-6 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<AntDesign name="arrowleft" size={14} color="#1E1E1E" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/ulcera/step2')} 
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
