// src/mocks/fake-meetings.ts
import { faker } from "@faker-js/faker";
import { users } from "./fake-users";
import { MeetingCardScheme } from "../schemes/meeting/meeting-card.scheme";

/* export const meetings: MeetingCardScheme[] = Array.from(
  { length: 20 },
  (_, i) => {
    const fromDate = faker.date.future();

    return {
      id: i + 1,
      name: faker.helpers.arrayElement([
        "Coffee Chat",
        "Reading Session",
        "Walking Company",
        "Board Games",
        "Gardening Time",
        "Music Session",
        "Story Telling",
        "Cooking Class",
        "Tech Support",
        "Arts & Crafts",
      ]),
      type: faker.helpers.arrayElement(["presential", "remote", "both"]),
      status: faker.helpers.arrayElement(["pendent", "confirm", "cancel"]),
      sender: faker.helpers.arrayElement(
        users.filter((u) => u.type === "volunteer")
      ),
      recipient: faker.helpers.arrayElement(
        users.filter((u) => u.type === "elderly")
      ),
      message: faker.lorem.paragraph(),
      description: faker.lorem.sentence(10),
      date: fromDate,
    };
  }
); */

export const meetings: MeetingCardScheme[] = [
  {
    id: 102,
    name: "Caminhada",
    date: new Date(),
    description: "Fazer uma caminhar",
    status: "pendent",
    message: "Vamos caminhar na São paulo",
    type: "presential",
    sender: {
      id: 1,
      name: "João",
      photo: "https://example.com/cartoon4.jpg",
      type: "volunteer",
      age: 30,
      email: "joao@example.com",
      meetingPreference: "presential",
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
      meetingPreference: "presential",
      state: "SP",
      town: "São Paulo",
    },
  },
];
