import { useContext } from 'react';

import { FamilyHistoryContext } from '@/contexts/Oncodermato/FamilyHistoryContext';

export function useFamilyHistoryForm() {
  const context = useContext(FamilyHistoryContext);
  return context;
}
