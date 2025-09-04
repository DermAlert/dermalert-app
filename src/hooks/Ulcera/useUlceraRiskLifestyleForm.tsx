import { useContext } from 'react';

import { UlceraRiskLifestyleContext } from '@/contexts/Ulcera/UlceraRiskLifestyleContext';

export function useUlceraRiskLifestyleForm() {
  const context = useContext(UlceraRiskLifestyleContext);
  return context;
}
