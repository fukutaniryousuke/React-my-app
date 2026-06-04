"use client";

import { useContext } from "react";
import HeaderView from "./HeaderView";
import { AuthContext } from "@/src/contexts/AuthContext";

export default function HeaderContainer() {
  const authContext = useContext(AuthContext);

  const { loginUser, setLoginUser } = authContext!;

  const handleLogout = () => {
    setLoginUser(null);
  };

  return <HeaderView loginUser={loginUser} handleLogout={handleLogout} />;
}
