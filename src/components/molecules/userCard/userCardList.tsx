import { UserCardScheme } from "../../../schemes/user/userCard.schema";
import { Avatar, AvatarFallback, AvatarImage } from "../../atoms/avatar";
import { Typography } from "../../atoms/typography";

const UserCardList = (user: UserCardScheme) => {
  return (
    <div
      key={user.id}
      className="flex flex-col items-center justify-between text-center py-4 px-6 gap-3  min-w-[300px] dark:border-white/15 dark rounded-lg shadow-xl  border-2 border-dark  "
    >
      <Avatar className="h-20 w-20">
        <AvatarImage src={user.photo} alt={user.username} />
        <AvatarFallback className="dark:bg-primary">
          {user.username.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col ">
        <Typography variant={"h3"} as="h3">
          {user.username}
        </Typography>
        <Typography>{user.bio}</Typography>
      </div>
    </div>
  );
};

export default UserCardList;
