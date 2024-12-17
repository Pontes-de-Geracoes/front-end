import Container from "../../atoms/container";

const NotFound = () => {
  return (
    <Container variant={"main"}>
      <Container
        variant={"firstSection"}
        className="flex flex-col items-center justify-center space-y-4"
      >
        <img className="max-w-[500px] " src="/imgs/erros/404.svg" alt="" />
      </Container>
    </Container>
  );
};

export default NotFound;
