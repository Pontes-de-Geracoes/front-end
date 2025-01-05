import { UserContext } from "../../contexts/user.context";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar";
import Container from "../atoms/container";
import { Typography } from "../atoms/typography";
import { Badge } from "../atoms/badge";

import { useContext } from "react";

import Meetings from "../organisms/meetings";

const Profile = () => {
  const { user } = useContext(UserContext);
  return (
    <Container variant={"main"} as="main" className="gap-14">
      {/* Header */}
      <Container
        as="section"
        className="flex mx-auto flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left"
      >
        {user && (
          <>
            <Avatar className="w-52 h-52">
              <AvatarImage src={user.photo} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col w-full gap-8  justify-center ">
              <div className="flex flex-col md:flex-row gap-5 md:justify-between">
                <div className="flex flex-col ">
                  <Typography variant={"h1"}>{user.name}</Typography>
                  <Typography
                    variant={"small"}
                    className="text-gray-500 md:ml-3"
                  >
                    {user.town} - {user.state}
                  </Typography>
                </div>
                <div className="flex flex-row max-w-[600px] justify-center md:justify-end flex-wrap gap-3">
                  {user.necessities.map((necessity) => (
                    <Badge
                      key={necessity.id}
                      className="bg-primary/80 w-fit h-fit"
                    >
                      {necessity.name}
                    </Badge>
                  ))}
                </div>
              </div>
              <Typography variant={"h2"}>{user.bio}</Typography>
            </div>
          </>
        )}
      </Container>
      <Meetings />
    </Container>
  );
};

export default Profile;
