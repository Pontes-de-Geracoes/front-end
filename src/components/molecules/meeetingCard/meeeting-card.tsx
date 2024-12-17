import { format } from "date-fns";
import { useContext } from "react";
import { UserContext } from "../../../contexts/user.context";
import { Card } from "../../atoms/card";
import { MeetingCardScheme } from "../../../schemes/meeting/meeting-card.scheme";

interface MeetingCardProps {
  meeting: MeetingCardScheme;
  onClick: () => void;
}

const MeetingCard = ({ meeting, onClick }: MeetingCardProps) => {
  const { user } = useContext(UserContext);

  return (
    <Card
      key={meeting.id}
      className="p-4 border rounded-lg flex flex-col gap-2 "
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{meeting.name}</h3>
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            meeting.status === "confirm"
              ? "bg-green-100 text-green-800"
              : meeting.status === "canceled"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {meeting.status == "canceled"
            ? "Cancelado"
            : meeting.status == "confirm"
            ? "Confirmado"
            : "Pendente"}
        </span>
      </div>
      <p className="text-sm text-gray-600">
        With:{" "}
        {meeting.sender?.id === user?.id
          ? meeting.recipient.name
          : meeting.sender.name}
      </p>
      <p className="text-sm">{meeting.description}</p>
      <div className="text-sm text-gray-500">{format(meeting.date, "PPP")}</div>
    </Card>
  );
};

export default MeetingCard;
