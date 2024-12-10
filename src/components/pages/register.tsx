import Container from "../atoms/container";
import RegisterForm from "../molecules/registerForm";

const Register = () => {
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
