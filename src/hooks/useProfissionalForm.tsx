import { useContext } from 'react';

import { ProfissionalContext } from '@/contexts/ProfissionalContext';

export function useProfissionalForm() {
  const context = useContext(ProfissionalContext);
  return context;
}
