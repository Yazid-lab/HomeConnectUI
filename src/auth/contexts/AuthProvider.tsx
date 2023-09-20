import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../../core/hooks/useLocalStorage";
import { useLogin } from "../hooks/useLogin";
import { useLogout } from "../hooks/useLogout";
import { useUserInfo } from "../hooks/useUserInfo";
import { UserInfo } from "../types/userInfo";

interface AuthContextInterface {
  hasRole: (roles?: string[]) => {};
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  userInfo?: UserInfo;
}

export const AuthContext = createContext({} as AuthContextInterface);

type AuthProviderProps = {
  children?: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authKey, setAuthKey] = useLocalStorage<string>("authkey", "");
  const [userId, setUserId] = useLocalStorage<string>("userId", "");
  const { isLoggingIn, login, isLoggedIn } = useLogin();
  const { isLoggingOut, logout } = useLogout();
  const { data: userInfo } = useUserInfo(userId);

  const hasRole = (roles?: string[]) => {
    if (!roles || roles.length === 0) {
      return true;
    }
    if (!userInfo) {
      return false;
    }
    return roles.includes(userInfo.roles);
  };

  const handleLogin = async (email: string, password: string) => {
    return login({ email, password })
      .then((data) => {
        if (data) {
          setAuthKey(data.token);
          setUserId(data.id);
          return data;
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  const handleLogout = async () => {
    return logout()
      .then((data) => {
        setAuthKey("");
        setUserId("");
        return data;
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <AuthContext.Provider
      value={{
        hasRole,
        isLoggingIn,
        isLoggingOut,
        isLoggedIn,
        login: handleLogin,
        logout: handleLogout,
        userInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
