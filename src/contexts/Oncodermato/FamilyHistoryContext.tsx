import { PersonalFamilyHistoryProps } from '@/types/forms';
import { createContext, useState } from 'react';

type FamilyHistoryDataProps = {
  familyHistoryData: PersonalFamilyHistoryProps;
  setFamilyHistoryData: React.Dispatch<React.SetStateAction<PersonalFamilyHistoryProps>>;
  updateFamilyHistoryData: (value: PersonalFamilyHistoryProps) => void;
}

const FamilyHistoryContext = createContext<FamilyHistoryDataProps>({} as FamilyHistoryDataProps);

function FamilyHistoryProvider({ children }: { children: React.ReactNode; }) {
  const [familyHistoryData, setFamilyHistoryData] = useState<PersonalFamilyHistoryProps>({} as PersonalFamilyHistoryProps);

  const updateFamilyHistoryData = (data: PersonalFamilyHistoryProps) => {
    setFamilyHistoryData((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  return (
    <FamilyHistoryContext.Provider value={{ familyHistoryData, updateFamilyHistoryData, setFamilyHistoryData }}>
      {children}
    </FamilyHistoryContext.Provider>
  );
}

export { FamilyHistoryContext, FamilyHistoryProvider };

