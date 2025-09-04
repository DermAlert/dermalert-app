import { useContext } from 'react';

import { PatientIdContext } from '@/contexts/PatientIdContext';

export function usePatientId() {
  const context = useContext(PatientIdContext);
  return context;
}
