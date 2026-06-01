export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type UserFormModel = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};
