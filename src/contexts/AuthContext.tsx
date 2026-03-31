import { api } from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  token: string | null;
  authenticated: boolean;
  loadingAuth: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    async function loadToken() {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        const parsedToken = JSON.parse(token);

        api.defaults.headers.Authorization = `Token ${parsedToken}`;

        setToken(parsedToken);
        setAuthenticated(true);
      }

      setLoadingAuth(false);
    }

    loadToken();
  }, []);

  const login = async (token: string) => {
    await AsyncStorage.setItem("token", JSON.stringify(token));

    api.defaults.headers.Authorization = `Token ${token}`;

    setToken(token);
    setAuthenticated(true);
  };

 const logout = async () => {
    await AsyncStorage.removeItem("token");

    delete api.defaults.headers.Authorization;

    setToken(null);
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        authenticated,
        loadingAuth,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}