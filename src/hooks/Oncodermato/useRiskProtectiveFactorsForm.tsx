import { useContext } from 'react';

import { RiskProtectiveFactorsContext } from '@/contexts/Oncodermato/RiskProtectiveFactorsContext';

export function useRiskProtectiveFactorsForm() {
  const context = useContext(RiskProtectiveFactorsContext);
  return context;
}
