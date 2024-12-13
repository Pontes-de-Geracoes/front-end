import { format } from "date-fns";
import { Meeting } from "../../../mocks/fake-meetings";
import { useContext } from "react";
import { UserContext } from "../../../contexts/user.context";
import { Card } from "../../atoms/card";

interface MeetingCardProps {
  meeting: Meeting;
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
              : meeting.status === "cancel"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {meeting.status == "cancel"
            ? "Cancelado"
            : meeting.status == "confirm"
            ? "Confirmado"
            : "Pendente"}
        </span>
      </div>
      <p className="text-sm text-gray-600">
        With:{" "}
        {meeting.sender.id === user?.id
          ? meeting.recipient.username
          : meeting.sender.username}
      </p>
      <p className="text-sm">{meeting.message}</p>
      <div className="text-sm text-gray-500">
        {format(meeting.dateRange, "PPP")}
      </div>
    </Card>
  );
};

export default MeetingCard;
