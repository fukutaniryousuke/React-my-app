import { http, HttpResponse } from "msw";
import { User } from "../components/users/types";
console.log("USER HANDLERS");

const mockUsers: User[] = [
  {
    id: 1,
    name: "tanaka",
  },
  {
    id: 2,
    name: "佐藤",
  },
];

export const userHandlers = [
  http.get("http://localhost:8080/users", () => {
    console.log("HANDLER");
    return HttpResponse.json(mockUsers);
  }),
];
