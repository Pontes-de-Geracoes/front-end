import { Button } from "../atoms/button";
import Container from "../atoms/container";
import { Typography } from "../atoms/typography";

const Hero = () => {
  return (
    <Container
      variant={"firstSection"}
      className="flex flex-col md:flex-row items-center justify-center "
      size={"small"}
    >
      <div className="w-3/5 flex flex-col text-center items-center gap-4 md:text-left md:items-start">
        <Typography variant="h1" as="h1">
          Conectando Gerações: Voluntários e Idosos Juntos
        </Typography>
        <Typography>
          Bem-vindo à nossa plataforma! Aqui, jovens voluntários se conectam c
          om idosos, promovendo interações que enriquecem vidas e criam laços
          significativos.
        </Typography>
        <div className="flex gap-3">
          <Button>Quero ajudar</Button>
          <Button variant={"secondary"}>Quero ser ajudado</Button>
        </div>
      </div>
      <img
        src="/imgs/hero.svg"
        alt=""
        className="md:w-2/5 w-full flex justify-center self"
      />
    </Container>
  );
};

export default Hero;
