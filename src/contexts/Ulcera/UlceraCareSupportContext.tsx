import { UlceraCareSupportProps } from '@/types/forms';
import { createContext, useState } from 'react';

type UlceraCareSupportDataProps = {
  ulceraCareSupportData: UlceraCareSupportProps;
  setUlceraCareSupportData: React.Dispatch<React.SetStateAction<UlceraCareSupportProps>>;
  updateUlceraCareSupportData: (value: UlceraCareSupportProps) => void;
}

const UlceraCareSupportContext = createContext<UlceraCareSupportDataProps>({} as UlceraCareSupportDataProps);

function UlceraCareSupportProvider({ children }: { children: React.ReactNode; }) {
  const [ulceraCareSupportData, setUlceraCareSupportData] = useState<UlceraCareSupportProps>({} as UlceraCareSupportProps);

  const updateUlceraCareSupportData = (data: UlceraCareSupportProps) => {
    setUlceraCareSupportData((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  return (
    <UlceraCareSupportContext.Provider value={{ ulceraCareSupportData, updateUlceraCareSupportData, setUlceraCareSupportData }}>
      {children}
    </UlceraCareSupportContext.Provider>
  );
}

export { UlceraCareSupportContext, UlceraCareSupportProvider };

