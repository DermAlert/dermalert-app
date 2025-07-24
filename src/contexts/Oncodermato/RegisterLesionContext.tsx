import { LesaoOncodermatoProps } from '@/types/forms';
import { createContext, useState } from 'react';

type RegisterLesionDataProps = {
  registerLesionData: LesaoOncodermatoProps;
  setRegisterLesionData: React.Dispatch<React.SetStateAction<LesaoOncodermatoProps>>;
  updateRegisterLesionData: (value: LesaoOncodermatoProps) => void;

  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  removeImageLesion: (uri: string) => void;
}

const RegisterLesionContext = createContext<RegisterLesionDataProps>({} as RegisterLesionDataProps);

function RegisterLesionProvider({ children }: { children: React.ReactNode; }) {
  const [registerLesionData, setRegisterLesionData] = useState<LesaoOncodermatoProps>({} as LesaoOncodermatoProps);
  const [images, setImages] = useState<string[]>([]);

  const updateRegisterLesionData = (data: LesaoOncodermatoProps) => {
    setRegisterLesionData((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  function removeImageLesion(uri: string) {
    setImages(prev => prev.filter(item => item !== uri));
  }

  return (
    <RegisterLesionContext.Provider value={{ registerLesionData, updateRegisterLesionData, setRegisterLesionData, images, setImages, removeImageLesion }}>
      {children}
    </RegisterLesionContext.Provider>
  );
}

export { RegisterLesionContext, RegisterLesionProvider };

