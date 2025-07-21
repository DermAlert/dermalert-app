import Accordion from "@/components/Accordion";
import Button from "@/components/Button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { useRegisterLesionUlceraForm } from "@/hooks/Ulcera/useRegisterLesionUlceraForm";
import { LesaoUlceraProps } from "@/types/forms";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function RegisterLesaoUlceraStep1() {
  const [notEmpty, setNotEmpty] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [openAccordionIndented, setOpenAccordionIndented] = useState<string | null>(null);

  const { registerLesionUlceraData, setRegisterLesionUlceraData, updateRegisterLesionUlceraData } = useRegisterLesionUlceraForm();
  
  

  // formulario
  const { control, handleSubmit } = useForm<LesaoUlceraProps>();
  const lesionLocalValue = useWatch({ control, name: "lesion_local" });


  

  const handleNext = (data: LesaoUlceraProps) => {
    if (data.lesion_local && data.lesion_local.length > 0 && notEmpty) {
      console.log(data);
      updateRegisterLesionUlceraData(data);
      router.push('/(app)/(patient)/register-lesao/ulcera/step2');
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
        <ProgressBar step={1} totalSteps={9} />

        <Text className="text-base text-gray-700 my-8">Informe o local da lesão</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <Accordion
                title="Cabeça e pescoço"
                isOpen={openAccordion === 'Cabeça e pescoço'}
                onToggle={() =>
                  setOpenAccordion(prev => prev === 'Cabeça e pescoço' ? null : 'Cabeça e pescoço')
                }
                icon={<MaterialCommunityIcons name="head" size={20} color="#49454F" />}
              >
                <Accordion
                  title="Scalp"
                  isOpen={openAccordionIndented === 'Scalp'}
                  onToggle={() =>
                    setOpenAccordionIndented(prev => prev === 'Scalp' ? null : 'Scalp')
                  }
                  indented
                >
                  <RadioButton
                    label="Frontal scalp"
                    value="Frontal scalp"
                    checked={value === 'Frontal scalp'}
                    onPress={() => {
                      onChange("Frontal scalp");
                      setNotEmpty(true);
                    }}
                    indented
                  />
                  <RadioButton
                    label="Mastoid process"
                    value="Mastoid process"
                    checked={value === 'Mastoid process'}
                    onPress={() => {
                      onChange("Mastoid process");
                      setNotEmpty(true);
                    }}
                    indented
                  />
                </Accordion>
                <Accordion
                  title="External ear"
                  isOpen={openAccordionIndented === 'External ear'}
                  onToggle={() =>
                    setOpenAccordionIndented(prev => prev === 'External ear' ? null : 'External ear')
                  }
                  indented
                >
                  <RadioButton
                    label="External ear option"
                    value="External ear option"
                    checked={value === 'External ear option'}
                    onPress={() => {
                      onChange("External ear option");
                      setNotEmpty(true);
                    }}
                    indented
                  />
                </Accordion>
              </Accordion>

              <Accordion
                title="Trunk"
                isOpen={openAccordion === 'Trunk'}
                onToggle={() =>
                  setOpenAccordion(prev => prev === 'Trunk' ? null : 'Trunk')
                }
              >
                <RadioButton
                  label="Trunk option"
                  value="Trunk option"
                  checked={value === 'Trunk option'}
                  onPress={() => {
                    onChange("Trunk option");
                    setNotEmpty(true);
                  }}
                  indented
                />
              </Accordion>
            </View>
          )}
          name="lesion_local"
        />

      </ScrollView>

      <View className="px-6 w-full justify-start mb-4">
        <Button 
          title="Próximo" 
          iconRight 
          icon={<AntDesign name="arrowright" size={14} color={`${notEmpty ? 'white' : '#B3B3B3'}`} />} 
          style={{ marginTop: 24 }} 
          onPress={handleSubmit(handleNext)} 
          activeOpacity={notEmpty ? 0.2 : 1}
          disabled={notEmpty}
        />
      </View>
    </Animated.View>
  );
}
