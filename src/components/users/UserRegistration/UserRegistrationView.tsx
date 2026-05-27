import { Box, Button, TextField, Typography } from "@mui/material";
import { ButtonTextEnum, TitleTextEnum } from "../contents";
import styles from "./UserRegistrationView.module.scss";
import { CreateUser } from "../types";

type Props = {
  user: CreateUser;
  message: string | undefined;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUserCreate: () => Promise<void>;
};

export default function UserRegistrationView({
  user,
  message,
  handleOnChange,
  handleUserCreate,
}: Props) {
  return (
    <div className={styles.container}>
      <h2>{TitleTextEnum.USER_REGISTRATION}</h2>
      <p className={styles.errorMassage}>{message}</p>
      <div className={styles.formWrapper}>
        {/* 名前 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            gap: 3,
            pb: 3,
          }}
        >
          <Typography sx={{ minWidth: 130 }}>名前</Typography>
          <TextField
            fullWidth
            variant="standard"
            name="name"
            value={user?.name || ""}
            onChange={handleOnChange}
          />
        </Box>
        {/* メールアドレス */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            gap: 3,
            pb: 3,
          }}
        >
          <Typography sx={{ minWidth: 130 }}>メールアドレス</Typography>
          <TextField
            fullWidth
            variant="standard"
            name="email"
            value={user?.email || ""}
            onChange={handleOnChange}
          />
        </Box>
        {/* パスワード */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            gap: 3,
            pb: 3,
          }}
        >
          <Typography sx={{ minWidth: 130 }}>パスワード</Typography>
          <TextField
            fullWidth
            variant="standard"
            name="password"
            value={user?.password || ""}
            onChange={handleOnChange}
          />
        </Box>
        {/* 確認用パスワード */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            gap: 3,
            pb: 3,
          }}
        >
          <Typography sx={{ minWidth: 130 }}>確認用パスワード</Typography>
          <TextField
            fullWidth
            variant="standard"
            name="confirmPassword"
            value={user?.confirmPassword || ""}
            onChange={handleOnChange}
          />
        </Box>
      </div>

      <Button
        color="primary"
        size="large"
        variant="contained"
        className={styles.edit_button}
        onClick={() => handleUserCreate()}
      >
        {ButtonTextEnum.CREATE}
      </Button>
    </div>
  );
}
