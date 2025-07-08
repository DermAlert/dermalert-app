import Feather from "@expo/vector-icons/Feather";
import { ReactNode, forwardRef, useEffect, useState } from "react";
import { Controller, UseControllerProps } from "react-hook-form";
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";

type InputProps = {
  icon?: ReactNode,
  password?: boolean,
  inputProps: TextInputProps;
  formProps: UseControllerProps;
  error?: string;
  onChangeTextFormat?: (value: string) => string;
};


const Input = forwardRef<TextInput, InputProps>(({ onChangeTextFormat, formProps, inputProps, error = '', icon, password }, ref) => {
  const [visiblePassword, setvisiblePassword] = useState(false);

  useEffect(() => {
    if(password){
      setvisiblePassword(true)
    }
  }, []);

  return (
    <Controller {...formProps}
        render={({ field: { onChange, value } }) => (
          <>
            <View className="border border-gray-300 rounded-md flex-row justify-between px-4 py-2 items-center">
              <TextInput 
                onChangeText={(text) => {
                  const formatted = onChangeTextFormat ? onChangeTextFormat(text) : text;
                  onChange(formatted);
                }}
                value={value}
                ref={ref}
                secureTextEntry={visiblePassword}
                placeholderTextColor="#bebebe"
                className="py-1 flex-1" 
                {...inputProps} 
              />
              {icon}
              {password && (
                <TouchableOpacity onPress={()=> setvisiblePassword(!visiblePassword)}>
                  {!visiblePassword ? (
                    <Feather name="eye" size={15} color="#1E1E1E" />
                  ) : (
                    <Feather name="eye-off" size={15} color="#1E1E1E" />
                  )}
                  
                </TouchableOpacity>
              )}
            </View>
            {
              error.length > 0 &&
              <Text className="text-red-500 mt-2 text-sm">
                {error}
              </Text>
            }
          </>
          
          
        )}
      />


    
  );
});

export default Input;
