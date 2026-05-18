// これはブラウザ側で動くコードと教えている
"use client";

import { useEffect, useState } from "react";
import { User } from "../types/user";
import { getUsers } from "../services/userService";

// ユーザ一覧を取得するカスタムフックを定義
export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return { users };
};
