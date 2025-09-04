import { createContext, useState } from 'react';


type LesionTypeContextProps = {
  lesionType: string | null;
  setLesionType: React.Dispatch<React.SetStateAction<string | null>>;
  updateLesionType: (value: string | null) => void;
}

const LesionTypeContext = createContext<LesionTypeContextProps>({} as LesionTypeContextProps);

function LesionTypeProvider({ children }: { children: React.ReactNode; }) {
  const [lesionType, setLesionType] = useState<string | null>(null);

  const updateLesionType = (data: string | null) => {
    setLesionType(data);
  };

  return (
    <LesionTypeContext.Provider value={{ lesionType, updateLesionType, setLesionType }}>
      {children}
    </LesionTypeContext.Provider>
  );
}

export { LesionTypeContext, LesionTypeProvider };

