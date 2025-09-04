import { useContext } from 'react';

import { LesionIdContext } from '@/contexts/LesionIdContext';

export function useLesionId() {
  const context = useContext(LesionIdContext);
  return context;
}
