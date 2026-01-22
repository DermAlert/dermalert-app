//import { Roboto_400Regular, useFonts } from '@expo-google-fonts/roboto';
import { LoginIdProvider } from '@/contexts/LoginIdContext';
import { Inter_500Medium, useFonts } from '@expo-google-fonts/inter';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import "../styles/global.css";

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

SplashScreen.preventAutoHideAsync();

// import { Text as RNText, TextProps } from "react-native";

// declare global {
//   var CustomText: React.FC<TextProps>;
// }

// // Cria wrappers globais
// global.CustomText = (props) => (
//   <RNText allowFontScaling={false} textBreakStrategy="simple" {...props} />
// );




export default function Layout() {
  const [loaded, error] = useFonts({
    Inter_500Medium
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" translucent />
      <LoginIdProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
        </Stack>
      </LoginIdProvider>
    </GestureHandlerRootView>
    
  );
}
