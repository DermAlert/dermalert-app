import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { useGeneralHealthForm } from "@/hooks/useGeneralHealthForm";
import { GeneralHealthProps } from "@/types/forms";
import { router } from "expo-router";
import { ArrowLeftIcon, ArrowRightIcon } from "phosphor-react-native";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft, useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

export default function GeneralHealthStep4() {
  const [isYesOpen, setIsYesOpen] = useState(false);
  const [notEmpty, setNotEmpty] = useState(false);
  const [modalSearchOpen, setModalSearchOpen] = useState(false);  
  
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
  const { control, handleSubmit, formState: { errors } } = useForm<GeneralHealthProps>(
    {
      defaultValues: {
        surgeries: generalHealthData.surgeries
      }
    }
  );
  const onChangeRef = useRef<(value: string[]) => void>(() => {});
  const surgeriesValue = useWatch({ control, name: "surgeries" });

  const handleNext = (data: GeneralHealthProps) => {
    if (data.surgeries && data.surgeries.length > 0 && notEmpty) {
      console.log(data);
      updateGeneralHealthData(data);
      router.push('/(app)/register-patient/general-health/step5');
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setGeneralHealthData({});
    router.push('/(app)/register-patient/step9');
  }

  useEffect(() => {
    const current = surgeriesValue || "";
    const hasOtherSelections = current.length > 0;

    if(generalHealthData.surgeries && generalHealthData.surgeries.length > 0  && generalHealthData.surgeries !== "Não") {
      setNotEmpty(true);
      setIsYesOpen(true);
    }


    setNotEmpty(hasOtherSelections);
  }, [surgeriesValue]);

  useEffect(() => {
    console.log(generalHealthData)
  }, []);

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Andecedentes clínicos" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={4} totalSteps={6} />

        <Text className="text-base text-neutral-900 mt-6 mb-8">O paciente já passou por cirurgias dermatológicas?</Text>

        <Controller
          control={control}
          defaultValue={""}
          render={({ field: { onChange, value = [] } }) => {
            onChangeRef.current = onChange;
            return (
              <View className="gap-3">
                <View>
                  <RadioButton
                    label="Sim"
                    checked={isYesOpen}
                    onPress={() => {
                      setIsYesOpen(true);
                      setNotEmpty(false);

                      if (value === "Não") {
                        onChange([]);
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
                      <View className="mx-4 mt-6 mb-6">
                          <Text className="text-neutral-900 font-semibold text-base mb-2">Qual foi o procedimento?</Text>
                          
                          <Input 
                            error={errors.surgeries?.message}
                            formProps={{ 
                              name: 'surgeries', 
                              control, 
                              rules: { required: 'O campo é obrigatório.' } 
                            }}
                            inputProps={{
                              placeholder: "Especifique",
                              returnKeyType: "next",
                              multiline: true,
                              numberOfLines: 3,
                              style: { textAlignVertical: 'top', height: 80 },
                            }}
                          />
                        </View>
                    </View>
                  </Animated.View>
                </View>

                <RadioButton
                  label="Não"
                  value="Não"
                  checked={value === "Não"}
                  onPress={() => {
                    const newValue = "Não";
                    onChange(newValue);
                    setNotEmpty(true);
                    setIsYesOpen(false);
                    updateGeneralHealthData({ surgeries: newValue });
                    router.push('/(app)/register-patient/general-health/step5');
                  }}
                />
              </View>
            );
          }}
          name="surgeries"
        />
      </ScrollView>

      <View className="gap-4 mt-6 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)}  
          onPress={()=> router.push("/(app)/register-patient/general-health/step3")} 
          style={{ flexGrow: 1, width: '47%' }}
        />
        <Button 
          title="Próximo" 
          iconRight 
          icon={<ArrowRightIcon size={24} color={`${notEmpty ? 'white' : '#D4D6DF'}`} />} 
          style={{ flexGrow: 1, width: '47%' }} 
          onPress={handleSubmit(handleNext)} 
          activeOpacity={notEmpty ? 0.2 : 1}
          disabled={notEmpty}
        />
      </View>
    </Animated.View>
  );
}
