import { useContext } from 'react';

import { PatientContext } from '@/contexts/PatientContext';

export function usePatientForm() {
  const context = useContext(PatientContext);
  return context;
}
