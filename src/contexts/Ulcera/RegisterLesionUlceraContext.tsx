import { LesaoUlceraProps } from '@/types/forms';
import { createContext, useState } from 'react';

type RegisterLesionUlceraDataProps = {
  registerLesionUlceraData: LesaoUlceraProps;
  setRegisterLesionUlceraData: React.Dispatch<React.SetStateAction<LesaoUlceraProps>>;
  updateRegisterLesionUlceraData: (value: LesaoUlceraProps) => void;
}

const RegisterLesionUlceraContext = createContext<RegisterLesionUlceraDataProps>({} as RegisterLesionUlceraDataProps);

function RegisterLesionUlceraProvider({ children }: { children: React.ReactNode; }) {
  const [registerLesionUlceraData, setRegisterLesionUlceraData] = useState<LesaoUlceraProps>({} as LesaoUlceraProps);

  const updateRegisterLesionUlceraData = (data: LesaoUlceraProps) => {
    setRegisterLesionUlceraData((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  return (
    <RegisterLesionUlceraContext.Provider value={{ registerLesionUlceraData, updateRegisterLesionUlceraData, setRegisterLesionUlceraData }}>
      {children}
    </RegisterLesionUlceraContext.Provider>
  );
}

export { RegisterLesionUlceraContext, RegisterLesionUlceraProvider };

