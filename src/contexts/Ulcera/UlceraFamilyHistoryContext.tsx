import { UlceraFamilyHistoryProps } from '@/types/forms';
import { createContext, useState } from 'react';

type UlceraFamilyHistoryDataProps = {
  ulceraFamilyHistoryData: UlceraFamilyHistoryProps;
  setUlceraFamilyHistoryData: React.Dispatch<React.SetStateAction<UlceraFamilyHistoryProps>>;
  updateUlceraFamilyHistoryData: (value: UlceraFamilyHistoryProps) => void;
}

const UlceraFamilyHistoryContext = createContext<UlceraFamilyHistoryDataProps>({} as UlceraFamilyHistoryDataProps);

function UlceraFamilyHistoryProvider({ children }: { children: React.ReactNode; }) {
  const [ulceraFamilyHistoryData, setUlceraFamilyHistoryData] = useState<UlceraFamilyHistoryProps>({} as UlceraFamilyHistoryProps);

  const updateUlceraFamilyHistoryData = (data: UlceraFamilyHistoryProps) => {
    setUlceraFamilyHistoryData((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  return (
    <UlceraFamilyHistoryContext.Provider value={{ ulceraFamilyHistoryData, updateUlceraFamilyHistoryData, setUlceraFamilyHistoryData }}>
      {children}
    </UlceraFamilyHistoryContext.Provider>
  );
}

export { UlceraFamilyHistoryContext, UlceraFamilyHistoryProvider };

