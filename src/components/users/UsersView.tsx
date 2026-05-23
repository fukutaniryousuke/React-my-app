import styles from "./UsersView.module.scss";
import { User } from "./types";

type Props = {
  users: User[];
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  isEditUser: boolean;
  handleAddUser: () => Promise<void>;
  handleDeleteUser: (id: number) => Promise<void>;
  handleGetUser: (id: number) => Promise<void>;
  handleUpdateUser: () => Promise<void>;
  cancelEdit: () => void;
};

export default function UsersView({
  users,
  userName,
  setUserName,
  isEditUser,
  handleAddUser,
  handleDeleteUser,
  handleGetUser,
  handleUpdateUser,
  cancelEdit,
}: Props) {
  return (
    <div className={styles.container}>
      <h2>User一覧</h2>
      <div className={styles.inputWrapper}>
        <input
          className={styles.name_input}
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        {isEditUser === false ? (
          <button onClick={handleAddUser} className={styles.submit_button}>
            追加
          </button>
        ) : (
          <>
            <button onClick={handleUpdateUser} className={styles.submit_button}>
              更新
            </button>
            <button onClick={cancelEdit} className={styles.cancel_button}>
              キャンセル
            </button>
          </>
        )}
      </div>
      <ul className={styles.no_users}>
        {users.length === 0 && (
          <p className={styles.no_users}>表示できるユーザーがいません。</p>
        )}
        {users.map((user) => (
          <li key={user.id} className={styles.user_item}>
            <span className={styles.user_name}>{user.name}</span>
            <button
              onClick={() => handleGetUser(user.id)}
              className={styles.edit_button}
            >
              編集
            </button>

            <button
              onClick={() => handleDeleteUser(user.id)}
              className={styles.delete_button}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
