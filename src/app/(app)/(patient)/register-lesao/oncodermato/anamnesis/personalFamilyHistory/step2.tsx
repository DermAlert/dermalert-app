import Button from "@/components/Button";
import CheckButton from "@/components/CheckButton";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { useGeneralHealthForm } from "@/hooks/useGeneralHealthForm";
import { PersonalFamilyHistoryProps } from "@/types/forms";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
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

export default function PersonalFamilyHistoryStep2() {
  const [isYesOpen, setIsYesOpen] = useState(false);
  const [notEmpty, setNotEmpty] = useState(false);
  
  const { generalHealthData, setGeneralHealthData, updateGeneralHealthData  } = useGeneralHealthForm();


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
  const { control, handleSubmit } = useForm<PersonalFamilyHistoryProps>();
  const cancerTypeValue = useWatch({ control, name: "cancer_type" });


  

  const handleNext = (data: PersonalFamilyHistoryProps) => {
    if (data.cancer_type && data.cancer_type.length > 0 && notEmpty) {
      console.log(data);
      //updateGeneralHealthData(data);
      router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/personalFamilyHistory/step3');
    } else {
      return;
    }
  }

  const handleCancel = () => {
    //setGeneralHealthData({});
    router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/steps');
  }

  useEffect(() => {
    const current = cancerTypeValue || [];
    const hasValue = current.length > 0;

    setNotEmpty(hasValue);
  }, [cancerTypeValue]);

  // useEffect(() => {
  //   console.log(generalHealthData)
  // }, []);

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Histórico Familiar e Pessoal" onPress={handleCancel} />

      <ScrollView className="px-6 w-full flex-1">
        <ProgressBar step={2} totalSteps={4} />

        <Text className="text-base text-gray-700 my-8">O paciente já foi diagnosticado com câncer de pele?</Text>

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
                      <Text className="px-0 mt-4">Qual tipo de câncer?</Text>
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
                    //updateGeneralHealthData({ chronic_diseases: newValue });
                    router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/personalFamilyHistory/step3');
                  }}
                />
              </View>
            );
          }}
          name="cancer_type"
        />
      </ScrollView>

      <View className="gap-4 mt-6 px-6 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<AntDesign name="arrowleft" size={14} color="#1E1E1E" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/personalFamilyHistory/step1')} 
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
