"use client";

import { useState } from "react";
import UserRegistrationView from "./UserRegistrationView";
import { UserFormModel } from "../types";
import { API_BASE_URL } from "../contents";
import { useRouter } from "next/navigation";
import { z } from "zod";

export default function UserRegistrationContainer() {
  // ルーター
  const router = useRouter();

  // エラーメッセージ用
  const [messages, setMessages] = useState<string[]>([]);

  // ユーザ情報
  const [user, setUser] = useState<UserFormModel>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const RegistrationSchema = z.object({
    name: z.string().min(1, "名前を入力してください。"),
    email: z
      .email("メールアドレス形式で入力してください。")
      .min(1, "メールアドレスを入力してください"),
    password: z
      .string()
      .min(1, "パスワードを入力してください")
      .refine(
        (value) => {
          if (value.length === 0) {
            return true;
          }
          return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(value);
        },
        { message: "パスワードは英字と数字を含めて入力してください。" },
      ),
    confirmPassword: z
      .string()
      .min(1, "確認用パスワードを入力してください")
      .refine(
        (value) => {
          if (value.length === 0) {
            return true;
          }
          return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(value);
        },
        { message: "パスワードは英字と数字を含めて入力してください。" },
      ),
  });

  // ユーザ情報を監視
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessages([]);
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // ユーザ登録
  const handleUserCreate = async () => {
    const newMessages: string[] = [];
    // パスワードと確認用パスワードが一致するか
    if (user.password !== user.confirmPassword) {
      newMessages.push("パスワードと確認用パスワードが一致しません。");
    }
    const result = RegistrationSchema.safeParse(user);
    // 入力エラーチェック
    if (!result.success) {
      const errorMessages = result.error.issues.map((issue) => {
        return issue.message;
      });
      newMessages.push(...errorMessages);
    }
    setMessages([...newMessages]);
    // エラーがあれば処理を終了する
    if (newMessages.length !== 0) {
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
      messages={messages}
      handleOnChange={handleOnChange}
      handleUserCreate={handleUserCreate}
    />
  );
}
