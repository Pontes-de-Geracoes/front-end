import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { UserInfoScheme } from "../schemes/user/userContext.scheme";
import { useNavigate } from "react-router";
import { auth } from "../services/auth.service";

export type UserContextSchema = {
  user: UserInfoScheme | null;
  isAuthenticated: boolean;
  update: (user: UserInfoScheme) => void;
  logOut: () => void;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = React.createContext<UserContextSchema>({
  user: null,
  isAuthenticated: false,
  update: () => {},
  logOut: () => {},
  setIsAuthenticated: () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    checkingToken();
  }, []);

  const navigate = useNavigate();
  const [user, setUser] = React.useState<UserInfoScheme | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  async function checkingToken() {
    if (!Cookies.get("token")) return setIsAuthenticated(false);

    const user = await auth.validatingToken();
    if (!user) return setIsAuthenticated(false);

    setIsAuthenticated(true);
    setUser(user);
  }

  const logOut = React.useCallback(() => {
    setUser(null);
    Cookies.remove("token");
    setIsAuthenticated(false);
    navigate("/");
  }, [navigate]);

  const update = React.useCallback(
    async (user: (Partial<UserInfoScheme> & { id: number }) | null) => {
      if (user?.id) return setUser(user as UserInfoScheme);

      setUser(null);
    },
    []
  );

  const contextValue = React.useMemo(
    () => ({
      user,
      logOut,
      update,
      isAuthenticated,
      setIsAuthenticated,
    }),
    [user, logOut, update, isAuthenticated]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
