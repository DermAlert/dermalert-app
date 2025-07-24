// /app/(app)/_layout.tsx
import { GeneralHealthProvider } from '@/contexts/GeneralHealthContext';
import { RegisterLesionProvider } from '@/contexts/Oncodermato/RegisterLesionContext';
import { PatientProvider } from '@/contexts/PatientContext';
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
    <PatientProvider>
      <RegisterLesionProvider>
        <GeneralHealthProvider>
          <Stack screenOptions={{ headerShown: false}} />
        </GeneralHealthProvider>
      </RegisterLesionProvider>
    </PatientProvider>
  );
}
