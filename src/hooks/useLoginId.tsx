import { useContext } from 'react';

import { LoginIdContext } from '@/contexts/LoginIdContext';

export function useLoginId() {
  const context = useContext(LoginIdContext);
  return context;
}
