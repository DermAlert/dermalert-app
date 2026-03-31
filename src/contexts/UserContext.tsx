import { UserDataProps } from '@/types/forms';
import React, { createContext, useState } from 'react';

type UserContextDataProps = {
  UserData: UserDataProps;
  setUserData: React.Dispatch<React.SetStateAction<UserDataProps>>;
  updateUserData: (value: UserDataProps) => void;
}

const UserContext = createContext<UserContextDataProps>({} as UserContextDataProps);

function UserProvider({ children }: { children: React.ReactNode; }) {
  const [UserData, setUserData] = useState<UserDataProps>({} as UserDataProps);

  const updateUserData = (newData: UserDataProps) => {
    setUserData((prev) =>
      ({
        ...prev,
        ...newData,
        address: {
          ...prev.address,
          ...newData.address,
        },
      } as UserDataProps)
    );
  };

  return (
    <UserContext.Provider value={{
      UserData,
      updateUserData,
      setUserData
    }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };

