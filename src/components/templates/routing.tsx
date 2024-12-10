import { BrowserRouter, Route, Routes } from "react-router";
import DefaultLayout from "./default-layout";
import Home from "../pages/home";
import Login from "../pages/login";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
