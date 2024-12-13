import { BrowserRouter, Route, Routes } from "react-router";
import DefaultLayout from "./default-layout";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Context from "../../contexts/context";
import Connections from "../pages/connections";
import Profile from "../pages/profile";

const Routing = () => {
  return (
    <BrowserRouter>
      <Context>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="connections" element={<Connections />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Context>
    </BrowserRouter>
  );
};

export default Routing;
