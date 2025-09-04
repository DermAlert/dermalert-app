import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { useCancerResearchForm } from "@/hooks/Oncodermato/useCancerResearchForm";
import { useLesionType } from "@/hooks/useLesionType";
import { CancerResearchProps } from "@/types/forms";
import { router } from "expo-router";
import { ArrowLeftIcon, ArrowRightIcon } from "phosphor-react-native";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

export default function CancerResearchStep5() {
  const [isYesOpen, setIsYesOpen] = useState(false);
  const [notEmpty, setNotEmpty] = useState(false);
  
  const { cancerResearchData, setCancerResearchData, updateCancerResearchData } = useCancerResearchForm();
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
  const { control, handleSubmit, formState: { errors } } = useForm<CancerResearchProps>(
    {
      defaultValues: {
        diagnosis: cancerResearchData.diagnosis
      }
    }
  );
    const onChangeRef = useRef<(value: string[]) => void>(() => {});
  const cancerTypeValue = useWatch({ control, name: "diagnosis" });


  

  const handleNext = (data: CancerResearchProps) => {
    if (data.diagnosis && data.diagnosis.length > 0 && notEmpty) {
      console.log(data);
      updateCancerResearchData(data);
      router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/cancerResearch/step6');
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setCancerResearchData({});
    setLesionType(null)
    router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/steps');
  }

  useEffect(() => {
    const current = cancerTypeValue || [];
    const hasValue = current.length > 0;

    if(cancerResearchData.diagnosis && cancerResearchData.diagnosis.length > 0  && cancerResearchData.diagnosis !== "Não") {
      setNotEmpty(true);
      setIsYesOpen(true);
    }

    setNotEmpty(hasValue);
  }, [cancerTypeValue]);

  useEffect(() => {
    console.log(cancerResearchData)
  }, []);

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Investigação de CA e Lesões" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={5} totalSteps={6} />

        <Text className="text-base text-neutral-900 mt-6 mb-8">O paciente já procurou um médico para avaliar essas lesões?</Text>

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
                          <Text className="text-neutral-900 font-semibold text-base mb-2">Qual foi o diagnóstico?</Text>
                          
                          <Input 
                            error={errors.diagnosis?.message}
                            formProps={{ 
                              name: 'diagnosis', 
                              control, 
                              rules: { required: 'O campo é obrigatório.' } 
                            }}
                            inputProps={{
                              placeholder: "Especifique o diagnóstico do médico que avaliou as lesões",
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
                    updateCancerResearchData({ diagnosis: newValue });
                    router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/cancerResearch/step6');
                  }}
                />
              </View>
            );
          }}
          name="diagnosis"
        />

      </ScrollView>

      <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/cancerResearch/step4')} 
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
