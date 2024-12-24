import { BrowserRouter, Route, Routes } from "react-router";
import DefaultLayout from "./default-layout";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Context from "../../contexts/context";
import Connections from "../pages/connections";
import Profile from "../pages/profile";
import LoggedOnly from "./logged-only";
import ServerError from "../pages/erros/ServerError";
import NotFound from "../pages/erros/NotFound";

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
            <Route element={<LoggedOnly />}>
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="/500" element={<ServerError />} />
            <Route path="/*" element={<NotFound />} />
          </Route>
        </Routes>
      </Context>
    </BrowserRouter>
  );
};

export default Routing;
