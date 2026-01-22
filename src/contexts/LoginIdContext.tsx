import { createContext, useState } from 'react';


type LoginIdContextProps = {
  loginId: string | null;
  setLoginId: React.Dispatch<React.SetStateAction<string | null>>;
  updateLoginId: (value: string | null) => void;
}

const LoginIdContext = createContext<LoginIdContextProps>({} as LoginIdContextProps);

function LoginIdProvider({ children }: { children: React.ReactNode; }) {
  const [loginId, setLoginId] = useState<string | null>(null);

  const updateLoginId = (data: string | null) => {
    setLoginId(data);
  };

  return (
    <LoginIdContext.Provider value={{ loginId, updateLoginId, setLoginId }}>
      {children}
    </LoginIdContext.Provider>
  );
}

export { LoginIdContext, LoginIdProvider };

