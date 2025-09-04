import { LesaoUlceraProps } from '@/types/forms';
import { createContext, useState } from 'react';

type RegisterLesionUlceraDataProps = {
  registerLesionUlceraData: LesaoUlceraProps;
  setRegisterLesionUlceraData: React.Dispatch<React.SetStateAction<LesaoUlceraProps>>;
  updateRegisterLesionUlceraData: (value: LesaoUlceraProps) => void;

  imagesUlcera: string[];
  setImagesUlcera: React.Dispatch<React.SetStateAction<string[]>>;
  removeImageLesionUlcera: (uri: string) => void;
}

const RegisterLesionUlceraContext = createContext<RegisterLesionUlceraDataProps>({} as RegisterLesionUlceraDataProps);

function RegisterLesionUlceraProvider({ children }: { children: React.ReactNode; }) {
  const [registerLesionUlceraData, setRegisterLesionUlceraData] = useState<LesaoUlceraProps>({} as LesaoUlceraProps);
  const [imagesUlcera, setImagesUlcera] = useState<string[]>([]);

  const updateRegisterLesionUlceraData = (data: LesaoUlceraProps) => {
    setRegisterLesionUlceraData((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  function removeImageLesionUlcera(uri: string) {
    setImagesUlcera(prev => prev.filter(item => item !== uri));
    console.log('Imagem removida:', uri);
  }

  return (
    <RegisterLesionUlceraContext.Provider value={{ registerLesionUlceraData, updateRegisterLesionUlceraData, setRegisterLesionUlceraData, imagesUlcera, setImagesUlcera, removeImageLesionUlcera }}>
      {children}
    </RegisterLesionUlceraContext.Provider>
  );
}

export { RegisterLesionUlceraContext, RegisterLesionUlceraProvider };

