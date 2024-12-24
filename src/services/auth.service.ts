import Cookies from "js-cookie";
import { LoginSchema } from "../schemes/user/login.scheme";
import { RegisterScheme } from "../schemes/user/register.schema";
import { UserInfoScheme } from "../schemes/user/userContext.scheme";
import { api, handleResponse, handleServerError } from "../utils/http";

type LoginResponse = {
  token: string;
  user: UserInfoScheme;
};

const AUTH_ENDPOINTS = {
  LOGIN: "auth/login",
  PROFILE: "auth/profile",
  REGISTER: "users/create",
} as const;

const COOKIE_NAMES = {
  TOKEN: "token",
} as const;

const COOKIE_CONFIG = {
  expires: 7,
} as const;

const login = async (user: LoginSchema): Promise<UserInfoScheme> => {
  try {
    const res = await api.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, user);
    const { token, user: userInfo } = handleResponse<LoginResponse>(res, 200);

    Cookies.set(COOKIE_NAMES.TOKEN, token, COOKIE_CONFIG);
    return userInfo;
  } catch (e) {
    handleServerError(e);
    return {} as UserInfoScheme;
  }
};

const logOutUser = (): void => {
  Cookies.remove(COOKIE_NAMES.TOKEN);
  window.location.reload();
};

const registerUser = async (
  data: Omit<RegisterScheme, "confirmPassword">
): Promise<boolean> => {
  try {
    const res = await api.post(AUTH_ENDPOINTS.REGISTER, data);
    return handleResponse(res, 201);
  } catch (e) {
    handleServerError(e);
    return false;
  }
};

const validatingToken = async (token: string): Promise<UserInfoScheme> => {
  try {
    const res = await api.get<UserInfoScheme>(AUTH_ENDPOINTS.PROFILE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse<UserInfoScheme>(res, 200);
  } catch (e) {
    handleServerError(e);
    return {} as UserInfoScheme;
  }
};

export const auth = {
  login,
  logOutUser,
  registerUser,
  validatingToken,
};
