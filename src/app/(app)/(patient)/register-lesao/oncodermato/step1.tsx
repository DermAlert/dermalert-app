import Accordion from "@/components/Accordion";
import Button from "@/components/Button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { useRegisterLesionForm } from "@/hooks/Oncodermato/useRegisterLesionForm";
import { useLesionType } from "@/hooks/useLesionType";
import { LesaoOncodermatoProps } from "@/types/forms";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { ArrowRightIcon, FlowerIcon, HandIcon, HeadCircuitIcon, PersonIcon } from "phosphor-react-native";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { BackHandler, Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function RegisterLesaoOncodermatoStep1() {
  const [notEmpty, setNotEmpty] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [openAccordionIndented, setOpenAccordionIndented] = useState<string | null>(null);

  const { registerLesionData, setRegisterLesionData, updateRegisterLesionData } = useRegisterLesionForm();

  const { lesionType, setLesionType } = useLesionType();
  
  

  // formulario
  const { control, handleSubmit } = useForm<LesaoOncodermatoProps>(
    {
      defaultValues: {
        lesion_local: registerLesionData.lesion_local
      }
    }
  );
  const lesionLocalValue = useWatch({ control, name: "lesion_local" });


  

  const handleNext = (data: LesaoOncodermatoProps) => {
    if (data.lesion_local && data.lesion_local !== undefined && notEmpty) {
      console.log(data);
      updateRegisterLesionData(data);
      router.push('/(app)/(patient)/register-lesao/oncodermato/step2');
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setRegisterLesionData({});
    setLesionType(null)
    router.push('/(app)/(patient)/register-lesao/select');
  }

  useEffect(() => {
    const current = lesionLocalValue || [];
    const hasValue = current !== undefined;

    setNotEmpty(hasValue);
  }, [lesionLocalValue]);

  useFocusEffect(
    useCallback(() => {
      if(registerLesionData.lesion_local && registerLesionData.lesion_local !== undefined) {
        setNotEmpty(true);
        setOpenAccordion(registerLesionData.lesion_local?.body_part || null);
      }
    }, [])
  );

  useEffect(() => {
    console.log(registerLesionData)
    console.log(lesionType)
    console.log(openAccordion)
  }, [openAccordion]);

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

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Registrar lesão" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={1} totalSteps={8} />

        <Text className="text-base text-neutral-900 my-8">Informe o local da lesão</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-1">
              <Accordion
                title="Cabeça e pescoço"
                isOpen={openAccordion === 'head_neck'}
                onToggle={() =>
                  setOpenAccordion(prev => prev === 'head_neck' ? null : 'head_neck')
                }
                icon={<HeadCircuitIcon size={20} color="#6775B4" weight="bold" />}
              >
                 <RadioButton
                    label="Couro cabeludo"
                    value="scalp"
                    checked={value?.location === 'scalp'}
                    onPress={() => {
                      onChange({body_part: "head_neck", location: "scalp"});
                      setNotEmpty(true);
                    }}
                    indented
                  />
                 <RadioButton
                    label="Testa"
                    value="forehead"
                    checked={value?.location === 'forehead'}
                    onPress={() => {
                      onChange({body_part: "head_neck", location: "forehead"});
                      setNotEmpty(true);
                    }}
                    indented
                  />
                  <RadioButton
                    label="Olhos"
                    value="eyes"
                    checked={value?.location === 'eyes'}
                    onPress={() => {
                      onChange({body_part: "head_neck", location: "eyes"});
                      setNotEmpty(true);
                    }}
                    indented
                  />
                  <RadioButton
                    label="Nariz"
                    value="nose"
                    checked={value?.location === 'nose'}
                    onPress={() => {
                      onChange({body_part: "head_neck", location: "nose"});
                      setNotEmpty(true);
                    }}
                    indented
                  />
                  <RadioButton
                    label="Boca"
                    value="mouth"
                    checked={value?.location === 'mouth'}
                    onPress={() => {
                      onChange({body_part: "head_neck", location: "mouth"});
                      setNotEmpty(true);
                    }}
                    indented
                  />
                  <RadioButton
                    label="Orelhas"
                    value="ears"
                    checked={value?.location === 'ears'}
                    onPress={() => {
                      onChange({body_part: "head_neck", location: "ears"});
                      setNotEmpty(true);
                    }}
                    indented
                  />
                  <RadioButton
                    label="Pescoço"
                    value="neck"
                    checked={value?.location === 'neck'}
                    onPress={() => {
                      onChange({body_part: "head_neck", location: "neck"});
                      setNotEmpty(true);
                    }}
                    indented
                  />
                  <RadioButton
                    label="Rosto"
                    value="face"
                    checked={value?.location === 'face'}
                    onPress={() => {
                      onChange({body_part: "head_neck", location: "face"});
                      setNotEmpty(true);
                    }}
                    indented
                  />
              </Accordion>

              <Accordion
                title="Tronco"
                isOpen={openAccordion === 'trunk'}
                onToggle={() =>
                  setOpenAccordion(prev => prev === 'trunk' ? null : 'trunk')
                }
                icon={<PersonIcon size={20} color="#6775B4" weight="bold" />}
              >
                <RadioButton
                  label="Tórax anterior"
                  value="chest_front"
                  checked={value?.location === 'chest_front'}
                  onPress={() => {
                    onChange({body_part: "trunk", location: "chest_front"});
                    setNotEmpty(true);
                  }}
                  indented
                />
                <RadioButton
                  label="Tórax posterior"
                  value="chest_back"
                  checked={value?.location === 'chest_back'}
                  onPress={() => {
                    onChange({body_part: "trunk", location: "chest_back"});
                    setNotEmpty(true);
                  }}
                  indented
                />
                <RadioButton
                  label="Abdome superior"
                  value="upper_abdomen"
                  checked={value?.location === 'upper_abdomen'}
                  onPress={() => {
                    onChange({body_part: "trunk", location: "upper_abdomen"});
                    setNotEmpty(true);
                  }}
                  indented
                />
                <RadioButton
                  label="Abdome inferior"
                  value="lower_abdomen"
                  checked={value?.location === 'lower_abdomen'}
                  onPress={() => {
                    onChange({body_part: "trunk", location: "lower_abdomen"});
                    setNotEmpty(true);
                  }}
                  indented
                />
                <RadioButton
                  label="Costas"
                  value="back"
                  checked={value?.location === 'back'}
                  onPress={() => {
                    onChange({body_part: "trunk", location: "back"});
                    setNotEmpty(true);
                  }}
                  indented
                />
                <RadioButton
                  label="Flancos"
                  value="flanks"
                  checked={value?.location === 'flanks'}
                  onPress={() => {
                    onChange({body_part: "trunk", location: "flanks"});
                    setNotEmpty(true);
                  }}
                  indented
                />
              </Accordion>

              <Accordion
                title="Região Pélvica"
                isOpen={openAccordion === 'pelvis'}
                onToggle={() =>
                  setOpenAccordion(prev => prev === 'pelvis' ? null : 'pelvis')
                }
                icon={<FlowerIcon size={20} color="#6775B4" weight="bold" />}
              >
                <RadioButton
                  label="Genitais"
                  value="genitals"
                  checked={value?.location === 'genitals'}
                  onPress={() => {
                    onChange({body_part: "pelvis", location: "genitals"});
                    setNotEmpty(true);
                  }}
                  indented
                />
                <RadioButton
                  label="Púbe"
                  value="pubis"
                  checked={value?.location === 'pubis'}
                  onPress={() => {
                    onChange({body_part: "pelvis", location: "pubis"});
                    setNotEmpty(true);
                  }}
                  indented
                />
                <RadioButton
                  label="Glúteos"
                  value="buttocks"
                  checked={value?.location === 'buttocks'}
                  onPress={() => {
                    onChange({body_part: "pelvis", location: "buttocks"});
                    setNotEmpty(true);
                  }}
                  indented
                />
                <RadioButton
                  label="Cóccix"
                  value="coccyx"
                  checked={value?.location === 'coccyx'}
                  onPress={() => {
                    onChange({body_part: "pelvis", location: "coccyx"});
                    setNotEmpty(true);
                  }}
                  indented
                />
              </Accordion>

              <Accordion
                title="Extremidades"
                isOpen={openAccordion === 'extremities'}
                onToggle={() =>
                  setOpenAccordion(prev => prev === 'extremities' ? null : 'extremities')
                }
                icon={<HandIcon size={20} color="#6775B4" weight="bold" />}
              >
                <RadioButton
                  label="Ombro direito"
                  value="shoulder_right"
                  checked={value?.location === 'shoulder_right'}
                  onPress={() => {
                    onChange({body_part: "extremities", location: "shoulder_right"});
                    setNotEmpty(true);
                  }}
                  indented
                />
                <RadioButton
                  label="Ombro esquerdo"
                  value="shoulder_left"
                  checked={value?.location === 'shoulder_left'}
                  onPress={() => {
                    onChange({body_part: "extremities", location: "shoulder_left"});
                    setNotEmpty(true);
                  }}
                  indented
                />
                <RadioButton
                  label="Braço direito"
                  value="arm_right"
                  checked={value?.location === 'arm_right'}
                  onPress={() => {
                    onChange({body_part: "extremities", location: "arm_right"});
                    setNotEmpty(true);
                  }}
                  indented
                />
                <RadioButton
                  label="Braço esquerdo"
                  value="arm_left"
                  checked={value?.location === 'arm_left'}
                  onPress={() => {
                    onChange({body_part: "extremities", location: "arm_left"});
                    setNotEmpty(true);
                  }}
                  indented
                />
                <RadioButton
                  label="Antebraço direito"
                  value="forearm_right"
                  checked={value?.location === 'forearm_right'}
                  onPress={() => {
                    onChange({body_part: "extremities", location: "forearm_right"});
                    setNotEmpty(true);
                  }}
                  indented
                />
                <RadioButton
                  label="Antebraço esquerdo"
                  value="forearm_left"
                  checked={value?.location === 'forearm_left'}
                  onPress={() => {
                    onChange({body_part: "extremities", location: "forearm_left"});
                    setNotEmpty(true);
                  }}
                  indented
                />
                <RadioButton
                  label="Mão direita"
                  value="hand_right"
                  checked={value?.location === 'hand_right'}
                  onPress={() => {
                    onChange({body_part: "extremities", location: "hand_right"});
                    setNotEmpty(true);
                  }}
                  indented
                />
                <RadioButton
                  label="Mão esquerda"
                  value="hand_left"
                  checked={value?.location === 'hand_left'}
                  onPress={() => {
                    onChange({body_part: "extremities", location: "hand_left"});
                    setNotEmpty(true);
                  }}
                  indented
                />
                <RadioButton
                  label="Coxa direita"
                  value="thigh_right"
                  checked={value?.location === 'thigh_right'}
                  onPress={() => {
                    onChange({body_part: "extremities", location: "thigh_right"});
                    setNotEmpty(true);
                  }}
                  indented
                />
                <RadioButton
                  label="Coxa esquerda"
                  value="thigh_left"
                  checked={value?.location === 'thigh_left'}
                  onPress={() => {
                    onChange({body_part: "extremities", location: "thigh_left"});
                    setNotEmpty(true);
                  }}
                  indented
                />
                <RadioButton
                  label="Perna direita"
                  value="leg_right"
                  checked={value?.location === 'leg_right'}
                  onPress={() => {
                    onChange({body_part: "extremities", location: "leg_right"});
                    setNotEmpty(true);
                  }}
                  indented
                />
                <RadioButton
                  label="Perna esquerda"
                  value="leg_left"
                  checked={value?.location === 'leg_left'}
                  onPress={() => {
                    onChange({body_part: "extremities", location: "leg_left"});
                    setNotEmpty(true);
                  }}
                  indented
                />
                <RadioButton
                  label="Pé direito"
                  value="foot_right"
                  checked={value?.location === 'foot_right'}
                  onPress={() => {
                    onChange({body_part: "extremities", location: "foot_right"});
                    setNotEmpty(true);
                  }}
                  indented
                />
                <RadioButton
                  label="Pé esquerdo"
                  value="foot_left"
                  checked={value?.location === 'foot_left'}
                  onPress={() => {
                    onChange({body_part: "extremities", location: "foot_left"});
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

      <View className="px-8 w-full justify-start mb-4">
        <Button 
          title="Próximo" 
          iconRight 
          icon={<ArrowRightIcon size={24} color={`${notEmpty ? 'white' : '#D4D6DF'}`} />} 
          onPress={handleSubmit(handleNext)} 
          activeOpacity={notEmpty ? 0.2 : 1}
          disabled={notEmpty}
        />
      </View>
    </Animated.View>
  );
}
