import { useContext } from 'react';

import { UserContext } from '@/contexts/UserContext';

export function useUserForm() {
  const context = useContext(UserContext);
  return context;
}
