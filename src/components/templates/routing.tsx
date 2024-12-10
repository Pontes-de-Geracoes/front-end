import { BrowserRouter, Route, Routes } from "react-router";
import DefaultLayout from "./default-layout";
import Home from "../pages/home";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
