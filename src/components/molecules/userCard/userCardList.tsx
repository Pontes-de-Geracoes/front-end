import { UserCardScheme } from "../../../schemes/user/userCard.schema";
import { Avatar, AvatarFallback, AvatarImage } from "../../atoms/avatar";
import { Card, CardContent, CardHeader } from "../../atoms/card";
import { Typography } from "../../atoms/typography";
import useTiltEffect from "../../../hooks/use-tilt-effect";

type UserCardListProps = Readonly<{
  user: UserCardScheme;
  onClick: () => void;
}>;

const UserCardList = ({ user, onClick }: UserCardListProps) => {
  const { onMouseLeave, onMouseMove, rotate } = useTiltEffect();
  return (
    <Card
      key={user.id}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="flex flex-col items-center justify-between text-center  gap-3 min-w-[300px]  rounded-xl shadow-2xl   bg-white/[1%] border-none backdrop-blur-sm"
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
        transition: "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
      }}
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
