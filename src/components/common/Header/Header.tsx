import Link from "next/link";
import styles from "./Header.module.scss";

export default function Header() {
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

        <Link href="/users" className={styles.link}>
          Users
        </Link>
      </nav>
    </header>
  );
}
