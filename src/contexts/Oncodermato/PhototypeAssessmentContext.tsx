import { PhototypeAssessmentProps } from '@/types/forms';
import { createContext, useState } from 'react';

type PhototypeAssessmentDataProps = {
  phototypeAssessmentData: PhototypeAssessmentProps;
  setPhototypeAssessmentData: React.Dispatch<React.SetStateAction<PhototypeAssessmentProps>>;
  updatePhototypeAssessmentData: (value: PhototypeAssessmentProps) => void;
}

const PhototypeAssessmentContext = createContext<PhototypeAssessmentDataProps>({} as PhototypeAssessmentDataProps);

function PhototypeAssessmentProvider({ children }: { children: React.ReactNode; }) {
  const [phototypeAssessmentData, setPhototypeAssessmentData] = useState<PhototypeAssessmentProps>({} as PhototypeAssessmentProps);

  const updatePhototypeAssessmentData = (data: PhototypeAssessmentProps) => {
    setPhototypeAssessmentData((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  return (
    <PhototypeAssessmentContext.Provider value={{ phototypeAssessmentData, updatePhototypeAssessmentData, setPhototypeAssessmentData }}>
      {children}
    </PhototypeAssessmentContext.Provider>
  );
}

export { PhototypeAssessmentContext, PhototypeAssessmentProvider };

