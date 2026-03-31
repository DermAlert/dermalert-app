// /app/(app)/_layout.tsx
import { GeneralHealthProvider } from '@/contexts/GeneralHealthContext';
import { LesionIdProvider } from '@/contexts/LesionIdContext';
import { LesionTypeProvider } from '@/contexts/LesionTypeContext';
import { RegisterLesionProvider } from '@/contexts/Oncodermato/RegisterLesionContext';
import { PatientProvider } from '@/contexts/PatientContext';
import { PatientIdProvider } from '@/contexts/PatientIdContext';
import { ProfessionalIdProvider } from '@/contexts/ProfessionalIdContext';
import { RegisterLesionUlceraProvider } from '@/contexts/Ulcera/RegisterLesionUlceraContext';
import { UserProvider } from '@/contexts/UserContext';
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
      <UserProvider>
        
          <RegisterLesionUlceraProvider>
            <RegisterLesionProvider>
                <GeneralHealthProvider>
                  <PatientIdProvider>
                    <ProfessionalIdProvider>
                      <LesionTypeProvider>
                        <LesionIdProvider>
                          <Stack screenOptions={{ headerShown: false}} />
                        </LesionIdProvider>
                      </LesionTypeProvider>
                    </ProfessionalIdProvider>
                  </PatientIdProvider>
                </GeneralHealthProvider>
            </RegisterLesionProvider>
          </RegisterLesionUlceraProvider>
      </UserProvider>
    </PatientProvider>
  );
}
