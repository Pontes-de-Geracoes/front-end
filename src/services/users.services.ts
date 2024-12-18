import { api, handleServerError } from "../utils/http";
import { UserCardScheme } from "../schemes/user/userCard.schema";
import { RegisterScheme } from "@/schemes/user/register.schema";
import { UserInfoScheme } from "@/schemes/user/userContext.scheme";
import Cookies from "js-cookie";

const getAll = async () => {
  try {
    const res = await api.get<UserCardScheme[]>("/users", {});
    if (res.status !== 200) throw new Error(JSON.stringify(res));
    return res.data;
  } catch (e) {
    handleServerError(e);
    return <UserCardScheme[]>{};
  }
};

const create = async (data: RegisterScheme) => {
  const {confirmPassword, ...serializedData} = {
    ...data
  };

  try {
    const res = await api.post<any & { token: string }>(
      "/auth/register",
      serializedData
    );
    if (res.status !== 200) throw new Error(JSON.stringify(res));
    const { token, ...userRes } = res.data;
    Cookies.set("token", token, { expires: 7 });
    return userRes.user as UserInfoScheme;
  } catch (e) {
    handleServerError(e);
    return <UserInfoScheme>{};
  }
};

export const usersServices = { 
  getAll,
  create
 };
