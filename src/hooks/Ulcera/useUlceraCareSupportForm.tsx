import { useContext } from 'react';

import { UlceraCareSupportContext } from '@/contexts/Ulcera/UlceraCareSupportContext';

export function useUlceraCareSupportForm() {
  const context = useContext(UlceraCareSupportContext);
  return context;
}
