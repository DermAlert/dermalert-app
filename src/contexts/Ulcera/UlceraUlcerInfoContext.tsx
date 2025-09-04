import { UlceraUlcerInfoProps } from '@/types/forms';
import { createContext, useState } from 'react';

type UlceraUlcerInfoDataProps = {
  ulceraUlcerInfoData: UlceraUlcerInfoProps;
  setUlceraUlcerInfoData: React.Dispatch<React.SetStateAction<UlceraUlcerInfoProps>>;
  updateUlceraUlcerInfoData: (value: UlceraUlcerInfoProps) => void;
}

const UlceraUlcerInfoContext = createContext<UlceraUlcerInfoDataProps>({} as UlceraUlcerInfoDataProps);

function UlceraUlcerInfoProvider({ children }: { children: React.ReactNode; }) {
  const [ulceraUlcerInfoData, setUlceraUlcerInfoData] = useState<UlceraUlcerInfoProps>({} as UlceraUlcerInfoProps);

  const updateUlceraUlcerInfoData = (data: UlceraUlcerInfoProps) => {
    setUlceraUlcerInfoData((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  return (
    <UlceraUlcerInfoContext.Provider value={{ ulceraUlcerInfoData, updateUlceraUlcerInfoData, setUlceraUlcerInfoData }}>
      {children}
    </UlceraUlcerInfoContext.Provider>
  );
}

export { UlceraUlcerInfoContext, UlceraUlcerInfoProvider };

