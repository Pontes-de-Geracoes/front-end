import { useNavigate } from "react-router";
import Container from "../atoms/container";
import RegisterForm from "../molecules/registerForm";
import { useEffect } from "react";
import { Typography } from "../atoms/typography";
import { auth } from "../../services/auth.service";
import { toast } from "../../hooks/use-toast";

const Register = () => {
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
      <Container variant={"firstSection"}>
        <Typography variant="h1" className="text-center w-full mb-4">
          Se conecte com gerações
        </Typography>
        <Container className="flex w-full flex-col md:flex-row items-center justify-evenly gap-10 max-w-[500px] md:max-w-full">
          <img src="/imgs/register.svg" alt="" className=" md:w-1/2 " />
          <RegisterForm />
        </Container>
      </Container>
    </Container>
  );
};

export default Register;
