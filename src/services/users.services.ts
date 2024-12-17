import Cookies from "js-cookie";
import { api, handleServerError } from "../utils/http";
import { UserCardScheme } from "../schemes/user/userCard.schema";

const token = Cookies.get("token");

const getAll = async () => {
  try {
    const res = await api.get<UserCardScheme[]>("/users", {
      /*  headers: {
        Authorization: `Bearer ${token}`,
      }, */
    });
    if (res.status !== 200) throw new Error(JSON.stringify(res));
    return res.data;
  } catch (e) {
    handleServerError(e);
    return <UserCardScheme[]>{};
  }
};

export const usersServices = { getAll };
