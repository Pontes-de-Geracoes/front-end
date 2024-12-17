import Cookies from "js-cookie";
import { MeetingScheme } from "../schemes/meeting/meeting.scheme";
import { api, handleServerError } from "../utils/http";
import { MeetingCreateScheme } from "../schemes/meeting/meeting-create.scheme";
import { MeetingCardScheme } from "../schemes/meeting/meeting-card.scheme";
import { MeetingUpdateScheme } from "../schemes/meeting/meeting.-update.scheme";

const token = Cookies.get("token");

const getAll = async () => {
  try {
    const res = await api.get<MeetingScheme[]>("/meetings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status !== 200) throw new Error(JSON.stringify(res));
    return res.data;
  } catch (e) {
    handleServerError(e);
    return <MeetingScheme[]>{};
  }
};

const getById = async (id: number) => {
  try {
    const res = await api.get<MeetingCardScheme[]>(`/meetings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status !== 200) throw new Error(JSON.stringify(res));
    return res.data;
  } catch (e) {
    handleServerError(e);
    return <MeetingCardScheme>{};
  }
};

const getAllByUserID = async (id: number) => {
  try {
    const res = await api.get<MeetingCardScheme[]>(`/meetings/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status !== 200) throw new Error(JSON.stringify(res));
    return res.data;
  } catch (e) {
    handleServerError(e);
    return <MeetingCardScheme[]>{};
  }
};

const create = async (data: MeetingCreateScheme) => {
  const serializedData = {
    ...data,
    sender: {
      id: data.sender,
    },
    recipient: {
      id: data.recipient,
    },
  };

  try {
    const res = await api.post<MeetingCreateScheme>(
      "/meetings",
      serializedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status !== 201) throw new Error(JSON.stringify(res));
    console.log(res.data);
    return res.data;
  } catch (e) {
    handleServerError(e);
    return <MeetingCreateScheme>{};
  }
};

/* Update */
const update = async (id: number, data: Partial<MeetingUpdateScheme>) => {
  const serializedData = {
    ...data,
  };

  try {
    const res = await api.put<MeetingCardScheme>(
      `/meetings/${id}`,
      serializedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status !== 200) throw new Error(JSON.stringify(res));
    return res.data;
  } catch (e) {
    handleServerError(e);
    return null;
  }
};

export const meetingsServices = {
  getAll,
  getById,
  getAllByUserID,
  create,
  update,
};
