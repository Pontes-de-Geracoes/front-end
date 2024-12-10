import { Box } from "lucide-react";
import Container from "../atoms/container";
import { Typography } from "../atoms/typography";

const cards = [
  {
    id: 1,
    icon: Box,
    title: "Para Jovens",
    description:
      "Desenvolvimento de habilidades, empatia e experiências enriquecedoras em interações significativas.",
  },
  {
    id: 2,
    icon: Box,
    title: "Para Idosos",
    description:
      "Apoio, companhia e aprendizado em atividades que trazem alegria e conexão.",
  },
];

const Benefits = () => {
  return (
    <Container
      variant="section"
      className="flex flex-col md:flex-row items-center"
    >
      <div className="text-left flex flex-col gap-10 max-w-[768px] ">
        <div className="flex flex-col gap-6">
          <Typography variant={"large"}>Benefícios</Typography>
          <Typography variant="h1" as="h2">
            Conectando Gerações: Benefícios do Voluntariado para Jovens e Idosos
          </Typography>
          <Typography>
            O voluntariado oferece aos jovens a oportunidade de desenvolver
            habilidades sociais e empatia. Para os idosos, é uma chance de
            receber apoio e companhia, enriquecendo suas vidas.
          </Typography>
        </div>
        <div className="flex gap-5">
          {cards.map((card) => (
            <div key={card.id} className="flex flex-col gap-2 max-w-[300px]   ">
              <card.icon size={45} />
              <Typography variant="h3" as="h3">
                {card.title}
              </Typography>
              <Typography className="mt-3">{card.description}</Typography>
            </div>
          ))}
        </div>
      </div>
      <img
        src="/imgs/volunteering-animate.svg"
        alt=""
        className="md:w-2/5 w-full flex justify-center self"
      />
    </Container>
  );
};

export default Benefits;
