import { useNavigate } from "react-router";
import Container from "../atoms/container";
import RegisterForm from "../molecules/registerForm";
import { useEffect } from "react";
import { validatingToken } from "../../services/auth/validedToken.service";
import Cookies from "js-cookie";

const Register = () => {
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
        className="flex flex-col-reverse md:flex-row items-center justify-evenly gap-10 max-w-[500px] md:max-w-full"
      >
        <img src="/imgs/register.svg" alt="" className=" md:w-1/2 " />
        <RegisterForm />
      </Container>
    </Container>
  );
};

export default Register;
