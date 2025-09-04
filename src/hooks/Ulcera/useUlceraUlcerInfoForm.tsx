import { useContext } from 'react';

import { UlceraUlcerInfoContext } from '@/contexts/Ulcera/UlceraUlcerInfoContext';

export function useUlceraUlcerInfoForm() {
  const context = useContext(UlceraUlcerInfoContext);
  return context;
}
