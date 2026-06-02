"use client";

import { useEffect, useState } from "react";
import UserDetailView from "./UserDetailView";
import { API_BASE_URL } from "@/src/components/users/contents";
import { FormErrors, UserFormModel } from "../types";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";

export default function UserDetailContainer() {
  // パラメータ取得用ß
  const params = useParams();
  /**
   * ユーザーID
   * 返却値がstringのためNumber型にキャストしている
   * */
  const id = Number(params.id);
  // ユーザー情報保持用state
  const [user, setUser] = useState<UserFormModel>();
  // ユーザー情報保持用state
  const [getUser, setGetUser] = useState<UserFormModel>();
  // 編集フラグ
  const [isEditUser, setIsEditUser] = useState(false);
  // エラーメッセージ
  const [errorMessages, setErrorMessages] = useState<FormErrors>({});

  const router = useRouter();

  const userUpdateSchema = z.object({
    name: z.string().min(1, "名前を入力してください。"),
    email: z
      .email("メールアドレス形式で入力してください。")
      .min(1, "メールアドレスを入力してください。"),
    password: z
      .string()
      .min(1, "パスワードを入力してください。")
      .refine(
        (value) => {
          if (value.length === 0) {
            return true;
          }
          return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(value);
        },
        {
          message: "パスワードは英字と数字を含めて入力してください。",
        },
      ),
    confirmPassword: z
      .string()
      .min(1, "確認用パスワードを入力してください。")
      .refine(
        (value) => {
          if (value.length === 0) {
            return true;
          }
          return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(value);
        },
        {
          message: "パスワードは英字と数字を含めて入力してください。",
        },
      ),
  });

  // 初回表示処理
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`${API_BASE_URL}/users/${id}`);
      const data = await response.json();
      console.log(data);
      const getData = {
        ...data,
        confirmPassword: "",
      };
      setUser(getData);
      setGetUser(getData);
      setIsEditUser(false);
    };
    fetchUser();
  }, [id]);

  if (!user) {
    return <p>読み込み中...</p>;
  }

  // 編集モード切り替え
  const changeIsEditUser = () => {
    setErrorMessages({});
    setUser(getUser);
    setIsEditUser(true);
  };

  // 入力内容更新
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessages({ ...errorMessages, [e.target.name]: "" });
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // ユーザー更新処理
  const handleUpdateUser = async () => {
    setErrorMessages({});
    const result = userUpdateSchema.safeParse(user);
    const errors: FormErrors = {};

    if (user.password !== user.confirmPassword) {
      errors["confirmPassword"] = "パスワードと確認用パスワードが一致しません";
    }
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        // as keyof FormErrorsはpathをキーとして扱うよという意味
        const field = issue.path[0] as keyof FormErrors;
        errors[field] = issue.message;
      });
    }

    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }
    await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    // 更新後、各値をリセット
    setIsEditUser(false);
  };

  // 戻るボタン押下
  const handleBack = () => {
    setIsEditUser(false);
    router.push("/users");
  };

  // キャンセルボタン押下
  const handleCancel = () => {
    setIsEditUser(false);
    setUser(getUser);
  };

  return (
    <UserDetailView
      user={user}
      changeIsEditUser={changeIsEditUser}
      isEditUser={isEditUser}
      handleUpdateUser={handleUpdateUser}
      handleOnChange={handleOnChange}
      handleCancel={handleCancel}
      errorMessages={errorMessages}
      handleBack={handleBack}
    />
  );
}
