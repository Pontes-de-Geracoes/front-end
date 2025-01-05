import Container from "../atoms/container";
import { Typography } from "../atoms/typography";
import { BookHeart } from "lucide-react";
import { useContext, useEffect, useMemo, useState } from "react";
import MeetingCard from "../molecules/meetingCard/meeting-card";
import MeetingModal from "../molecules/meetingCard/meeting-modal";
import { MeetingCardScheme } from "../../schemes/meeting/meeting-card.scheme";
import { UserContext, UserContextSchema } from "../../contexts/user.context";
import { services } from "../../services/services";
import CustomPagination from "../atoms/CustomPagination";
import MeetingForm, { ProfileMeetingsForm } from "../molecules/meetingForm";

const Meetings = () => {
  const [meetings, setMeetings] = useState<MeetingCardScheme[]>([]);
  const { user } = useContext(UserContext) as UserContextSchema;
  const [selectedMeeting, setSelectedMeeting] =
    useState<null | MeetingCardScheme>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [formValues, setFormValues] = useState<ProfileMeetingsForm>({
    name: "",
    friendName: "",
    sendByMe: false,
    date: new Date(),
    status: undefined,
  });

  useEffect(() => {
    if (user) {
      (async () => {
        const fetchMeetings = await services.get<MeetingCardScheme[]>({
          url: `/meetings/user/${user.id}`,
        });

        if (fetchMeetings) setMeetings(fetchMeetings);
      })();
    }
  }, [user, selectedMeeting]);

  const { paginatedMeetings, totalPages } = useMemo(() => {
    let filtered = meetings;

    if (
      formValues.name ||
      formValues.status ||
      formValues.date.getDay() == new Date().getDay() ||
      formValues.friendName
    ) {
      filtered = meetings.filter((meeting) => {
        const matchesName =
          !formValues.name ||
          meeting.name.toLowerCase().startsWith(formValues.name.toLowerCase());
        const matchesWith =
          !formValues.friendName ||
          meeting.sender.name
            .toLowerCase()
            .startsWith(formValues.friendName.toLowerCase()) ||
          meeting.recipient.name
            .toLowerCase()
            .startsWith(formValues.friendName.toLowerCase());
        const matchesStatus =
          !formValues.status ||
          formValues.status == "all" ||
          meeting.status === formValues.status;
        const matchesDateRange =
          formValues.date.getDay() == new Date().getDay() ||
          meeting.date == formValues.date;

        return matchesName && matchesStatus && matchesDateRange && matchesWith;
      });
    }

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const paginatedMeetings = filtered?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    return { paginatedMeetings, totalPages };
  }, [
    meetings,
    formValues.name,
    formValues.status,
    formValues.date,
    formValues.friendName,
    currentPage,
  ]);

  if (!meetings.length)
    return (
      <Container
        as="section"
        className="space-y-6 p-6 gap-6 rounded-2xl flex flex-col items-center justify-center"
        variant="section"
      >
        <Typography
          variant={"h1"}
          as="h2"
          className="text-right flex gap-6 justify-end"
        >
          <BookHeart size={48} />
          Meus Encontros
        </Typography>
        <img src="/imgs/meeting-not-found.svg" className="max-w-[50%]" alt="" />
        <Typography variant="h2" as="h2" className="text-center">
          Você ainda não tem encontros marcados.
        </Typography>
      </Container>
    );

  return (
    <Container
      as="section"
      className=" space-y-6 p-6 gap-6 rounded-2xl"
      variant="section"
    >
      <Typography
        variant={"h1"}
        as="h2"
        className="text-right flex gap-6 justify-end"
      >
        <BookHeart size={48} />
        Meus Encontros
      </Typography>
      <MeetingForm onFormChange={setFormValues} />
      {paginatedMeetings.map((meeting) => (
        <MeetingCard
          key={meeting.id}
          meeting={meeting}
          onClick={() => setSelectedMeeting(meeting)}
        />
      ))}
      <CustomPagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {selectedMeeting && (
        <MeetingModal
          meeting={selectedMeeting}
          onClose={() => setSelectedMeeting(null)}
        />
      )}
    </Container>
  );
};

export default Meetings;
