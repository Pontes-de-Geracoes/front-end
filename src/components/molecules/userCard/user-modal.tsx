import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/atoms/dialog";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Textarea } from "@/components/atoms/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/atoms/avatar";
import { UserCardScheme } from "../../../schemes/user/userCard.schema";

type UserModalProps = Readonly<{
  user?: UserCardScheme;
  onClose: () => void;
}>;

export function UserModal({ user, onClose }: UserModalProps) {
  const [meetingType, setMeetingType] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log("Meeting request submitted:", {
      meetingType,
      meetingDate,
      message,
    });
    onClose();
  };

  return (
    user && (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] rounded-3xl">
          <DialogHeader className="flex flex-col items-center">
            <Avatar className="w-32 h-32">
              <AvatarImage src={user?.photo} alt={user?.username} />
              <AvatarFallback>{user?.username.charAt(0)}</AvatarFallback>
            </Avatar>
            <DialogTitle className="mt-4">{user?.username}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p>Tipo: {user?.type === "elderly" ? "Idoso" : "Voluntário"}</p>
            <p>
              {user?.town} - {user?.uf}
            </p>
            <p>Preferência de encontro: {user?.meetingPreference}</p>
            {/* {user?.type === "elderly" ? (
                <p>
                  Age: {user?.age}, Interests: {user?.interests.join(", ")}
                </p>
              ) : (
                <p>Skills: {user?.skills.join(", ")}</p>
              )} */}
            <p className="text-sm text-gray-500">{user?.bio}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <Select onValueChange={setMeetingType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Meeting Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="presencial">Pessoalmente</SelectItem>
                  <SelectItem value="remote">Remoto</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="date"
                value={meetingDate}
                onChange={(e) => setMeetingDate(e.target.value)}
                required
              />
              <Textarea
                placeholder="Message"
                className="max-h-36"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit">Send Request</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    )
  );
}
