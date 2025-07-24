import { PatientProps } from '@/types/forms';
import React, { createContext, useState } from 'react';

type PatientContextDataProps = {
  patientData: PatientProps;
  setPatientData: React.Dispatch<React.SetStateAction<PatientProps>>;
  updatePatientData: (value: PatientProps) => void;

  // patientData: Partial<PatientProps>;
  // updatePatientData: (data: Partial<PatientProps>) => void;
  // setPatientData: (data: Partial<PatientProps>) => void;
  
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  removeImage: (uri: string) => void;
}

const PatientContext = createContext<PatientContextDataProps>({} as PatientContextDataProps);

function PatientProvider({ children }: { children: React.ReactNode; }) {
  const [patientData, setPatientData] = useState<PatientProps>({} as PatientProps);
  const [images, setImages] = useState<string[]>([]);

  const updatePatientData = (data: PatientProps) => {
    setPatientData((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  function removeImage(uri: string) {
    setImages(prev => prev.filter(item => item !== uri));
  }

  return (
    <PatientContext.Provider value={{
      patientData,
      updatePatientData,
      setPatientData,
      images,
      setImages,
      removeImage
    }}>
      {children}
    </PatientContext.Provider>
  );
}

export { PatientContext, PatientProvider };

