import { useContext } from 'react';

import { RegisterLesionUlceraContext } from '@/contexts/Ulcera/RegisterLesionUlceraContext';

export function useRegisterLesionUlceraForm() {
  const context = useContext(RegisterLesionUlceraContext);
  return context;
}
