export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;
export enum TitleTextEnum {
  USER_LIST = "ユーザー一覧",
  USER_DETAIL = "ユーザー詳細",
  USER_REGISTRATION = "ユーザー登録",
}

export enum ButtonTextEnum {
  CREATE = "登録",
  UPDATE = "更新",
  CANCEL = "キャンセル",
  EDIT = "編集",
  DELETE = "削除",
  DETAIL = "詳細",
  BACK = "戻る",
}

export const DELETE_CONFIRM_MESSAGE = "本当に削除しますか？";
