import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { useUlceraFamilyHistoryForm } from "@/hooks/Ulcera/useUlceraFamilyHistoryForm";
import { usePatientId } from "@/hooks/usePatientId";
import { api } from "@/services/api";
import { UlceraFamilyHistoryProps } from "@/types/forms";
import { router, useFocusEffect } from "expo-router";
import { ArrowRightIcon } from "phosphor-react-native";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { BackHandler, Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function UlceraFamilyHistoryEditStep1() {
  const [notEmpty, setNotEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  
  const { ulceraFamilyHistoryData, setUlceraFamilyHistoryData, updateUlceraFamilyHistoryData } = useUlceraFamilyHistoryForm();

    const { patientId } = usePatientId();
  

  // formulario
  const { control, handleSubmit, reset } = useForm<UlceraFamilyHistoryProps>(
    {
      defaultValues: {
        family_leg_ulcers: ""
      }
    }
  );
  const cancerTypeValue = useWatch({ control, name: "family_leg_ulcers" });

  const loadFamilyHistory = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/patients/${patientId}/forms/family-vascular-history/`);
      setUlceraFamilyHistoryData(prev => {
        return prev?.family_leg_ulcers ? prev : data;
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [patientId, setUlceraFamilyHistoryData]);

  useEffect(() => {
    if (ulceraFamilyHistoryData?.family_leg_ulcers) {
      reset({
        family_leg_ulcers: ulceraFamilyHistoryData.family_leg_ulcers
      });
    }
  }, [ulceraFamilyHistoryData, reset]);

  useEffect(() => {
    loadFamilyHistory();
  }, [loadFamilyHistory]);


  const handleNext = (data: UlceraFamilyHistoryProps) => {
    if (data.family_leg_ulcers && data.family_leg_ulcers.length > 0 && notEmpty) {
      console.log(data);
      updateUlceraFamilyHistoryData(data);
      router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/familyHistory/edit/step2')
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setUlceraFamilyHistoryData({});
    router.push('/(app)/(patient)/lesao/anamnesis/ulcera/familyHistory/');
  }

  useEffect(() => {
    const current = cancerTypeValue || [];
    const hasValue = current.length > 0;

    setNotEmpty(hasValue);
  }, [cancerTypeValue]);

  useEffect(() => {
    console.log(ulceraFamilyHistoryData)
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        handleCancel()
        return true;
      };
  
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
  
      return () => subscription.remove();
    }, [])
  );

  if(isLoading){
    return (
      <View className="flex-1 bg-white p-safe justify-center items-center">
        <Loading />
      </View>
    )
  }

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Histórico familiar" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={1} totalSteps={3} />

        <Text className="text-base text-neutral-800 mt-4 mb-8">Alguém na família do paciente tem ou teve úlceras nas pernas?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Sim" value="YES" checked={value === 'YES'} onPress={() => {
                const newValue = "YES";
                onChange(newValue);
                setNotEmpty(true);
                updateUlceraFamilyHistoryData({ family_leg_ulcers: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/familyHistory/edit/step2')
              }} />
              <RadioButton label="Não" value="NO" checked={value === 'NO'} onPress={() => {
                const newValue = "NO";
                onChange(newValue);
                setNotEmpty(true);
                updateUlceraFamilyHistoryData({ family_leg_ulcers: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/familyHistory/edit/step2')
              }} />
              <RadioButton label="Não sabe" value="DONT_KNOW" checked={value === 'DONT_KNOW'} onPress={() => {
                const newValue = "DONT_KNOW";
                onChange(newValue);
                setNotEmpty(true);
                updateUlceraFamilyHistoryData({ family_leg_ulcers: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/familyHistory/edit/step2')
              }} />
            </View>
          )}
          name="family_leg_ulcers"
        /> 

      </ScrollView>

      <View className="px-8 w-full justify-start mb-4">
        <Button 
          title="Próximo" 
          iconRight 
          icon={<ArrowRightIcon size={24} color={`${notEmpty ? 'white' : '#B3B3B3'}`} />}
          style={{ marginTop: 24 }} 
          onPress={handleSubmit(handleNext)} 
          activeOpacity={notEmpty ? 0.2 : 1}
          disabled={notEmpty}
        />
      </View>
    </Animated.View>
  );
}
