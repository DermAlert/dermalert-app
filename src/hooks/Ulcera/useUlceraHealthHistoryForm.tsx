import { useContext } from 'react';

import { UlceraHealthHistoryContext } from '@/contexts/Ulcera/UlceraHealthHistoryContext';

export function useUlceraHealthHistoryForm() {
  const context = useContext(UlceraHealthHistoryContext);
  return context;
}
