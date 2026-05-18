import { User } from "../types/user";

const BASE_URL = "http://localhost:8080/users";

//ユーザ一覧取得
export const getUsers = async (): Promise<User[]> => {
  //API接続して返却値を変数へ格納
  const response = await fetch(BASE_URL);
  //レスポンスを返す
  return response.json();
};

//ユーザ登録
export const createUser = async (name: string) => {
  await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
    }),
  });
};
