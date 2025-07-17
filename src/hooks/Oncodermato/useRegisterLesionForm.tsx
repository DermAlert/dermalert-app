import { useContext } from 'react';

import { RegisterLesionContext } from '@/contexts/Oncodermato/RegisterLesionContext';

export function useRegisterLesionForm() {
  const context = useContext(RegisterLesionContext);
  return context;
}
