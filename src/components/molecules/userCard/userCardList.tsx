import { UserCardScheme } from "../../../schemes/user/userCard.schema";
import { Avatar, AvatarFallback, AvatarImage } from "../../atoms/avatar";
import { Card, CardContent, CardHeader } from "../../atoms/card";
import { Typography } from "../../atoms/typography";

type UserCardListProps = Readonly<{
  user: UserCardScheme;
  onClick: () => void;
}>;

const UserCardList = ({ user, onClick }: UserCardListProps) => {
  return (
    <Card
      key={user.id}
      className="flex flex-col items-center justify-between text-center  gap-3 min-w-[300px]  rounded-xl shadow-2xl   bg-white/[1%] border-none backdrop-blur-sm"
      onClick={onClick}
    >
      <CardHeader>
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.photo} alt={user.username} />
          <AvatarFallback className="bg-primary/75">
            {user.username.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </CardHeader>

      <CardContent>
        <Typography variant={"h3"} as="h3">
          {user.username}
        </Typography>
        <Typography>{user.bio}</Typography>
      </CardContent>
    </Card>
  );
};

export default UserCardList;
