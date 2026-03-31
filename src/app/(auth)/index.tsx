import Logo from "@/assets/logo.svg";
import Button from "@/components/Button";
import Input from '@/components/Input';
import { Label } from "@/components/Label";
import { Loading } from "@/components/Loading";
import { TitleText } from "@/components/TitleText";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthAPI } from "@/hooks/api/useAuthAPI";
import { useHealthCenterId } from "@/hooks/useHealthCenterId";
import { useLoginId } from "@/hooks/useLoginId";
import { FormLoginData } from "@/types/forms";
import { formatCPF } from "@/utils/formatCPF";
import { Link, router } from "expo-router";
import { useRef, useState } from "react";
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, SafeAreaView, Text, TextInput, View } from 'react-native';


export default function Login() {

  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

 
 

  // const isLogged = false;
  const { loginId, setLoginId } = useLoginId();
  const { loginUser } = useAuthAPI();
  const { login } = useAuth(); 
  const { setHealthCenterId, healthCenterId } = useHealthCenterId();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormLoginData>()



  const onSubmit = async (data: FormLoginData) => {
    const formattedData = (data.cpf ?? '').replace(/\D/g, '');
    const userData = { cpf: formattedData, password: data.password };
    setIsLoading(true);
    const userInfo = await loginUser(userData);

    if (userInfo?.status === 400) {
      setIsLoading(false);
      setLoginError("CPF ou senha inválido");
      return;
    }

    setLoginId(userInfo)

    // try {
    //   if (userInfo?.token) {
    //     await login(userInfo.token);
    //   }
    //   console.log("token:", userInfo.token);
    // } catch (error) {
    //   setLoginError("Erro interno ao autenticar");
    //   return;
    // }

    if (userInfo?.token) {
      await login(userInfo.token);
    }

    console.log(userInfo.token)
    //console.log(userInfo?.user?.health_unit_ids[0])

    setHealthCenterId(userInfo?.user?.health_unit_ids?.[0])
    const role = userInfo?.user?.permission_roles?.[0];
    //console.log(role)

    reset();

    if (role === 'supervisor') {
      router.replace('/(app)/(supervisor)/supervisor');
      return;
    } else if (role === 'technician') {
      router.replace('/(app)/home');
      return;
    } else {
      setIsLoading(false);
      setLoginError("Usuário sem permissão de acesso");
      return;
    }
  };

  const passwordRef = useRef<TextInput>(null);

  if(isLoading){
    return (
      <View className="flex-1 p-safe justify-center items-center">
        <Loading />
      </View>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-white p-safe justify-center items-center">
      <KeyboardAvoidingView className="flex-1 justify-center w-full" behavior="padding">
        <View className="px-8 w-full gap-20">
        
          <Logo width={304} />

          <View className="gap-8">
            <TitleText title="Acesse sua conta"/>

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

            {loginError && <Text className="text-danger-700 text-sm font-semibold tracking-wide">{loginError}</Text>}
            
            <Button title="Entrar" onPress={handleSubmit(onSubmit)} />
            <Link allowFontScaling={false} push href="/(auth)/forgot-password" className="text-primary-600 font-semibold text-base">Esqueceu a senha?</Link>
          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
