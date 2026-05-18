"use client";

import { useUsers } from "@/src/hooks/userUsers";
import UsersView from "./UsersView";

export default function UsersContainer() {
  const { users } = useUsers();

  return <UsersView users={users} />;
}
