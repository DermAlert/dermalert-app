import { useContext } from 'react';

import { PhototypeAssessmentContext } from '@/contexts/Oncodermato/PhototypeAssessmentContext';

export function usePhototypeAssessmentForm() {
  const context = useContext(PhototypeAssessmentContext);
  return context;
}
