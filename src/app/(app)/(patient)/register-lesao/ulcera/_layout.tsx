// /app/(app)/_layout.tsx
import { RegisterLesionUlceraProvider } from '@/contexts/Ulcera/RegisterLesionUlceraContext';
import { Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

export default function AppLayout() {
  const isLoading = false;
  const user = false;

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  
  return (
    <RegisterLesionUlceraProvider>
      <Stack screenOptions={{ headerShown: false}} />
    </RegisterLesionUlceraProvider>
    
  );
}
