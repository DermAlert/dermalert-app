import { useContext } from 'react';

import { CancerResearchContext } from '@/contexts/Oncodermato/CancerResearchContext';

export function useCancerResearchForm() {
  const context = useContext(CancerResearchContext);
  return context;
}
