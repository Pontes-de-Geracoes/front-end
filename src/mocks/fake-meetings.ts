// src/mocks/fake-meetings.ts
import { faker } from "@faker-js/faker";
import { users } from "./fake-users";

export interface Meeting {
  id: number;
  name: string;
  status: "pendent" | "confirm" | "cancel";
  sender: (typeof users)[0];
  recipient: (typeof users)[0];
  message: string;
  type: "presential" | "remote" | "both";
  dateRange: Date;
}

/* export const meetings: Meeting[] = Array.from({ length: 20 }, (_, i) => {
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
    dateRange: fromDate,
  };
}); */

export const meetings: Meeting[] = [
  {
    id: 102,
    name: "Caminhada",
    dateRange: new Date(),
    status: "pendent",
    message: "Vamos caminhar",
    type: "presential",
    sender: {
      id: 1,
      username: "João",
      photo: "https://randomuser",
      type: "volunteer",
      age: 30,
      email: "joao@example.com",
      meetingPreference: "presential",
      uf: "SP",
      town: "São Paulo",
    },
    recipient: {
      id: 0,
      username: "Vítor Oliveira",
      photo: "https://randomuser",
      type: "volunteer",
      age: 25,
      email: "maria@example.com",
      meetingPreference: "presential",
      uf: "SP",
      town: "São Paulo",
    },
  },
];
