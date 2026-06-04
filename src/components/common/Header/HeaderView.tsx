"use client";

import Link from "next/link";
import styles from "./Header.module.scss";
import { useContext } from "react";
import { AuthContext } from "@/src/contexts/AuthContext";
import { User } from "../../users/types";

type Props = {
  loginUser: User | null;
  handleLogout: () => void;
};

export default function HeaderView({ loginUser, handleLogout }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.logoArea}>
        <span className={styles.logoIcon}>📖</span>
        <h1 className={styles.logo}>My App</h1>
      </div>

      <nav className={styles.nav}>
        <Link href="/" className={styles.link}>
          Home
        </Link>
        {loginUser ? (
          <>
            <Link href="/users" className={styles.link}>
              Users
            </Link>
            <Link href="/" className={styles.link} onClick={handleLogout}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link href="/login" className={styles.link}>
              Login
            </Link>
            <Link href="/users/registration" className={styles.link}>
              Sign up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
