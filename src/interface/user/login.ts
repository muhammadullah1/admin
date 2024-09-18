export type Role = 'admin';

export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResult {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    user: {
      email: string;
    };
  };
}

export interface LogoutParams {
  token: string;
}
