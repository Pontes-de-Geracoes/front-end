import { NavLink } from "react-router";
import { Button } from "../atoms/button";
import Container from "../atoms/container";
import { Typography } from "../atoms/typography";

const CallToAction = () => {
  return (
    <Container className="flex flex-col md:flex-row gap-8 mt-32">
      <img src="imgs/call-to-action.svg" alt="" className="md:w-2/5" />
      <div className="text-right flex flex-col justify-center items-end gap-10 md:w-3/5 just">
        <div className="flex flex-col gap-4 ">
          <Typography variant="h1" as="h2">
            Junte-se a nós como voluntário
          </Typography>
          <Typography>
            Se você deseja fazer parte da nossa comunidade e ajudar a conectar
            gerações, clique no botão abaixo para se cadastrar como voluntário.
          </Typography>
        </div>
        <div>
          <NavLink to="/register">
            <Button>
              <Typography>Quero ser voluntário</Typography>
            </Button>
          </NavLink>
        </div>
      </div>
    </Container>
  );
};

export default CallToAction;
