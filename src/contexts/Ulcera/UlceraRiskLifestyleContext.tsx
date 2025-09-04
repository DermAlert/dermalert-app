import { UlceraRiskLifestyleProps } from '@/types/forms';
import { createContext, useState } from 'react';

type UlceraRiskLifestyleDataProps = {
  ulceraRiskLifestyleData: UlceraRiskLifestyleProps;
  setUlceraRiskLifestyleData: React.Dispatch<React.SetStateAction<UlceraRiskLifestyleProps>>;
  updateUlceraRiskLifestyleData: (value: UlceraRiskLifestyleProps) => void;
}

const UlceraRiskLifestyleContext = createContext<UlceraRiskLifestyleDataProps>({} as UlceraRiskLifestyleDataProps);

function UlceraRiskLifestyleProvider({ children }: { children: React.ReactNode; }) {
  const [ulceraRiskLifestyleData, setUlceraRiskLifestyleData] = useState<UlceraRiskLifestyleProps>({} as UlceraRiskLifestyleProps);

  const updateUlceraRiskLifestyleData = (data: UlceraRiskLifestyleProps) => {
    setUlceraRiskLifestyleData((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  return (
    <UlceraRiskLifestyleContext.Provider value={{ ulceraRiskLifestyleData, updateUlceraRiskLifestyleData, setUlceraRiskLifestyleData }}>
      {children}
    </UlceraRiskLifestyleContext.Provider>
  );
}

export { UlceraRiskLifestyleContext, UlceraRiskLifestyleProvider };

