import { Heart } from "lucide-react";
import Container from "../atoms/container";
import { Typography } from "../atoms/typography";
import FindNewFriend from "../organisms/find-new-friend";

const Connections = () => {
  return (
    <Container
      variant={"main"}
      as="main"
      className="bg-gradient-to-tr from-55% via-primary/50 from-white dark:from-stone-950 dark:bg-gradient-to-tr dark:from-55% dark:via-primary/50"
    >
      <Container variant={"firstSection"} className="flex flex-col py-10 gap-2">
        {/* Title */}
        <Typography variant={"h1"} as="h1" className="">
          Encontre seu novo melhor amigo.{" "}
          <Heart className="inline fill-primary border-primary" size={60} />
        </Typography>
        <FindNewFriend />
      </Container>
    </Container>
  );
};

export default Connections;
