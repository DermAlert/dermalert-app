import { UserInfoProps } from '@/types/forms';
import { createContext, useState } from 'react';


type LoginIdContextProps = {
  loginId: UserInfoProps | null;
  setLoginId: React.Dispatch<React.SetStateAction<UserInfoProps | null>>;
  updateLoginId: (value: UserInfoProps | null) => void;
}

const LoginIdContext = createContext<LoginIdContextProps>({} as LoginIdContextProps);

function LoginIdProvider({ children }: { children: React.ReactNode; }) {
  const [loginId, setLoginId] = useState<UserInfoProps | null>(null);

  const updateLoginId = (data: UserInfoProps | null) => {
    setLoginId(data);
  };

  return (
    <LoginIdContext.Provider value={{ loginId, updateLoginId, setLoginId }}>
      {children}
    </LoginIdContext.Provider>
  );
}

export { LoginIdContext, LoginIdProvider };

