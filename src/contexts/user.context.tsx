import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { UserInfoScheme } from "../schemes/user/userContext.scheme";
import { validatingToken } from "../services/auth/validedToken.service";
import { useNavigate } from "react-router";

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
  //const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = React.useState<UserInfoScheme>(emptyUser);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  async function checkingToken() {
    //setIsLoading(true);

    const token = Cookies.get("token");

    if (!token) setIsAuthenticated(false);
    else checkingToken(token);

    async function checkingToken(token: string) {
      if (await validatingToken(token)) {
        const user = await validatingToken(token);
        if (!user) setIsAuthenticated(false);
        else {
          setIsAuthenticated(true);
          setUser(user);
        }
      }
    }

    /*  toast({
      title: "Encontro confirmado",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(user, null, 2)}</code>
        </pre>
      ),
    }); */
    //setIsLoading(false);
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
