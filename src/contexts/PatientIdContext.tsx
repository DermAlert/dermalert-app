import { createContext, useState } from 'react';


type PatientIdContextProps = {
  patientId: string | null;
  setPatientId: React.Dispatch<React.SetStateAction<string | null>>;
  updatePatientId: (value: string | null) => void;
}

const PatientIdContext = createContext<PatientIdContextProps>({} as PatientIdContextProps);

function PatientIdProvider({ children }: { children: React.ReactNode; }) {
  const [patientId, setPatientId] = useState<string | null>(null);

  const updatePatientId = (data: string | null) => {
    setPatientId(data);
  };

  return (
    <PatientIdContext.Provider value={{ patientId, updatePatientId, setPatientId }}>
      {children}
    </PatientIdContext.Provider>
  );
}

export { PatientIdContext, PatientIdProvider };

