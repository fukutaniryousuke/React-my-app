import styles from "./LoginView.module.scss";

export default function LoginView() {
  return (
    <div className={styles.container}>
      <h2>ログイン</h2>
      <div className={styles.inputArea}>
        <input type="text" />
        <button>ログイン</button>
      </div>
    </div>
  );
}
