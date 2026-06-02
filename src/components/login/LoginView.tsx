import { Button, TextField } from "@mui/material";
import styles from "./LoginView.module.scss";
import { LoginFormErrors } from "../users/types";

type Props = {
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  userLogin: () => void;
  errorMessages: LoginFormErrors;
  message: string;
};

export default function LoginView({
  handleOnChange,
  userLogin,
  errorMessages,
  message,
}: Props) {
  return (
    <div className={styles.container}>
      <h2>ログイン</h2>
      {message && <span className={styles.errorMassage}>{message}</span>}
      <div className={styles.inputArea}>
        <div className={styles.field}>
          <TextField
            fullWidth
            id="standard-basic"
            label="メールアドレス"
            variant="standard"
            onChange={handleOnChange}
            name={"email"}
            error={!!errorMessages.email || !!message}
            helperText={errorMessages.email}
          />
        </div>
        <div className={styles.field}>
          <TextField
            fullWidth
            id="standard-basic"
            label="パスワード"
            variant="standard"
            onChange={handleOnChange}
            name={"password"}
            error={!!errorMessages.password || !!message}
            helperText={errorMessages.password}
          />
        </div>
        <div className={styles.button}>
          <Button fullWidth variant="contained" onClick={userLogin}>
            ログイン
          </Button>
        </div>
      </div>
    </div>
  );
}
