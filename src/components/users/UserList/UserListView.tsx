import styles from "./UserListView.module.scss";
import { ButtonTextEnum, TitleTextEnum } from "../contents";
import { User } from "../types";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  users: User[];
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  handleAddUser: () => Promise<void>;
  handleDeleteUser: (id: number) => Promise<void>;
  loginUser: User | null | undefined;
};

export default function UsersView({
  users,
  userName,
  setUserName,
  handleAddUser,
  handleDeleteUser,
  loginUser,
}: Props) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h2>{TitleTextEnum.USER_LIST}</h2>
      <h3>ようこそ！{loginUser?.name}</h3>
      <div className={styles.inputWrapper}>
        <input
          className={styles.name_input}
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <Button
          color="primary"
          size="large"
          variant="contained"
          onClick={handleAddUser}
        >
          {ButtonTextEnum.CREATE}
        </Button>
      </div>
      {users.length === 0 && (
        <p className={styles.no_users}>表示できるユーザーがいません。</p>
      )}
      <ul>
        {users.map((user) => (
          <li key={user.id} className={styles.user_item}>
            <span className={styles.user_name}>{user.name}</span>

            <Button
              color="success"
              variant="outlined"
              onClick={() => router.push(`/users/${user.id}`)}
            >
              {ButtonTextEnum.DETAIL}
            </Button>

            <Button
              color="error"
              variant="outlined"
              onClick={() => handleDeleteUser(user.id)}
              startIcon={<DeleteIcon />}
            >
              {ButtonTextEnum.DELETE}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
