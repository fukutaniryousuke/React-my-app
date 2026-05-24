import { useRouter } from "next/navigation";
import { ButtonTextEnum, TitleTextEnum } from "../contents";
import { User } from "../types";
import styles from "./UserDetailView.module.scss";

type Props = {
  handleGetUser: (id: number) => Promise<void>;
  user: User | undefined;
};

export default function UserDetailView({ handleGetUser, user }: Props) {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <h2>{TitleTextEnum.USER_DETAIL}</h2>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th>名前</th>
            <td>{user?.name}</td>
          </tr>
          <tr>
            <th>メールアドレス</th>
            <td>{user?.email}</td>
          </tr>
          <tr>
            <th>パスワード</th>
            <td>{user?.password}</td>
          </tr>
        </tbody>
      </table>

      <button
        // onClick={() => handleGetUser(user.id)}
        className={styles.edit_button}
      >
        {ButtonTextEnum.EDIT}
      </button>
      <button
        onClick={() => router.push("/users")}
        className={styles.back_button}
      >
        {ButtonTextEnum.BACK}
      </button>
    </div>
  );
}
