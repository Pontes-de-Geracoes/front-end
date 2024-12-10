import Container from "../atoms/container";
import LoginForm from "../molecules/loginForm";

const Login = () => {
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
