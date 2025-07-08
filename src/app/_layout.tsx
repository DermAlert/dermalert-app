import { Roboto_400Regular, useFonts } from '@expo-google-fonts/roboto';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import "../styles/global.css";

SplashScreen.preventAutoHideAsync()


export default function Layout() {
  const [loaded, error] = useFonts({
    Roboto_400Regular
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
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
      </Stack>
    </GestureHandlerRootView>
    
  );
}
