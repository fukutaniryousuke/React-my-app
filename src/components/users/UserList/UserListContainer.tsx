"use client";

import UsersView from "./UserListView";
import { useCallback, useContext, useEffect, useState } from "react";
import { User } from "../types";
import { API_BASE_URL, DELETE_CONFIRM_MESSAGE } from "../contents";
import { AuthContext } from "@/src/contexts/AuthContext";

// 画面表示用コンポーネント
export default function UsersContainer() {
  // ログインユーザ情報
  const authContext = useContext(AuthContext);
  // ユーザー一覧保持用state
  const [users, setUsers] = useState<User[]>([]);
  // 入力欄のユーザー名保持用state
  const [userName, setUserName] = useState("");

  // ユーザー一覧取得処理
  const fetchUsers = useCallback(async () => {
    const response = await fetch(`${API_BASE_URL}/users`);
    const data = await response.json();

    setUsers(data);
  }, []);

  // 初回表示時にユーザー一覧取得
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, [fetchUsers]);

  // ユーザー登録処理
  const handleAddUser = async () => {
    await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
      }),
    });

    // 入力欄クリア
    setUserName("");
    // 最新一覧再取得
    await fetchUsers();
  };

  // ユーザー削除処理
  const handleDeleteUser = async (id: number) => {
    const ok = confirm(DELETE_CONFIRM_MESSAGE);
    if (!ok) return;
    await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "DELETE",
    });
    // 最新一覧再取得
    await fetchUsers();
  };

  return (
    <UsersView
      users={users}
      userName={userName}
      setUserName={setUserName}
      handleAddUser={handleAddUser}
      handleDeleteUser={handleDeleteUser}
      loginUser={authContext?.loginUser}
    />
  );
}
