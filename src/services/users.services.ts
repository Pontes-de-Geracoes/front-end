import { api, handleResponse, handleServerError } from "../utils/http";
import { UserCardScheme } from "../schemes/user/userCard.schema";
import { RegisterScheme } from "@/schemes/user/register.schema";
import { UserInfoScheme } from "@/schemes/user/userContext.scheme";
import Cookies from "js-cookie";

const getAll = async () => {
  try {
    const res = await api.get<UserCardScheme[]>("/users", {});
    return handleResponse(res, 200);
  } catch (e) {
    handleServerError(e);
    return <UserCardScheme[]>{};
  }
};

const create = async (data: RegisterScheme) => {
  const necessities = data.necessities.map((necessity) => necessity.id);
  const serializedData = {
    ...data,
    necessities,
  };

  try {
    const request = await api.post<
      { user: UserInfoScheme } & { token: string }
    >("/auth/register", serializedData);

    const res = handleResponse(request, 201);
    const { token, ...userRes } = res;
    Cookies.set("token", token, { expires: 7 });
    return userRes.user;
  } catch (e) {
    handleServerError(e);
    return <UserInfoScheme>{};
  }
};

export const usersServices = {
  getAll,
  create,
};
