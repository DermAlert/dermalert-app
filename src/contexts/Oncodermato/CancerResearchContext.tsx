import { CancerResearchProps } from '@/types/forms';
import { createContext, useState } from 'react';

type CancerResearchDataProps = {
  cancerResearchData: CancerResearchProps;
  setCancerResearchData: React.Dispatch<React.SetStateAction<CancerResearchProps>>;
  updateCancerResearchData: (value: CancerResearchProps) => void;
}

const CancerResearchContext = createContext<CancerResearchDataProps>({} as CancerResearchDataProps);

function CancerResearchProvider({ children }: { children: React.ReactNode; }) {
  const [cancerResearchData, setCancerResearchData] = useState<CancerResearchProps>({} as CancerResearchProps);

  const updateCancerResearchData = (data: CancerResearchProps) => {
    setCancerResearchData((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  return (
    <CancerResearchContext.Provider value={{ cancerResearchData, updateCancerResearchData, setCancerResearchData }}>
      {children}
    </CancerResearchContext.Provider>
  );
}

export { CancerResearchContext, CancerResearchProvider };

