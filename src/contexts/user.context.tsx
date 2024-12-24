import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { UserInfoScheme } from "../schemes/user/userContext.scheme";
import { useNavigate } from "react-router";
import { auth } from "../services/auth.service";

export type UserContextSchema = {
  user: UserInfoScheme;
  isAuthenticated: boolean;
  update: (user: UserInfoScheme) => void;
  logOut: () => void;
  //isLoading: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const emptyUser: UserInfoScheme = {
  id: 1,
  name: "",
  email: "",
  type: "elderly",
  photo: "",
  age: 0,
  meetingPreference: "remote",
  state: "",
  town: "",
  bio: "",
  meetings: [],
  necessities: [],
};

export const UserContext = React.createContext<UserContextSchema>({
  user: emptyUser,
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
  const [user, setUser] = React.useState<UserInfoScheme>(emptyUser);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  async function checkingToken() {
    const token = Cookies.get("token");

    if (!token) setIsAuthenticated(false);
    else checkingToken(token);

    async function checkingToken(token: string) {
      if (await auth.validatingToken(token)) {
        const user = await auth.validatingToken(token);
        if (!user) setIsAuthenticated(false);
        else {
          setIsAuthenticated(true);
          setUser(user);
        }
      }
    }
  }

  function logOut() {
    setUser(emptyUser);
    Cookies.remove("token");
    setIsAuthenticated(false);
    navigate("/");
  }

  async function update(
    user: (Partial<UserInfoScheme> & { id: number }) | null
  ) {
    if (user?.id) {
      return setUser((oldInfo) => ({
        ...oldInfo,
        ...user,
      }));
    }

    setUser(emptyUser);
  }

  const contextValue = React.useMemo(
    () => ({
      user,
      logOut,
      update,
      isAuthenticated,
      setIsAuthenticated,
      //isLoading,
    }),
    [user, logOut, update, isAuthenticated]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
