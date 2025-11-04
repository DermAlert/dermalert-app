import Button from "@/components/Button";
import CheckButton from "@/components/CheckButton";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { useFamilyHistoryForm } from "@/hooks/Oncodermato/useFamilyHistoryForm";
import { useLesionType } from "@/hooks/useLesionType";
import { PersonalFamilyHistoryProps } from "@/types/forms";
import { router } from "expo-router";
import { ArrowLeftIcon, ArrowRightIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft, useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

export default function PersonalFamilyHistoryEditStep2() {
  const [isYesOpen, setIsYesOpen] = useState(false);
  const [notEmpty, setNotEmpty] = useState(false);
  
  const { familyHistoryData, setFamilyHistoryData, updateFamilyHistoryData  } = useFamilyHistoryForm();
  const { setLesionType } = useLesionType();


  // animação accordion
  const measuredHeight = useSharedValue(0);
  const animatedHeight = useDerivedValue(() => 
    withTiming(
      isYesOpen ? measuredHeight.value : 0, 
      { duration: 300 }
    )
  );
  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    overflow: 'hidden',
  }));

  // formulario
  const { control, handleSubmit } = useForm<PersonalFamilyHistoryProps>(
    {
      defaultValues: {
        patient_cancer_type: familyHistoryData.patient_cancer_type && familyHistoryData.patient_cancer_type.length === 0 ? ["Não"] : familyHistoryData.patient_cancer_type
      }
    }
  );

  const cancerTypeValue = useWatch({ control, name: "patient_cancer_type" });

  

  const handleNext = (data: PersonalFamilyHistoryProps) => {
    if (data.patient_cancer_type && data.patient_cancer_type.length > 0 && notEmpty) {
      //console.log(data);
      const sendData = data.patient_cancer_type.includes("Não") ? [] : data.patient_cancer_type;

      updateFamilyHistoryData({ patient_cancer_type: sendData}); 
      router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/personalFamilyHistory/edit/step3');
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setFamilyHistoryData({});
    setLesionType(null)
    router.push('/(app)/(patient)/lesao/anamnesis/oncodermato/personalFamilyHistory');
  }

  useEffect(() => {
    const current = cancerTypeValue || [];
    const hasValue = current.length > 0;

    if(familyHistoryData.patient_cancer_type && familyHistoryData.patient_cancer_type?.length > 0) {
      setNotEmpty(true);
      setIsYesOpen(true);
    }

    setNotEmpty(hasValue);
  }, [cancerTypeValue, isYesOpen]);

  useEffect(() => {
    console.log(familyHistoryData)
  }, []);

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Histórico Familiar e Pessoal" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={2} totalSteps={5} />

        <Text allowFontScaling={false} className="text-base text-neutral-800 mt-4 mb-8">O paciente já foi diagnosticado com câncer de pele?</Text>

        <Controller
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value = [] } }) => {
            return (
              <View className="gap-3">
                <View>
                  <RadioButton
                    label="Sim"
                    checked={isYesOpen}
                    onPress={() => {
                      setIsYesOpen(true);
                      setNotEmpty(false);
                      if (value.includes("Não")) {
                        onChange(value.filter(v => v !== "Não"));
                      }
                    }}
                  />

                  <Animated.View style={animatedStyle}>
                    <View
                      style={{ position: 'absolute', width: '100%', visibility: isYesOpen ? 'visible' : 'hidden' }}
                      onLayout={(e) => {
                        measuredHeight.value = e.nativeEvent.layout.height;
                      }}
                    >
                      <Text allowFontScaling={false} className="px-0 mt-5 text-neutral-900 text-base">Qual tipo de câncer?</Text>
                      {["Melanoma", "Carcinoma Basocelular", "Carcinoma Espinocelular"].map(item => (
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
                          indented
                        />
                      ))}
                    </View>
                  </Animated.View>
                </View>

                <RadioButton
                  label="Não"
                  value="Não"
                  checked={value.includes("Não")}
                  onPress={() => {
                    const newValue = ["Não"];
                    onChange(newValue);
                    setNotEmpty(true);
                    setIsYesOpen(false);
                    updateFamilyHistoryData({ patient_cancer_type: [] });
                    router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/personalFamilyHistory/edit/step3');
                  }}
                />
              </View>
            );
          }}
          name="patient_cancer_type"
        />
      </ScrollView>

      <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/personalFamilyHistory/edit/step1')} 
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
