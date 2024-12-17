import { MeetingCardScheme } from "../schemes/meeting/meeting-card.scheme";
export const meetings: MeetingCardScheme[] = [
  {
    id: 102,
    name: "Caminhada",
    date: new Date(),
    description: "Fazer uma caminhar",
    status: "pending",
    message: "Vamos caminhar na São paulo",
    type: "in person",
    sender: {
      id: 1,
      name: "João",
      photo: "https://example.com/cartoon4.jpg",
      type: "volunteer",
      age: 30,
      email: "joao@example.com",
      meetingPreference: "in person",
      state: "SP",
      town: "São Paulo",
    },
    recipient: {
      id: 0,
      name: "Vítor Oliveira",
      photo: "https://example.com/cartoon4.jpg",
      type: "volunteer",
      age: 25,
      email: "maria@example.com",
      meetingPreference: "in person",
      state: "SP",
      town: "São Paulo",
    },
  },
];
