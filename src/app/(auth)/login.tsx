import Logo from "@/assets/logo.svg";
import Button from "@/components/Button";
import Input from '@/components/Input';
import { FormLoginData } from "@/types/forms";
import { formatCPF } from "@/utils/formatCPF";
import { Link, router } from "expo-router";
import { useRef } from "react";
import { useForm } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';
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
      <View className="p-6">
      
        <Logo width={316} height={83}/>

        <View className="p-6 border border-gray-300 rounded-md mt-14">
          {!isLogged && (
            <View className="mb-6">
              <Text className="text-base mb-2 text-gray-700">CPF</Text>
              <Input 
                error={errors.cpf?.message}
                formProps={{
                  control,
                  name: "cpf",
                  rules: {
                    required: "O CPF é obrigatório.",
                    pattern: {
                      value: /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/,
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
          
          <Text className="text-base mb-2 text-gray-700">Senha</Text>
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
              secureTextEntry: true,
            }}
          />
          <Button title="Entrar" style={{ marginTop: 24 }} onPress={handleSubmit(onSubmit)} />
          <Link push href="/(auth)/forgot-password" className="mt-6 underline">Esqueceu a senha?</Link>
        </View>

      </View>
      
    </SafeAreaView>
  );
}
