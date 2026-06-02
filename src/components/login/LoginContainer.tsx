"use client";

import { useContext, useState } from "react";
import { LoginFormErrors, LoginUser, User } from "../users/types";
import LoginView from "./LoginView";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { API_BASE_URL } from "../users/contents";

export default function LoginContainer() {
  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    email: "",
    password: "",
  });

  const [errorMessages, setErrorMessages] = useState<LoginFormErrors>({});

  const [message, setMessage] = useState<string>("");

  const router = useRouter();

  // const [loginUser, setLoginUser] = useContext<User>()

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
    const resultUsers: LoginUser[] = await response.json();

    const loginUser = resultUsers.find(
      (u: LoginUser) => u.email === user.email && u.password === user.password,
    );
    if (loginUser === undefined) {
      setMessage("メールアドレスかパスワードが間違っています。");
      return;
    }

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
