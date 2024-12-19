import Container from "../atoms/container";
import { Typography } from "../atoms/typography";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../atoms/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../atoms/select";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";

import { BookHeart } from "lucide-react";

import { useContext, useEffect, useMemo, useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../atoms/pagination";
import MeetingCard from "../molecules/meeetingCard/meeeting-card";
import MeetingModal from "../molecules/meeetingCard/meeting-modal";
import { MeetingCardScheme } from "../../schemes/meeting/meeting-card.scheme";
import { UserContext, UserContextSchema } from "../../contexts/user.context";
import { meetingsServices } from "../../services/meetings.services";

const profileMeetingsForm = z.object({
  name: z.string(),
  friendName: z.string(),
  sendByMe: z.boolean(),
  date: z.date(),
  status: z.enum(["pending", "confirm", "canceled", "all"]).optional(),
});

type ProfileMeetingsForm = z.infer<typeof profileMeetingsForm>;
const Meetings = () => {
  const [meetings, setMeetings] = useState<MeetingCardScheme[]>([]);
  const { user } = useContext(UserContext) as UserContextSchema;

  const [selectedMeeting, setSelectedMeeting] =
    useState<null | MeetingCardScheme>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    (async () => {
      const fetchMeetings =
        (await meetingsServices.getAllByUserID(user.id)) || [];
      setMeetings(fetchMeetings);
    })();
  }, [user.id, selectedMeeting]);

  const form = useForm<ProfileMeetingsForm>({
    resolver: zodResolver(profileMeetingsForm),
    defaultValues: {
      name: "",
      friendName: "",
      status: undefined,
      date: new Date(),
    },
  });

  const { name, status, date, friendName } = form.watch();

  const { paginatedMeetings, totalPages } = useMemo(() => {
    let filtered = meetings;

    if (name || status || date.getDay() == new Date().getDay() || friendName) {
      filtered = meetings.filter((meeting) => {
        const matchesName =
          !name || meeting.name.toLowerCase().startsWith(name.toLowerCase());
        const matchesWith =
          !friendName ||
          meeting.sender.name
            .toLowerCase()
            .startsWith(friendName.toLowerCase()) ||
          meeting.recipient.name
            .toLowerCase()
            .startsWith(friendName.toLowerCase());
        const matchesStatus =
          !status || status == "all" || meeting.status === status;
        const matchesDateRange =
          date.getDay() == new Date().getDay() || meeting.date == date;

        return matchesName && matchesStatus && matchesDateRange && matchesWith;
      });
    }

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const paginatedMeetings = filtered?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    return { paginatedMeetings, totalPages };
  }, [meetings, name, status, date, friendName, currentPage]);

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
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
      <Form {...form}>
        <form className="flex flex-col gap-2 w-full md:flex-row">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Nome do evento" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="friendName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Nome do amigo" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="w-full ">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" className="w-full" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="confirm">Confirmado</SelectItem>
                    <SelectItem value="canceled">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button onClick={() => form.reset()} type="button">
            Reseta filtros
          </Button>
        </form>
      </Form>
      {paginatedMeetings.map((meeting) => (
        <MeetingCard
          key={meeting.id}
          meeting={meeting}
          onClick={() => setSelectedMeeting(meeting)}
        />
      ))}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages)
                    handlePageChange(currentPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
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
