import Cookies from "js-cookie";
import { LoginSchema } from "../schemes/user/login.scheme";
import { RegisterScheme } from "../schemes/user/register.schema";
import { UserInfoScheme } from "../schemes/user/userContext.scheme";
import {
  api,
  getConfig,
  handleResponse,
  handleServerError,
} from "../utils/http";

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

const login = async (user: LoginSchema): Promise<UserInfoScheme | null> => {
  try {
    const res = await api.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, user);
    const { token, user: userInfo } = handleResponse<LoginResponse>(res, 200);
    Cookies.set(COOKIE_NAMES.TOKEN, token, COOKIE_CONFIG);

    return userInfo;
  } catch (e) {
    handleServerError(e);
    return null;
  }
};

const logOut = (): void => {
  Cookies.remove(COOKIE_NAMES.TOKEN);
  window.location.reload();
};

const register = async (
  data: Omit<RegisterScheme, "confirmPassword">
): Promise<UserInfoScheme | null> => {
  const necessities = data.necessities.map((necessity) => necessity.id);
  try {
    const res = handleResponse(
      await api.post(AUTH_ENDPOINTS.REGISTER, {
        ...data,
        necessities,
      }),
      201
    );

    const { token, ...userRes } = res;
    Cookies.set("token", token, { expires: 7 });
    return userRes.user;
  } catch (e) {
    handleServerError(e);
    return null;
  }
};

const validatingToken = async (): Promise<UserInfoScheme | null> => {
  try {
    if (!Cookies.get(COOKIE_NAMES.TOKEN)) {
      return {} as UserInfoScheme;
    }
    const res = await api.get<UserInfoScheme>(
      AUTH_ENDPOINTS.PROFILE,
      getConfig()
    );
    return handleResponse<UserInfoScheme>(res, 200);
  } catch (e) {
    handleServerError(e);
    return null;
  }
};

export const auth = {
  login,
  logOutUser: logOut,
  register,
  validatingToken,
};
