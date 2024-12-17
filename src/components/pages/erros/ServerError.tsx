import Anchor from "../../atoms/anchor";
import Container from "../../atoms/container";
import { Typography } from "../../atoms/typography";

const ServerError = () => {
  return (
    <Container variant={"main"}>
      <Container
        variant={"firstSection"}
        className="flex flex-col items-center justify-center space-y-4"
      >
        <img className="max-w-[500px] " src="/imgs/erros/500.svg" alt="" />
        <Typography
          variant="h2"
          className="w-4/5 text-xl font-bold md:text-2xl text-center"
        >
          If you are seeing this the{" "}
          <Anchor
            className="underline-offset-4 hover:underline "
            href="https://render.com/"
          >
            render
          </Anchor>{" "}
          probably killed the server, please send me a {""}
          <Anchor
            className="underline-offset-4 hover:underline "
            href="https://www.linkedin.com/in/caulicons"
          >
            message.
          </Anchor>
        </Typography>
      </Container>
    </Container>
  );
};

export default ServerError;
