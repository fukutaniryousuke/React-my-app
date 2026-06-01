import { ButtonTextEnum, TitleTextEnum } from "../contents";
import { FormErrors, UserFormModel } from "../types";
import styles from "./UserDetailView.module.scss";
import { Button, TextField, Box, Typography } from "@mui/material";

type Props = {
  user: UserFormModel;
  changeIsEditUser: () => void;
  isEditUser: boolean;
  handleUpdateUser: () => Promise<void>;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCancel: () => void;
  errorMessages: FormErrors;
  handleBack: () => void;
};

export default function UserDetailView({
  user,
  changeIsEditUser,
  isEditUser,
  handleUpdateUser,
  handleOnChange,
  handleCancel,
  errorMessages,
  handleBack,
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
            onClick={changeIsEditUser}
          >
            {ButtonTextEnum.EDIT}
          </Button>

          <Button
            sx={{ mt: 2 }}
            color="greyCustom"
            variant="contained"
            onClick={handleBack}
            className={styles.back_button}
          >
            {ButtonTextEnum.BACK}
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
                error={!!errorMessages.name}
                helperText={errorMessages.name}
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
                error={!!errorMessages.email}
                helperText={errorMessages.email}
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
                error={!!errorMessages.password}
                helperText={errorMessages.password}
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
              <Typography sx={{ minWidth: 130 }}>確認用パスワード</Typography>
              <TextField
                fullWidth
                variant="standard"
                name="confirmPassword"
                value={user?.confirmPassword || ""}
                onChange={handleOnChange}
                error={!!errorMessages.confirmPassword}
                helperText={errorMessages.confirmPassword}
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
          <Button
            sx={{ mt: 2 }}
            color="greyCustom"
            variant="contained"
            onClick={handleCancel}
            className={styles.back_button}
          >
            {ButtonTextEnum.CANCEL}
          </Button>
        </>
      )}
    </div>
  );
}
