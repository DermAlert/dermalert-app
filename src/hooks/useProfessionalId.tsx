import { useContext } from 'react';

import { ProfessionalIdContext } from '@/contexts/ProfessionalIdContext';

export function useProfessionalId() {
  const context = useContext(ProfessionalIdContext);
  return context;
}
