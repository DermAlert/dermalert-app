import { useContext } from 'react';

import { GeneralHealthContext } from '@/contexts/GeneralHealthContext';

export function useGeneralHealthForm() {
  const context = useContext(GeneralHealthContext);
  return context;
}
