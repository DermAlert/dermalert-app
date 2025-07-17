import { LesaoOncodermatoProps } from '@/types/forms';
import { createContext, useState } from 'react';

type RegisterLesionDataProps = {
  registerLesionData: LesaoOncodermatoProps;
  setRegisterLesionData: React.Dispatch<React.SetStateAction<LesaoOncodermatoProps>>;
  updateRegisterLesionData: (value: LesaoOncodermatoProps) => void;
}

const RegisterLesionContext = createContext<RegisterLesionDataProps>({} as RegisterLesionDataProps);

function RegisterLesionProvider({ children }: { children: React.ReactNode; }) {
  const [registerLesionData, setRegisterLesionData] = useState<LesaoOncodermatoProps>({} as LesaoOncodermatoProps);

  const updateRegisterLesionData = (data: LesaoOncodermatoProps) => {
    setRegisterLesionData((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  return (
    <RegisterLesionContext.Provider value={{ registerLesionData, updateRegisterLesionData, setRegisterLesionData }}>
      {children}
    </RegisterLesionContext.Provider>
  );
}

export { RegisterLesionContext, RegisterLesionProvider };

