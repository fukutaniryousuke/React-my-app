"use client";

import { useState } from "react";
import UserRegistrationView from "./UserRegistrationView";
import { CreateUser } from "../types";
import { API_BASE_URL } from "../contents";
import { useRouter } from "next/navigation";

export default function UserRegistrationContainer() {
  // ルーター
  const router = useRouter();

  // エラーメッセージ用
  const [message, setMessage] = useState<string>();

  // ユーザ情報
  const [user, setUser] = useState<CreateUser>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // ユーザ情報を監視
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage("");
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // ユーザ登録
  const handleUserCreate = async () => {
    if (user.password !== user.confirmPassword) {
      setMessage("パスワードと確認用パスワードが一致しません。");
      return;
    }
    await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password,
      }),
    });

    router.push("/users");
  };

  return (
    <UserRegistrationView
      user={user}
      message={message}
      handleOnChange={handleOnChange}
      handleUserCreate={handleUserCreate}
    />
  );
}
