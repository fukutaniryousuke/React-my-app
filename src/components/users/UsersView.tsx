import styles from "./UsersView.module.scss";
import { User } from "./types";

type Props = {
  users: User[];
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  handleAddUser: () => Promise<void>;
};

export default function UsersView({
  users,
  userName,
  setUserName,
  handleAddUser,
}: Props) {
  return (
    <div className={styles.container}>
      <h1>User一覧</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <div>
        <input
          className={styles.name_input}
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <button onClick={handleAddUser} className={styles.submit_button}>
          追加
        </button>
      </div>
    </div>
  );
}
