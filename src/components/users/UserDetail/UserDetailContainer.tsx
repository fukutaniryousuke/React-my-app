"use client";

import { useEffect, useState } from "react";
import UserDetailView from "./UserDetailView";
import { API_BASE_URL } from "@/src/components/users/contents";
import { User } from "../types";
import { useParams } from "next/navigation";

export default function UserDetailContainer() {
  const params = useParams();
  /**
   * ユーザーID
   * 返却値がstringのためNumber型にキャストしている
   * */
  const id = Number(params.id);
  // ユーザー情報保持用state
  const [user, setUser] = useState<User>();
  // 編集フラグ
  const [isEditUser, setIsEditUser] = useState(false);

  // ユーザー取得
  const handleGetUser = async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    const data = await response.json();
    setUser(data);
  };

  // 初回表示処理
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`${API_BASE_URL}/users/${id}`);
      const data = await response.json();
      setUser(data);
    };
    fetchUser();
  }, [id]);

  // ユーザー更新処理
  const handleUpdateUser = async () => {
    await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, name: user?.name }),
    });

    // 更新後、各値をリセット
    setIsEditUser(false);
  };

  return <UserDetailView handleGetUser={handleGetUser} user={user} />;
}
