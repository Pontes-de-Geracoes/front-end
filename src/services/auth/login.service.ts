import { LoginSchema } from "../../schemes/user/login.scheme";
import { UserInfoScheme } from "../../schemes/user/userContext.scheme";
import { api, handleServerError } from "../../utils/http";
import Cookies from "js-cookie";

export const login = async (user: LoginSchema) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await api.post<any & { token: string }>("auth/login", user);
    if (res.status !== 200) throw new Error(JSON.stringify(res));

    const { token, ...userRes } = res.data;
    Cookies.set("token", token, { expires: 7 });
    return userRes.user as UserInfoScheme;
  } catch (e) {
    handleServerError(e);
    return false;
  }
};
