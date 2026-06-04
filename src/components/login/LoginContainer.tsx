"use client";

import { useContext, useState } from "react";
import { LoginFormErrors, User } from "../users/types";
import LoginView from "./LoginView";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { API_BASE_URL } from "../users/contents";
import { AuthContext } from "@/src/contexts/AuthContext";

export default function LoginContainer() {
  // ユーザー情報
  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    email: "",
    password: "",
  });

  // エラーメッセージ
  const [errorMessages, setErrorMessages] = useState<LoginFormErrors>({});

  // ログイン失敗メッセージ
  const [message, setMessage] = useState<string>("");

  // ルーター
  const router = useRouter();

  const authContext = useContext(AuthContext);

  // スキーマ
  const LoginSchema = z.object({
    email: z
      .email("メールアドレス形式で入力してください。")
      .min(1, "メールアドレスを入力してください。"),
    password: z.string().min(1, "パスワードを入力してください。"),
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessages({ ...errorMessages, [e.target.name]: "" });
    setMessage("");
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const userLogin = async () => {
    const errors: LoginFormErrors = {};
    // 入力エラーチェック
    const result = LoginSchema.safeParse(user);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof LoginFormErrors;
        errors[field] = issue.message;
      });
    }

    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }
    const response = await fetch(`${API_BASE_URL}/users`);
    // 通信エラーチェック
    if (!response.ok) {
      setMessage("通信エラーが発生しました。");
      return;
    }
    const resultUsers: User[] = await response.json();

    const loginUser = resultUsers.find(
      (u) => u.email === user.email && u.password === user.password,
    );
    if (loginUser === undefined) {
      setMessage("メールアドレスかパスワードが間違っています。");
      return;
    }

    authContext?.setLoginUser(loginUser);

    router.push("/users");
  };

  return (
    <LoginView
      handleOnChange={handleOnChange}
      userLogin={userLogin}
      errorMessages={errorMessages}
      message={message}
    />
  );
}
