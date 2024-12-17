import { api, handleServerError } from "../utils/http";
import { UserCardScheme } from "../schemes/user/userCard.schema";

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

export const usersServices = { getAll };
