import { GeneralHealthProps } from '@/types/forms';
import { createContext, useState } from 'react';

type GeneralHealthContextDataProps = {
  generalHealthData: GeneralHealthProps;
  setGeneralHealthData: React.Dispatch<React.SetStateAction<GeneralHealthProps>>;
  updateGeneralHealthData: (value: GeneralHealthProps) => void;
}

const GeneralHealthContext = createContext<GeneralHealthContextDataProps>({} as GeneralHealthContextDataProps);

function GeneralHealthProvider({ children }: { children: React.ReactNode; }) {
  const [generalHealthData, setGeneralHealthData] = useState<GeneralHealthProps>({} as GeneralHealthProps);

  const updateGeneralHealthData = (data: GeneralHealthProps) => {
    setGeneralHealthData((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  return (
    <GeneralHealthContext.Provider value={{ generalHealthData, updateGeneralHealthData, setGeneralHealthData }}>
      {children}
    </GeneralHealthContext.Provider>
  );
}

export { GeneralHealthContext, GeneralHealthProvider };

