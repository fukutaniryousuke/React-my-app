import { ButtonTextEnum, TitleTextEnum } from "../contents";
import { User } from "../types";
import styles from "./UserDetailView.module.scss";
import { Button, TextField, Box, Typography } from "@mui/material";

type Props = {
  user: User;
  changeIsEditUser: () => void;
  isEditUser: boolean;
  handleUpdateUser: () => Promise<void>; // 後から() => Promise<void>に変更
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCancel: () => void;
};

export default function UserDetailView({
  user,
  changeIsEditUser,
  isEditUser,
  handleUpdateUser,
  handleOnChange,
  handleCancel,
}: Props) {
  return (
    <div className={styles.container}>
      <h2>{TitleTextEnum.USER_DETAIL}</h2>
      {isEditUser === false ? (
        <>
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
          <Button
            color="success"
            size="large"
            variant="contained"
            className={styles.edit_button}
            onClick={() => changeIsEditUser()}
          >
            {ButtonTextEnum.EDIT}
          </Button>
        </>
      ) : (
        <>
          <div className={styles.formWrapper}>
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
          </div>

          <Button
            color="primary"
            size="large"
            variant="contained"
            className={styles.edit_button}
            onClick={() => handleUpdateUser()}
          >
            {ButtonTextEnum.UPDATE}
          </Button>
        </>
      )}

      <Button
        sx={{ mt: 2 }}
        color="greyCustom"
        variant="contained"
        onClick={handleCancel}
        className={styles.back_button}
      >
        {ButtonTextEnum.BACK}
      </Button>
    </div>
  );
}
