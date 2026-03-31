import { ProfissionalPropsForm } from '@/types/forms';
import React, { createContext, useState } from 'react';

type ProfissionalContextDataProps = {
  profissionalData: ProfissionalPropsForm;
  setProfissionalData: React.Dispatch<React.SetStateAction<ProfissionalPropsForm>>;
  updateProfissionalData: (value: ProfissionalPropsForm) => void;

  // profissionalData: Partial<ProfissionalPropsForm>;
  // updateProfissionalData: (data: Partial<ProfissionalPropsForm>) => void;
  // setProfissionalData: (data: Partial<ProfissionalPropsForm>) => void;
}

const ProfissionalContext = createContext<ProfissionalContextDataProps>({} as ProfissionalContextDataProps);

function ProfissionalProvider({ children }: { children: React.ReactNode; }) {
  const [profissionalData, setProfissionalData] = useState<ProfissionalPropsForm>({} as ProfissionalPropsForm);

  const updateProfissionalData = (newData: ProfissionalPropsForm) => {
    setProfissionalData((prev) =>
      ({
        ...prev,
        ...newData,
      } as ProfissionalPropsForm)
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

