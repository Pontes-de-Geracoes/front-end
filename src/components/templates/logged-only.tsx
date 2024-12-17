import { useContext, useEffect } from "react";
import { Outlet } from "react-router";
import { UserContext } from "../../contexts/user.context";

const LoggedOnly = () => {
  const { isAuthenticated, logOut } = useContext(UserContext);

  useEffect(() => {
    if (!isAuthenticated) logOut();
  }, [logOut, isAuthenticated]);

  if (!isAuthenticated) return null;
  return (
    <>
      <Outlet />
    </>
  );
};

export default LoggedOnly;
