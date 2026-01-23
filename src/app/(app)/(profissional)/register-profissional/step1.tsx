import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from '@/components/Input';
import { Label } from "@/components/Label";
import ModalAlert from "@/components/ModalAlert";
import ProgressBar from "@/components/ProgressBar";
import { useProfessionalAPI } from "@/hooks/api/useProfessionalAPI";
import { useProfissionalForm } from "@/hooks/useProfissionalForm";
import { ProfissionalProps } from "@/types/forms";
import { formatCPF, isValidCPF } from "@/utils/formatCPF";
import { router, useFocusEffect } from "expo-router";
import { ArrowRightIcon } from "phosphor-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BackHandler, InteractionManager, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

export default function RegisterProfissionalStep1() {
  const [modalAlert, setModalAlert] = useState(false);
  const { updateProfissionalData, profissionalData, setProfissionalData } = useProfissionalForm();
  const { searchProfessional } = useProfessionalAPI();

  const { control, handleSubmit, formState: { errors } } = useForm<ProfissionalProps>(
    {
      defaultValues: {
        user: {
          cpf: formatCPF(profissionalData.user?.cpf || ''),
        }
      }
    }
  );
  
  const handleNext = async (data: ProfissionalProps) => {
    const formattedData = (data.user?.cpf ?? '').replace(/\D/g, '');
    // console.log(formattedData)
    const exists = await searchProfessional(formattedData);
    // console.log(exists)

    if (exists) {
      router.push({pathname: '/(app)/(profissional)/register-profissional/step3', params: { cpf: formattedData }})
    } else {
      const userData = { user: { cpf: formattedData } };
      console.log(userData);
      updateProfissionalData(userData);
      router.push('/(app)/(profissional)/register-profissional/step2');
    }
    
  }

  const handleCancel = () => {
    setProfissionalData({});
    setModalAlert(!modalAlert);
    router.push('/(app)/(profissional)/profissionais');
  }

  const scrollRef = useRef<KeyboardAwareScrollView>(null);
  const inputFocus = useRef<TextInput>(null);

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      inputFocus.current?.focus();
  
      setTimeout(() => {
        if (inputFocus.current) {
          scrollRef.current?.scrollToFocusedInput(inputFocus.current);
        }
      }, 80);
    });
  
    return () => task.cancel();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        setProfissionalData({});
        setModalAlert(true);
        return true;
      };
  
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
  
      return () => subscription.remove();
    }, [])
  );

  useEffect(() => {
      console.log(profissionalData)
    }, []);

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white p-safe justify-start items-center"
    >
      <ModalAlert 
        modalAlert={modalAlert} 
        setModalAlert={setModalAlert} 
        description="Ao cancelar o cadastro do profissional, todos os dados preenchidos até aqui serão perdidos."
        title="Deseja cancelar o cadastro?"
        handleCancel={handleCancel}
        btnNoText="Não, continuar"
        btnYesText="Sim, cancelar"
      />

      <Header title="Cadastrar profissional" onPress={() => setModalAlert(!modalAlert)} />

      <KeyboardAwareScrollView
        ref={scrollRef}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        keyboardOpeningTime={0}
        contentContainerStyle={{ flex: 1, justifyContent: 'space-between', width: '100%' }}
      >

          <View className="flex-1 px-8 justify-between w-full gap-6">

            <ProgressBar step={1} totalSteps={2} />

            <View className="flex-1">
              <Label title="CPF" text="Informe o CPF do profissional."  />

              <Input 
                error={errors.user?.cpf?.message}
                ref={inputFocus} 
                formProps={{
                  control,
                  name: "user.cpf",
                  rules: {
                    required: "O CPF é obrigatório.",
                    pattern: {
                      value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                      message: "CPF inválido."
                    },
                    validate: value => isValidCPF(value) || "CPF inválido.",
                  }
                }}
                inputProps={{
                  placeholder: "CPF do profissional",
                  returnKeyType: "next",
                  maxLength: 14,
                  keyboardType: "numeric"
                }}
                onChangeTextFormat={formatCPF}
              />
            </View>


            <View className=" w-full justify-start mt-6 pb-6">
              <Button title="Próximo" iconRight icon={(<ArrowRightIcon size={24} color="white" />)}  onPress={handleSubmit(handleNext)} />
            </View>
          </View>

        </KeyboardAwareScrollView>


      

      

    </Animated.View>
  );
}
