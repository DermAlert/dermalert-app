import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from '@/components/Input';
import { Label } from "@/components/Label";
import ModalAlert from "@/components/ModalAlert";
import ProgressBar from "@/components/ProgressBar";
import { useProfissionalForm } from "@/hooks/useProfissionalForm";
import { ProfissionalProps } from "@/types/forms";
import { router, useFocusEffect } from "expo-router";
import { ArrowLeftIcon } from "phosphor-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BackHandler, InteractionManager, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

export default function RegisterProfissionalStep2() {
  const [modalAlert, setModalAlert] = useState(false);
  const { updateProfissionalData, profissionalData, setProfissionalData } = useProfissionalForm();

  const { control, handleSubmit, formState: { errors } } = useForm<ProfissionalProps>(
    {
      defaultValues: {
        user: {
          email: profissionalData.user?.email ?? ''
        }
      }
    }
  );
  
  const handleNext = (data: ProfissionalProps) => {
    console.log(data);
    updateProfissionalData(data);
    router.push('/(app)/(profissional)/register-profissional/success');
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

            <ProgressBar step={2} totalSteps={2} />

            <View className="flex-1">
              <Label title="E-mail" text="Informe o e-mail do profissional."/>

              <Input 
                ref={inputFocus} 
                error={errors.user?.email?.message}
                formProps={{
                  control,
                  name: "user.email",
                  rules: {
                    required: "O e-mail é obrigatório.",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "E-mail inválido."
                    }
                  }
                }}
                inputProps={{
                  placeholder: "Endereço de e-mail",
                  returnKeyType: "next",
                }}
              />
            </View>


            <View className="gap-4 w-full justify-start flex-row pb-6">
              <Button title="Voltar" 
                iconLeft 
                secondary 
                icon={(<ArrowLeftIcon size={24} color="#4052A1" />)} 
                onPress={()=> router.push("/(app)/(profissional)/register-profissional/step1")} 
                style={{ flexGrow: 1, width: '47%' }}
              />
              <Button title="Concluir" 
                onPress={handleSubmit(handleNext)} 
                style={{ flexGrow: 1, width: '47%' }}
              />
            </View>
          </View>

        </KeyboardAwareScrollView>


      

      

    </Animated.View>
  );
}
