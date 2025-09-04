import Button from "@/components/Button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { useUlceraFamilyHistoryForm } from "@/hooks/Ulcera/useUlceraFamilyHistoryForm";
import { UlceraFamilyHistoryProps } from "@/types/forms";
import { router } from "expo-router";
import { ArrowLeftIcon, ArrowRightIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function UlceraFamilyHistoryStep2() {
  const [notEmpty, setNotEmpty] = useState(false);
  
  const { ulceraFamilyHistoryData, setUlceraFamilyHistoryData, updateUlceraFamilyHistoryData } = useUlceraFamilyHistoryForm();


  // formulario
  const { control, handleSubmit } = useForm<UlceraFamilyHistoryProps>(
    {
      defaultValues: {
        family_varicose_or_circulatory: ulceraFamilyHistoryData.family_varicose_or_circulatory
      }
    }
  );
  const cancerTypeValue = useWatch({ control, name: "family_varicose_or_circulatory" });


  const handleNext = (data: UlceraFamilyHistoryProps) => {
    if (data.family_varicose_or_circulatory && data.family_varicose_or_circulatory.length > 0 && notEmpty) {
      console.log(data);
      updateUlceraFamilyHistoryData(data);
      router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/familyHistory/step3')
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setUlceraFamilyHistoryData({});
    router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/steps');
  }

  useEffect(() => {
    const current = cancerTypeValue || [];
    const hasValue = current.length > 0;

    setNotEmpty(hasValue);
  }, [cancerTypeValue]);

  useEffect(() => {
    console.log(ulceraFamilyHistoryData)
  }, []);

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Histórico familiar" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={2} totalSteps={3} />

        <Text className="text-base text-neutral-800 mt-4 mb-8">Alguém na família do paciente tem varizes importantes ou problemas circulatórios?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Sim" value="YES" checked={value === 'YES'} onPress={() => {
                const newValue = "YES";
                onChange(newValue);
                setNotEmpty(true);
                updateUlceraFamilyHistoryData({ family_varicose_or_circulatory: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/familyHistory/step3')
              }} />
              <RadioButton label="Não" value="NO" checked={value === 'NO'} onPress={() => {
                const newValue = "NO";
                onChange(newValue);
                setNotEmpty(true);
                updateUlceraFamilyHistoryData({ family_varicose_or_circulatory: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/familyHistory/step3')
              }} />
              <RadioButton label="Não sabe" value="DONT_KNOW" checked={value === 'DONT_KNOW'} onPress={() => {
                const newValue = "DONT_KNOW";
                onChange(newValue);
                setNotEmpty(true);
                updateUlceraFamilyHistoryData({ family_varicose_or_circulatory: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/familyHistory/step3')
              }} />
            </View>
          )}
          name="family_varicose_or_circulatory"
        /> 

      </ScrollView>

      <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)}
          onPress={()=> router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/familyHistory/step1')} 
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
