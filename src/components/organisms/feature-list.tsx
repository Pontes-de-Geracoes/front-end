import { Box } from "lucide-react";
import Container from "../atoms/container";
import { Typography } from "../atoms/typography";

const cards = [
  {
    id: 1,
    icon: Box,
    title: "Registro de usuários simplificado e eficiente",
    description:
      "Os usuários podem se cadastrar e criar perfis personalizados.",
  },
  {
    id: 2,
    icon: Box,
    title: "Listagem e filtragem de perfis de forma fácil",
    description: "Encontre rapidamente idosos ou jovens com interesses comuns.",
  },
  {
    id: 3,
    icon: Box,
    title: "Planejamento de atividades conjuntas e interativas",
    description: "Agende encontros presenciais ou virtuais com facilidade.",
  },
];

const FeatureList = () => {
  return (
    <Container
      variant={"section"}
      className="flex justify-center flex-col gap-28
 items-center"
    >
      <div className="text-center flex flex-col gap-3 max-w-[768px]">
        <Typography variant="h1" as="h2">
          Descubra como conectar jovens voluntários com idosos que precisam de
          apoio.
        </Typography>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex  flex-col gap-4 max-w-[300px] text-center justify-center items-center"
          >
            <card.icon size={64} />
            <Typography variant="h3" as="h3">
              {card.title}
            </Typography>
            <Typography>{card.description}</Typography>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default FeatureList;
