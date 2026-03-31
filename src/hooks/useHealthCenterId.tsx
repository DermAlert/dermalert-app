import { useContext } from 'react';

import { HealthCenterIdContext } from '@/contexts/HealthCenterIdContext';

export function useHealthCenterId() {
  const context = useContext(HealthCenterIdContext);
  return context;
}
