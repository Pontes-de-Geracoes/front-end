import Container from "../atoms/container";
import { Typography } from "../atoms/typography";

const cards = [
  {
    id: 1,
    title: "75%",
    description: "Jovens voluntários cadastrados",
  },
  {
    id: 4,
    title: "100%",
    description: "Todos os encontros geraram experiências enriquecedoras.",
  },
];

const Statistics = () => {
  return (
    <Container className="flex flex-col md:flex-row gap-8 min-">
      <div className="text-left flex flex-col gap-10 max-w-[768px] ">
        <div className="flex flex-col gap-6">
          <Typography variant={"large"}>Estatísticas</Typography>
          <Typography variant="h1" as="h2">
            Impacto das Interações Intergeracionais
          </Typography>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <Typography>
          Nossas interações têm promovido um impacto significativo na vida de
          jovens e idosos. Através do apoio mútuo, temos visto um aumento na
          felicidade e na inclusão social.
        </Typography>
        <div className="flex gap-12">
          {cards.map((card) => (
            <div key={card.id} className="flex flex-col gap-2 max-w-[300px]   ">
              <Typography variant="h1"> {card.title}</Typography>
              <Typography>{card.description}</Typography>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Statistics;
