import Logo from "@/assets/logo.svg";
import Button from "@/components/Button";
import Input from '@/components/Input';
import { Label } from "@/components/Label";
import { TitleText } from "@/components/TitleText";
import { FormLoginData } from "@/types/forms";
import { formatCPF } from "@/utils/formatCPF";
import { Link, router } from "expo-router";
import { useRef } from "react";
import { useForm } from 'react-hook-form';
import { TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Login() {

  const isLogged = false;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormLoginData>()



  const onSubmit = (data: FormLoginData): void => {
    console.log(data);
    router.push('/(app)/home');
    reset();
  };

  const passwordRef = useRef<TextInput>(null);

  return (
    <SafeAreaView className="flex-1 bg-white p-safe justify-center items-center">
      <View className="px-8 w-full gap-20">
      
        <Logo width={304} />

        <View className="gap-8">
          <TitleText title="Acesse sua conta"/>

          {!isLogged && (
            <View className="">
              <Label title="CPF" />
              <Input 
                error={errors.cpf?.message}
                formProps={{
                  control,
                  name: "cpf",
                  rules: {
                    required: "O CPF é obrigatório.",
                    pattern: {
                      value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                      message: "CPF inválido."
                    }
                  }
                }}
                inputProps={{
                  placeholder: "Informe seu CPF",
                  onSubmitEditing: () => passwordRef.current?.focus(),
                  returnKeyType: "next",
                  maxLength: 14,
                  keyboardType: "numeric"
                }}
                onChangeTextFormat={formatCPF}
              />
            </View>
          )}
          
          <View>
            <Label title="Senha" />
            <Input 
              ref={passwordRef} 
              error={errors.password?.message}
              formProps={{
                control,
                name: "password",
                rules: {
                  required: "A senha é obrigatória."
                }
              }}
              inputProps={{
                placeholder: "Informe sua senha",
                returnKeyType: "send",
                //secureTextEntry: true,
              }}
              password
            />
          </View>
          
          <Button title="Entrar" onPress={handleSubmit(onSubmit)} />
          <Link push href="/(auth)/forgot-password" className="text-primary-600 font-semibold text-base">Esqueceu a senha?</Link>
        </View>

      </View>
      
    </SafeAreaView>
  );
}
