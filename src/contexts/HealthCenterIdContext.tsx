import { createContext, useState } from 'react';


type HealthCenterIdContextProps = {
  healthCenterId: number | null;
  setHealthCenterId: React.Dispatch<React.SetStateAction<number | null>>;
  updateHealthCenterId: (value: number | null) => void;
}

const HealthCenterIdContext = createContext<HealthCenterIdContextProps>({} as HealthCenterIdContextProps);

function HealthCenterIdProvider({ children }: { children: React.ReactNode; }) {
  const [healthCenterId, setHealthCenterId] = useState<number | null>(null);

  const updateHealthCenterId = (data: number | null) => {
    setHealthCenterId(data);
  };

  return (
    <HealthCenterIdContext.Provider value={{ healthCenterId, updateHealthCenterId, setHealthCenterId }}>
      {children}
    </HealthCenterIdContext.Provider>
  );
}

export { HealthCenterIdContext, HealthCenterIdProvider };

