// /app/(app)/_layout.tsx
import { CancerResearchProvider } from '@/contexts/Oncodermato/CancerResearchContext';
import { FamilyHistoryProvider } from '@/contexts/Oncodermato/FamilyHistoryContext';
import { PhototypeAssessmentProvider } from '@/contexts/Oncodermato/PhototypeAssessmentContext';
import { RiskProtectiveFactorsProvider } from '@/contexts/Oncodermato/RiskProtectiveFactorsContext';
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
    <FamilyHistoryProvider>
      <PhototypeAssessmentProvider>
        <RiskProtectiveFactorsProvider>
          <CancerResearchProvider>
            <Stack screenOptions={{ headerShown: false}} />
          </CancerResearchProvider>
        </RiskProtectiveFactorsProvider>
      </PhototypeAssessmentProvider>
    </FamilyHistoryProvider>
  );
}
