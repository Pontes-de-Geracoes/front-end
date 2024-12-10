import Cookies from "js-cookie";
import { UserInfoScheme } from "../../schemes/user/userContext.scheme";
import { api, handleServerError } from "../../utils/http";

export const validatingToken = async (token: string) => {
  try {
    const res = await api.get<UserInfoScheme>("auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status !== 200) throw new Error(JSON.stringify(res));
    return res.data;
  } catch (e) {
    Cookies.remove("token");
    handleServerError(e);
    return false;
  }
};
