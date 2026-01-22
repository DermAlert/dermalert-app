import { ProfissionalProps } from '@/types/forms';
import React, { createContext, useState } from 'react';

type ProfissionalContextDataProps = {
  profissionalData: ProfissionalProps;
  setProfissionalData: React.Dispatch<React.SetStateAction<ProfissionalProps>>;
  updateProfissionalData: (value: ProfissionalProps) => void;

  // profissionalData: Partial<ProfissionalProps>;
  // updateProfissionalData: (data: Partial<ProfissionalProps>) => void;
  // setProfissionalData: (data: Partial<ProfissionalProps>) => void;
}

const ProfissionalContext = createContext<ProfissionalContextDataProps>({} as ProfissionalContextDataProps);

function ProfissionalProvider({ children }: { children: React.ReactNode; }) {
  const [profissionalData, setProfissionalData] = useState<ProfissionalProps>({} as ProfissionalProps);

  const updateProfissionalData = (newData: ProfissionalProps) => {
    setProfissionalData((prev) =>
      ({
        user: {
          ...prev.user,
          ...newData.user,
        },
      } as ProfissionalProps)
    );
  };


  return (
    <ProfissionalContext.Provider value={{
      profissionalData,
      updateProfissionalData,
      setProfissionalData
    }}>
      {children}
    </ProfissionalContext.Provider>
  );
}

export { ProfissionalContext, ProfissionalProvider };

