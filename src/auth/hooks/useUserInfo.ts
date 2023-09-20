import axios from "axios";
import { useQuery } from "react-query";
import { UserInfo } from "../types/userInfo";
const apiUrl = process.env.REACT_APP_API_URL
const fetchUserInfo = async (id: string): Promise<UserInfo> => {
  const { data } = await axios.get(`https://localhost:7262/api/auth/user-info/${id}`);
  return data;
};

export function useUserInfo(id: string) {
  return useQuery(["user-info", id], () => fetchUserInfo(id), {
    enabled: !!id,
  });
}
