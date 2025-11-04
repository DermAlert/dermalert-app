//import Feather from "@expo/vector-icons/Feather";
import { EyeClosedIcon, EyeIcon } from 'phosphor-react-native';
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
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if(password){
      setvisiblePassword(true)
    }
  }, []);

  return (
    <Controller {...formProps}
        render={({ field: { onChange, value } }) => (
          <>
            <View className={`bg-white border rounded-lg flex-row justify-between items-center overflow-hidden ${error.length > 0 ? 'border-danger-400' : focused ? 'border-primary-600' : 'border-neutral-300'}`}>
              <TextInput 
                onChangeText={(text) => {
                  const formatted = onChangeTextFormat ? onChangeTextFormat(text) : text;
                  onChange(formatted);
                }}
                value={value}
                ref={ref}
                secureTextEntry={visiblePassword}
                allowFontScaling={false}
                placeholderTextColor="#A9ADC0"
                className="py-3 px-4 flex-1 text-base text-neutral-900 bg-white" 
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                {...inputProps} 
              />
              {icon && (
                <View className="mr-4">
                  {icon}
                </View>
              )}
              {password && (
                <TouchableOpacity className="h-10 w-10 mr-1 items-center justify-center" onPress={()=> setvisiblePassword(!visiblePassword)}>
                  {!visiblePassword ? (
                    <EyeIcon size={20} color="#7D83A0" />
                  ) : (
                    <EyeClosedIcon size={20} color="#7D83A0" />
                  )}
                  
                </TouchableOpacity>
              )}
            </View>
            {
              error.length > 0 &&
              <Text allowFontScaling={false} className="text-danger-700 mt-2 text-xs font-semibold tracking-wide">
                {error}
              </Text>
            }
          </>
          
          
        )}
      />


    
  );
});

export default Input;
