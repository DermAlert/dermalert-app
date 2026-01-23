import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import ModalAlert from "@/components/ModalAlert";
import ProgressBar from "@/components/ProgressBar";
import { TitleText } from "@/components/TitleText";
import { useProfessionalAPI } from "@/hooks/api/useProfessionalAPI";
import { useProfissionalForm } from "@/hooks/useProfissionalForm";
import { formatCPF } from "@/utils/formatCPF";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { ArrowLeftIcon, StethoscopeIcon } from "phosphor-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { BackHandler, InteractionManager, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

export default function RegisterProfissionalStep3() {
  const [isLoading, setIsLoading] = useState(true);
  const [modalAlert, setModalAlert] = useState(false);
  const { updateProfissionalData, profissionalData, setProfissionalData } = useProfissionalForm();
  const { cpf } = useLocalSearchParams();
  const { getProfessionalByCPF, professional } = useProfessionalAPI();
  

  // const { control, handleSubmit, formState: { errors } } = useForm<ProfissionalProps>(
  //   {
  //     defaultValues: {
  //       user: {
  //         email: profissionalData.user?.email ?? ''
  //       }
  //     }
  //   }
  // );
  
  const handleNext = () => {
    // console.log(data);
    // updateProfissionalData(data);
    router.push('/(app)/(profissional)/register-profissional/success');
  }

  const handleCancel = () => {
    setProfissionalData({});
    setModalAlert(!modalAlert);
    router.push('/(app)/(profissional)/profissionais');
  }

  const scrollRef = useRef<KeyboardAwareScrollView>(null);
  const inputFocus = useRef<TextInput>(null);

  useFocusEffect(
    useCallback(() => {
      if (!cpf) return;
  
      (async () => {
        await getProfessionalByCPF(cpf);
        setIsLoading(false)
      })();
    }, [cpf])
  );

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

              <TitleText description="Confirme os dados do profissional e conclua para convidá-lo a atuar nesta unidade de saúde." />

              <View className="bg-white flex-row items-center gap-4 mt-6">
                <View className="rounded-full bg-secondary-100 overflow-hidden w-10 h-10 justify-center items-center">
                  <StethoscopeIcon size={25} color="#FF765E" weight="bold" />
                </View>
                <View>
                  <Text allowFontScaling={false} className='font-semibold text-base text-neutral-900'>{professional?.user?.name}</Text>
                  <Text allowFontScaling={false} className='text-sm mt-1 text-neutral-600'>{formatCPF(professional?.user?.cpf || "")}</Text>
                </View>
              </View>

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
                onPress={handleNext} 
                style={{ flexGrow: 1, width: '47%' }}
              />
            </View>
          </View>

        </KeyboardAwareScrollView>


      

      

    </Animated.View>
  );
}
