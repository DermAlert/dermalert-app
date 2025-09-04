import { createContext, useState } from 'react';


type LesionIdContextProps = {
  lesionId: string | null;
  setLesionId: React.Dispatch<React.SetStateAction<string | null>>;
  updateLesionId: (value: string | null) => void;
}

const LesionIdContext = createContext<LesionIdContextProps>({} as LesionIdContextProps);

function LesionIdProvider({ children }: { children: React.ReactNode; }) {
  const [lesionId, setLesionId] = useState<string | null>(null);

  const updateLesionId = (data: string | null) => {
    setLesionId(data);
  };

  return (
    <LesionIdContext.Provider value={{ lesionId, updateLesionId, setLesionId }}>
      {children}
    </LesionIdContext.Provider>
  );
}

export { LesionIdContext, LesionIdProvider };

