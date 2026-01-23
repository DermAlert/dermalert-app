import Button from "@/components/Button";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import { TitleText } from "@/components/TitleText";
import { useProfissionalForm } from "@/hooks/useProfissionalForm";
import { router, useFocusEffect } from "expo-router";
import { ArrowLeftIcon } from "phosphor-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { BackHandler, InteractionManager, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

export default function RegisterProfissionalSuccess() {
  const [modalAlert, setModalAlert] = useState(false);
  const { updateProfissionalData, profissionalData, setProfissionalData } = useProfissionalForm();


  const scrollRef = useRef<KeyboardAwareScrollView>(null);
  const inputFocus = useRef<TextInput>(null);


  const handleCancel = () => {
    setProfissionalData({});
    router.push('/(app)/(profissional)/profissionais')
  }

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
        // setModalAlert(true);
        router.push('/(app)/(profissional)/profissionais')
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
      {/* <ModalAlert 
        modalAlert={modalAlert} 
        setModalAlert={setModalAlert} 
        description="Ao cancelar o cadastro do profissional, todos os dados preenchidos até aqui serão perdidos."
        title="Deseja cancelar o cadastro?"
        handleCancel={handleCancel}
        btnNoText="Não, continuar"
        btnYesText="Sim, cancelar"
      /> */}

      <Header title="Cadastrar profissional" onPress={handleCancel} />

      <View className="p-8 w-full justify-start flex-1 gap-10">
      
        <Icon iconName="UserCirclePlusIcon" />

        <TitleText title="Cadastro concluído!" description="O profissional receberá um e-mail com um link para concluir o cadastro e começar a atuar nesta unidade." />


        <Button title="Voltar" secondary style={{ alignSelf: "flex-start" }} full={false} onPress={handleCancel} iconLeft 
        icon={(<ArrowLeftIcon size={18} color="#4052A1"/>)}  />

      </View>


      

      

    </Animated.View>
  );
}
