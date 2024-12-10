import { Outlet } from "react-router";
import Footer from "../molecules/foote";
import Header from "../molecules/header";

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default DefaultLayout;
