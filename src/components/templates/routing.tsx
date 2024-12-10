import { BrowserRouter, Route, Routes } from "react-router";
import DefaultLayout from "./default-layout";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Context from "../../contexts/context";

const Routing = () => {
  return (
    <BrowserRouter>
      <Context>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </Context>
    </BrowserRouter>
  );
};

export default Routing;
