import { useContext } from 'react';

import { UlceraFamilyHistoryContext } from '@/contexts/Ulcera/UlceraFamilyHistoryContext';

export function useUlceraFamilyHistoryForm() {
  const context = useContext(UlceraFamilyHistoryContext);
  return context;
}
