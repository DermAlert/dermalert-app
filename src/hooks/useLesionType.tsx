import { useContext } from 'react';

import { LesionTypeContext } from '@/contexts/LesionTypeContext';

export function useLesionType() {
  const context = useContext(LesionTypeContext);
  return context;
}
