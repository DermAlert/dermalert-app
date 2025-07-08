import { PatientProps } from '@/types/forms';
import { createContext, useState } from 'react';

type PatientContextDataProps = {
  patientData: PatientProps;
  setPatientData: React.Dispatch<React.SetStateAction<PatientProps>>;
  updatePatientData: (value: PatientProps) => void;
}

const PatientContext = createContext<PatientContextDataProps>({} as PatientContextDataProps);

function PatientProvider({ children }: { children: React.ReactNode; }) {
  const [patientData, setPatientData] = useState<PatientProps>({} as PatientProps);

  const updatePatientData = (data: PatientProps) => {
    setPatientData((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  return (
    <PatientContext.Provider value={{ patientData, updatePatientData, setPatientData }}>
      {children}
    </PatientContext.Provider>
  );
}

export { PatientContext, PatientProvider };

