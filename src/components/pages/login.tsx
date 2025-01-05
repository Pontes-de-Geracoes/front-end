import { useEffect } from "react";
import Container from "../atoms/container";
import LoginForm from "../molecules/loginForm";
import { useNavigate } from "react-router";
import { Typography } from "../atoms/typography";
import { toast } from "../../hooks/use-toast";
import { auth } from "../../services/auth.service";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (await auth.validatingToken()) {
        toast({
          description: "Você já está logado",
        });
        navigate("/");
      }
    })();
  }, [navigate]);

  return (
    <Container variant={"main"} as="main">
      <Container
        variant={"firstSection"}
        className="flex flex-col items-center justify-center gap-4"
      >
        <Typography variant="h1" className="text-center w-full ">
          Bem-vindo de volta ⭐
        </Typography>
        <Container className="flex w-full flex-col md:flex-row items-center justify-evenly gap-10 max-w-[500px] md:max-w-full">
          <LoginForm />
          <img src="/imgs/login.svg" alt="" className=" md:w-1/2 " />
        </Container>
      </Container>
    </Container>
  );
};

export default Login;
