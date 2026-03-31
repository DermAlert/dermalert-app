import Button from "@/components/Button";
import Header from "@/components/Header";
import Icon from '@/components/Icon';
import Input from '@/components/Input';
import { Label } from "@/components/Label";
import { Loading } from "@/components/Loading";
import { TitleText } from "@/components/TitleText";
import { useProfessionalAPI } from "@/hooks/api/useProfessionalAPI";
import { FormUserResetPassData, ProfissionalPropsForm } from "@/types/forms";
import { useFocusEffect } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeftIcon, CheckIcon } from 'phosphor-react-native';
import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Text, TextInput, View } from 'react-native';
import Animated, { SlideInUp, SlideOutDown } from 'react-native-reanimated';

export default function CompleteRegistration() {
  const [step1, setStep1] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [invalidToken, setInvalidToken] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [professional, setProfessional] = useState<ProfissionalPropsForm | null>(null);

  const { getInvitationTokenData, completeProfessionalRegistration } = useProfessionalAPI();

  const { token } = useLocalSearchParams()

    const {
      control,
      handleSubmit,
      reset,
      getValues, 
      trigger,
      watch,
      formState: { errors },
    } = useForm<FormUserResetPassData>()

    const newPasswordValue = watch('newPassword', '');
    
      function validatePasswordConfirmation(passwordConfirmation: string) {
        const { newPassword } = getValues();
        return newPassword === passwordConfirmation || 'As senhas devem ser iguais';
      };
    
      const inputFocus = useRef<TextInput>(null);
      const confirmPass = useRef<TextInput>(null);

    const onSubmit = async (data: FormUserResetPassData): Promise<void> => {
      console.log(data, token);

      setIsLoading(true);
      await completeProfessionalRegistration(data as string, token as string);
      setIsLoading(false)

      reset();
      setStep1(false)
    };

    useFocusEffect(
      useCallback(() => {
        if (!token) return;
    
        (async () => {
          setIsLoading(true)
          console.log("Token:", token);
          const invitationData = await getInvitationTokenData(token as string);
          if (invitationData?.status === 400) {
            setInvalidToken(true);
            setIsLoading(false);
            return;
          } else {
            setInvalidToken(false);
            setProfessional(invitationData as any);
          }
          setIsLoading(false)
        })();
      }, [token])
    );




  if(isLoading){
    return (
      <View className="flex-1 p-safe justify-center items-center">
        <Loading />
      </View>
    )
  }

  if(invalidToken){
    return (
      <View className="flex-1 p-safe justify-center items-center">
        <Text className="text-danger-700 font-semibold">Token de convite inválido ou expirado.</Text>
      </View>
    )
  }

  return (
    <Animated.View 
      entering={SlideInUp} 
      exiting={SlideOutDown} 
      className="flex-1 bg-white p-safe justify-start items-center"
    >
      <Header title="Completar cadastro" onPress={() => {
        router.push('/(auth)')
        setStep1(true)
        }} />

      {step1 && (
        <View className="p-8 w-full justify-start flex-1 gap-8">

          <TitleText title={`Olá, ${professional?.name || 'usuário'}! Complete seu cadastro`} description="Crie uma nova senha que siga os padrões indicados abaixo para maior segurança." />

          <View>

            <Label text="Crie uma senha" />

            <Input 
              error={errors.newPassword?.message}
              formProps={{
                control,
                name: "newPassword",
                rules: {
                  required: "Campo obrigatório.",
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/,
                    message: "A senha deve seguir as regras abaixo.",
                  }

                }
              }}
              inputProps={{
                placeholder: "Nova senha",
                returnKeyType: "next",
                onSubmitEditing: () => confirmPass.current?.focus(),
                //secureTextEntry: true,
              }}
              password
            />

            <Label text="Confirme a senha" style={{ marginTop: 32 }} />

            <Input 
              ref={confirmPass}
              error={errors.confirmNewPassword?.message}
              formProps={{
                control,
                name: "confirmNewPassword",
                rules: {
                  required: "Senha é obrigatória.",
                  validate: validatePasswordConfirmation,
                }
              }}
              inputProps={{
                placeholder: "Confirma nova senha",
                returnKeyType: "send",
                //secureTextEntry: true,
              }}
              password
            />

            {passwordError && <Text className="text-danger-700 mt-4 text-sm font-semibold tracking-wide">{passwordError}</Text>}


          </View>

          
          <View>
            <Text allowFontScaling={false} className="text-sm mb-2 font-medium text-neutral-800 mt-4">A senha deve conter:</Text>

            <View className="flex-row gap-2 items-center mb-2">
              <CheckIcon size={18} color={`${newPasswordValue && newPasswordValue.length >= 8 ? "#00A63E": "#D4D6DF"}`} weight={`${newPasswordValue && newPasswordValue.length >= 8 ? "bold" : "regular"}`} />
              <Text allowFontScaling={false} className={`text-sm ${newPasswordValue && newPasswordValue.length >= 8 ? "text-neutral-900 font-medium": "text-neutral-800 font-normal"}`}>Mínimo de 8 caracteres</Text>
            </View>

            <View className="flex-row gap-2 items-center mb-2">
              <CheckIcon size={18} color={`${newPasswordValue && /[A-Z]/.test(newPasswordValue) ? "#00A63E": "#D4D6DF"}`} weight={`${newPasswordValue && /[A-Z]/.test(newPasswordValue) ? "bold" : "regular"}`} />
              <Text allowFontScaling={false} className={`text-sm ${newPasswordValue && /[A-Z]/.test(newPasswordValue) ? "text-neutral-900 font-medium": "text-neutral-800 font-normal"}`}>Pelo menos 1 letra maiúscula</Text>
            </View>

            <View className="flex-row gap-2 items-center mb-2">
              <CheckIcon size={18} color={`${newPasswordValue && /\d/.test(newPasswordValue) ? "#00A63E": "#D4D6DF"}`} weight={`${newPasswordValue && /\d/.test(newPasswordValue) ? "bold" : "regular"}`} />
              <Text allowFontScaling={false} className={`text-sm ${newPasswordValue && /\d/.test(newPasswordValue) ? "text-neutral-900 font-medium": "text-neutral-800 font-normal"}`}>Pelo menos 1 número</Text>
            </View>

            <View className="flex-row gap-2 items-center">
              <CheckIcon size={18} color={`${newPasswordValue && /[^\w\s]/.test(newPasswordValue) ? "#00A63E": "#D4D6DF"}`} weight={`${newPasswordValue && /[^\w\s]/.test(newPasswordValue) ? "bold" : "regular"}`} />
              <Text allowFontScaling={false} className={`text-sm ${newPasswordValue && /[^\w\s]/.test(newPasswordValue) ? "text-neutral-900 font-medium": "text-neutral-800 font-normal"}`}>Pelo menos 1 caractere especial (@, #, $, etc.)</Text>
            </View>
          </View>
          

          <Button title="Completar cadastro" onPress={handleSubmit(onSubmit)} />

        </View>
      )}

      {!step1 && (
        <View className="p-8 w-full justify-start flex-1 gap-10">

          <Icon iconName="CheckCircleIcon" />

          <TitleText title="Seu cadastro está completo" description="Faça o login com a sua nova conta."/>

          <Button title="Faça login" secondary style={{ alignSelf: "flex-start" }} full={false} onPress={() => {
            router.push('/(auth)')
            setStep1(true)
            }} 
          iconLeft 
          icon={(<ArrowLeftIcon size={18} color="#4052A1"/>)}  />

        </View>
      )}

      
      
    </Animated.View>
  );
}
