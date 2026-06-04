"use client";

import { createContext, useState } from "react";
import { User } from "../components/users/types";

type AuthContextType = {
  loginUser: User | null;
  setLoginUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const [loginUser, setLoginUser] = useState<User | null>(null);
  return (
    <AuthContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </AuthContext.Provider>
  );
}
