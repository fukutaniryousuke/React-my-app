"use client";

import Link from "next/link";
import styles from "./Header.module.scss";
import { useContext } from "react";
import { AuthContext } from "@/src/contexts/AuthContext";

export default function Header() {
  const authContext = useContext(AuthContext);
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
        {authContext ? (
          <Link href="/users" className={styles.link}>
            Users
          </Link>
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
