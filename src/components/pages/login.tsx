import { useEffect } from "react";
import Container from "../atoms/container";
import LoginForm from "../molecules/loginForm";
import { validatingToken } from "../../services/auth/validedToken.service";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    async function checkingToken(token: string) {
      if (await validatingToken(token)) navigate("/");
    }
    if (token) checkingToken(token);
  }, [navigate]);
  return (
    <Container variant={"main"} as="main">
      <Container
        variant={"firstSection"}
        className="flex flex-col md:flex-row items-center justify-evenly gap-10 max-w-[500px] md:max-w-full"
      >
        <LoginForm />
        <img src="/imgs/login.svg" alt="" className=" md:w-1/2 " />
      </Container>
    </Container>
  );
};

export default Login;
