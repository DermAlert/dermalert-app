// /app/(app)/_layout.tsx
import { UlceraCareSupportProvider } from '@/contexts/Ulcera/UlceraCareSupportContext';
import { UlceraFamilyHistoryProvider } from '@/contexts/Ulcera/UlceraFamilyHistoryContext';
import { UlceraHealthHistoryProvider } from '@/contexts/Ulcera/UlceraHealthHistoryContext';
import { UlceraRiskLifestyleProvider } from '@/contexts/Ulcera/UlceraRiskLifestyleContext';
import { UlceraUlcerInfoProvider } from '@/contexts/Ulcera/UlceraUlcerInfoContext';
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
    <UlceraHealthHistoryProvider>
      <UlceraRiskLifestyleProvider>
        <UlceraFamilyHistoryProvider>
          <UlceraUlcerInfoProvider>
            <UlceraCareSupportProvider>
          <Stack screenOptions={{ headerShown: false}} />
            </UlceraCareSupportProvider>
          </UlceraUlcerInfoProvider>
        </UlceraFamilyHistoryProvider>
      </UlceraRiskLifestyleProvider>
    </UlceraHealthHistoryProvider>
  );
}
