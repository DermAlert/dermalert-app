import { RiskProtectiveFactorsProps } from '@/types/forms';
import { createContext, useState } from 'react';

type RiskProtectiveFactorsDataProps = {
  riskProtectiveFactorsData: RiskProtectiveFactorsProps;
  setRiskProtectiveFactorsData: React.Dispatch<React.SetStateAction<RiskProtectiveFactorsProps>>;
  updateRiskProtectiveFactorsData: (value: RiskProtectiveFactorsProps) => void;
}

const RiskProtectiveFactorsContext = createContext<RiskProtectiveFactorsDataProps>({} as RiskProtectiveFactorsDataProps);

function RiskProtectiveFactorsProvider({ children }: { children: React.ReactNode; }) {
  const [riskProtectiveFactorsData, setRiskProtectiveFactorsData] = useState<RiskProtectiveFactorsProps>({} as RiskProtectiveFactorsProps);

  const updateRiskProtectiveFactorsData = (data: RiskProtectiveFactorsProps) => {
    setRiskProtectiveFactorsData((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  return (
    <RiskProtectiveFactorsContext.Provider value={{ riskProtectiveFactorsData, updateRiskProtectiveFactorsData, setRiskProtectiveFactorsData }}>
      {children}
    </RiskProtectiveFactorsContext.Provider>
  );
}

export { RiskProtectiveFactorsContext, RiskProtectiveFactorsProvider };

