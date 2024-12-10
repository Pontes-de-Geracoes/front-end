import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "../atoms/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../atoms/carousel";
import Container from "../atoms/container";
import { Typography } from "../atoms/typography";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "../atoms/avatar";
import { Star } from "lucide-react";

const TestimonialsCards = [
  {
    id: 1,
    info: "A experiência de interagir com os idosos tem sido transformadora. Sinto que estou fazendo a diferença na vida deles enquanto aprendo muito com suas histórias.",
    name: "Lucas Silva",
    role: "Voluntário | Comunidade",
    imgURL: "",
  },
  {
    id: 2,
    info: "Participar deste projeto tem sido uma experiência incrível. A cada visita, aprendo algo novo e me sinto mais conectado com a comunidade.",
    name: "Mariana Costa",
    role: "Voluntária | Comunidade",
    imgURL: "",
  },
  {
    id: 3,
    info: "É gratificante ver o sorriso no rosto dos idosos quando compartilhamos momentos juntos. Este projeto trouxe um novo sentido à minha vida.",
    name: "Carlos Pereira",
    role: "Voluntário | Comunidade",
    imgURL: "",
  },
  {
    id: 4,
    info: "A troca de experiências com os idosos é enriquecedora. Sinto que estou contribuindo para o bem-estar deles e, ao mesmo tempo, me desenvolvendo como pessoa.",
    name: "Ana Souza",
    role: "Voluntária | Comunidade",
    imgURL: "",
  },
  {
    id: 5,
    info: "Cada visita é uma oportunidade de aprendizado e crescimento. A conexão que criamos com os idosos é algo muito especial.",
    name: "Pedro Santos",
    role: "Voluntário | Comunidade",
    imgURL: "",
  },
];

const Testimonials = () => {
  const plugin = React.useRef(Autoplay({ delay: 2000 }));
  return (
    <Container className="flex flex-col gap-12 pt-20">
      <div className="flex items-center justify-center gap-2">
        <Typography variant="h1" as="h2">
          Depoimentos
        </Typography>
      </div>
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-3xl mx-auto "
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{ loop: true }}
      >
        <CarouselContent>
          {TestimonialsCards.map((card) => (
            <CarouselItem key={card.id} className="">
              <div className="p-1 text-center ">
                <Card>
                  <CardContent className="p-6  grid item-center justify-center gap-4">
                    <div className="flex gap-4 items-center justify-center">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          size={24}
                          className="fill-black dark:fill-white "
                        />
                      ))}
                    </div>
                    <Typography variant={"h2"} className="text-lg font-light">
                      {card.info}
                    </Typography>
                    <div className="mt-4 flex justify-center gap-5">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={card.imgURL} />
                        <AvatarFallback>
                          {card.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-lg font-semibold">{card.name}</p>
                        <p className="text-sm font-light">{card.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:block" />
        <CarouselNext className="hidden md:block" />
      </Carousel>
    </Container>
  );
};
export default Testimonials;
