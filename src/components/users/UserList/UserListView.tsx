import styles from "./UserListView.module.scss";
import { ButtonTextEnum, TitleTextEnum } from "../contents";
import { User } from "../types";
import { useRouter } from "next/navigation";

type Props = {
  users: User[];
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  isEditUser: boolean;
  handleAddUser: () => Promise<void>;
  handleDeleteUser: (id: number) => Promise<void>;
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
  handleUpdateUser,
  cancelEdit,
}: Props) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h2>{TitleTextEnum.USER_LIST}</h2>
      <div className={styles.inputWrapper}>
        <input
          className={styles.name_input}
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        {isEditUser === false ? (
          <button onClick={handleAddUser} className={styles.submit_button}>
            {ButtonTextEnum.CREATE}
          </button>
        ) : (
          <>
            <button onClick={handleUpdateUser} className={styles.submit_button}>
              {ButtonTextEnum.UPDATE}
            </button>
            <button onClick={cancelEdit} className={styles.cancel_button}>
              {ButtonTextEnum.CANCEL}
            </button>
          </>
        )}
      </div>
      {users.length === 0 && (
        <p className={styles.no_users}>表示できるユーザーがいません。</p>
      )}
      <ul>
        {users.map((user) => (
          <li key={user.id} className={styles.user_item}>
            <span className={styles.user_name}>{user.name}</span>

            <button
              onClick={() => router.push(`/users/${user.id}`)}
              className={styles.detail_button}
            >
              {ButtonTextEnum.DETAIL}
            </button>

            <button
              onClick={() => handleDeleteUser(user.id)}
              className={styles.delete_button}
            >
              {ButtonTextEnum.DELETE}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
