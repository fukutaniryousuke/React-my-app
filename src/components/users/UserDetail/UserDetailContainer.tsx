"use client";

import { useEffect, useState } from "react";
import UserDetailView from "./UserDetailView";
import { API_BASE_URL } from "@/src/components/users/contents";
import { User } from "../types";
import { useParams, useRouter } from "next/navigation";

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

  const router = useRouter();

  // 初回表示処理
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`${API_BASE_URL}/users/${id}`);
      const data = await response.json();
      setUser(data);

      setIsEditUser(false);
    };
    fetchUser();
  }, [id]);

  if (!user) {
    return <p>読み込み中...</p>;
  }

  // 編集モード切り替え
  const changeIsEditUser = () => {
    setIsEditUser(true);
  };

  // 入力内容更新
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // ユーザー更新処理
  const handleUpdateUser = async () => {
    await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    // 更新後、各値をリセット
    setIsEditUser(false);
  };

  // 戻るボタン押下
  const handleCancel = () => {
    setIsEditUser(false);
    router.push("/users");
  };

  return (
    <UserDetailView
      user={user}
      changeIsEditUser={changeIsEditUser}
      isEditUser={isEditUser}
      handleUpdateUser={handleUpdateUser}
      handleOnChange={handleOnChange}
      handleCancel={handleCancel}
    />
  );
}
