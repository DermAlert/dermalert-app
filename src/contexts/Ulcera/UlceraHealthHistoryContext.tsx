import { UlceraHealthHistoryProps } from '@/types/forms';
import { createContext, useState } from 'react';

type UlceraHealthHistoryDataProps = {
  ulceraHealthHistoryData: UlceraHealthHistoryProps;
  setUlceraHealthHistoryData: React.Dispatch<React.SetStateAction<UlceraHealthHistoryProps>>;
  updateUlceraHealthHistoryData: (value: UlceraHealthHistoryProps) => void;
}

const UlceraHealthHistoryContext = createContext<UlceraHealthHistoryDataProps>({} as UlceraHealthHistoryDataProps);

function UlceraHealthHistoryProvider({ children }: { children: React.ReactNode; }) {
  const [ulceraHealthHistoryData, setUlceraHealthHistoryData] = useState<UlceraHealthHistoryProps>({} as UlceraHealthHistoryProps);

  const updateUlceraHealthHistoryData = (data: UlceraHealthHistoryProps) => {
    setUlceraHealthHistoryData((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  return (
    <UlceraHealthHistoryContext.Provider value={{ ulceraHealthHistoryData, updateUlceraHealthHistoryData, setUlceraHealthHistoryData }}>
      {children}
    </UlceraHealthHistoryContext.Provider>
  );
}

export { UlceraHealthHistoryContext, UlceraHealthHistoryProvider };

