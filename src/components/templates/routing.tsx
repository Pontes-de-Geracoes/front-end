import { BrowserRouter, Route, Routes } from "react-router";
import DefaultLayout from "./default-layout";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
