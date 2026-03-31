import { createContext, useState } from 'react';


type ProfessionalIdContextProps = {
  professionalId: string | null;
  setProfessionalId: React.Dispatch<React.SetStateAction<string | null>>;
  updateProfessionalId: (value: string | null) => void;
}

const ProfessionalIdContext = createContext<ProfessionalIdContextProps>({} as ProfessionalIdContextProps);

function ProfessionalIdProvider({ children }: { children: React.ReactNode; }) {
  const [professionalId, setProfessionalId] = useState<string | null>(null);

  const updateProfessionalId = (data: string | null) => {
    setProfessionalId(data);
  };

  return (
    <ProfessionalIdContext.Provider value={{ professionalId, updateProfessionalId, setProfessionalId }}>
      {children}
    </ProfessionalIdContext.Provider>
  );
}

export { ProfessionalIdContext, ProfessionalIdProvider };

